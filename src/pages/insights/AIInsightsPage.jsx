import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  Lightbulb,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import toast from 'react-hot-toast';

// TODO: Backend endpoint GET /api/insights is missing. Preserving UI with mock insights data.
export const AIInsightsPage = () => {
  const [filter, setFilter] = useState('all');

  const insights = [
    {
      id: 'INS-101',
      category: 'Real Estate Arbitrage',
      type: 'Opportunity',
      title: 'Hyderabad Tech Corridor Lease Rate Subsidy',
      impactScore: '+₹1.4M Capital Savings',
      confidenceScore: 96,
      desc: 'Municipal tax credit policy for Tier-1 technology hardware nodes lowers 5-year lease overhead by 18% compared to Bangalore Whitefield.',
      action: 'Finalize LOI before Q3 municipal fiscal deadline to capture tax exemption.',
      severity: 'high'
    },
    {
      id: 'INS-102',
      category: 'Supply Chain Bottleneck',
      type: 'Risk Alert',
      title: 'APAC Maritime Logistics Delay Risk',
      impactScore: '-14 Days Transit Latency',
      confidenceScore: 91,
      desc: 'Predicted Typhoon congestion along Singapore straits will disrupt primary component delivery.',
      action: 'Execute secondary air-freight contract for top 20% critical inventory SKUs.',
      severity: 'medium'
    },
    {
      id: 'INS-103',
      category: 'Talent Acquisition',
      type: 'Efficiency Gain',
      title: 'AI Engineering Cost Arbitrage',
      impactScore: '+22% Hiring Velocity',
      confidenceScore: 94,
      desc: 'Senior Machine Learning Engineer availability in Hyderabad expanded 34% YoY with 12% lower compensation baseline.',
      action: 'Direct talent acquisition hub setup to Hyderabad R&D center.',
      severity: 'low'
    }
  ];

  const handleExecuteAction = (item) => {
    toast.success(`Action Executed: ${item.action}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-[#6C63FF] uppercase tracking-widest">AUTONOMOUS RISK RADAR</span>
            <Badge variant="accent" size="sm" icon={Sparkles} className="bg-[#FF2DAA]/10 text-[#FF2DAA] border-[#FF2DAA]/30">Live Neural Insights</Badge>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Executive AI Insights & Signals
          </h1>
          <p className="text-xs font-semibold text-[#64748B] mt-1">
            Real-time strategic opportunity cards, risk alerts, impact scores, and automated execution triggers
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[#6C63FF]/20 shadow-sm">
          {['all', 'Opportunity', 'Risk Alert'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filter === f ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-md' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {f === 'all' ? 'All Insights' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-6">
        {insights.map((item) => (
          <Card key={item.id} glow className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-black text-[#6C63FF]">{item.id}</span>
                <Badge variant={item.type === 'Opportunity' ? 'success' : 'danger'} size="sm">
                  {item.type}
                </Badge>
                <span className="text-xs font-black text-[#0F172A]">{item.category}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-[#10B981] font-black">Impact Score: {item.impactScore}</span>
                <span className="text-[#6C63FF] font-black">Confidence Score: {item.confidenceScore}%</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0F172A]">{item.title}</h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed font-semibold">{item.desc}</p>
            </div>

            {/* RECOMMENDED ACTION Callout Box & Execute Action Button */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#6C63FF]/15 text-[#6C63FF] font-black shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#6C63FF] uppercase tracking-widest">RECOMMENDED STRATEGIC ACTION</span>
                  <p className="text-xs font-black text-[#0F172A]">{item.action}</p>
                </div>
              </div>
              <Button onClick={() => handleExecuteAction(item)} variant="primary" size="sm" icon={ArrowRight} className="shrink-0 bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none shadow-md font-bold">
                Execute Action Button
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
