import React from "react";
import { WORKFLOW_STEPS } from "@/lib/constants";
import StepCard from "@/components/ui/StepCard";

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Bridge Chainlink price feed data to any blockchain in four seamless
            steps. Monitor, extract, relay, and store price data across chains
            with minimal latency.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <div key={step.id} className="relative">
              <StepCard step={step} />

              {/* Connection Arrow (Desktop only) */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 text-blue-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Connection Arrow (Mobile - Vertical) */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div className="lg:hidden flex justify-center mt-6 mb-2">
                  <div className="w-6 h-6 text-blue-500 transform rotate-90">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Cross-Chain Architecture
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Source Chain */}
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-6 mb-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Source Chain
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Chainlink Supported Networks
                </p>
                <div className="mt-4 space-y-2">
                  <div className="bg-white dark:bg-gray-700 rounded p-2 text-xs">
                    AggregatorV3 Contracts
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded p-2 text-xs">
                    FeedReader
                  </div>
                </div>
              </div>
            </div>

            {/* Reactive Network */}
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-6 mb-4">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Reactive Network
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Event-Driven Bridge
                </p>
                <div className="mt-4 space-y-2">
                  <div className="bg-white dark:bg-gray-700 rounded p-2 text-xs">
                    AggReactive
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded p-2 text-xs">
                    ReactiveProxy
                  </div>
                </div>
              </div>
            </div>

            {/* Destination Chain */}
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-lg p-6 mb-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Destination Chain
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Any Blockchain Network
                </p>
                <div className="mt-4 space-y-2">
                  <div className="bg-white dark:bg-gray-700 rounded p-2 text-xs">
                    FeedProxy
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded p-2 text-xs">
                    Consumer Contracts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to bring Chainlink price feeds to any blockchain?
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            Deploy Price Reader
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
