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
        <label className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#6C63FF] pointer-events-none">
            <Icon className="w-4.5 h-4.5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full rounded-2xl bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 px-4 py-3 text-sm font-semibold transition-all focus:border-[#6C63FF] focus:bg-white focus:ring-2 focus:ring-[#6C63FF]/20 focus:outline-none shadow-sm ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-[#EF4444] font-bold">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
