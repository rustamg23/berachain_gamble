// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ReentrancyGuard.sol";
import "./IBankRoll.sol";

contract Common is ReentrancyGuard {
    address public bankrollAddress;
    address public owner;
    mapping(address => bool) public approvedGames;
    mapping(address => bool) public suspendedPlayers;

    error WagerCannotBeZero();
    error GameNotApproved();
    error PlayerSuspendedError();
    error InsufficientFundsForPayout();

    event GameAdded(address game);
    event GameRemoved(address game);
    event PlayerSuspended(address player);
    event PlayerReinstated(address player);
    event WagerTransferred(address from, uint256 amount);
    event PayoutTransferred(address to, uint256 amount);

    constructor(address _bankroll) {
        bankrollAddress = _bankroll;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function transferWager(uint256 wager) external {
        if (wager == 0) revert WagerCannotBeZero();
        if (!approvedGames[msg.sender]) revert GameNotApproved();
        IBankRoll bankroll = IBankRoll(bankrollAddress);
        bankroll.transferWager{value: wager}(wager);
        emit WagerTransferred(msg.sender, wager);
    }

    function transferPayout(address payable player, uint256 payout) external {
        IBankRoll bankroll = IBankRoll(bankrollAddress);
        if (suspendedPlayers[player]) revert PlayerSuspendedError();
        if (!approvedGames[msg.sender]) revert GameNotApproved();
        if (bankroll.getBalance() < payout) revert InsufficientFundsForPayout();
        bankroll.transferPayout(player, payout);
        emit PayoutTransferred(player, payout);
    }

    function addGame(address game) public onlyOwner {
        approvedGames[game] = true;
        emit GameAdded(game);
    }

    function removeGame(address game) public onlyOwner {
        approvedGames[game] = false;
        emit GameRemoved(game);
    }

    function suspendPlayer(address player) public onlyOwner {
        suspendedPlayers[player] = true;
        emit PlayerSuspended(player);
    }

    function reinstatePlayer(address player) public onlyOwner {
        suspendedPlayers[player] = false;
        emit PlayerReinstated(player);
    }
}
