// File: @openzeppelin/contracts/utils/math/SafeMath.sol


// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/SafeMath.sol)

pragma solidity ^0.8.20;

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)



/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// File: beraflip/EntropyLib.sol




contract EntropyStructs {
    struct ProviderInfo {
        uint128 feeInWei;
        uint128 accruedFeesInWei;
        // The commitment that the provider posted to the blockchain, and the sequence number
        // where they committed to this. This value is not advanced after the provider commits,
        // and instead is stored to help providers track where they are in the hash chain.
        bytes32 originalCommitment;
        uint64 originalCommitmentSequenceNumber;
        // Metadata for the current commitment. Providers may optionally use this field to help
        // manage rotations (i.e., to pick the sequence number from the correct hash chain).
        bytes commitmentMetadata;
        // Optional URI where clients can retrieve revelations for the provider.
        // Client SDKs can use this field to automatically determine how to retrieve random values for each provider.
        // TODO: specify the API that must be implemented at this URI
        bytes uri;
        // The first sequence number that is *not* included in the current commitment (i.e., an exclusive end index).
        // The contract maintains the invariant that sequenceNumber <= endSequenceNumber.
        // If sequenceNumber == endSequenceNumber, the provider must rotate their commitment to add additional random values.
        uint64 endSequenceNumber;
        // The sequence number that will be assigned to the next inbound user request.
        uint64 sequenceNumber;
        // The current commitment represents an index/value in the provider's hash chain.
        // These values are used to verify requests for future sequence numbers. Note that
        // currentCommitmentSequenceNumber < sequenceNumber.
        //
        // The currentCommitment advances forward through the provider's hash chain as values
        // are revealed on-chain.
        bytes32 currentCommitment;
        uint64 currentCommitmentSequenceNumber;
    }

    struct Request {
        // Storage slot 1 //
        address provider;
        uint64 sequenceNumber;
        // The number of hashes required to verify the provider revelation.
        uint32 numHashes;
        // Storage slot 2 //
        // The commitment is keccak256(userCommitment, providerCommitment). Storing the hash instead of both saves 20k gas by
        // eliminating 1 store.
        bytes32 commitment;
        // Storage slot 3 //
        // The number of the block where this request was created.
        // Note that we're using a uint64 such that we have an additional space for an address and other fields in
        // this storage slot. Although block.number returns a uint256, 64 bits should be plenty to index all of the
        // blocks ever generated.
        uint64 blockNumber;
        // The address that requested this random number.
        address requester;
        // If true, incorporate the blockhash of blockNumber into the generated random value.
        bool useBlockhash;
        // If true, the requester will be called back with the generated random value.
        bool isRequestWithCallback;
        // There are 2 remaining bytes of free space in this slot.
    }
}

interface EntropyEvents {
    event Registered(EntropyStructs.ProviderInfo provider);

    event Requested(EntropyStructs.Request request);
    event RequestedWithCallback(
        address indexed provider,
        address indexed requestor,
        uint64 indexed sequenceNumber,
        bytes32 userRandomNumber,
        EntropyStructs.Request request
    );

    event Revealed(
        EntropyStructs.Request request,
        bytes32 userRevelation,
        bytes32 providerRevelation,
        bytes32 blockHash,
        bytes32 randomNumber
    );
    event RevealedWithCallback(
        EntropyStructs.Request request,
        bytes32 userRandomNumber,
        bytes32 providerRevelation,
        bytes32 randomNumber
    );

    event ProviderFeeUpdated(address provider, uint128 oldFee, uint128 newFee);

    event ProviderUriUpdated(address provider, bytes oldUri, bytes newUri);
}

interface IEntropy is EntropyEvents {
    // Register msg.sender as a randomness provider. The arguments are the provider's configuration parameters
    // and initial commitment. Re-registering the same provider rotates the provider's commitment (and updates
    // the feeInWei).
    //
    // chainLength is the number of values in the hash chain *including* the commitment, that is, chainLength >= 1.
    function register(
        uint128 feeInWei,
        bytes32 commitment,
        bytes calldata commitmentMetadata,
        uint64 chainLength,
        bytes calldata uri
    ) external;

