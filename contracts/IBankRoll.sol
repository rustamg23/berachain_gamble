// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IBankRoll {
    // Метод для установки адреса контракта Common
    function setCommonContractAddress(address _common) external;

    // Метод для перевода выплаты игроку, вызывается только из контракта Common
    function transferPayout(address payable player, uint256 payout) external;

    // Метод для приема ставки, которая может быть вызвана из внешнего контракта
    function transferWager(uint256 wager) external payable;

    // Метод для получения текущего баланса контракта Bankroll
    function getBalance() external view returns (uint256);
}
