import React from 'react';
import Link from 'next/link';

const GettingStartedPage: React.FC = () => {
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
            <span className="text-gray-900 dark:text-white">Getting Started</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Getting Started
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn the basics of ReactiveAggregatorV3Interface and how it solves cross-chain price feed challenges
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          
          {/* Overview Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                ReactiveAggregatorV3Interface creates a decentralized bridge for Chainlink price feed data, enabling any blockchain to access real-time price information regardless of native Chainlink support. By leveraging the Reactive Network's event-driven architecture, price updates are automatically propagated across chains with minimal latency and maximum reliability.
              </p>
            </div>
          </section>

          {/* Problem Statement */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Problem Statement</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                Limited Chain Support
              </h3>
              <p className="text-red-700 dark:text-red-300 leading-relaxed">
                Current Chainlink price feed data is limited to only Chainlink supported chains. This means that only the chains supported by Chainlink get access to the Chainlink price feeds, leaving many emerging and specialized blockchains without access to reliable price data.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                Why Reactive Network?
              </h3>
              <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                Reactive Network is best positioned to solve this problem because of its wide range of supported networks, cross-chain messaging capabilities, and event tracking features that make it the perfect fit for bridging price feed data across chains.
              </p>
            </div>
          </section>

          {/* Solution */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Solution</h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
              <p className="text-green-700 dark:text-green-300 leading-relaxed mb-4">
                The ReactiveAggregator project is a decentralized price feed bridge that enables any blockchain to access real-time price information regardless of native Chainlink support.
              </p>
              <p className="text-green-700 dark:text-green-300 leading-relaxed">
                By leveraging the Reactive Network's event-driven architecture, price updates are automatically propagated across chains with minimal latency and maximum reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🔄 Event-Driven Architecture
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Utilizes Reactive Network's callback functionality to monitor price feed updates and automatically propagate data across chains.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  ⚡ Minimal Latency
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time price updates with minimal delay between source chain updates and destination chain availability.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🔒 Maximum Reliability
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Decentralized architecture ensures high availability and resistance to single points of failure.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🔌 AggregatorV3 Compatible
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Maintains full compatibility with Chainlink's AggregatorV3Interface standard for seamless integration.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Cross-Chain Price Feeds</h3>
                  <p className="text-gray-600 dark:text-gray-300">Access Chainlink price data on any supported blockchain network</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Real-Time Updates</h3>
                  <p className="text-gray-600 dark:text-gray-300">Automatic price synchronization when source feeds update</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Decentralized Architecture</h3>
                  <p className="text-gray-600 dark:text-gray-300">No single point of failure with distributed event monitoring</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Standard Interface</h3>
                  <p className="text-gray-600 dark:text-gray-300">Drop-in replacement for existing Chainlink integrations</p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Next Steps</h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
              <p className="text-blue-100 mb-6">
                Continue to the next section to understand how the system works, or jump straight to setup and deployment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/docs/how-it-works"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
                >
                  How It Works →
                </Link>
                <Link 
                  href="/docs/setup"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Setup & Deployment →
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage;