// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Bankroll {
    address public owner;
    address public commonContractAddress;

    event PayoutTransferred(address indexed player, uint256 amount);
    event WagerReceived(address indexed from, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyCommon() {
        require(msg.sender == commonContractAddress, "Unauthorized: caller is not the Common contract");
        _;
    }

    // Функция для установки адреса контракта Common
    function setCommonContractAddress(address _common) public onlyOwner {
        commonContractAddress = _common;
    }

    function transferPayout(address payable player, uint256 payout) external onlyCommon {
        require(address(this).balance >= payout, "Insufficient funds");
        (bool success, ) = player.call{value: payout}("");
        require(success, "Failed to transfer payout");
        emit PayoutTransferred(player, payout);
    }

    function transferWager(uint256 wager) external payable {
        emit WagerReceived(msg.sender, wager);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
