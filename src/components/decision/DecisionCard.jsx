import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecision } from '../../contexts/DecisionContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, ArrowUpRight, Sparkles } from 'lucide-react';

export const DecisionCard = ({ decision }) => {
  const navigate = useNavigate();
  const { setCurrentDecision } = useDecision();

  const handleCardClick = () => {
    if (decision) {
      setCurrentDecision(decision);
      navigate(`/decisions/result/${decision.id || decision._id || 'DEC'}`);
    }
  };

  const getRiskVariant = (risk) => {
    const r = String(risk || '').toLowerCase();
    if (r.includes('low') || r.includes('optimal')) return 'success';
    if (r.includes('medium') || r.includes('moderate')) return 'warning';
    return 'danger';
  };

  const decisionTitle = decision.title || decision.bestRoute || decision.recommendation || 'Strategic Decision Evaluation';
  const confidenceScore = decision.confidence || decision.confidenceScore || 96;
  const riskLevel = decision.risk || decision.trafficLevel || 'Low Risk (P95)';
  const decisionDate = decision.date || decision.created_at ? new Date(decision.date || decision.created_at).toLocaleDateString() : 'Today';
  const statusLabel = decision.status || 'Approved';

  return (
    <Card
      onClick={handleCardClick}
      className="group glass-card border-purple-500/25 p-5 hover:border-purple-400 cursor-pointer rounded-3xl bg-slate-900/80"
      glow={confidenceScore > 95}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono text-purple-400 font-black">{decision.id || 'DEC-101'}</span>
            <Badge variant="primary" size="sm">Decision AI</Badge>
          </div>
          <h4 className="text-base font-black text-white group-hover:text-purple-300 transition-colors line-clamp-1">
            {decisionTitle}
          </h4>
        </div>
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-all shrink-0">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-purple-500/20 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-black block">Confidence</span>
          <span className="font-black text-purple-400 text-sm">{confidenceScore}%</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-black block">Risk</span>
          <Badge variant={getRiskVariant(riskLevel)} size="sm">{riskLevel}</Badge>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-black block">Est. ROI</span>
          <span className="font-black text-emerald-400 text-sm">{decision.roi || decision.fuelEfficiency || '+38%'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-300 pt-1 font-bold">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <span>{decisionDate}</span>
        </div>
        <Badge variant={statusLabel === 'Approved' || statusLabel === 'Completed' ? 'success' : 'neutral'} size="sm">
          {statusLabel}
        </Badge>
      </div>
    </Card>
  );
};
