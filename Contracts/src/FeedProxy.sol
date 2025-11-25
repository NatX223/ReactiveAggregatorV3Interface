// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
contract FeedProxy is AbstractCallback {

    /* Address of the source price feed aggregator contract */
    address public aggregatorAddress;
    
    /* Latest price answer received from the feed (with decimal precision) */
    int256 public answer;
    
    /* Human-readable description of the price pair (e.g., "ETH/USD") */
    string public description_;
    
    /* Unique identifier for the latest price update round */
    uint80 public roundId;
    
    /* Number of decimal places used in the price representation */
    uint256 public decimals_;
    
    /* Timestamp when the current price round was initiated */
    uint256 public startedAt;
    
    /* Timestamp when the price was last updated */
    uint256 public updatedAt;
    
    /* Version number of the source aggregator contract */
    uint256 public version;

    /*
     * Event emitted when new price feed data is received and stored
     * @param roundId The round identifier for the price update
     * @param answer The updated price value
     */
    event feedReceived(uint80 roundId, int256 answer);

    /*
     * Initializes the FeedProxy contract with the reactive system service.
     * Sets up the contract to receive callbacks containing price feed data.
     * @param _service Address of the reactive system service for callback management
     */
    constructor(address _service) AbstractCallback(_service) payable {

    }

    /*
     * Callback function that receives and stores price feed data from the reactive system.
     * Updates all internal state variables with the latest feed information.
     * @param sender Address of the contract that initiated the callback (must be authorized)
     * @param _aggregatorAddress Address of the source price feed aggregator
     * @param _answer Latest price answer from the feed
     * @param _description Human-readable description of the price pair
     * @param _roundId Unique identifier for this price update round
     * @param _decimals Number of decimal places in the price answer
     * @param _startedAt Timestamp when the price round was initiated
     * @param _updatedAt Timestamp when the price was last updated
     * @param _version Version number of the source aggregator contract
     */
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

    /*
     * Returns the number of decimal places used in the price representation.
     * Provides compatibility with the AggregatorV3Interface standard.
     * @return Number of decimals as uint8
     */
    function decimals() external view returns (uint8) {
        return uint8(decimals_);
    }

    /*
     * Returns the human-readable description of the price feed.
     * Provides compatibility with the AggregatorV3Interface standard.
     * @return Description string of the price pair
     */
    function description() external view returns (string memory) {
        return description_;
    }

    /*
     * Returns the latest round data in AggregatorV3Interface compatible format.
     * Provides the most recent price information received via callbacks.
     * @return roundId The latest round identifier
     * @return answer The current price answer
     * @return startedAt Timestamp when the round started
     * @return updatedAt Timestamp when the price was last updated
     * @return answeredInRound The round ID when the answer was computed (same as roundId)
     */
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
