import React from 'react';

export const Progress = ({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-blue-500',
    accent: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-400',
    danger: 'bg-gradient-to-r from-rose-600 to-red-500',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1.5">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 ${sizes[size]}`}>
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${variants[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
