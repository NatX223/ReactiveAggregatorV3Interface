import React from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";

const DeployGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Deployment Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Step-by-step guide to deploy factory contracts and create price feed
            bridges
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Prerequisites
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Required Tools
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Foundry (forge, cast, anvil)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    MetaMask or compatible wallet
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Git for cloning repository
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Required Funds
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">💰</span>
                    Sepolia ETH (~0.01 ETH)
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">💰</span>
                    Lasna testnet tokens (~5 ETH)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Deploy Factory Contracts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Step 1: Deploy Factory Contracts
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1.1 Clone and Setup Repository
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`git clone https://github.com/NatX223/ReactiveAggregatorV3Interface
cd ReactiveAggregatorV3Interface/Contracts
forge install
cp .env.example .env`}
                </pre>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Configure your .env file with your private key and RPC URLs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1.2 Deploy FeedReaderFactory (Sepolia)
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`forge script script/DeployFactories.s.sol:DeployFactories \\
  --rpc-url $SEPOLIA_RPC_URL \\
  --broadcast \\
  --verify`}
                </pre>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  💡 Save the deployed FeedReaderFactory address - you'll need
                  it for the frontend configuration.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1.3 Deploy ReactiveSystemFactory (Lasna)
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`forge script script/DeployFactories.s.sol:DeployFactories \\
  --rpc-url $LASNA_RPC_URL \\
  --broadcast`}
                </pre>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <p className="text-purple-700 dark:text-purple-300 text-sm">
                  💡 Save the deployed ReactiveSystemFactory address for
                  frontend configuration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Configure Frontend */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Step 2: Configure Frontend
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Update Contract Addresses
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Update the contract addresses in{" "}
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                app/src/app/deploy/page.tsx
              </code>
              :
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                {`const CONTRACTS = {
  SEPOLIA: {
    FEED_READER_FACTORY: '0xYourFeedReaderFactoryAddress',
    SERVICE_ADDRESS: '0xc9f36411C9897e7F959D99ffca2a0Ba7ee0D7bDA',
    CHAIN_ID: 11155111
  },
  LASNA: {
    REACTIVE_SYSTEM_FACTORY: '0xYourReactiveSystemFactoryAddress',
    SERVICE_ADDRESS: '0x0000000000000000000000000000000000fffFfF',
    CHAIN_ID: 5318007
  }
};`}
              </pre>
            </div>
          </div>
        </section>

        {/* Step 3: Using the Deployment Interface */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Step 3: Deploy Price Feed Bridge
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3.1 Find Chainlink Price Feed
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Visit the{" "}
                <a
                  href="https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1&search=sepolia"
                  className="text-blue-600 hover:text-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chainlink documentation
                </a>{" "}
                to find Sepolia testnet price feed addresses.
              </p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Popular Sepolia Price Feeds:
                </h4>
                <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                  <li>
                    • BTC/USD:{" "}
                    <code>0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43</code>
                  </li>
                  <li>
                    • ETH/USD:{" "}
                    <code>0x694AA1769357215DE4FAC081bf1f309aDC325306</code>
                  </li>
                  <li>
                    • LINK/USD:{" "}
                    <code>0xc59E3633BAAC79493d908e63626716e204A45EdF</code>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                3.2 Use Deployment Interface
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  Navigate to the{" "}
                  <Link
                    href="/deploy"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Deploy page
                  </Link>
                </li>
                <li>Enter the Chainlink price feed proxy address</li>
                <li>
                  The system will automatically detect the aggregator address
                </li>
                <li>Click "Start Deployment" to begin the process</li>
                <li>Approve transactions in your wallet when prompted</li>
                <li>Wait for all deployments to complete</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Architecture Overview
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-700 dark:text-gray-300">
                {`Sepolia Testnet                    Reactive Network                 Lasna Testnet
┌─────────────────────┐           ┌──────────────────┐            ┌─────────────────┐
│ FeedReaderFactory   │           │                  │            │ ReactiveSystem  │
│ ├─ FeedReader       │◄──────────┤  Event Tracking  │            │ Factory         │
│ └─ Chainlink Proxy  │           │  & Callbacks     │            │ ├─ AggReactive  │
└─────────────────────┘           └──────────────────┘            │ ├─ FeedProxy    │
                                                                  │ └─ ReactiveProxy│
                                                                  └─────────────────┘`}
              </pre>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Sepolia (Source)
                </h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  FeedReader monitors Chainlink price feeds and emits events
                  when prices update.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Reactive Network
                </h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Tracks events and triggers cross-chain callbacks
                  automatically.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                  Lasna (Destination)
                </h4>
                <p className="text-purple-700 dark:text-purple-300 text-sm">
                  FeedProxy stores mirrored price data with
                  AggregatorV3Interface compatibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Troubleshooting
          </h2>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Common Issues
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Transaction Reverted
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Check that you have sufficient funds and the correct network
                    is selected in your wallet.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Invalid Proxy Address
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ensure you're using a valid Chainlink price feed proxy
                    address from Sepolia testnet.
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Factory Not Deployed
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Make sure you've deployed the factory contracts and updated
                    the addresses in the frontend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">🎉 Ready to Deploy!</h3>
            <p className="text-green-100 mb-6">
              Once you've completed the setup, you can start deploying price
              feed bridges using the automated interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/deploy"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-center"
              >
                Start Deploying →
              </Link>
              <Link
                href="/price-feeds"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors text-center"
              >
                View Existing Feeds →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeployGuidePage;
