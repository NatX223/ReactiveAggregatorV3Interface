// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/factories/FeedReaderFactory.sol";
import "../src/factories/ReactiveSystemFactory.sol";

contract DeployFactories is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy FeedReaderFactory (for Sepolia)
        FeedReaderFactory feedReaderFactory = new FeedReaderFactory();
        console.log("FeedReaderFactory deployed at:", address(feedReaderFactory));

        // Deploy ReactiveSystemFactory (for Lasna)
        // Service address for Lasna testnet
        address lasnaServiceAddress = 0x0000000000000000000000000000000000fffFfF;
        ReactiveSystemFactory reactiveSystemFactory = new ReactiveSystemFactory(lasnaServiceAddress);
        console.log("ReactiveSystemFactory deployed at:", address(reactiveSystemFactory));

        vm.stopBroadcast();

        // Log deployment info
        console.log("\n=== DEPLOYMENT SUMMARY ===");
        console.log("Network: ", block.chainid);
        console.log("FeedReaderFactory: ", address(feedReaderFactory));
        console.log("ReactiveSystemFactory: ", address(reactiveSystemFactory));
        console.log("==========================\n");
    }
}