import React from 'react';
import { ShieldCheck, AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';

export const SWOTCard = ({ swot }) => {
  if (!swot) return null;

  const quadrants = [
    { title: 'Strengths', items: swot.strengths, icon: ShieldCheck, color: 'text-emerald-700', border: 'border-emerald-500/30 bg-emerald-50/70' },
    { title: 'Weaknesses', items: swot.weaknesses, icon: AlertTriangle, color: 'text-amber-800', border: 'border-amber-500/30 bg-amber-50/70' },
    { title: 'Opportunities', items: swot.opportunities, icon: Lightbulb, color: 'text-purple-700', border: 'border-purple-500/30 bg-purple-50/70' },
    { title: 'Threats', items: swot.threats, icon: ShieldAlert, color: 'text-rose-700', border: 'border-rose-500/30 bg-rose-50/70' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quadrants.map((quad, idx) => {
        const Icon = quad.icon;
        return (
          <div key={idx} className={`p-4 rounded-2xl border ${quad.border} space-y-2 shadow-sm`}>
            <div className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${quad.color}`} />
              <h4 className={`text-sm font-black uppercase tracking-wider ${quad.color}`}>{quad.title}</h4>
            </div>
            <ul className="space-y-1.5 pl-1">
              {quad.items?.map((item, i) => (
                <li key={i} className="text-xs font-bold text-slate-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
