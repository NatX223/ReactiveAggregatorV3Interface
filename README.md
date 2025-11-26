# ReactiveAggregatorV3Interface

A cross-chain price feed solution that mirrors Chainlink AggregatorV3Interface data from supported chains to non-supported chains using the Reactive Network.

------------------------

## Live Link - 

## Demo - 

## Table of Contents

1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [How It Works](#how-it-works)
5. [Transactions](#transactions)
6. [Setup and Deployment](#setup-and-deployment)
7. [Future Improvements](#future-improvements)
8. [Acknowledgments](#acknowledgments)


## Overview

This project creates a decentralized bridge for Chainlink price feed data, enabling any blockchain to access real-time price information regardless of native Chainlink support. By leveraging the Reactive Network's event-driven architecture, price updates are automatically propagated across chains with minimal latency and maximum reliability.

## Problem Statement

The current Chainlink price feed data is limited to only Chainlink supported chains. This means that only the chains supported by chainlink get access to the Chainlink price feeds. Reactive network is best placed to solve to this problem because of its wide range of supported networks, crosschain messaging and event tracking capabilities that make it the perfect fit for to solve this problem.

## Solution

The ReactiveAggregator project is a decentralized bridge that enables any blockchain to access real-time price information regardless of native Chainlink support. By leveraging the Reactive Network's event-driven architecture, price updates are automatically propagated across chains with minimal latency and maximum reliability.

## How It Works

ReactiveAggregator utilizes the Reactive and Callback functionality from Reactive network to monitor when the a price feed data has 
been updated and then reads the data and serves it to a chain not supported by Chainlink.

### Architecture

Below is an Imgae depicting the architecture of the ReactiveAggregator project.

<!-- ```
Source Chain                           Reactive Network                 Destination Chain
┌────────────────────────┐            ┌──────────────────┐            ┌─────────────────┐
│  AggregatorV3 contracts│◄───────────┤  AggReactive     │            │                 │
│  (Price Source)        │            │  (Event Monitor) │            │                 │
└────────────────────────┘            └──────────────────┘            │                 │
         │                              │                       │                 │
         │ AnswerUpdated                │ Callback              │                 │
         ▼                              ▼                       │                 │
┌─────────────────┐            ┌──────────────────┐            │  ┌─────────────┐│
│   FeedReader    │◄───────────┤ ReactiveProxy    │───────────►│  │ FeedProxy   ││
│ (Data Extractor)│            │ (Cross-chain     │            │  │(Data Store) ││
└─────────────────┘            │  Coordinator)    │            │  └─────────────┘│
                               └──────────────────┘            └─────────────────┘
``` -->

### Program Flow

The following steps describe the program flow

#### 1. Event Subscription
The `AggReactive` contract subscribes to `AnswerUpdated` events from price feed aggregator on the source chain and reacts to it by calling the callback on the feedReader contract.
Subscribing
```solidity
    constructor(
        address _feedReader,
        address _priceFeedAggregator,
        uint256 _eventTopic0,
        uint256 _chainId,
        address _service
    ) payable {
        feedReader = _feedReader;
        priceFeedAggregator = _priceFeedAggregator;
        chainService = _service;
        eventTopic0 = _eventTopic0;
        chainId = _chainId;
        service = ISystemContract(payable(_service));
        if (!vm) {
            service.subscribe(
                _chainId,
                _priceFeedAggregator,
                _eventTopic0,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE
            );
        }
    }
```
Reacting
```solidity
    function react(LogRecord calldata log) external vmOnly {
        // address recipient = address(uint160(log.topic_1));

        bytes memory payload = abi.encodeWithSignature(
            "callback(address)",
            address(0)
        );

        emit Callback(chainId, feedReader, GAS_LIMIT, payload);
    }
```
The full code can be found [here](https://github.com/NatX223/ReactiveAggregatorV3Interface/blob/main/Contracts/src/AggReactive.sol)

#### 2. Data Extraction
When a price update occurs, `FeedReader` contract on the source chain extracts comprehensive feed data from the source proxy contract 
including:
- Latest price answer
- Round ID and timestamps
- Aggregator metadata
- Decimal precision
and then emits an event consisting of the neccesary price feed data whch will be tracked and then the information transmitted to the 
destination chain.

```solidity
    function callback(
        address sender
    ) external authorizedSenderOnly rvmIdOnly(sender) {
        (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,

        ) = dataFeed.latestRoundData();
        emit feedRead(
            aggregatorProxy,
            answer,
            dataFeed.description(),
            roundId,
            dataFeed.decimals(),
            startedAt,
            updatedAt,
            dataFeed.version()
        );
    }
```
The full code can be found [here](https://github.com/NatX223/ReactiveAggregatorV3Interface/blob/main/Contracts/src/FeedReader.sol)

#### 3. Cross-Chain Relay
`ReactiveProxy` processes the extracted data and triggers a callback to the destination chain via the Reactive Network.
```solidity
    function react(LogRecord calldata log) external vmOnly {
        address aggregatorProxy = address(uint160(log.topic_1));
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
            aggregatorProxy,
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
```
The full code can be found [here](https://github.com/NatX223/ReactiveAggregatorV3Interface/blob/main/Contracts/src/ReactiveProxy.sol)

#### 4. Data Storage
`FeedProxy` receives the callback and stores the price data, providing AggregatorV3Interface compatibility for consuming contracts on 
the destination chain.
```solidity
    function callback(
        address sender, 
        address _aggregatorProxy, 
        int256 _answer, 
        string memory _description, 
        uint80 _roundId, 
        uint256 _decimals, 
        uint256 _startedAt, 
        uint256 _updatedAt, 
        uint256 _version
        ) external 
        authorizedSenderOnly 
        rvmIdOnly(sender) {

        aggregatorProxy = _aggregatorProxy;
        answer = _answer;
        description_ = _description;
        roundId = _roundId;
        decimals_ = _decimals;
        startedAt = _startedAt;
        updatedAt = _updatedAt;
        version = _version;

        emit feedReceived(roundId, answer);
    }
```
The full code can be found [here](https://github.com/NatX223/ReactiveAggregatorV3Interface/blob/main/Contracts/src/FeedProxy.sol)

### Transactions

| Contract | Function/event | Address | Transaction hash |
|----------|---------|----------|
| **Chainlink price feed - BTC/USD** | AnswerUpdated event | `0x17Dac87b07EAC97De4E182Fc51C925ebB7E723e2` | `` |
| **AggReactive** | Reacting to AnswerUpdated event | `0xaB65D336A2EEDa89e765Dd3Ed8EFA1B62cDC3D4e` | `` |
| **FeedReader** | Callback - reading price feed data from aggregators and emitting feedRead event | `0xe2af6180fc24f9944b4e6C46Df017a570f56527c` | `` |
| **ReactiveProxy** | Reacting to feedRead event and calling callback event for FeedProxy callback | `0x73a4be5a55150264Ca89870e32c4A5Fe001455eB` | `` |
| **FeedProxy** | Callback - storing price feed data | `0x87b7cB213a731df3A2Fb348061BaF8Fb055a5e03` | `` |

## Setup and Deployment

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed
- Node.js 16+ for additional tooling
- Testnet/mainnet RPC endpoints
- Private key with testnet/Mainnet React and ETH

### Installation

```bash
# Clone the repository
git clone https://github.com/NatX223/ReactiveAggregatorV3Interface
cd ReactiveAggregatorV3Interface/Contracts

# Install dependencies
forge install

# Compile contracts
forge compile
```

### Configuration

1. Copy the environment template:
```bash
cp Contracts/.env.example Contracts/.env
```

2. Configure your deployment settings:
```env
PRIVATE_KEY=your_private_key_here
REACTIVE_RPC_URL=https://lasna-rpc.rnk.dev/
REACTIVE_SERVICE_ADDRESS=0x0000000000000000000000000000000000fffFfF
REACTIVE_CHAIN_ID=5318007
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
SERVICE_ADDRESS=0xc9f36411C9897e7F959D99ffca2a0Ba7ee0D7bDA
CHAIN_ID=11155111
PRICE_FEED_AGGREGATOR=custom or 0x17Dac87b07EAC97De4E182Fc51C925ebB7E723e2
AGGREGATOR_PROXY=custom or 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
```

### Deployment

#### Local Testing
```bash
# Deploy to local testnet
forge script script/DeployLocal.s.sol --fork-url $RPC_URL

# Test with mock data
forge test -vvv
```

#### Testnet Deployment
```bash
# Deploy full system to testnet
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify

```
## 🧪 Testing

### Run Tests
```bash
# Run all tests
forge test

# Run with verbose output
forge test -vvv

# Run specific test file
forge test 
```

## 📊 Usage Examples

### Reading Price Data
```solidity
import "./src/FeedProxy.sol";

contract PriceConsumer {
    FeedProxy public priceFeed;
    
    constructor(address _feedProxy) {
        priceFeed = FeedProxy(_feedProxy);
    }
    
    function getLatestPrice() public view returns (int256) {
        (,int256 price,,,) = priceFeed.latestRoundData();
        return price;
    }
    
    function getPriceDecimals() public view returns (uint8) {
        return priceFeed.decimals();
    }
}
```

## 🛡️ Security Considerations

### Access Control
- All callback functions use `authorizedSenderOnly` modifier
- Reactive VM validation with `rvmIdOnly` checks
- Pausable subscriptions for emergency stops

### Data Integrity
- Tracking AnswerUpdated event for latest data and fee optimization
- Comprehensive event validation
- Timestamp verification for freshness
- Round ID tracking to prevent replay attacks

### Best Practices
- Always verify price data freshness
- Implement circuit breakers for extreme price movements
- Use multiple price sources when possible

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow Solidity style guide
- Add comprehensive tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/NatX223/ReactiveAggregatorV3Interface?tab=GPL-3.0-1-ov-file#readme) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](https://github.com/NatX223/ReactiveAggregatorV3Interface/wiki)
- **Issues**: [GitHub Issues](https://github.com/NatX223/ReactiveAggregatorV3Interface/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NatX223/ReactiveAggregatorV3Interface/discussions)

## 🙏 Acknowledgments
- [Reactive Network](https://reactive.network/) for cross-chain infrastructure
- [Chainlink](https://chain.link/) for the AggregatorV3Interface standard
- [Foundry](https://book.getfoundry.sh/) for development tooling

---

**Built with Reactive**