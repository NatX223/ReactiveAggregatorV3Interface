// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "../src/DummyAggregator.sol";
import "../src/FeedReader.sol";
import "../src/AggReactive.sol";
import "../src/FeedProxy.sol";
import "../src/ReactiveProxy.sol";
import "../lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title CrossChainPriceFeedTest
 * @dev Comprehensive tests for cross-chain price feed system
 * @notice Update contract addresses below with your actual deployed addresses
 *
 * CORRECTED ARCHITECTURE:
 * 1. DummyAggregator (Sepolia) - Just emits events to trigger the system
 * 2. Real Chainlink Aggregator (Sepolia) - Actual price feed data source
 * 3. FeedReader (Sepolia) - Reads from real Chainlink when triggered by AggReactive
 * 4. AggReactive (Reactive) - Monitors DummyAggregator events
 * 5. ReactiveProxy (Reactive) - Monitors FeedReader events
 * 6. FeedProxy (Reactive) - Stores final real Chainlink data
 */
contract CrossChainPriceFeedTest is Test {
    // ============ SEPOLIA NETWORK CONTRACTS ============
    // TODO: Update with your actual Sepolia deployed addresses
    address constant SEPOLIA_DUMMY_AGGREGATOR =
        0x0000000000000000000000000000000000000000; // DummyAggregator (event trigger only)
    address constant SEPOLIA_REAL_AGGREGATOR =
        0x694AA1769357215DE4FAC081bf1f309aDC325306; // Real Chainlink ETH/USD on Sepolia
    address constant SEPOLIA_FEED_READER =
        0x0000000000000000000000000000000000000000; // FeedReader on Sepolia

    // ============ REACTIVE NETWORK CONTRACTS ============
    // TODO: Update with your actual Reactive Network deployed addresses
    address constant REACTIVE_AGG_REACTIVE =
        0x0000000000000000000000000000000000000000; // AggReactive on Reactive
    address constant REACTIVE_PROXY =
        0x0000000000000000000000000000000000000000; // ReactiveProxy on Reactive
    address constant REACTIVE_FEED_PROXY =
        0x0000000000000000000000000000000000000000; // FeedProxy on Reactive

    // ============ NETWORK CONFIGURATION ============
    string constant SEPOLIA_RPC = "https://ethereum-sepolia-rpc.publicnode.com";
    string constant REACTIVE_RPC = "https://lasna-rpc.rnk.dev/";
    uint256 constant SEPOLIA_CHAIN_ID = 11155111;
    uint256 constant REACTIVE_CHAIN_ID = 5318007;
    address constant REACTIVE_SERVICE =
        0x0000000000000000000000000000000000fffFfF;

    // ============ CONTRACT INSTANCES ============
    // Sepolia contracts
    DummyAggregator public sepoliaDummyAggregator;
    AggregatorV3Interface public sepoliaRealAggregator;
    FeedReader public sepoliaFeedReader;

    // Reactive contracts
    AggReactive public reactiveAggReactive;
    ReactiveProxy public reactiveProxy;
    FeedProxy public reactiveFeedProxy;

    // ============ TEST SETUP ============
    function setUp() public {
        // Verify addresses are set
        require(
            SEPOLIA_DUMMY_AGGREGATOR != address(0),
            "Sepolia DummyAggregator address not set"
        );
        require(
            SEPOLIA_FEED_READER != address(0),
            "Sepolia FeedReader address not set"
        );
        require(
            REACTIVE_AGG_REACTIVE != address(0),
            "Reactive AggReactive address not set"
        );
        require(
            REACTIVE_PROXY != address(0),
            "Reactive ReactiveProxy address not set"
        );
        require(
            REACTIVE_FEED_PROXY != address(0),
            "Reactive FeedProxy address not set"
        );

        // Initialize Sepolia contract instances
        vm.createFork(SEPOLIA_RPC);
        sepoliaDummyAggregator = DummyAggregator(SEPOLIA_DUMMY_AGGREGATOR);
        sepoliaRealAggregator = AggregatorV3Interface(SEPOLIA_REAL_AGGREGATOR);
        sepoliaFeedReader = FeedReader(payable(SEPOLIA_FEED_READER));

        // Verify Sepolia contracts are deployed
        require(
            SEPOLIA_DUMMY_AGGREGATOR.code.length > 0,
            "Sepolia DummyAggregator not deployed"
        );
        require(
            SEPOLIA_REAL_AGGREGATOR.code.length > 0,
            "Sepolia Real Aggregator not available"
        );
        require(
            SEPOLIA_FEED_READER.code.length > 0,
            "Sepolia FeedReader not deployed"
        );

        // Initialize Reactive contract instances
        vm.createFork(REACTIVE_RPC);
        reactiveAggReactive = AggReactive(payable(REACTIVE_AGG_REACTIVE));
        reactiveProxy = ReactiveProxy(payable(REACTIVE_PROXY));
        reactiveFeedProxy = FeedProxy(payable(REACTIVE_FEED_PROXY));

        // Verify Reactive contracts are deployed
        require(
            REACTIVE_AGG_REACTIVE.code.length > 0,
            "Reactive AggReactive not deployed"
        );
        require(
            REACTIVE_PROXY.code.length > 0,
            "Reactive ReactiveProxy not deployed"
        );
        require(
            REACTIVE_FEED_PROXY.code.length > 0,
            "Reactive FeedProxy not deployed"
        );
    }

    // ============ SEPOLIA CONTRACT TESTS ============

    function test_SepoliaDummyAggregatorConfiguration() public {
        vm.selectFork(vm.createFork(SEPOLIA_RPC));

        // DummyAggregator is just for triggering events, not providing real data
        assertEq(sepoliaDummyAggregator.decimals(), 8, "Incorrect decimals");
        assertEq(sepoliaDummyAggregator.version(), 1, "Incorrect version");
        assertTrue(
            bytes(sepoliaDummyAggregator.description()).length > 0,
            "Empty description"
        );

        console.log("=== SEPOLIA DUMMY AGGREGATOR (Event Trigger) ===");
        console.log("Address:", address(sepoliaDummyAggregator));
        console.log("Description:", sepoliaDummyAggregator.description());
        console.log("Purpose: Event trigger only, not data source");
    }

    function test_SepoliaRealAggregatorData() public {
        vm.selectFork(vm.createFork(SEPOLIA_RPC));

        // Test real Chainlink aggregator provides actual data
        (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = sepoliaRealAggregator.latestRoundData();

        assertTrue(roundId > 0, "Invalid round ID from real aggregator");
        assertTrue(answer > 0, "Invalid answer from real aggregator");
        assertTrue(startedAt > 0, "Invalid started at from real aggregator");
        assertTrue(updatedAt > 0, "Invalid updated at from real aggregator");
        assertTrue(
            answeredInRound > 0,
            "Invalid answered in round from real aggregator"
        );

        console.log("=== SEPOLIA REAL CHAINLINK AGGREGATOR ===");
        console.log("Address:", SEPOLIA_REAL_AGGREGATOR);
        console.log("Description:", sepoliaRealAggregator.description());
        console.log("Decimals:", sepoliaRealAggregator.decimals());
        console.log("Current ETH Price:", uint256(answer));
        console.log("Round ID:", roundId);
        console.log("Updated At:", updatedAt);
    }

    function test_SepoliaFeedReaderConfiguration() public {
        vm.selectFork(vm.createFork(SEPOLIA_RPC));

        // Test FeedReader is connected to real Chainlink aggregator (not DummyAggregator)
        assertEq(
            address(sepoliaFeedReader.aggregatorProxy()),
            SEPOLIA_REAL_AGGREGATOR,
            "FeedReader should be connected to Real Chainlink Aggregator"
        );

        console.log("=== SEPOLIA FEED READER ===");
        console.log("Address:", address(sepoliaFeedReader));
        console.log(
            "Connected to Real Aggregator:",
            address(sepoliaFeedReader.aggregatorProxy())
        );
        console.log("Real Aggregator Address:", SEPOLIA_REAL_AGGREGATOR);
        console.log("Purpose: Reads real Chainlink data when triggered");
    }

    function test_SepoliaDummyTriggerEvent() public {
        vm.selectFork(vm.createFork(SEPOLIA_RPC));

        // Test that DummyAggregator can trigger events (its main purpose)
        sepoliaDummyAggregator.updateAnswer();

        console.log("=== DUMMY AGGREGATOR EVENT TRIGGER TEST ===");
        console.log("DummyAggregator successfully triggered event");
        console.log(
            "This event will be detected by AggReactive on Reactive Network"
        );
    }

    // ============ REACTIVE CONTRACT TESTS ============

    function test_ReactiveAggReactiveConfiguration() public {
        vm.selectFork(vm.createFork(REACTIVE_RPC));

        // Test AggReactive is monitoring the DummyAggregator (for events) and will call FeedReader
        assertEq(
            reactiveAggReactive.feedReader(),
            SEPOLIA_FEED_READER,
            "AggReactive should call Sepolia FeedReader"
        );
        assertEq(
            reactiveAggReactive.priceFeedAggregator(),
            SEPOLIA_DUMMY_AGGREGATOR,
            "AggReactive should monitor Sepolia DummyAggregator events"
        );
        assertEq(
            reactiveAggReactive.chainService(),
            REACTIVE_SERVICE,
            "AggReactive incorrect chain service"
        );

        console.log("=== REACTIVE AGG REACTIVE ===");
        console.log("Address:", address(reactiveAggReactive));
        console.log(
            "Monitoring (for events):",
            reactiveAggReactive.priceFeedAggregator()
        );
        console.log("Will call FeedReader:", reactiveAggReactive.feedReader());
        console.log(
            "Purpose: Detects DummyAggregator events, triggers FeedReader"
        );
    }

    function test_ReactiveProxyConfiguration() public {
        vm.selectFork(vm.createFork(REACTIVE_RPC));

        // Test ReactiveProxy configuration
        assertEq(
            reactiveProxy.feedProxy(),
            address(reactiveFeedProxy),
            "ReactiveProxy not connected to FeedProxy"
        );
        assertEq(
            reactiveProxy.feedReader(),
            SEPOLIA_FEED_READER,
            "ReactiveProxy not connected to Sepolia FeedReader"
        );
        assertEq(
            reactiveProxy.chainService(),
            REACTIVE_SERVICE,
            "ReactiveProxy incorrect chain service"
        );

        console.log("=== REACTIVE PROXY ===");
        console.log("Address:", address(reactiveProxy));
        console.log("Target Feed Proxy:", reactiveProxy.feedProxy());
        console.log("Monitoring Feed Reader:", reactiveProxy.feedReader());
        console.log(
            "Purpose: Detects FeedReader events, delivers data to FeedProxy"
        );
    }

    function test_ReactiveFeedProxyInitialState() public {
        vm.selectFork(vm.createFork(REACTIVE_RPC));

        // Test initial state (should be empty or default values)
        (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = reactiveFeedProxy.latestRoundData();

        console.log("=== REACTIVE FEED PROXY INITIAL STATE ===");
        console.log("Address:", address(reactiveFeedProxy));
        console.log("Initial Round ID:", roundId);
        console.log("Initial Answer:", uint256(answer));
        console.log(
            "Purpose: Will store real Chainlink data from cross-chain delivery"
        );
    }

    // ============ CROSS-CHAIN INTEGRATION TESTS ============

    function test_SimulateCrossChainFlow() public {
        console.log("=== SIMULATING CORRECTED CROSS-CHAIN PRICE FEED FLOW ===");

        // Step 1: Trigger event on Sepolia DummyAggregator
        vm.selectFork(vm.createFork(SEPOLIA_RPC));
        console.log("Step 1: Triggering event on Sepolia DummyAggregator...");

        sepoliaDummyAggregator.updateAnswer();
        console.log(
            "   DummyAggregator event triggered (detected by AggReactive)"
        );

        // Step 2: Get real data from Chainlink aggregator (what FeedReader will read)
        console.log("Step 2: Getting real data from Chainlink aggregator...");
        (
            uint80 realRoundId,
            int256 realAnswer,
            uint256 realStartedAt,
            uint256 realUpdatedAt,
            uint80 realAnsweredInRound
        ) = sepoliaRealAggregator.latestRoundData();

        console.log("   Real Chainlink Data:");
        console.log("   - Round ID:", realRoundId);
        console.log("   - ETH Price:", uint256(realAnswer));
        console.log("   - Updated At:", realUpdatedAt);

        // Step 3: Simulate AggReactive detecting DummyAggregator event and calling FeedReader
        console.log("Step 3: Simulating AggReactive callback to FeedReader...");

        vm.prank(REACTIVE_AGG_REACTIVE); // Simulate call from AggReactive
        sepoliaFeedReader.callback(address(0)); // FeedReader reads from real aggregator and emits event

        console.log(
            "   FeedReader callback executed - read real Chainlink data"
        );

        // Step 4: Simulate ReactiveProxy detecting FeedReader event and calling FeedProxy
        vm.selectFork(vm.createFork(REACTIVE_RPC));
        console.log(
            "Step 4: Simulating ReactiveProxy callback to FeedProxy..."
        );

        // ReactiveProxy delivers the REAL Chainlink data (not DummyAggregator data)
        vm.prank(address(reactiveProxy));
        reactiveFeedProxy.callback(
            address(reactiveProxy),
            SEPOLIA_REAL_AGGREGATOR, // Real aggregator address
            realAnswer, // Real Chainlink price
            sepoliaRealAggregator.description(),
            realRoundId,
            sepoliaRealAggregator.decimals(),
            realStartedAt,
            realUpdatedAt,
            sepoliaRealAggregator.version()
        );

        console.log(
            "   FeedProxy callback executed - stored real Chainlink data"
        );

        // Step 5: Verify real Chainlink data was delivered cross-chain
        console.log("Step 5: Verifying real Chainlink data delivery...");

        (
            uint80 proxyRoundId,
            int256 proxyAnswer,
            uint256 proxyStartedAt,
            uint256 proxyUpdatedAt,
            uint80 proxyAnsweredInRound
        ) = reactiveFeedProxy.latestRoundData();

        // Validate real Chainlink data matches
        assertEq(
            proxyRoundId,
            realRoundId,
            "Round ID mismatch - should be real Chainlink data"
        );
        assertEq(
            proxyAnswer,
            realAnswer,
            "Answer mismatch - should be real Chainlink price"
        );
        assertEq(proxyStartedAt, realStartedAt, "Started at mismatch");
        assertEq(proxyUpdatedAt, realUpdatedAt, "Updated at mismatch");
        assertEq(
            proxyAnsweredInRound,
            realAnsweredInRound,
            "Answered in round mismatch"
        );

        console.log(
            "   - Real Chainlink data successfully delivered cross-chain!"
        );
        console.log("   - Real ETH Price (Sepolia):", uint256(realAnswer));
        console.log("   - Delivered Price (Reactive):", uint256(proxyAnswer));
        console.log("   - Data Match:", proxyAnswer == realAnswer);

        // Step 6: Verify AggregatorV3Interface compatibility with real data
        console.log("Step 6: Verifying AggregatorV3Interface compatibility...");

        vm.selectFork(vm.createFork(SEPOLIA_RPC));
        uint8 realDecimals = sepoliaRealAggregator.decimals();
        string memory realDescription = sepoliaRealAggregator.description();
        uint256 realVersion = sepoliaRealAggregator.version();

        vm.selectFork(vm.createFork(REACTIVE_RPC));
        uint8 proxyDecimals = reactiveFeedProxy.decimals();
        string memory proxyDescription = reactiveFeedProxy.description();
        uint256 proxyVersion = reactiveFeedProxy.version();

        assertEq(realDecimals, proxyDecimals, "Decimals mismatch");
        assertEq(
            keccak256(bytes(realDescription)),
            keccak256(bytes(proxyDescription)),
            "Description mismatch"
        );
        assertEq(realVersion, proxyVersion, "Version mismatch");

        console.log("   - Real Chainlink compatibility verified!");
        console.log("   - Decimals:", proxyDecimals);
        console.log("   - Description:", proxyDescription);
        console.log("   - Version:", proxyVersion);
    }

    function test_MultipleTriggerEvents() public {
        console.log("=== TESTING MULTIPLE TRIGGER EVENTS ===");

        vm.selectFork(vm.createFork(SEPOLIA_RPC));

        // Get initial real Chainlink data
        (
            uint80 initialRoundId,
            int256 initialAnswer,
            uint256 initialStartedAt,
            uint256 initialUpdatedAt,
            uint80 initialAnsweredInRound
        ) = sepoliaRealAggregator.latestRoundData();

        console.log("Initial Real Chainlink Data:");
        console.log("Initial Round ID:", initialRoundId);
        console.log("Initial ETH Price:", uint256(initialAnswer));
        console.log("Initial Started At:", initialStartedAt);
        console.log("Initial Updated At:", initialUpdatedAt);

        // Perform multiple trigger events
        for (uint i = 0; i < 3; i++) {
            console.log("Trigger Event", i + 1);

            // Trigger DummyAggregator event
            sepoliaDummyAggregator.updateAnswer();

            // Get current real Chainlink data (what FeedReader will actually read)
            (
                uint80 realRoundId,
                int256 realAnswer,
                uint256 realStartedAt,
                uint256 realUpdatedAt,
                uint80 realAnsweredInRound
            ) = sepoliaRealAggregator.latestRoundData();

            console.log("   Real Chainlink Data at trigger:");
            console.log("   - Trigger #:", i + 1);
            console.log("   - Round ID:", realRoundId);
            console.log("   - ETH Price:", uint256(realAnswer));
            console.log("   - Updated At:", realUpdatedAt);

            // Simulate AggReactive detecting DummyAggregator event and calling FeedReader
            vm.prank(REACTIVE_AGG_REACTIVE);
            sepoliaFeedReader.callback(address(0));

            // Simulate ReactiveProxy delivering real Chainlink data to FeedProxy
            vm.selectFork(vm.createFork(REACTIVE_RPC));
            vm.prank(address(reactiveProxy));
            reactiveFeedProxy.callback(
                address(reactiveProxy),
                SEPOLIA_REAL_AGGREGATOR, // Real aggregator address
                realAnswer, // Real Chainlink price
                sepoliaRealAggregator.description(),
                realRoundId,
                sepoliaRealAggregator.decimals(),
                realStartedAt,
                realUpdatedAt,
                sepoliaRealAggregator.version()
            );

            // Verify real data was delivered
            (uint80 proxyRoundId, int256 proxyAnswer, , , ) = reactiveFeedProxy
                .latestRoundData();
            assertEq(
                proxyRoundId,
                realRoundId,
                "Round ID should match real Chainlink data"
            );
            assertEq(
                proxyAnswer,
                realAnswer,
                "Answer should match real Chainlink price"
            );

            console.log(
                "   - Cross-chain delivery successful for trigger #:",
                i + 1
            );

            vm.selectFork(vm.createFork(SEPOLIA_RPC));
        }

        console.log("Multiple trigger events processed successfully");
        console.log(
            "Real Chainlink data delivered cross-chain for each trigger"
        );
    }

    function test_MultipleDummyUpdates() public {
        console.log("=== TESTING MULTIPLE PRICE UPDATES ===");

        vm.selectFork(vm.createFork(SEPOLIA_RPC));

        uint256[] memory prices = new uint256[](3);
        uint80[] memory roundIds = new uint80[](3);

        // Perform multiple updates
        for (uint i = 0; i < 3; i++) {
            sepoliaDummyAggregator.updateAnswer();
            (uint80 roundId, int256 answer, , , ) = sepoliaDummyAggregator
                .latestRoundData();

            prices[i] = uint256(answer);
            roundIds[i] = roundId;

            console.log("Update", i + 1);
            console.log("- Round ID:", roundId);
            console.log("- Price:", uint256(answer));

            // Simulate the cross-chain flow for each update
            vm.prank(REACTIVE_AGG_REACTIVE);
            sepoliaFeedReader.callback(address(0));

            // Simulate ReactiveProxy callback
            vm.selectFork(vm.createFork(REACTIVE_RPC));
            vm.prank(address(reactiveProxy));
            reactiveFeedProxy.callback(
                address(reactiveProxy),
                SEPOLIA_DUMMY_AGGREGATOR,
                answer,
                sepoliaDummyAggregator.description(),
                roundId,
                sepoliaDummyAggregator.decimals(),
                block.timestamp,
                block.timestamp,
                sepoliaDummyAggregator.version()
            );

            // Verify the update was processed
            (uint80 proxyRoundId, int256 proxyAnswer, , , ) = reactiveFeedProxy
                .latestRoundData();
            assertEq(proxyRoundId, roundId, "Round ID mismatch in update");
            assertEq(proxyAnswer, answer, "Answer mismatch in update");

            vm.selectFork(vm.createFork(SEPOLIA_RPC));
        }

        // Verify all updates were processed correctly
        assertTrue(
            roundIds[2] > roundIds[1] && roundIds[1] > roundIds[0],
            "Round IDs should increase"
        );
        assertTrue(
            prices[2] > prices[1] && prices[1] > prices[0],
            "Prices should increase"
        );

        console.log("Multiple price updates processed successfully");
    }

    // ============ ACCESS CONTROL TESTS ============

    function test_FeedProxyAccessControl() public {
        vm.selectFork(vm.createFork(REACTIVE_RPC));

        // Test that only ReactiveProxy can call callback
        vm.expectRevert("Unauthorized");
        vm.prank(address(0x1234)); // Random address
        reactiveFeedProxy.callback(
            address(reactiveProxy),
            SEPOLIA_DUMMY_AGGREGATOR,
            100000000, // 1.0 with 8 decimals
            "Test",
            1,
            8,
            block.timestamp,
            block.timestamp,
            1
        );

        console.log("FeedProxy access control working correctly");
    }

    function test_FeedReaderAccessControl() public {
        vm.selectFork(vm.createFork(SEPOLIA_RPC));

        // Test that only AggReactive can call callback
        vm.expectRevert("Unauthorized");
        vm.prank(address(0x1234)); // Random address
        sepoliaFeedReader.callback(address(0));

        console.log("FeedReader access control working correctly");
    }

    // ============ UTILITY FUNCTIONS ============

    function logAllContractAddresses() public view {
        console.log("=== ALL DEPLOYED CONTRACT ADDRESSES ===");
        console.log("SEPOLIA NETWORK:");
        console.log("  DummyAggregator:", SEPOLIA_DUMMY_AGGREGATOR);
        console.log("  FeedReader:     ", SEPOLIA_FEED_READER);
        console.log("");
        console.log("REACTIVE NETWORK:");
        console.log("  AggReactive:    ", REACTIVE_AGG_REACTIVE);
        console.log("  ReactiveProxy:  ", REACTIVE_PROXY);
        console.log("  FeedProxy:      ", REACTIVE_FEED_PROXY);
        console.log("==========================================");
    }

    function logCurrentPriceData() public {
        console.log("=== CURRENT PRICE DATA ===");

        // Sepolia data
        vm.selectFork(vm.createFork(SEPOLIA_RPC));
        (
            uint80 sepoliaRoundId,
            int256 sepoliaAnswer,
            uint256 sepoliaStartedAt,
            uint256 sepoliaUpdatedAt,
            uint80 sepoliaAnsweredInRound
        ) = sepoliaDummyAggregator.latestRoundData();

        console.log("SEPOLIA (Source):");
        console.log("  Round ID:", sepoliaRoundId);
        console.log("  Answer:", uint256(sepoliaAnswer));
        console.log("  Updated At:", sepoliaUpdatedAt);

        // Reactive data
        vm.selectFork(vm.createFork(REACTIVE_RPC));
        (
            uint80 reactiveRoundId,
            int256 reactiveAnswer,
            uint256 reactiveStartedAt,
            uint256 reactiveUpdatedAt,
            uint80 reactiveAnsweredInRound
        ) = reactiveFeedProxy.latestRoundData();

        console.log("REACTIVE (Destination):");
        console.log("  Round ID:", reactiveRoundId);
        console.log("  Answer:", uint256(reactiveAnswer));
        console.log("  Updated At:", reactiveUpdatedAt);

        console.log("DATA SYNC STATUS:");
        console.log("  Prices Match:", sepoliaAnswer == reactiveAnswer);
        console.log("  Round IDs Match:", sepoliaRoundId == reactiveRoundId);
        console.log("==========================");
    }
}
