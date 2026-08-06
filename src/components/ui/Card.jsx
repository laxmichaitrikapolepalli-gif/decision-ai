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
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : {}}
      onClick={onClick}
      className={`glass-card rounded-[28px] p-6 relative overflow-hidden transition-all duration-300 bg-white/95 border border-[#6C63FF]/15 ${
        glow ? 'border-[#FF2DAA]/30 shadow-xl shadow-[#FF2DAA]/10' : 'shadow-md shadow-[#6C63FF]/05'
      } ${onClick ? 'cursor-pointer hover:border-[#6C63FF]/40 hover:shadow-xl' : ''} ${className}`}
      {...props}
    >
      {glow && (
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF2DAA]/10 rounded-full blur-2xl pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
};
