// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./entropy/IEntropyConsumer.sol";
import "./entropy/IEntropy.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

struct RoomConfig {
    uint256 roundDuration;
    uint256 entryFee;
    uint256 eliminationsPerRound;
    uint256 minWinners;
    uint256 maxWinners;
    uint256 organizerFeePercent;
}

struct RoomDetails {
    uint256 roundDuration;
    uint256 entryFee;
    uint256 eliminationsPerRound;
    uint256 minWinners;
    uint256 maxWinners;
    uint256 organizerFeePercent;
    uint256 protocolFeePercent;
    address organizer;
    uint256 roomId;
    uint256 totalPrizePool;
    uint256 currentRound;
    bool gameStarted;
    address[] players;
}

interface IOBRouter {
    struct swapTokenInfo {
        address inputToken;
        uint256 inputAmount;
        address outputToken;
        uint256 outputQuote;
        uint256 outputMin;
        address outputReceiver;
    }

    function swap(
        swapTokenInfo calldata tokenInfo,
        bytes calldata pathDefinition,
        address executor,
        uint32 referralCode
    ) external payable returns (uint256 amountOut);
}

/// @title Game Room Contract
contract Room is IEntropyConsumer, ReentrancyGuard {
    using EnumerableSet for EnumerableSet.AddressSet;
    using SafeERC20 for IERC20;
    // Game parameters
    uint256 public roundDuration;
    uint256 public entryFee;
    uint256 public eliminationsPerRound;
    uint256 public minWinners;
    uint256 public maxWinners;
    uint256 public organizerFeePercent;
    uint256 public protocolFeePercent = 5; // Fixed protocol fee percentage
    address public organizer;
    address public factoryAddress;
    // Entropy variables
    address public entropyProvider;
    IEntropy public entropy;
    mapping(uint64 => uint256) public sequenceNumberToRoundNumber;
    // Room identifier
    uint256 public roomId;
    // Ooga Booga Router
    IOBRouter public router;
    // Game state variables
    EnumerableSet.AddressSet private playersSet;
    bool public gameStarted;
    uint256 public totalPrizePool;
    uint256 public currentRound;
    struct Round {
        uint256 roundNumber;
        bool randomnessRequested;
        bool roundEnded;
    }

    mapping(uint256 => Round) public rounds;

    // Prize tracking
    mapping(address => uint256) public pendingPrizes;

    // Events
    event PlayerJoined(address indexed player, uint256 timestamp, uint256 roomId);
    event GameStarted(uint256 timestamp, uint256 roomId);
    event RoundEnded(uint256 roundNumber, uint256 timestamp, uint256 roomId);
    event PlayersEliminated(address[] eliminatedPlayers, uint256 timestamp, uint256 roundNumber, uint256 roomId);
    event GameEnded(address[] winners, uint256 timestamp, uint256 roomId);
    event PrizeDistributed(address indexed player, uint256 amount, uint256 timestamp, uint256 roomId);
    event EntropyRequested(uint256 roomId, uint256 roundNumber, uint64 sequenceNumber);
    event PrizeWithdrawn(address indexed player, uint256 amount, uint256 timestamp, uint256 roomId);
    event GameReset(uint256 timestamp, uint256 roomId);

    // Modifiers
    modifier onlyOrganizer() {
        require(msg.sender == organizer, "Only organizer can call this function");
        _;
    }

    modifier onlyBeforeGameStart() {
        require(!gameStarted, "Game has already started");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == factoryAddress, "Only factory can call this function");
        _;
    }

    constructor(
        RoomConfig memory config,
        address _organizer,
        address _factoryAddress,
        uint256 _roomId,
        address _entropyAddress,
        address _entropyProvider,
        address _routerAddress
    )  {
        require(_organizer != address(0), "Invalid organizer address");
        require(_factoryAddress != address(0), "Invalid factory address");

        roundDuration = config.roundDuration;
        entryFee = config.entryFee;
        eliminationsPerRound = config.eliminationsPerRound;
        minWinners = config.minWinners;
        maxWinners = config.maxWinners;
        organizerFeePercent = config.organizerFeePercent;
        organizer = _organizer;
        factoryAddress = _factoryAddress;

        roomId = _roomId;
        entropy = IEntropy(_entropyAddress);
        entropyProvider = _entropyProvider;
        router = IOBRouter(_routerAddress);
    }


    /// @notice Allows players to join the game by paying the entry fee
    function joinGame() external payable onlyBeforeGameStart nonReentrant {
        require(msg.value == entryFee, "Incorrect entry fee amount");
        require(!playersSet.contains(msg.sender), "Player already joined");
        require(!gameStarted, "Game has already started");

        playersSet.add(msg.sender);
        totalPrizePool += msg.value;

        emit PlayerJoined(msg.sender, block.timestamp, roomId);
    }

    /// @notice Allows players to join the game using ERC20 tokens, which are swapped to BERA
    function joinGameZap(
        IOBRouter.swapTokenInfo calldata tokenInfo,
        bytes calldata pathDefinition,
        address executor,
        uint32 referralCode
    ) external payable nonReentrant onlyBeforeGameStart {
        require(tokenInfo.outputToken == address(0), "Output token must be native token");
        require(tokenInfo.outputReceiver == address(this), "Output receiver must be contract address");
        require(!gameStarted, "Game has already started");
        require(!playersSet.contains(msg.sender), "Player already joined");

        // Transfer inputToken from msg.sender to this contract
        IERC20(tokenInfo.inputToken).safeTransferFrom(msg.sender, address(this), tokenInfo.inputAmount);

        // Approve the router to spend the tokens
        IERC20(tokenInfo.inputToken).safeIncreaseAllowance(address(router), tokenInfo.inputAmount);

        uint256 amountOut;
        try router.swap{value: msg.value}(
            tokenInfo,
            pathDefinition,
            executor,
            referralCode
        ) returns (uint256 swapAmountOut) {
            amountOut = swapAmountOut;
        } catch {
            IERC20(tokenInfo.inputToken).safeTransfer(msg.sender, tokenInfo.inputAmount);
            revert("Swap failed");
        }

        require(amountOut >= entryFee, "Swapped amount is below entry fee");

        // Now that we have BERA (native token), proceed with joinGame logic
        playersSet.add(msg.sender);
        totalPrizePool += amountOut;

        emit PlayerJoined(msg.sender, block.timestamp, roomId);

        // Handle any leftover amount
        uint256 leftover = amountOut - entryFee;
        if (leftover > 0) {
            (bool success, ) = msg.sender.call{value: leftover}("");
            require(success, "Transfer of leftover BERA failed");
        }
    }

    /// @notice Starts the game; only callable by the organizer
    function startGame() external onlyOrganizer onlyBeforeGameStart nonReentrant {
        require(playersSet.length() >= minWinners, "Not enough players to start the game");

        gameStarted = true;
        currentRound = 1;

        emit GameStarted(block.timestamp, roomId);
    }

    /// @notice Ends the current round and requests randomness for player elimination
    function endRound(bytes32 userRandomNumber) external payable onlyOrganizer nonReentrant {
        require(gameStarted, "Game has not started yet");
        Round storage round = rounds[currentRound];
        require(!round.randomnessRequested, "Randomness already requested for this round");

        uint256 fee = entropy.getFee(entropyProvider);
        require(msg.value >= fee, "Insufficient fee for randomness request");

        // Request randomness
        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(entropyProvider, userRandomNumber);

        sequenceNumberToRoundNumber[sequenceNumber] = currentRound;
        round.randomnessRequested = true;

        emit EntropyRequested(roomId, currentRound, sequenceNumber);
    }

    /// @notice Callback function to handle the result of the entropy request.
    function entropyCallback(uint64 sequenceNumber, address, bytes32 randomNumber) internal override {
        uint256 roundNumber = sequenceNumberToRoundNumber[sequenceNumber];
        Round storage round = rounds[roundNumber];

        require(round.randomnessRequested, "Randomness not requested for this round");
        require(!round.roundEnded, "Round already ended");

        uint256 numPlayersToEliminate = eliminationsPerRound;
        uint256 numPlayers = playersSet.length();
        require(numPlayersToEliminate <= numPlayers - minWinners, "Cannot eliminate below minimum winners");

        address[] memory eliminatedPlayers = new address[](numPlayersToEliminate);

        uint256 randomSeed = uint256(randomNumber);

        for (uint256 i = 0; i < numPlayersToEliminate; i++) {
            uint256 index = randomSeed % playersSet.length();
            address playerToEliminate = playersSet.at(index);

            eliminatedPlayers[i] = playerToEliminate;
            playersSet.remove(playerToEliminate);

            // Generate new random seed
            randomSeed = uint256(keccak256(abi.encodePacked(randomSeed, i)));
        }

        emit PlayersEliminated(eliminatedPlayers, block.timestamp, roundNumber, roomId);

        round.roundEnded = true;

        // Check if game should end
        if (playersSet.length() <= maxWinners) {
            endGame();
        } else {
            currentRound += 1;
            emit RoundEnded(currentRound, block.timestamp, roomId);
        }
    }

    /// @notice Ends the game and distributes prizes
    function endGame() internal {
        require(gameStarted, "Game has not started yet");
        require(playersSet.length() >= minWinners, "Not enough winners");

        gameStarted = false;

        uint256 organizerFee = (totalPrizePool * organizerFeePercent) / 100;
        uint256 protocolFee = (totalPrizePool * protocolFeePercent) / 100;

        // Transfer protocol fee to factory owner
        payable(factoryAddress).transfer(protocolFee);

        // Transfer organizer fee to organizer
        payable(organizer).transfer(organizerFee);

        // Calculate individual winner share
        uint256 distributablePool = totalPrizePool - organizerFee - protocolFee;
        uint256 individualWinnerShare = distributablePool / playersSet.length();


        // Assign prizes to winners
        for (uint256 i = 0; i < playersSet.length(); i++) {
            address winner = playersSet.at(i);
            pendingPrizes[winner] += individualWinnerShare;
            emit PrizeDistributed(winner, individualWinnerShare, block.timestamp, roomId);
        }
        emit GameEnded(getPlayers(), block.timestamp, roomId);
    }

    /// @notice Allows winners to withdraw their prizes
    function withdrawPrize() external nonReentrant {
        uint256 amount = pendingPrizes[msg.sender];
        require(amount > 0, "No prizes to withdraw");

        pendingPrizes[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Prize withdrawal failed");

        emit PrizeWithdrawn(msg.sender, amount, block.timestamp, roomId);
    }

    /// @notice Resets the game state to allow replay with the same configuration
    function resetGame() external onlyOrganizer nonReentrant {
        require(!gameStarted, "Game is currently in progress");

        // Reset game state variables
        uint256 playerCount = playersSet.length();
        for (uint256 i = 0; i < playerCount; i++) {
            address player = playersSet.at(0); // Always remove the first to avoid index shifting
            playersSet.remove(player);
        }
        totalPrizePool = 0;

        // Reset rounds mapping
        for (uint256 i = 1; i <= currentRound; i++) {
            delete rounds[i];
        }
        currentRound = 0;
        gameStarted = false;


        emit GameReset(block.timestamp, roomId);
    }

    /// @dev Returns the address of the entropy contract.
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    function getTotalPlayers() external view returns (uint256) {
        return playersSet.length();
    }

    /// @notice Returns the list of current players
    function getPlayers() public view returns (address[] memory) {
        return playersSet.values();
    }

    function getRoundInfo(uint256 roundNumber) external view returns (Round memory) {
        return rounds[roundNumber];
    }

    function getRoomDetails() external view returns (RoomDetails memory) {
        address[] memory currentPlayers = getPlayers();
        return RoomDetails({
            roundDuration: roundDuration,
            entryFee: entryFee,
            eliminationsPerRound: eliminationsPerRound,
            minWinners: minWinners,
            maxWinners: maxWinners,
            organizerFeePercent: organizerFeePercent,
            protocolFeePercent: protocolFeePercent,
            organizer: organizer,
            roomId: roomId,
            totalPrizePool: totalPrizePool,
            currentRound: currentRound,
            gameStarted: gameStarted,
            players: currentPlayers
        });
    }

    receive() external payable {
        revert("Direct Ether transfers not allowed");
    }
    
    fallback() external payable {
        revert("Fallback function called");
    }

}

