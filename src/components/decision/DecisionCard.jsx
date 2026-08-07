import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecision } from '../../contexts/DecisionContext';
import { Card } from '../ui/Card';
import { Calendar, ArrowUpRight } from 'lucide-react';

export const DecisionCard = ({ decision }) => {
  const navigate = useNavigate();
  const { setCurrentDecision } = useDecision();

  if (!decision) return null;

  const handleCardClick = () => {
    setCurrentDecision(decision);
    const decId = decision.id || decision._id || 'DEC-2026-089';
    navigate(`/decisions/result/${decId}`);
  };

  const getRiskColor = (risk) => {
    const r = String(risk || '').toLowerCase();
    if (r.includes('high')) return 'bg-rose-100 text-rose-700 border-rose-200';
    if (r.includes('medium') || r.includes('moderate')) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  const getStatusColor = (status) => {
    const s = String(status || '').toLowerCase();
    if (s.includes('approved')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const decId = decision.id || decision._id || 'DEC-2026-089';
  const tag = decision.tag || decision.domain || decision.category || 'Market Growth';
  const title = decision.title || decision.recommendation || decision.bestRoute || 'Strategic Decision Evaluation';
  const confidence = typeof decision.confidence === 'number' ? `${decision.confidence}%` : (decision.confidence || (decision.confidenceScore ? `${decision.confidenceScore}%` : '96%'));
  const risk = decision.risk || decision.trafficLevel || 'Low';
  const roi = decision.roi || decision.fuelEfficiency || '+38%';
  const date = decision.date || (decision.created_at ? new Date(decision.created_at).toISOString().split('T')[0] : '2026-08-04');
  const status = decision.status || 'Approved';

  return (
    <Card
      onClick={handleCardClick}
      className="p-5 border-slate-100 glass-card space-y-3 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-slate-500">{decId}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
            {tag}
          </span>
        </div>
        <div className="p-1.5 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-[#6C63FF] group-hover:text-white transition-all">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      <h4 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#6C63FF] transition-colors truncate">
        {title}
      </h4>

      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs">
        <div>
          <span className="text-[9px] text-[#64748B] uppercase font-bold block">CONFIDENCE</span>
          <span className="font-extrabold text-[#0F172A]">{confidence}</span>
        </div>
        <div>
          <span className="text-[9px] text-[#64748B] uppercase font-bold block">RISK</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${decision.riskColor || getRiskColor(risk)}`}>
            {risk}
          </span>
        </div>
        <div>
          <span className="text-[9px] text-[#64748B] uppercase font-bold block">EST. ROI</span>
          <span className="font-extrabold text-[#0F172A]">{roi}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#64748B] pt-1 font-semibold">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-purple-500" /> {date}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${decision.statusColor || getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </Card>
  );
};
