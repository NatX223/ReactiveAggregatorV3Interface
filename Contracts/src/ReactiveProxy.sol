// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/reactive-lib/src/interfaces/ISystemContract.sol";
import "../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol";
import "../lib/reactive-lib/src/interfaces/IReactive.sol";

contract ReactiveProxy is IReactive, AbstractPausableReactive {
    /* Maximum gas limit allocated for callback execution to prevent out-of-gas errors */
    uint64 private constant GAS_LIMIT = 1000000;

    /* Address of the reactive system service contract that manages subscriptions */
    address public chainService;

    /* Blockchain network identifier where the feed reader contract is deployed */
    uint256 private chainId;

    /* Event topic hash used to filter and subscribe to specific events (e.g., AnswerUpdated) */
    uint256 private eventTopic0;

    /* Address of the FeedProxy contract that will receive processed feed data via callbacks */
    address public feedProxy;

    /* Address of the FeedReader contract that emits price feed events to monitor */
    address public feedReader;

    /*
     * Event emitted when the contract receives Ether payments
     * @param origin The original transaction initiator (tx.origin)
     * @param sender The direct sender of the transaction (msg.sender)
     * @param value The amount of Ether received in wei
     */
    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    /*
     * Initializes the ReactiveProxy contract with required addresses and configuration.
     * Sets up the subscription to listen for events from the feed reader on the specified chain.
     * @param _feedProxy Address of the FeedProxy contract that will receive callbacks
     * @param _feedReader Address of the FeedReader contract to monitor for events
     * @param _eventTopic0 The event topic hash to subscribe to (typically AnswerUpdated event)
     * @param _chainId The blockchain network ID where the feed reader is deployed
     * @param _service Address of the reactive system service contract
     */
    constructor(
        address _feedProxy,
        address _feedReader,
        uint256 _eventTopic0,
        uint256 _chainId,
        address _service
    ) payable {
        feedProxy = _feedProxy;
        feedReader = _feedReader;
        chainService = _service;
        eventTopic0 = _eventTopic0;
        chainId = _chainId;
        service = ISystemContract(payable(_service));
        if (!vm) {
            service.subscribe(
                _chainId,
                _feedReader,
                _eventTopic0,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE
            );
        }
    }

    /*
     * Returns the list of event subscriptions that can be paused/unpaused.
     * This function is required by the AbstractPausableReactive contract.
     * @return Array of Subscription structs containing the subscription details
     */
    function getPausableSubscriptions()
        internal
        view
        override
        returns (Subscription[] memory)
    {
        Subscription[] memory result = new Subscription[](1);
        result[0] = Subscription(
            chainId,
            address(chainService),
            eventTopic0,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );
        return result;
    }

    /*
     * Processes incoming log events from the subscribed feed reader contract.
     * Extracts price feed data from the log and forwards it to the feed proxy via callback.
     * This function is called automatically by the reactive system when monitored events occur.
     * @param log The log record containing the event data from the feed reader
     */
    function react(LogRecord calldata log) external vmOnly {
        address aggregatorAddress = address(uint160(log.topic_1));
        int256 answer = int256(log.topic_2);

        (
            string memory description,
            uint80 roundId,
            uint256 decimals,
            uint256 startedAt,
            uint256 updatedAt,
            uint256 version
        ) = abi.decode(
                log.data,
                (string, uint80, uint256, uint256, uint256, uint256)
            );

        bytes memory payload = abi.encodeWithSignature(
            "callback(address,address,int256,string,uint80,uint256,uint256,uint256,uint256)",
            address(0),
            aggregatorAddress,
            answer,
            description,
            roundId,
            decimals,
            startedAt,
            updatedAt,
            version
        );

        emit Callback(chainId, feedProxy, GAS_LIMIT, payload);
    }

    /*
     * Handles incoming Ether payments to the contract.
     * Emits a Received event to log the transaction details.
     * This function allows the contract to receive ETH for gas payments and operations.
     */
    receive() external payable override(AbstractPayer, IPayer) {
        emit Received(tx.origin, msg.sender, msg.value);
    }
}