    // Withdraw a portion of the accumulated fees for the provider msg.sender.
    // Calling this function will transfer `amount` wei to the caller (provided that they have accrued a sufficient
    // balance of fees in the contract).
    function withdraw(uint128 amount) external;

    // As a user, request a random number from `provider`. Prior to calling this method, the user should
    // generate a random number x and keep it secret. The user should then compute hash(x) and pass that
    // as the userCommitment argument. (You may call the constructUserCommitment method to compute the hash.)
    //
    // This method returns a sequence number. The user should pass this sequence number to
    // their chosen provider (the exact method for doing so will depend on the provider) to retrieve the provider's
    // number. The user should then call fulfillRequest to construct the final random number.
    //
    // This method will revert unless the caller provides a sufficient fee (at least getFee(provider)) as msg.value.
    // Note that excess value is *not* refunded to the caller.
    function request(
        address provider,
        bytes32 userCommitment,
        bool useBlockHash
    ) external payable returns (uint64 assignedSequenceNumber);

    // Request a random number. The method expects the provider address and a secret random number
    // in the arguments. It returns a sequence number.
    //
    // The address calling this function should be a contract that inherits from the IEntropyConsumer interface.
    // The `entropyCallback` method on that interface will receive a callback with the generated random number.
    //
    // This method will revert unless the caller provides a sufficient fee (at least getFee(provider)) as msg.value.
    // Note that excess value is *not* refunded to the caller.
    function requestWithCallback(
        address provider,
        bytes32 userRandomNumber
    ) external payable returns (uint64 assignedSequenceNumber);

    // Fulfill a request for a random number. This method validates the provided userRandomness and provider's proof
    // against the corresponding commitments in the in-flight request. If both values are validated, this function returns
    // the corresponding random number.
    //
    // Note that this function can only be called once per in-flight request. Calling this function deletes the stored
    // request information (so that the contract doesn't use a linear amount of storage in the number of requests).
    // If you need to use the returned random number more than once, you are responsible for storing it.
    function reveal(
        address provider,
        uint64 sequenceNumber,
        bytes32 userRevelation,
        bytes32 providerRevelation
    ) external returns (bytes32 randomNumber);

    // Fulfill a request for a random number. This method validates the provided userRandomness
    // and provider's revelation against the corresponding commitment in the in-flight request. If both values are validated
    // and the requestor address is a contract address, this function calls the requester's entropyCallback method with the
    // sequence number, provider address and the random number as arguments. Else if the requestor is an EOA, it won't call it.
    //
    // Note that this function can only be called once per in-flight request. Calling this function deletes the stored
    // request information (so that the contract doesn't use a linear amount of storage in the number of requests).
    // If you need to use the returned random number more than once, you are responsible for storing it.
    //
    // Anyone can call this method to fulfill a request, but the callback will only be made to the original requester.
    function revealWithCallback(
        address provider,
        uint64 sequenceNumber,
        bytes32 userRandomNumber,
        bytes32 providerRevelation
    ) external;

    function getProviderInfo(
        address provider
    ) external view returns (EntropyStructs.ProviderInfo memory info);

    function getDefaultProvider() external view returns (address provider);

    function getRequest(
        address provider,
        uint64 sequenceNumber
    ) external view returns (EntropyStructs.Request memory req);

    function getFee(address provider) external view returns (uint128 feeAmount);

    function getAccruedPythFees()
        external
        view
        returns (uint128 accruedPythFeesInWei);

    function setProviderFee(uint128 newFeeInWei) external;

    function setProviderUri(bytes calldata newUri) external;

    function constructUserCommitment(
        bytes32 userRandomness
    ) external pure returns (bytes32 userCommitment);

    function combineRandomValues(
        bytes32 userRandomness,
        bytes32 providerRandomness,
        bytes32 blockHash
    ) external pure returns (bytes32 combinedRandomness);
}



