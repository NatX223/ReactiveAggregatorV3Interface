import React from 'react';

const IncentiveSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why ReactiveAggregator?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Break free from Chainlink's chain limitations. Access institutional-grade price feeds on any blockchain with real-time synchronization and AggregatorV3 compatibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* DeFi Protocols Column */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For DeFi Protocols</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🌐</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-Chain Expansion</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Launch on any blockchain with reliable Chainlink price feeds, regardless of native support.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Real-Time Synchronization</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get price updates with minimal latency. Your liquidations and trading algorithms stay competitive.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🔒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Institutional Grade</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Same reliable price data that powers billions in DeFi, now available on your preferred chain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developers Column */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Developers</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🔌</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Drop-in Compatibility</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Full AggregatorV3Interface compatibility. Replace your Chainlink integration with zero code changes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🚀</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Deploy Anywhere</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Build once, deploy everywhere. Your price feed infrastructure works on any supported blockchain.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🛠️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Deployment</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    One-click deployment interface. Set up cross-chain price feeds in minutes, not hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default IncentiveSection;