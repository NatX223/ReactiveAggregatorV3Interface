# ReactiveAggregatorV3Interface

A cross-chain price feed solution that mirrors Chainlink AggregatorV3Interface data from supported chains to non-supported chains using the Reactive Network.

------------------------

## Live Link - reactiveaggregator.vercel.app

## Demo - https://www.loom.com/share/63fc8d1a9c1f41c0b32906a72e8cc1ce

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

```
Source Chain                        Reactive Network           Destination Chain
┌────────────────────────┐        ┌──────────────────┐         ┌─────────────────┐
│  AggregatorV3 contracts│◄───────┤  AggReactive     │         │                 │
│  (Price Source)        │        │  (Event Monitor) │         │                 │
└────────────────────────┘        └──────────────────┘         │                 │
         │                              │                      │                 │
         │ AnswerUpdated                │ Callback             │                 │
         ▼                              ▼                      │                 │
┌─────────────────┐            ┌──────────────────┐            │  ┌─────────────┐│
│   FeedReader    │◄───────────┤ ReactiveProxy    │───────────►│  │ FeedProxy   ││
│ (Data Extractor)│            │ (Cross-chain     │            │  │(Data Store) ││
└─────────────────┘            │  Coordinator)    │            │  └─────────────┘│
                               └──────────────────┘            └─────────────────┘
```

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


### Contracts

| Contract                                      |  Address                                    | Chain   |
|-----------------------------------------------|---------------------------------------------|---------|
| **Chainlink price feed aggregator - BTC/USD** | `0x17Dac87b07EAC97De4E182Fc51C925ebB7E723e2`| sepolia |
| **AggReactive**                               | `0xa76c05CecE1D5d74ADA1e4746EE14df75603b422`| lasna   |
| **FeedReader**                                | `0x7B7d298752718b7a8D0B22AfAF509900CaA61F23`| sepolia |
| **ReactiveProxy**                             | `0xa2f2436C61b1C0B40685691280B846B3B032bF25`| lasna   |
| **FeedProxy**                                 | `0xAc0723E5A9857A9a9b9503AfD0c0263B8f9bbFA1`| lasna   |

### Transactions

| Function                                       | Transaction hash                              | Chain   |
|------------------------------------------------|-----------------------------------------------|---------|
| **AnswerUpdated event** | `0xddf48c68caf2d227d7abf0c2a090676e1673ce07bd26b42b3454b81c2a61337b` | sepolia |
| **Reacting to AnswerUpdated event** | `0x970d916e094bc639f86b8d83e5452a2ecc226c1d933373e4cb0dce3a201f1b0a` | lasna |
| **Callback - reading price feed data from aggregators and emitting feedRead event**| `0xe269cb549c4866b48786684233b09525fc8a865ac1a9a574e7ea036fe131813a` | sepolia |
| **Reacting to feedRead event and calling callback event for FeedProxy callback**| `0xecef8c6e8d63d4cf26d979a86dec912ad997f719f28be5af2eac3d40e88fc219` | lasna   |
| **Callback - storing price feed data** | `0x3cd85113cacae806796f2b1fb446784f09f46d179cf9e2e0775e3fc9c4bb482e` | lasna   |


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
PRIVATE_KEY=your_private_key
LASNA_RPC_URL=https://lasna-rpc.rnk.dev/ or mainnet
LASNA_SERVICE_ADDRESS=0x0000000000000000000000000000000000fffFfF
LASNA_CHAIN_ID=5318007
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com or any chainlink supported chain rpc url
SEPOLIA_SERVICE_ADDRESS=0xc9f36411C9897e7F959D99ffca2a0Ba7ee0D7bDA
SEPOLIA_CHAIN_ID=11155111 or any chainlink supported chain id
PRICE_FEED_AGGREGATOR=0x17Dac87b07EAC97De4E182Fc51C925ebB7E723e2 or custom price feed aggregator address on chosen chain
AGGREGATOR_PROXY=0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43 or  custom aggregator proxy address on chosen chain
ANSWER_UPDATED_EVENT=0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f
FEED_READ_EVENT=0x211b0a6d1ea05edd12db159c3307872cdca106fc791b06a6baad5e124f39070e
```

### Deployment

#### Testnet Deployment
Deploy the feed reader to sepolia
```bash
forge create --broadcast --rpc-url sepoliaRPC --private-key $PRIVATE_KEY src/FeedReader.sol:FeedReader --value 0.005ether --constructor-args 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43 0xc9f36411C9897e7F959D99ffca2a0Ba7ee0D7bDA
```
Deploy the AGGReactive contract to lasna
```bash
forge create --broadcast --rpc-url lasnaRPC --private-key $PRIVATE_KEY src/AGGReactive.sol:AGGReactive --value 1ether --constructor-args feed_reader_address 0x17Dac87b07EAC97De4E182Fc51C925ebB7E723e2 0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f 11155111 0x0000000000000000000000000000000000fffFfF
```
Deploy the feed proxy to lasna
```bash
forge create --broadcast --rpc-url lasnaRPC --private-key $PRIVATE_KEY src/FeedProxy.sol:FeedProxy --value 1ether --constructor-args 0x0000000000000000000000000000000000fffFfF
```
Deploy the reactive proxy contract to lasna
```bash
forge create --broadcast --rpc-url lasnaRPC --private-key $PRIVATE_KEY src/ReactiveProxy.sol:ReactiveProxy --value 1ether --constructor-args feed_proxy_address feed_reader_address  0x211b0a6d1ea05edd12db159c3307872cdca106fc791b06a6baad5e124f39070e 11155111 5318007 0x0000000000000000000000000000000000fffFfF
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
