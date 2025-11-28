import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Community Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Stats
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-2">85+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Developers</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Contracts monitored</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-green-600 mb-2">42</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Refills</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;