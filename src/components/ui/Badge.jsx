import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const variants = {
    primary: 'bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30 font-bold',
    secondary: 'bg-[#FF2DAA]/10 text-[#FF2DAA] border-[#FF2DAA]/30 font-bold',
    accent: 'bg-[#4F7DFF]/10 text-[#4F7DFF] border-[#4F7DFF]/30 font-bold',
    success: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30 font-bold',
    warning: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30 font-bold',
    danger: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 font-bold',
    neutral: 'bg-slate-100 text-[#0F172A] border-slate-200 font-bold',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px] gap-1',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-4 py-1.5 text-sm gap-2 tracking-wide',
  };

  return (
    <span className={`inline-flex items-center rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
