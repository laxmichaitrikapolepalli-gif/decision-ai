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
        <label className="text-xs font-black uppercase tracking-wider text-slate-800">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full rounded-2xl bg-white border border-purple-500/25 text-slate-900 px-4 py-3 text-sm font-bold transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none shadow-sm ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-slate-900 font-medium">
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      {error && <span className="text-xs text-rose-600 font-bold">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
