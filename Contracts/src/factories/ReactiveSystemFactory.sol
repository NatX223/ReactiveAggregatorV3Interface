// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AggReactive.sol";
import "../FeedProxy.sol";
import "../ReactiveProxy.sol";

/**
 * @title ReactiveSystemFactory
 * @dev Factory contract to deploy the complete reactive system on Lasna
 */
contract ReactiveSystemFactory {
    event SystemDeployed(
        address indexed aggReactive,
        address indexed feedProxy,
        address indexed reactiveProxy,
        address deployer,
        uint256 timestamp
    );

    struct SystemDeployment {
        address aggReactive;
        address feedProxy;
        address reactiveProxy;
        address feedReader;
        address priceFeedAggregator;
        uint256 sourceChainId;
        address deployer;
        uint256 timestamp;
        bool exists;
    }

    mapping(address => SystemDeployment) public deploymentsByAggReactive;
    mapping(address => SystemDeployment) public deploymentsByFeedProxy;
    address[] public allSystems;

    address public immutable SERVICE_ADDRESS;
    uint256 public constant ANSWER_UPDATED_EVENT = 0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f;
    uint256 public constant FEED_READ_EVENT = 0x211b0a6d1ea05edd12db159c3307872cdca106fc791b06a6baad5e124f39070e;
    uint256 public constant LASNA_CHAIN_ID = 5318007;

    constructor(address _serviceAddress) {
        require(_serviceAddress != address(0), "Invalid service address");
        SERVICE_ADDRESS = _serviceAddress;
    }

    /**
     * @dev Deploy complete reactive system
     * @param feedReader The FeedReader contract address on source chain
     * @param priceFeedAggregator The Chainlink aggregator address on source chain
     * @param sourceChainId The source chain ID (e.g., Sepolia = 11155111)
     * @return aggReactive The deployed AggReactive contract address
     * @return feedProxy The deployed FeedProxy contract address
     * @return reactiveProxy The deployed ReactiveProxy contract address
     */
    function deploySystem(
        address feedReader,
        address priceFeedAggregator,
        uint256 sourceChainId
    ) external payable returns (
        address aggReactive,
        address feedProxy,
        address reactiveProxy
    ) {
        require(feedReader != address(0), "Invalid feedReader address");
        require(priceFeedAggregator != address(0), "Invalid aggregator address");
        require(sourceChainId != 0, "Invalid source chain ID");
        require(msg.value >= 3 ether, "Insufficient deployment fee (need 3 REACT)");

        // Deploy FeedProxy first
        FeedProxy newFeedProxy = new FeedProxy{value: 1 ether}(SERVICE_ADDRESS);
        feedProxy = address(newFeedProxy);

        // Deploy AggReactive
        AggReactive newAggReactive = new AggReactive{value: 1 ether}(
            feedReader,
            priceFeedAggregator,
            ANSWER_UPDATED_EVENT,
            sourceChainId,
            SERVICE_ADDRESS
        );
        aggReactive = address(newAggReactive);

        // Deploy ReactiveProxy
        ReactiveProxy newReactiveProxy = new ReactiveProxy{value: 1 ether}(
            feedProxy,
            feedReader,
            FEED_READ_EVENT,
            sourceChainId,
            LASNA_CHAIN_ID,
            SERVICE_ADDRESS
        );
        reactiveProxy = address(newReactiveProxy);

        // Store deployment info
        SystemDeployment memory deployment = SystemDeployment({
            aggReactive: aggReactive,
            feedProxy: feedProxy,
            reactiveProxy: reactiveProxy,
            feedReader: feedReader,
            priceFeedAggregator: priceFeedAggregator,
            sourceChainId: sourceChainId,
            deployer: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        deploymentsByAggReactive[aggReactive] = deployment;
        deploymentsByFeedProxy[feedProxy] = deployment;
        allSystems.push(aggReactive);

        emit SystemDeployed(
            aggReactive,
            feedProxy,
            reactiveProxy,
            msg.sender,
            block.timestamp
        );

        return (aggReactive, feedProxy, reactiveProxy);
    }

    /**
     * @dev Get system deployment info by AggReactive address
     * @param aggReactive The AggReactive contract address
     * @return deployment The system deployment information
     */
    function getSystemByAggReactive(address aggReactive) 
        external 
        view 
        returns (SystemDeployment memory deployment) 
    {
        return deploymentsByAggReactive[aggReactive];
    }

    /**
     * @dev Get system deployment info by FeedProxy address
     * @param feedProxy The FeedProxy contract address
     * @return deployment The system deployment information
     */
    function getSystemByFeedProxy(address feedProxy) 
        external 
        view 
        returns (SystemDeployment memory deployment) 
    {
        return deploymentsByFeedProxy[feedProxy];
    }

    /**
     * @dev Get all deployed systems
     * @return systems Array of all AggReactive addresses (system identifiers)
     */
    function getAllSystems() external view returns (address[] memory systems) {
        return allSystems;
    }

    /**
     * @dev Get deployment count
     * @return count Number of deployed systems
     */
    function getSystemCount() external view returns (uint256 count) {
        return allSystems.length;
    }

    /**
     * @dev Emergency function to withdraw stuck funds
     */
    function emergencyWithdraw() external {
        require(msg.sender == tx.origin, "Only EOA can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}