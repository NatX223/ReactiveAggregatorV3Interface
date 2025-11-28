import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 1,
      number: '100+',
      label: 'Supported Blockchains',
      description: 'Via Reactive Network',
      icon: '🌐'
    },
    {
      id: 2,
      number: '< 30s',
      label: 'Sync Latency',
      description: 'Real-time price updates',
      icon: '⚡'
    },
    {
      id: 3,
      number: '99.9%',
      label: 'Uptime Reliability',
      description: 'Decentralized architecture',
      icon: '🔒'
    },
    {
      id: 4,
      number: '50+',
      label: 'Price Feed Pairs',
      description: 'Available on Chainlink',
      icon: '📊'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Powering Cross-Chain DeFi
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Built on Reactive Network's robust infrastructure, ReactiveAggregator delivers institutional-grade price feeds with unmatched reliability and speed.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-blue-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-blue-200 text-sm">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why Choose ReactiveAggregator?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-100">
              <div>
                <div className="text-3xl mb-2">🔗</div>
                <h4 className="font-semibold text-white mb-2">Chainlink Compatible</h4>
                <p className="text-sm">Full AggregatorV3Interface compatibility for seamless integration</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🌉</div>
                <h4 className="font-semibold text-white mb-2">Cross-Chain Native</h4>
                <p className="text-sm">Built specifically for multi-chain DeFi applications</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-white mb-2">Event-Driven</h4>
                <p className="text-sm">Reactive architecture ensures minimal latency and maximum efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;