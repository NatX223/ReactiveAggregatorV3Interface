"use client";
import React from 'react';
import { FEATURED_MODULES } from '@/lib/constants';
import ModuleCard from '@/components/ui/ModuleCard';

const FeaturedModulesSection: React.FC = () => {
  return (
    <section id="modules" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Monitoring Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive tools to monitor, track, and automatically replenish your reactive contracts. From real-time balance monitoring to flexible payment options.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_MODULES.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {/* Browse All Modules CTA */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise Solutions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Need custom monitoring for your protocol? We offer enterprise-grade solutions with dedicated support, custom integrations, and SLA guarantees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Contact Sales
              </button>
              <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                View All Tools
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModulesSection;