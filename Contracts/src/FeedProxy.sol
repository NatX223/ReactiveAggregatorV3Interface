// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
contract FeedProxy is AbstractCallback {

    address public aggregatorAddress;
    int256 public answer;
    string public description_;
    uint80 public roundId;
    uint256 public decimals_;
    uint256 public startedAt;
    uint256 public updatedAt;
    uint256 public version;

    event feedReceived(uint80 roundId, int256 answer);

    constructor(address _service) AbstractCallback(_service) payable {

    }

    // ========== CALLBACK ENTRY ==========
    function callback(address sender, address _aggregatorAddress, int256 _answer, string memory _description, uint80 _roundId, uint256 _decimals, uint256 _startedAt, uint256 _updatedAt, uint256 _version) external authorizedSenderOnly rvmIdOnly(sender) {

        aggregatorAddress = _aggregatorAddress;
        answer = _answer;
        description_ = _description;
        roundId = _roundId;
        decimals_ = _decimals;
        startedAt = _startedAt;
        updatedAt = _updatedAt;
        version = _version;

        emit feedReceived(roundId, answer);
    }

    // ========== AGGREGATORV3 COMPAT ==========
    function decimals() external view returns (uint8) {
        return uint8(decimals_);
    }

    function description() external view returns (string memory) {
        return description_;
    }

    function latestRoundData()
        external
        view
        returns (
            uint80,
            int256,
            uint256,
            uint256,
            uint80
        )
    {
        return (
            roundId,
            answer,
            startedAt,
            updatedAt,
            roundId
        );
    }
}
