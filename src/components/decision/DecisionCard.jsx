import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecision } from '../../contexts/DecisionContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, ArrowUpRight } from 'lucide-react';

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
      className="group glass-card border-[#6C63FF]/15 p-5 hover:border-[#6C63FF]/40 cursor-pointer rounded-3xl bg-white/95 shadow-sm hover:shadow-xl transition-all"
      glow={confidenceScore > 95}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono text-[#6C63FF] font-black">{decision.id || 'DEC-101'}</span>
            <Badge variant="primary" size="sm" className="bg-[#6C63FF]/10 text-[#6C63FF]">Decision AI</Badge>
          </div>
          <h4 className="text-base font-black text-[#0F172A] group-hover:text-[#6C63FF] transition-colors line-clamp-1">
            {decisionTitle}
          </h4>
        </div>
        <div className="p-2 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-[#FF2DAA] group-hover:to-[#6C63FF] transition-all shrink-0">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-slate-100 text-xs">
        <div>
          <span className="text-[10px] text-[#64748B] uppercase font-black block">Confidence</span>
          <span className="font-black text-[#6C63FF] text-sm">{confidenceScore}%</span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748B] uppercase font-black block">Risk</span>
          <Badge variant={getRiskVariant(riskLevel)} size="sm">{riskLevel}</Badge>
        </div>
        <div>
          <span className="text-[10px] text-[#64748B] uppercase font-black block">Est. ROI</span>
          <span className="font-black text-[#10B981] text-sm">{decision.roi || decision.fuelEfficiency || '+38%'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#64748B] pt-1 font-bold">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#6C63FF]" />
          <span>{decisionDate}</span>
        </div>
        <Badge variant={statusLabel === 'Approved' || statusLabel === 'Completed' ? 'success' : 'neutral'} size="sm">
          {statusLabel}
        </Badge>
      </div>
    </Card>
  );
};
