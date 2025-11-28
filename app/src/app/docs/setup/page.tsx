import React from 'react';
import Link from 'next/link';

const SetupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-400">
              Documentation
            </Link>
            <span>→</span>
            <span className="text-gray-900 dark:text-white">Setup & Deployment</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Setup & Deployment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Complete guide to deploying your own cross-chain price feed bridge
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Prerequisites</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Before you begin, ensure you have the following tools and resources:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Foundry</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Smart contract development framework</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Node.js 16+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">For additional tooling and scripts</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">RPC Endpoints</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Testnet/mainnet access for both chains</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Private Key</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">With testnet React and ETH tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Installation</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">1. Clone the Repository</h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`# Clone the repository
git clone https://github.com/NatX223/ReactiveAggregatorV3Interface
cd ReactiveAggregatorV3Interface/Contracts`}
                </pre>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2. Install Dependencies</h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`# Install Foundry dependencies
forge install

# Compile contracts
forge compile`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Configuration</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">1. Environment Setup</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Copy the environment template and configure your deployment settings:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`cp Contracts/.env.example Contracts/.env`}
                </pre>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2. Environment Variables</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Configure your <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">.env</code> file with the following variables:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`# Private key for deployment
PRIVATE_KEY=your_private_key

# Reactive Network (Lasna) Configuration
LASNA_RPC_URL=https://lasna-rpc.rnk.dev/
LASNA_SERVICE_ADDRESS=0x0000000000000000000000000000000000fffFfF
LASNA_CHAIN_ID=5318007

# Source Chain (Sepolia) Configuration
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
SEPOLIA_SERVICE_ADDRESS=0xc9f36411C9897e7F959D99ffca2a0Ba7ee0D7bDA
SEPOLIA_CHAIN_ID=11155111

# Price Feed Configuration
PRICE_FEED_AGGREGATOR=0x17Dac87b07EAC97De4E182Fc51C925ebB7E723e2
AGGREGATOR_PROXY=0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43

# Event Topics
ANSWER_UPDATED_EVENT=0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f
FEED_READ_EVENT=0x211b0a6d1ea05edd12db159c3307872cdca106fc791b06a6baad5e124f39070e`}
                </pre>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Configuration Notes</h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Replace <code>your_private_key</code> with your actual private key</li>
                  <li>• For mainnet deployment, update RPC URLs and chain IDs accordingly</li>
                  <li>• Ensure your wallet has sufficient funds for deployment and gas fees</li>
                  <li>• Use custom aggregator addresses for different price feeds</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Deployment</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              📋 Deployment Order
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              Follow this exact order for successful deployment. Each contract depends on the previous ones.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Deploy FeedReader (Source Chain)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Deploy the FeedReader contract to the source chain (Sepolia) that will extract price data from Chainlink aggregators.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`forge create --broadcast \\
  --rpc-url $SEPOLIA_RPC_URL \\
  --private-key $PRIVATE_KEY \\
  src/FeedReader.sol:FeedReader \\
  --value 0.005ether \\
  --constructor-args \\
    $AGGREGATOR_PROXY \\
    $SEPOLIA_SERVICE_ADDRESS`}
                </pre>
              </div>
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  💡 Save the deployed FeedReader address - you'll need it for the next steps
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Deploy AggReactive (Reactive Network)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Deploy the AggReactive contract to Lasna that will monitor AnswerUpdated events.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`forge create --broadcast \\
  --rpc-url $LASNA_RPC_URL \\
  --private-key $PRIVATE_KEY \\
  src/AggReactive.sol:AggReactive \\
  --value 1ether \\
  --constructor-args \\
    <FEED_READER_ADDRESS> \\
    $PRICE_FEED_AGGREGATOR \\
    $ANSWER_UPDATED_EVENT \\
    $SEPOLIA_CHAIN_ID \\
    $LASNA_SERVICE_ADDRESS`}
                </pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Deploy FeedProxy (Destination Chain)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Deploy the FeedProxy contract to Lasna that will store and serve price data.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`forge create --broadcast \\
  --rpc-url $LASNA_RPC_URL \\
  --private-key $PRIVATE_KEY \\
  src/FeedProxy.sol:FeedProxy \\
  --value 1ether \\
  --constructor-args \\
    $LASNA_SERVICE_ADDRESS`}
                </pre>
              </div>
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  💡 Save the deployed FeedProxy address for the final step
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Deploy ReactiveProxy (Reactive Network)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Deploy the ReactiveProxy contract that coordinates cross-chain data relay.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`forge create --broadcast \\
  --rpc-url $LASNA_RPC_URL \\
  --private-key $PRIVATE_KEY \\
  src/ReactiveProxy.sol:ReactiveProxy \\
  --value 1ether \\
  --constructor-args \\
    <FEED_PROXY_ADDRESS> \\
    <FEED_READER_ADDRESS> \\
    $FEED_READ_EVENT \\
    $SEPOLIA_CHAIN_ID \\
    $LASNA_CHAIN_ID \\
    $LASNA_SERVICE_ADDRESS`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Testing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Testing</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Run Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Verify your deployment with the included test suite:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`# Run all tests
forge test

# Run with verbose output
forge test -vvv

# Run specific test file
forge test --match-path test/CrossChainPriceFeed.t.sol`}
              </pre>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Usage Example</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reading Price Data</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Once deployed, you can consume price data using the standard AggregatorV3Interface:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
{`import "./src/FeedProxy.sol";

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
    
    function getDescription() public view returns (string memory) {
        return priceFeed.description();
    }
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Troubleshooting</h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Issues</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Insufficient Gas</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ensure your wallet has enough ETH/React tokens for deployment and ongoing operations.
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">RPC Connection Issues</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Verify your RPC URLs are correct and accessible. Consider using alternative endpoints if needed.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Contract Verification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use block explorers to verify contract deployment and monitor transaction status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">🎉 Deployment Complete!</h3>
            <p className="text-green-100 mb-6">
              Your cross-chain price feed bridge is now live. Learn about security best practices to ensure safe operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/docs/security"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-center"
              >
                Security Guide →
              </Link>
              <Link 
                href="https://github.com/NatX223/ReactiveAggregatorV3Interface"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors text-center"
              >
                View on GitHub →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SetupPage;