abstract contract IEntropyConsumer {
    // This method is called by Entropy to provide the random number to the consumer.
    // It asserts that the msg.sender is the Entropy contract. It is not meant to be
    // override by the consumer.
    function _entropyCallback(
        uint64 sequence,
        address provider,
        bytes32 randomNumber
    ) external {
        address entropy = getEntropy();
        require(entropy != address(0), "Entropy address not set");
        require(msg.sender == entropy, "Only Entropy can call this function");

        entropyCallback(sequence, provider, randomNumber);
    }

    // getEntropy returns Entropy contract address. The method is being used to check that the
    // callback is indeed from Entropy contract. The consumer is expected to implement this method.
    // Entropy address can be found here - https://docs.pyth.network/entropy/contract-addresses
    function getEntropy() internal view virtual returns (address);

    // This method is expected to be implemented by the consumer to handle the random number.
    // It will be called by _entropyCallback after _entropyCallback ensures that the call is
    // indeed from Entropy contract.
    function entropyCallback(
        uint64 sequence,
        address provider,
        bytes32 randomNumber
    ) internal virtual;
}

library CoinFlipErrors {
    error IncorrectSender();
    error InsufficientFee();
    error InvalidBetAmount();
    error InvalidBetChoice();
}

contract CoinFlip is IEntropyConsumer {
    event FlipRequest(uint64 sequenceNumber, address indexed player, bool betOnHeads, uint256 betAmount);
    event FlipResult(uint64 sequenceNumber, address indexed player, bool betOnHeads, bool isHeads, uint256 payout);

    IEntropy private entropy;
    address private entropyProvider;

    struct Bet {
        address player;
        bool betOnHeads;
        uint256 betAmount;
    }

    mapping(uint64 => Bet) public bets;

    constructor(address _entropy, address _entropyProvider) {
        entropy = IEntropy(_entropy);
        entropyProvider = _entropyProvider;
    }

    function requestFlip(bytes32 userRandomNumber, bool betOnHeads) external payable {
        uint256 fee = entropy.getFee(entropyProvider);
        if (msg.value < fee) {
            revert CoinFlipErrors.InsufficientFee();
        }

        if (msg.value <= fee) {
            revert CoinFlipErrors.InvalidBetAmount();
        }

        uint256 betAmount = msg.value - fee;

        if (betOnHeads != true && betOnHeads != false) {
            revert CoinFlipErrors.InvalidBetChoice();
        }

        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(
            entropyProvider,
            userRandomNumber
        );

        bets[sequenceNumber] = Bet({
            player: msg.sender,
            betOnHeads: betOnHeads,
            betAmount: betAmount
        });

        emit FlipRequest(sequenceNumber, msg.sender, betOnHeads, betAmount);
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address,
        bytes32 randomNumber
    ) internal override {
        Bet memory bet = bets[sequenceNumber];
        bool isHeads = uint256(randomNumber) % 2 == 0;

        uint256 payout = 0;
        if (isHeads == bet.betOnHeads) {
            payout = bet.betAmount * 2;
            payable(bet.player).transfer(payout);
        }

        emit FlipResult(sequenceNumber, bet.player, bet.betOnHeads, isHeads, payout);

        delete bets[sequenceNumber];
    }

    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    receive() external payable {}
}
// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)


/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol


// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)



/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: @openzeppelin/contracts/security/ReentrancyGuard.sol


// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)


/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}

// File: beraflip/VaultContract.sol





abstract contract BaseGameContract is ReentrancyGuard, IEntropyConsumer, Ownable {
    struct Game {
        uint8 count;
        address player;
        bytes gameData;
        uint256 wager;
        uint256 startTime;
        address token;
    }

    event GameStarted(
        address indexed player, 
        uint256 wager, 
        uint8 count, 
        address indexed token);
    event GameResult(
        address indexed player,
        uint256 payout,
        bytes32 indexed randomNumber,
        uint8 wonCount,
        uint8 totalCount,
        address indexed token
    );

    IEntropy public entropy;
    address public entropyProvider;
    VaultContract public vault;

    mapping(uint64 => Game) public games;

    modifier onlyWhitelistedGames() {
        require(isWhitelistedGame(msg.sender), "Not a whitelisted game");
        _;
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address,
        bytes32 randomNumber
    ) internal override {
        Game memory game = games[sequenceNumber];
        handleGameResult(game, randomNumber);
        delete games[sequenceNumber];
    }

    function handleGameResult(Game memory game, bytes32 randomNumber) internal virtual;
    function isWhitelistedGame(address game) internal view virtual returns (bool);
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    receive() external payable {}
}

