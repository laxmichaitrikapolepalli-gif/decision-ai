import React, { forwardRef } from 'react';

export const Select = forwardRef(({
  label,
  error,
  options = [],
  className = '',
  containerClassName = '',
  children,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full rounded-2xl bg-white border border-slate-200 text-[#0F172A] px-4 py-3 text-sm font-semibold transition-all focus:border-[#6C63FF] focus:bg-white focus:ring-2 focus:ring-[#6C63FF]/20 focus:outline-none shadow-sm cursor-pointer ${
          error ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-[#0F172A] font-medium">
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      {error && <span className="text-xs text-[#EF4444] font-bold">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
