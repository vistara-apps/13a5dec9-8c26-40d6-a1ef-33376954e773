'use client';

import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface CTAButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'disabled';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CTAButton({ 
  children, 
  variant, 
  onClick, 
  disabled = false,
  className = '' 
}: CTAButtonProps) {
  const baseClasses = 'w-full py-3 px-4 font-medium rounded-md transition-all duration-150 text-center';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:opacity-90 active:scale-98',
    secondary: 'bg-surface text-text border hover:bg-gray-50',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
  };

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled || variant === 'disabled'}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
}
