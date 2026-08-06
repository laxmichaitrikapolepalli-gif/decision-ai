import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${
        glow ? 'border-indigo-500/30 shadow-[0_0_25px_-5px_rgba(99,102,241,0.2)]' : 'border-slate-800/80'
      } ${onClick ? 'cursor-pointer hover:border-indigo-500/40' : ''} ${className}`}
      {...props}
    >
      {glow && (
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
};
