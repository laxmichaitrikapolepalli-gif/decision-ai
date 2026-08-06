import React from 'react';

export const RiskMeter = ({ score = 25, label = 'Risk Level' }) => {
  // Score 0-100: Low (0-30), Medium (31-65), High (66-100)
  const getSeverity = (val) => {
    if (val <= 30) return { text: 'Low Risk', color: 'text-emerald-400', bar: 'bg-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (val <= 65) return { text: 'Moderate Risk', color: 'text-amber-400', bar: 'bg-amber-500', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { text: 'High Risk', color: 'text-rose-400', bar: 'bg-rose-500', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const severity = getSeverity(score);

  return (
    <div className={`p-4 rounded-2xl border ${severity.bg} flex flex-col gap-2`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        <span className={`text-sm font-bold ${severity.color}`}>{severity.text}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
        <span className="text-xs text-slate-400">/ 100 Risk Index</span>
      </div>
      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div className={`h-full transition-all duration-700 ${severity.bar}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};

export const ConfidenceMeter = ({ score = 94, label = 'AI Confidence Score' }) => {
  return (
    <div className="p-4 rounded-2xl border bg-indigo-500/10 border-indigo-500/30 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        <span className="text-xs font-bold text-indigo-400">Highly Reliable</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-white tracking-tight">{score}%</span>
        <span className="text-xs text-slate-400">Model Precision</span>
      </div>
      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};
