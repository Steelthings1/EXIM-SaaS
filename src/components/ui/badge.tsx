import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'indigo' | 'amber' | 'rose' | 'slate';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({ variant = 'indigo', size = 'md', children, className = '', ...props }: BadgeProps) {
  const variantStyles = {
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-800/60 text-slate-300 border-slate-700/60',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-semibold rounded-lg border backdrop-blur-sm transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
