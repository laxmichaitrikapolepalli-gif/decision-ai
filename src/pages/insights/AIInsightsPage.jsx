import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

// TODO: Backend endpoint GET /api/insights is missing. Preserving UI with mock insights data.
export const AIInsightsPage = () => {
  const [filter, setFilter] = useState('all');

  const insights = [
    {
      id: 'INS-101',
      category: 'Real Estate Arbitrage',
      type: 'Opportunity',
      title: 'Hyderabad Tech Corridor Lease Rate Subsidy',
      impact: '+$1.4M Capital Savings',
      confidence: 96,
      desc: 'Municipal tax credit policy for Tier-1 technology hardware nodes lowers 5-year lease overhead by 18% compared to Bangalore Whitefield.',
      action: 'Finalize LOI before Q3 municipal fiscal deadline to capture tax exemption.',
      severity: 'high'
    },
    {
      id: 'INS-102',
      category: 'Supply Chain Bottleneck',
      type: 'Risk Alert',
      title: 'APAC Maritime Logistics Delay Risk',
      impact: '-14 Days Transit Latency',
      confidence: 91,
      desc: 'Predicted Typhoon congestion along Singapore straits will disrupt primary component delivery.',
      action: 'Execute secondary air-freight contract for top 20% critical inventory SKUs.',
      severity: 'medium'
    },
    {
      id: 'INS-103',
      category: 'Talent Acquisition',
      type: 'Efficiency Gain',
      title: 'AI Engineering Cost Arbitrage',
      impact: '+22% Hiring Velocity',
      confidence: 94,
      desc: 'Senior Machine Learning Engineer availability in Hyderabad expanded 34% YoY with 12% lower compensation baseline.',
      action: 'Direct talent acquisition hub setup to Hyderabad R&D center.',
      severity: 'low'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black font-mono text-purple-400 uppercase tracking-widest">AUTONOMOUS RISK RADAR</span>
            <Badge variant="accent" size="sm" icon={Sparkles}>Live Neural Insights</Badge>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Executive AI Insights & Signals
          </h1>
          <p className="text-xs font-semibold text-slate-300 mt-1">
            Real-time strategic opportunities, risk alerts, and operational recommendations
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-purple-500/25 shadow-sm">
          {['all', 'Opportunity', 'Risk Alert'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filter === f ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-purple-300'
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
          <Card key={item.id} glow className="p-6 border-purple-500/30 glass-card bg-slate-900/80 space-y-4 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-black text-purple-400">{item.id}</span>
                <Badge variant={item.type === 'Opportunity' ? 'success' : 'danger'} size="sm">
                  {item.type}
                </Badge>
                <span className="text-xs font-black text-slate-300">{item.category}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-black">
                <span className="text-emerald-400 font-extrabold">{item.impact}</span>
                <span className="text-purple-400">Confidence: {item.confidence}%</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-medium">{item.desc}</p>
            </div>

            {/* RECOMMENDED ACTION Callout Box */}
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 font-black shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">RECOMMENDED ACTION</span>
                  <p className="text-xs font-black text-white">{item.action}</p>
                </div>
              </div>
              <Button variant="primary" size="sm" icon={ArrowRight} className="shrink-0">
                Execute Action
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
