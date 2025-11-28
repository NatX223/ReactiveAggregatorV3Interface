import React from 'react';
import { ModuleData } from '@/types';
import Button from './Button';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: ModuleData;
  className?: string;
}

const iconMap: Record<string, string> = {
  clock: '⏰',
  'trending-up': '📈',
  layers: '📊',
  code: '💻',
  wallet: '👛',
  puzzle: '🧩',
  rocket: '🚀'
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, className }) => {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl mb-2">
          {iconMap[module.icon] || '⚡'}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {module.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
        {module.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {module.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => console.log(`Enable ${module.name}`)}
      >
        Enable Module
      </Button>
    </div>
  );
};

export default ModuleCard;