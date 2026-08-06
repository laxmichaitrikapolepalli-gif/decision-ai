import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, ArrowUpRight } from 'lucide-react';

export const DecisionCard = ({ decision }) => {
  const navigate = useNavigate();

  const getRiskVariant = (risk) => {
    if (risk === 'Low') return 'success';
    if (risk === 'Medium') return 'warning';
    return 'danger';
  };

  return (
    <Card
      onClick={() => navigate(`/decisions/result/${decision.id}`)}
      className="group glass-card border-purple-500/25 p-5 hover:border-purple-400"
      glow={decision.impact === 'Critical' || decision.confidence > 95}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono text-purple-700 font-black">{decision.id}</span>
            <Badge variant="primary" size="sm">{decision.category}</Badge>
          </div>
          <h4 className="text-base font-black text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
            {decision.title}
          </h4>
        </div>
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-700 group-hover:text-white group-hover:bg-purple-600 transition-all shrink-0">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-purple-500/20 text-xs">
        <div>
          <span className="text-[10px] text-slate-600 uppercase font-black block">Confidence</span>
          <span className="font-black text-purple-700 text-sm">{decision.confidence}%</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-600 uppercase font-black block">Risk</span>
          <Badge variant={getRiskVariant(decision.risk)} size="sm">{decision.risk}</Badge>
        </div>
        <div>
          <span className="text-[10px] text-slate-600 uppercase font-black block">Est. ROI</span>
          <span className="font-black text-emerald-700 text-sm">{decision.roi}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-700 pt-1 font-bold">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-purple-600" />
          <span>{decision.date}</span>
        </div>
        <Badge variant={decision.status === 'Approved' ? 'success' : 'neutral'} size="sm">
          {decision.status}
        </Badge>
      </div>
    </Card>
  );
};
