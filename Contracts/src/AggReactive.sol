// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../lib/reactive-lib/src/interfaces/IReactive.sol';

contract AggReactive is IReactive, AbstractPausableReactive {

    uint64 private constant GAS_LIMIT = 1000000;
    address public chainService;
    uint256 private chainId;
    uint256 private eventTopic0;
    
    address public feedReader;
    address public priceFeedAggregator;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _feedReader, address _priceFeedAggregator, uint256 _eventTopic0, uint256 _chainId, address _service) payable {
        feedReader = _feedReader;
        priceFeedAggregator = _priceFeedAggregator;
        chainService = _service;
        eventTopic0 = _eventTopic0;
        chainId = _chainId;
        service = ISystemContract(payable(_service));
        if (!vm) {
            service.subscribe(_chainId, _priceFeedAggregator, _eventTopic0, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
        }
    }

    function getPausableSubscriptions() internal view override returns (Subscription[] memory) {
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

    function react(LogRecord calldata log) external vmOnly {
        // address recipient = address(uint160(log.topic_1));

        bytes memory payload = abi.encodeWithSignature(
            "callback(address)",
            address(0)
        );

        emit Callback(
        chainId,
        feedReader,
        GAS_LIMIT,
        payload
    );
    }

    receive() external payable override(AbstractPayer, IPayer) {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}