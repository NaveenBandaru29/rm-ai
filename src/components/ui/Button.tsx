import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm dark:bg-brand-500 dark:hover:bg-brand-600',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm',
      outline: 'border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 dark:border-brand-700 dark:text-slate-200 dark:hover:bg-brand-900',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-200 dark:hover:bg-brand-900',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      className,
    ].join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {Icon && iconPosition === 'left' && <Icon className="mr-2 h-5 w-5" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="ml-2 h-5 w-5" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
