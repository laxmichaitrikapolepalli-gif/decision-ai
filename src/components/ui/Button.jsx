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
  const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-[16px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden leading-[1.2] tracking-[0.2px] text-center shrink-0 cursor-pointer shadow-xl selection:bg-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 text-white shadow-purple-500/25 border border-white/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] focus:ring-purple-500",
    secondary: "bg-white/70 backdrop-blur-xl hover:bg-white/90 text-slate-900 border border-purple-500/30 hover:border-purple-400 shadow-purple-500/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] focus:ring-purple-500",
    accent: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-blue-500/25 border border-white/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.45)] focus:ring-blue-400",
    success: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/25 border border-white/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]",
    danger: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-rose-500/25 border border-white/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.45)] focus:ring-rose-500",
    ghost: "bg-transparent hover:bg-white/40 text-slate-800 hover:text-purple-600 border border-transparent focus:ring-purple-500",
    glass: "glass-card hover:bg-white/80 text-slate-900 border border-white/60 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] focus:ring-purple-500",
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
      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
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
