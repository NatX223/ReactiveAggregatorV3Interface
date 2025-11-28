import React from 'react';
import Link from 'next/link';

const DocsPage: React.FC = () => {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of ReactiveAggregatorV3Interface',
      icon: '📚',
      href: '/docs/getting-started',
      items: ['Overview', 'Problem Statement', 'Solution']
    },
    {
      title: 'How It Works',
      description: 'Understand the cross-chain architecture',
      icon: '⚡',
      href: '/docs/how-it-works',
      items: ['Event Subscription', 'Data Extraction', 'Cross-Chain Relay', 'Data Storage']
    },
    {
      title: 'Setup & Deployment',
      description: 'Deploy your own price feed bridge',
      icon: '🔧',
      href: '/docs/setup',
      items: ['Prerequisites', 'Installation', 'Configuration', 'Deployment']
    },
    {
      title: 'Security',
      description: 'Security considerations and best practices',
      icon: '🛡️',
      href: '/docs/security',
      items: ['Access Control', 'Data Integrity', 'Best Practices']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Complete guide to implementing cross-chain Chainlink price feeds using ReactiveAggregatorV3Interface
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Start */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
            <p className="text-blue-100 mb-6">
              Get your cross-chain price feed bridge up and running in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/docs/getting-started"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center"
              >
                Read Overview
                <span className="ml-2">→</span>
              </Link>
              <Link 
                href="/docs/setup"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center"
              >
                Start Building
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => {
            return (
              <Link
                key={section.title}
                href={section.href}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg group"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <span className="text-2xl">{section.icon}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {section.description}
                    </p>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://github.com/NatX223/ReactiveAggregatorV3Interface"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GitHub Repository</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">View source code and contribute</p>
            </a>

            <a
              href="https://reactive.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reactive Network</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Learn about the underlying infrastructure</p>
            </a>

            <a
              href="https://chain.link/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Chainlink Docs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">AggregatorV3Interface reference</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;