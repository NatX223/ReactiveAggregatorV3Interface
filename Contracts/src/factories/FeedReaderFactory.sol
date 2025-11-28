// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../FeedReader.sol";

/**
 * @title FeedReaderFactory
 * @dev Factory contract to deploy FeedReader contracts on Sepolia
 */
contract FeedReaderFactory {
    event FeedReaderDeployed(
        address indexed feedReader,
        address indexed aggregatorProxy,
        address indexed deployer,
        uint256 timestamp
    );

    struct DeploymentInfo {
        address feedReader;
        address aggregatorProxy;
        address deployer;
        uint256 timestamp;
        bool exists;
    }

    mapping(address => DeploymentInfo) public deployments;
    address[] public allDeployments;

    /**
     * @dev Deploy a new FeedReader contract
     * @param aggregatorProxy The Chainlink aggregator proxy address
     * @param service The Reactive Network service address
     * @return feedReader The address of the deployed FeedReader contract
     */
    function deployFeedReader(
        address aggregatorProxy,
        address service
    ) external payable returns (address feedReader) {
        require(aggregatorProxy != address(0), "Invalid aggregator proxy");
        require(service != address(0), "Invalid service address");
        require(msg.value >= 0.005 ether, "Insufficient deployment fee");

        // Deploy new FeedReader contract
        FeedReader newFeedReader = new FeedReader{value: msg.value}(
            aggregatorProxy,
            service
        );

        feedReader = address(newFeedReader);

        // Store deployment info
        deployments[feedReader] = DeploymentInfo({
            feedReader: feedReader,
            aggregatorProxy: aggregatorProxy,
            deployer: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        allDeployments.push(feedReader);

        emit FeedReaderDeployed(
            feedReader,
            aggregatorProxy,
            msg.sender,
            block.timestamp
        );

        return feedReader;
    }

    /**
     * @dev Get deployment info for a FeedReader
     * @param feedReader The FeedReader contract address
     * @return info The deployment information
     */
    function getDeploymentInfo(address feedReader) 
        external 
        view 
        returns (DeploymentInfo memory info) 
    {
        return deployments[feedReader];
    }

    /**
     * @dev Get all deployed FeedReader contracts
     * @return addresses Array of all deployed FeedReader addresses
     */
    function getAllDeployments() external view returns (address[] memory addresses) {
        return allDeployments;
    }

    /**
     * @dev Get deployment count
     * @return count Number of deployed contracts
     */
    function getDeploymentCount() external view returns (uint256 count) {
        return allDeployments.length;
    }
}