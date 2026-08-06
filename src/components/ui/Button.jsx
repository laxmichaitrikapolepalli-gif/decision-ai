import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden leading-[1.2] tracking-[0.2px] text-center shrink-0 cursor-pointer shadow-md selection:bg-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] hover:from-[#FF2DAA] hover:to-[#5B52E0] text-white border-none shadow-lg shadow-[#6C63FF]/25 hover:shadow-[0_0_35px_rgba(108,99,255,0.45)] focus:ring-[#6C63FF]",
    secondary: "bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200 hover:border-[#6C63FF]/40 shadow-sm focus:ring-[#6C63FF]",
    accent: "bg-gradient-to-r from-[#4F7DFF] to-[#8B5CF6] hover:from-[#3F6DEE] hover:to-[#7B4CE6] text-white shadow-md shadow-[#4F7DFF]/25 border-none focus:ring-[#4F7DFF]",
    success: "bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] text-white shadow-md shadow-[#10B981]/25 border-none",
    danger: "bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] text-white shadow-md shadow-[#EF4444]/25 border-none focus:ring-[#EF4444]",
    ghost: "bg-transparent hover:bg-slate-100 text-[#0F172A] hover:text-[#6C63FF] border border-transparent focus:ring-[#6C63FF]",
    glass: "glass-card hover:bg-white text-[#0F172A] border border-slate-200 hover:border-[#6C63FF]/40 focus:ring-[#6C63FF]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5 font-bold rounded-[12px]",
    md: "px-5 py-2.5 text-sm gap-2 font-bold rounded-[14px]",
    lg: "px-7 py-3.5 text-base gap-2.5 font-bold rounded-[16px]",
    xl: "px-9 py-4 text-[18px] gap-3 font-bold rounded-[16px] shadow-2xl tracking-[0.2px] leading-[1.2]",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="w-5 h-5 shrink-0" />
      ) : null}
      <span className="inline-block leading-[1.2] text-center">{children}</span>
    </motion.button>
  );
};
