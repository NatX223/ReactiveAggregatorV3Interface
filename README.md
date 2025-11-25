# ReactiveAggregatorV3Interface

A cross-chain price feed solution that mirrors Chainlink AggregatorV3Interface data from supported chains to non-supported chains using the Reactive Network.

## 🎯 Overview

This project creates a decentralized bridge for Chainlink price feed data, enabling any blockchain to access real-time price information regardless of native Chainlink support. By leveraging the Reactive Network's event-driven architecture, price updates are automatically propagated across chains with minimal latency and maximum reliability.

## 🏗️ Architecture

The system consists of five core smart contracts working together to create a seamless cross-chain price feed experience:

```
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
```

## 📋 Components

### Core Contracts

| Contract | Purpose | Location |
|----------|---------|----------|
| **DummyAggregator** | Mock Chainlink price feed for testing | `src/DummyAggregator.sol` |
| **FeedReader** | Extracts price data from aggregators | `src/FeedReader.sol` |
| **ReactiveProxy** | Cross-chain event coordinator | `src/ReactiveProxy.sol` |
| **AggReactive** | Event monitor for price updates | `src/AggReactive.sol` |
| **FeedProxy** | Destination chain data storage | `src/FeedProxy.sol` |

### Deployment Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| **Deploy.s.sol** | Production deployment with dependencies | `forge script script/Deploy.s.sol` |
| **DeployLocal.s.sol** | Local testing deployment | `forge script script/DeployLocal.s.sol` |
| **DeploymentHelper.s.sol** | Shared deployment utilities | Imported by other scripts |

## 🚀 Quick Start

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed
- Node.js 16+ for additional tooling
- Access to testnet RPC endpoints
- Private key with testnet ETH

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ReactiveAggregatorV3Interface
cd ReactiveAggregatorV3Interface

# Install dependencies
forge install

# Build contracts
forge build
```

### Configuration

1. Copy the environment template:
```bash
cp Contracts/.env.example Contracts/.env
```

2. Configure your deployment settings:
```env
PRIVATE_KEY=your_private_key_here
RPC_URL=https://sepolia.infura.io/v3/your_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key
SERVICE_ADDRESS=0x0000000000000000000000000000000000000000  # Update with actual service
CHAIN_ID=11155111
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

# Verify contracts on Etherscan
forge verify-contract <CONTRACT_ADDRESS> <CONTRACT_NAME> --etherscan-api-key $ETHERSCAN_API_KEY
```

## 🔄 How It Works

### 1. Event Subscription
The `AggReactive` contract subscribes to `AnswerUpdated` events from price feed aggregators on the source chain.

### 2. Data Extraction
When a price update occurs, `FeedReader` extracts comprehensive feed data including:
- Latest price answer
- Round ID and timestamps
- Aggregator metadata
- Decimal precision

### 3. Cross-Chain Relay
`ReactiveProxy` processes the extracted data and triggers a callback to the destination chain via the Reactive Network.

### 4. Data Storage
`FeedProxy` receives the callback and stores the price data, providing AggregatorV3Interface compatibility for consuming contracts.

## 🧪 Testing

### Run Tests
```bash
# Run all tests
forge test

# Run with verbose output
forge test -vvv

# Run specific test file
forge test --match-path test/DummyAggregator.t.sol
```

### Mock Price Updates
```solidity
// Trigger a price update event for testing
DummyAggregator aggregator = DummyAggregator(AGGREGATOR_ADDRESS);
aggregator.updateAnswer();
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

### Monitoring Price Updates
```solidity
contract PriceMonitor {
    event PriceAlert(int256 price, uint256 timestamp);
    
    function onPriceUpdate(uint80 roundId, int256 answer) external {
        emit PriceAlert(answer, block.timestamp);
    }
}
```

## 🔧 Configuration

### Supported Networks

| Network | Chain ID | Status | Notes |
|---------|----------|--------|-------|
| Ethereum Sepolia | 11155111 | ✅ Supported | Primary testnet |
| Polygon Mumbai | 80001 | 🚧 Planned | Cross-chain testing |
| Arbitrum Sepolia | 421614 | 🚧 Planned | L2 integration |

### Gas Optimization

The system is optimized for minimal gas usage:
- **Subscription**: One-time setup cost
- **Event Processing**: ~50,000 gas per update
- **Cross-chain Relay**: Variable based on destination

## 🛡️ Security Considerations

### Access Control
- All callback functions use `authorizedSenderOnly` modifier
- Reactive VM validation with `rvmIdOnly` checks
- Pausable subscriptions for emergency stops

### Data Integrity
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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](https://github.com/your-org/ReactiveAggregatorV3Interface/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-org/ReactiveAggregatorV3Interface/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/ReactiveAggregatorV3Interface/discussions)

## 🙏 Acknowledgments

- [Chainlink](https://chain.link/) for the AggregatorV3Interface standard
- [Reactive Network](https://reactive.network/) for cross-chain infrastructure
- [Foundry](https://book.getfoundry.sh/) for development tooling

---

**Built with ❤️ for the decentralized future**