contract CFlip3 is BaseGameContract {
    uint256 public houseEdge;

    modifier maxPayoutNotExceeded(uint256 wager, uint8 count, address token) {
        require(calculatePayout(wager, count) <= vault.getBalance(token), "Max payout exceeded");
        _;
    }

    constructor(address vaultAddress, address entropyAddress, address entropyProviderAddress) 
        Ownable(msg.sender) 
    {
        vault = VaultContract(vaultAddress);
        entropy = IEntropy(entropyAddress);
        entropyProvider = entropyProviderAddress;
    }

    struct GameParams {
        uint8 count;
        uint256 stopGain;
        uint256 stopLoss;
        bool betOnHeads;
        uint256 wager;
        address token;
        bytes32 userRandomNumber;
    }
        
    struct GameData {
        uint256 stopGain;
        uint256 stopLoss;
        bool betOnHeads;
    }

    function decodeGameData(bytes memory data) internal pure returns (GameData memory) {
        (uint256 stopGain, uint256 stopLoss, bool betOnHeads) = abi.decode(data, (uint256, uint256, bool));
        return GameData(stopGain, stopLoss, betOnHeads);
    }

    function startGame(GameParams memory params) 
        external payable maxPayoutNotExceeded(params.wager, params.count, params.token) nonReentrant 
    {
        uint256 fee = entropy.getFee(entropyProvider);
        uint256 totalWager = params.wager * params.count;
        require(msg.value >= fee, "Insufficient fee");

        handleDeposit(params.token, msg.value, fee, totalWager);

        bytes memory gameData = abi.encode(params.stopGain, params.stopLoss, params.betOnHeads);

        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(entropyProvider, params.userRandomNumber);

        games[sequenceNumber] = Game({
            count: params.count,
            player: msg.sender,
            gameData: gameData,
            wager: params.wager,
            startTime: block.timestamp,
            token: params.token
        });

        emit GameStarted(msg.sender, params.wager, params.count, params.token);
    }

    function handleDeposit(address token, uint256 msgValue, uint256 fee, uint256 totalWager) internal {
        if (token == address(0)) {
            require(msgValue > fee, "Bet amount too low");
            vault.deposit{value: msgValue - fee}(address(0), msgValue - fee);
        } else {
            IERC20 tokenContract = IERC20(token);
            uint256 allowance = tokenContract.allowance(msg.sender, address(this));
            require(allowance >= totalWager, "Allowance too low");
            require(tokenContract.transferFrom(msg.sender, address(vault), totalWager), "Token transfer failed");
            vault.deposit(token, totalWager);
        }
    }

    function handleGameResult(Game memory game, bytes32 randomNumber) internal override {
        GameData memory gameSettings = decodeGameData(game.gameData);

        uint256 totalPayout = 0;
        uint256 stopGainCounter = 0;
        uint256 stopLossCounter = 0;
        uint8 wonCount = 0;
        uint8 playedCount = 0;

        for (uint8 i = 0; i < game.count; i++) {
            bool won = (uint256(randomNumber) % 2 == 0) == gameSettings.betOnHeads;

            uint256 payout = 0;
            if (won) {
                payout = calculatePayout(game.wager, 1);
                totalPayout += payout;
                stopGainCounter += payout;
                wonCount++;
            } else {
                stopLossCounter += game.wager;
            }

            playedCount++;

            if ((gameSettings.stopGain > 0 && stopGainCounter >= gameSettings.stopGain * game.wager / 100) ||
                (gameSettings.stopLoss > 0 && stopLossCounter >= gameSettings.stopLoss * game.wager / 100)) {
                break;
            }

            randomNumber >>= 1;
        }

        uint256 unplayedWager = game.wager * (game.count - playedCount);
        uint256 totalRefund = totalPayout + unplayedWager;

        if (totalRefund > 0) {
            vault.requestPayout(game.player, totalRefund, game.token);
        }

        emit GameResult(game.player, totalRefund, randomNumber, wonCount, playedCount, game.token);
    }

    function setHouseEdge(uint256 newEdge) external onlyOwner {
        houseEdge = newEdge;
    }

    function calculatePayout(uint256 wager, uint8 count) internal view returns (uint256) {
        return wager * count * 2 * (100 - houseEdge) / 100;
    }

    function isWhitelistedGame(address game) internal view override returns (bool) {
        return vault.whitelistedGames(game);
    }
}

