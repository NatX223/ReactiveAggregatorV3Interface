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
            Discover how ReactiveAggregator enables reliable price feeds across any blockchain. From DeFi protocols to cross-chain applications, unlock the power of universal price data access.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;