// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
contract FeedProxy is AbstractCallback {
    struct FeedData {
        address aggregatorAddress;
        int256 answer;
        string description;
        uint80 roundId;
        uint256 decimals;
        uint256 startedAt;
        uint256 updatedAt;
        uint256 version;
    }

    event feedReceived(uint80 roundId, int256 answer);

    FeedData public latestFeedData;

    constructor(address _service) AbstractCallback(_service) payable {

    }

    // ========== CALLBACK ENTRY ==========
    function callback(address sender, FeedData calldata data) external authorizedSenderOnly rvmIdOnly(sender) {
        latestFeedData = data;
    }

    // ========== AGGREGATORV3 COMPAT ==========
    function decimals() external view returns (uint8) {
        return uint8(latestFeedData.decimals);
    }

    function description() external view returns (string memory) {
        return latestFeedData.description;
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            latestFeedData.roundId,
            latestFeedData.answer,
            latestFeedData.startedAt,
            latestFeedData.updatedAt,
            latestFeedData.roundId
        );
    }
}
