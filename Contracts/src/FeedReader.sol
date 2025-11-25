// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../lib/reactive-lib/src/abstract-base/AbstractCallback.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FeedReader is AbstractCallback {
    /* Interface instance for interacting with the Chainlink price feed aggregator */
    AggregatorV3Interface internal dataFeed;

    /* Address of the price feed aggregator contract being monitored */
    address public aggregatorAddress;

    /*
     * Event emitted when price feed data is successfully read and processed
     * @param aggregatorAddress Address of the price feed aggregator
     * @param answer The latest price answer from the feed
     * @param description Human-readable description of the price pair
     * @param roundId Unique identifier for the price update round
     * @param decimals Number of decimal places in the price answer
     * @param startedAt Timestamp when the price round was initiated
     * @param updatedAt Timestamp when the price was last updated
     * @param version Version number of the aggregator contract
     */
    event feedRead(
        address indexed aggregatorAddress,
        int256 indexed answer,
        string indexed description,
        uint80 roundId,
        uint256 decimals,
        uint256 startedAt,
        uint256 updatedAt,
        uint256 version
    );

    /*
     * Initializes the FeedReader with a specific price feed aggregator to monitor.
     * Sets up the connection to both the aggregator and the reactive system service.
     * @param _aggregatorAddress Address of the Chainlink-compatible price feed aggregator
     * @param _service Address of the reactive system service for callback management
     */
    constructor(
        address _aggregatorAddress,
        address _service
    ) payable AbstractCallback(_service) {
        aggregatorAddress = _aggregatorAddress;
        dataFeed = AggregatorV3Interface(_aggregatorAddress);
    }

    /*
     * Callback function triggered by the reactive system when monitored events occur.
     * Reads the latest price data from the aggregator and emits a feedRead event.
     * @param sender Address of the contract that initiated the callback (must be authorized)
     */
    function callback(
        address sender
    ) external authorizedSenderOnly rvmIdOnly(sender) {
        (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,

        ) = dataFeed.latestRoundData();
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
