import React from 'react';
import { ShieldCheck, AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';

export const SWOTCard = ({ swot }) => {
  const defaultSwot = swot || {
    strengths: ['High ML talent density', '18% municipal tax credit subsidy', 'Rapid payback timeline (14.2 months)'],
    weaknesses: ['Higher initial CapEx requirement ($1.8M)', 'Tight Q3 filing deadline'],
    opportunities: ['First-mover advantage in Tier-1 hardware R&D', 'Regional expansion synergy'],
    threats: ['Potential macro interest rate variance', 'APAC maritime shipping delay risk']
  };

  const quadrants = [
    { title: 'Strengths', items: defaultSwot.strengths, icon: ShieldCheck, color: 'text-emerald-400', border: 'border-emerald-500/30 bg-emerald-500/10' },
    { title: 'Weaknesses', items: defaultSwot.weaknesses, icon: AlertTriangle, color: 'text-amber-400', border: 'border-amber-500/30 bg-amber-500/10' },
    { title: 'Opportunities', items: defaultSwot.opportunities, icon: Lightbulb, color: 'text-purple-400', border: 'border-purple-500/30 bg-purple-500/10' },
    { title: 'Threats', items: defaultSwot.threats, icon: ShieldAlert, color: 'text-rose-400', border: 'border-rose-500/30 bg-rose-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quadrants.map((quad, idx) => {
        const Icon = quad.icon;
        return (
          <div key={idx} className={`p-5 rounded-3xl border ${quad.border} space-y-3 shadow-sm bg-slate-900/80`}>
            <div className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${quad.color}`} />
              <h4 className={`text-xs font-black uppercase tracking-wider ${quad.color}`}>{quad.title}</h4>
            </div>
            <ul className="space-y-2 pl-1">
              {quad.items?.map((item, i) => (
                <li key={i} className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
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
