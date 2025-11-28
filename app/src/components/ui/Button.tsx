import React from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  external = false,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-clash font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500 bg-transparent'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl'
  };
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          {...props}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;