import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const ActionPlanTimeline = ({ plan }) => {
  const defaultPlan = (plan && plan.length > 0) ? plan : [
    { step: 1, title: 'Finalize Municipal Tax Exemption LOI', duration: '30 Days', status: 'In Progress' },
    { step: 2, title: 'CapEx Funding Allocation (₹1.8M)', duration: '60 Days', status: 'Pending' },
    { step: 3, title: 'R&D Talent Acquisition Center Setup', duration: '90 Days', status: 'Pending' },
    { step: 4, title: 'Full Hardware Node Deployment & Launch', duration: '180 Days', status: 'Pending' },
  ];

  return (
    <div className="space-y-4 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-purple-500/20">
      {defaultPlan.map((item, idx) => {
        const isDone = item.status === 'Done';
        const isInProgress = item.status === 'In Progress';

        return (
          <div key={idx} className="relative flex items-start gap-4 pl-10">
            <div
              className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center border text-xs font-black transition-all ${
                isDone
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                  : isInProgress
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-purple-400 animate-pulse'
                  : 'bg-slate-900 text-slate-400 border-purple-500/20'
              }`}
            >
              {isDone ? <CheckCircle2 className="w-4 h-4" /> : item.step}
            </div>

            <div className="flex-1 p-4 rounded-3xl bg-slate-900/80 border border-purple-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
              <div>
                <h5 className="text-xs font-black text-white">{item.title}</h5>
                <span className="text-[10px] text-slate-400 font-bold">Execution Horizon: {item.duration}</span>
              </div>
              <Badge
                variant={isDone ? 'success' : isInProgress ? 'primary' : 'neutral'}
                size="sm"
                className="self-start sm:self-auto"
              >
                {item.status}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};
