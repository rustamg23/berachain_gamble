// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Common.sol";
import "./ReentrancyGuard.sol";
import "./IBankRoll.sol";

contract Dice is ReentrancyGuard {
    Common public common;
    address bankrollAddress;
    uint256 public constant MIN_MULTIPLIER = 10421;
    uint256 public constant MAX_MULTIPLIER = 9900000;

    event DicePlayed(address indexed player, uint256 wager, bool isOver, uint32 multiplier, bool win, uint256 payout);
    error MismatchedWagerAmount();
    error MultiplierOutOfBounds();
    error WagerExceedsMaxAllowed();

    constructor(address _common, address _bankrollAddress) {
        common = Common(_common);
        bankrollAddress = _bankrollAddress;
    }

    function playDice(uint256 wager, bool isOver, uint32 multiplier) external payable nonReentrant{
        if (msg.value != wager) revert MismatchedWagerAmount();
        if (multiplier < MIN_MULTIPLIER || multiplier > MAX_MULTIPLIER) revert MultiplierOutOfBounds();
        if (!kellyWager(wager, multiplier)) revert WagerExceedsMaxAllowed();

        common.transferWager(wager);

        // Игровая логика, определение выигрыша
        bool win = resolveDice(isOver, multiplier);
        uint256 payout = win ? wager * multiplier / 10000 : 0;

        if (win) {
            common.transferPayout(payable(msg.sender), payout);
        }

        emit DicePlayed(msg.sender, wager, isOver, multiplier, win, payout);
    }

    function resolveDice(bool isOver, uint32 multiplier) internal view returns (bool) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 10000;
        uint256 winThreshold = 9900 / multiplier;
        return isOver ? randomNumber > winThreshold : randomNumber < winThreshold;
    }

    function kellyWager(uint256 wager, uint32 multiplier) internal view returns (bool) {
        uint256 maxWager = IBankRoll(bankrollAddress).getBalance() * 10000 / multiplier;
        return wager <= maxWager;
    }

}
