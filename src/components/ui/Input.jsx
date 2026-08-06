import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  containerClassName = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-xs font-black uppercase tracking-wider text-slate-800">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-purple-600 pointer-events-none">
            <Icon className="w-4.5 h-4.5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full rounded-2xl bg-white border border-purple-500/25 text-slate-900 placeholder-slate-400 px-4 py-3 text-sm font-bold transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none shadow-sm ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-rose-600 font-bold">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
