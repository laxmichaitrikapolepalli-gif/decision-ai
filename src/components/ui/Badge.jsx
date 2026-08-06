import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const variants = {
    primary: 'bg-purple-500/15 text-purple-700 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    secondary: 'bg-pink-500/15 text-pink-700 border-pink-400/40 shadow-[0_0_15px_rgba(236,72,153,0.2)]',
    accent: 'bg-blue-500/15 text-blue-700 border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]',
    success: 'bg-emerald-500/15 text-emerald-700 border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    warning: 'bg-amber-500/15 text-amber-800 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    danger: 'bg-rose-500/15 text-rose-700 border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
    neutral: 'bg-white/60 text-slate-800 border-slate-300',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs font-bold gap-1',
    md: 'px-3 py-1 text-xs font-extrabold gap-1.5',
    lg: 'px-4 py-1.5 text-sm font-black gap-2 tracking-wide',
  };

  return (
    <span className={`inline-flex items-center rounded-full border backdrop-blur-md ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