/// @title Factory Contract for Creating Game Rooms
contract Factory is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.UintSet;
    uint256 public creationFee; // Fee required to create a new room in BERA
    uint256 public protocolFeePercent = 5; // Fixed protocol fee percentage
    EnumerableSet.UintSet private roomIdsSet;
    // List of all created rooms
    address[] public rooms;

    // Counter for room IDs
    uint256 public nextRoomId = 1;

    // Entropy variables
    address public entropyProvider;
    IEntropy public entropy;

    IOBRouter public router;

    // Events
    event RoomCreated(
        address indexed roomAddress,
        address indexed organizer,
        uint256 roomId,
        uint256 timestamp
    );
    event CreationFeeUpdated(uint256 newFee);
    event PrizeWithdrawn(address indexed user, uint256 amount, uint256 timestamp, uint256 roomId);

    constructor(
        uint256 _creationFee,
        address _entropyAddress,
        address _entropyProvider,
        address _routerAddress
    ) Ownable(msg.sender) {
        creationFee = _creationFee;
        entropy = IEntropy(_entropyAddress);
        entropyProvider = _entropyProvider;
        router = IOBRouter(_routerAddress);
    }

    /// @notice Allows the owner to update the creation fee
    function updateCreationFee(uint256 _newFee) external onlyOwner {
        creationFee = _newFee;
        emit CreationFeeUpdated(_newFee);
    }

    /// @notice Creates a new game room with specified configurations
    function createRoom(RoomConfig memory config) external payable nonReentrant {
        require(msg.value >= creationFee, "Insufficient creation fee");
        require(config.entryFee > 0, "Entry fee must be greater than 0");
        require(config.roundDuration > 0, "Round duration must be greater than 0");
        require(config.eliminationsPerRound > 0, "Eliminations per round must be greater than 0");
        require(config.minWinners > 0, "Minimum winners must be greater than 0");
        require(config.maxWinners > 0, "Maximum winners must be greater than 0"); 
        require(config.minWinners <= config.maxWinners, "Minimum winners exceed maximum winners");
        require(config.organizerFeePercent > 0, "Organizer fee percentage must be greater than 0");
        require(config.organizerFeePercent <= 94, "Organizer fee percentage must be less than or equal to 94");
        
        uint256 roomId = nextRoomId;
        require(!roomIdsSet.contains(roomId), "Room ID already exists");
        roomIdsSet.add(roomId);
        nextRoomId++;
    
        Room newRoom = new Room(
            config,
            msg.sender,
            address(this),
            roomId,
            address(entropy),
            entropyProvider,
            address(router)
        );
    
        rooms.push(address(newRoom));
    
        emit RoomCreated(address(newRoom), msg.sender, roomId, block.timestamp);
    }


    /// @notice Creates a new game room using ERC20 tokens, swapping them to BERA
    function createRoomZap(
        RoomConfig memory config,
        IOBRouter.swapTokenInfo calldata tokenInfo,
        bytes calldata pathDefinition,
        address executor,
        uint32 referralCode
    ) external payable nonReentrant {
        require(config.entryFee > 0, "Entry fee must be greater than 0");
        require(config.roundDuration > 0, "Round duration must be greater than 0");
        require(config.eliminationsPerRound > 0, "Eliminations per round must be greater than 0");
        require(config.minWinners > 0, "Minimum winners must be greater than 0");
        require(config.maxWinners > 0, "Maximum winners must be greater than 0"); 
        require(config.minWinners <= config.maxWinners, "Minimum winners exceed maximum winners");
        require(config.organizerFeePercent > 0, "Organizer fee percentage must be greater than 0");
        require(config.organizerFeePercent <= 94, "Organizer fee percentage must be less than or equal to 94");

        require(tokenInfo.outputToken == address(0), "Output token must be native token");
        require(tokenInfo.outputReceiver == address(this), "Output receiver must be contract address");

        // Transfer inputToken from msg.sender to this contract
        IERC20(tokenInfo.inputToken).safeTransferFrom(msg.sender, address(this), tokenInfo.inputAmount);

        // Approve the router to spend the tokens
        IERC20(tokenInfo.inputToken).safeIncreaseAllowance(address(router), tokenInfo.inputAmount);

        uint256 amountOut;
        try router.swap{value: msg.value}(
            tokenInfo,
            pathDefinition,
            executor,
            referralCode
        ) returns (uint256 swapAmountOut) {
            amountOut = swapAmountOut;
        } catch {
            IERC20(tokenInfo.inputToken).safeTransfer(msg.sender, tokenInfo.inputAmount);
            revert("Swap failed");
        }

        require(amountOut >= creationFee, "Swapped amount is below creation fee");

        uint256 roomId = nextRoomId;
        require(!roomIdsSet.contains(roomId), "Room ID already exists");
        roomIdsSet.add(roomId);
        nextRoomId++;

        Room newRoom = new Room(
            config,
            msg.sender,
            address(this),
            roomId,
            address(entropy),
            entropyProvider,
            address(router)
        );

        rooms.push(address(newRoom));

        emit RoomCreated(address(newRoom), msg.sender, roomId, block.timestamp);

        // Handle any leftover amount
        uint256 leftover = amountOut - creationFee;
        if (leftover > 0) {
            (bool success, ) = msg.sender.call{value: leftover}("");
            require(success, "Transfer of leftover BERA failed");
        }
    }

    /// @notice Allows the owner to withdraw all BERA from the contract
    function withdrawAllFees() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No BERA to withdraw");

        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
    }

    /// @notice Returns the list of all created rooms
    function getRooms() external view returns (address[] memory) {
        return rooms;
    }

    function getRoomCount() external view returns (uint256) {
        return rooms.length;
    }

    function getRoom(uint256 index) external view returns (address) {
        require(index < rooms.length, "Index out of bounds");
        return rooms[index];
    }

    function getSpecificRoomDetails(address roomAddress) external view returns (RoomDetails memory) {
        Room room = Room(payable(roomAddress));
        return room.getRoomDetails();
    }

    receive() external payable {
        revert("Direct Ether transfers not allowed");
    }

    fallback() external payable {
        revert("Fallback function called");
    }

}
