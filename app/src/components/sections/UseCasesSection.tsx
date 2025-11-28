import React from 'react';
import { USE_CASES } from '@/lib/constants';
import UseCaseCard from '@/components/ui/UseCaseCard';

const UseCasesSection: React.FC = () => {
  return (
    <section id="use-cases" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-World Use Cases
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how Reactive ensures critical blockchain infrastructure stays operational. From DeFi protocols to enterprise systems, discover the power of automated monitoring.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Monitor Your Contracts?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're running a DeFi protocol or building reactive applications, Reactive ensures your contracts stay funded and operational.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Monitoring
            </button>
            <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;