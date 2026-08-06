import React from 'react';
import { Layers } from 'lucide-react';

export const EmptyState = ({ title = 'No data available', description = 'There are no records found at this time.' }) => {
  return (
    <div className="p-8 rounded-3xl glass-card border border-purple-500/20 text-center space-y-3 shadow-sm my-4">
      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-600 flex items-center justify-center mx-auto">
        <Layers className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-base font-black text-slate-900">{title}</h3>
        <p className="text-xs text-slate-700 font-extrabold mt-1 max-w-md mx-auto">{description}</p>
      </div>
    </div>
  );
};
