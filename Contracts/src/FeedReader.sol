// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FeedReader is AbstractCallback {
  AggregatorV3Interface internal dataFeed;
  address public aggregatorAddress;

  event feedRead(
    address indexed aggregatorAddress,
    int256 indexed answer,
    string description,
    uint80 roundId,
    uint256 decimals,
    uint256 startedAt,
    uint256 updatedAt,
    uint256 version 
  );

  /**
   * Network: Sepolia
   * Aggregator: BTC/USD
   * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
   */
  constructor(address _aggregatorAddress, address _service) AbstractCallback(_service) payable {
    aggregatorAddress = _aggregatorAddress;
    dataFeed = AggregatorV3Interface(_aggregatorAddress);
  }

  function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
    (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, ) = dataFeed.latestRoundData();
    emit feedRead(
      aggregatorAddress,
      answer,
      dataFeed.description(),
      roundId,
      dataFeed.decimals(),
      startedAt,
      updatedAt,
      dataFeed.version()
    );
  }

}
