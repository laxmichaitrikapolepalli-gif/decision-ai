import React from 'react';

export const Skeleton = ({ className = '', variant = 'text' }) => {
  const base = "animate-pulse bg-slate-800/80 rounded-xl";
  const variants = {
    text: "h-4 w-full",
    circular: "rounded-full w-10 h-10",
    rectangular: "h-32 w-full",
  };
  return <div className={`${base} ${variants[variant]} ${className}`} />;
};