abstract contract VaultContract is ReentrancyGuard, Ownable {
    mapping(address => bool) public whitelistedGames;
    mapping(address => bool) public blacklistedAddresses;
    mapping(address => uint256) public tokenBalances;
    uint256 public houseEdge;
    bool public withdrawalsFrozen;

    event Deposit(address indexed user, uint256 amount, address token);
    event Payout(address indexed user, uint256 amount, address token);
    event Blacklisted(address indexed user);
    event Whitelisted(address indexed game);
    event RemovedFromBlacklist(address indexed user);
    event RemovedFromWhitelist(address indexed game);
    event WithdrawalsFrozen();
    event WithdrawalsUnfrozen();

    modifier onlyWhitelistedGames() {
        require(whitelistedGames[msg.sender], "Not a whitelisted game");
        _;
    }

    modifier notBlacklisted(address user) {
        require(!blacklistedAddresses[user], "Blacklisted");
        _;
    }

     constructor(address initialOwner) Ownable(initialOwner) {}

    function deposit(address token, uint256 amount) external payable nonReentrant {
        if (token == address(0)) {
            require(msg.value == amount, "Invalid ETH amount");
            tokenBalances[address(0)] += msg.value;
        } else {
            require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Transfer failed");
            tokenBalances[token] += amount;
        }
        emit Deposit(msg.sender, amount, token);
    }

    function requestPayout(address user, uint256 amount, address token) external onlyWhitelistedGames nonReentrant {
        require(tokenBalances[token] >= amount, "Insufficient balance");
        if (token == address(0)) {
            payable(user).transfer(amount);
        } else {
            require(IERC20(token).transfer(user, amount), "Transfer failed");
        }
        tokenBalances[token] -= amount;
        emit Payout(user, amount, token);
    }

    function withdraw(uint256 amount, address token) external onlyOwner nonReentrant {
        require(!withdrawalsFrozen, "Withdrawals are frozen");
        require(tokenBalances[token] >= amount, "Insufficient balance");
        if (token == address(0)) {
            payable(owner()).transfer(amount);
        } else {
            require(IERC20(token).transfer(owner(), amount), "Transfer failed");
        }
        tokenBalances[token] -= amount;
    }

    function setHouseEdge(uint256 newEdge) external onlyOwner {
        houseEdge = newEdge;
    }

    function blacklistAddress(address user) external onlyOwner {
        blacklistedAddresses[user] = true;
        emit Blacklisted(user);
    }

    function whitelistGame(address game) external onlyOwner {
        whitelistedGames[game] = true;
        emit Whitelisted(game);
    }

    function removeFromBlacklist(address user) external onlyOwner {
        blacklistedAddresses[user] = false;
        emit RemovedFromBlacklist(user);
    }

    function removeFromWhitelist(address game) external onlyOwner {
        whitelistedGames[game] = false;
        emit RemovedFromWhitelist(game);
    }

    function freezeWithdrawals() external onlyOwner {
        withdrawalsFrozen = true;
        emit WithdrawalsFrozen();
    }

    function unfreezeWithdrawals() external onlyOwner {
        withdrawalsFrozen = false;
        emit WithdrawalsUnfrozen();
    }

    function getBalance(address token) external view returns (uint256) {
        return tokenBalances[token];
    }
}