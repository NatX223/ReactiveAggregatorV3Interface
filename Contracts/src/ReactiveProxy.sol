// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../lib/reactive-lib/src/interfaces/IReactive.sol';

contract ReactiveProxy is IReactive, AbstractPausableReactive {

    uint64 private constant GAS_LIMIT = 1000000;
    address public chainService;
    uint256 private chainId;
    uint256 private eventTopic0;
    
    address public feedProxy;
    address public feedReader;

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

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _feedProxy, address _feedReader, uint256 _eventTopic0, uint256 _chainId, address _service) payable {
        feedProxy = _feedProxy;
        feedReader = _feedReader;
        chainService = _service;
        eventTopic0 = _eventTopic0;
        chainId = _chainId;
        service = ISystemContract(payable(_service));
        if (!vm) {
            service.subscribe(_chainId, _feedReader, _eventTopic0, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
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
            (string,uint80,uint256,uint256,uint256,uint256)
        );

        FeedData memory fd = FeedData({
            aggregatorAddress: aggregatorAddress,
            answer: answer,
            description: description,
            roundId: roundId,
            decimals: decimals,
            startedAt: startedAt,
            updatedAt: updatedAt,
            version: version
        });

        bytes memory payload = abi.encodeWithSignature(
            "callback(address,(address,int256,string,uint256,uint256,uint256,uint256,uint256))",
            address(0),
            fd
        );

        emit Callback(
            chainId,
            feedProxy,
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