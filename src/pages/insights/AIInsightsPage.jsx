import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  Lightbulb,
  ArrowRight,
  Route,
  Navigation
} from 'lucide-react';

// TODO: Backend endpoint GET /api/insights is missing. Preserving UI with mock insights data.
export const AIInsightsPage = () => {
  const [filter, setFilter] = useState('all');

  const insights = [
    {
      id: 'INS-101',
      category: 'Green Wave Corridor',
      type: 'Opportunity',
      title: 'Hyderabad Outer Ring Road Green Wave Sync',
      impact: '+18 Mins Saved',
      confidence: 98,
      desc: 'AI traffic signal synchronization along Hitec City to Airport tollway provides unbroken 80 km/h green wave corridor.',
      action: 'Depart between 08:30 AM and 09:00 AM to capture synchronized signal green wave.',
      severity: 'high'
    },
    {
      id: 'INS-102',
      category: 'Expressway Bottleneck',
      type: 'Risk Alert',
      title: 'Delhi-Gurugram Expressway Construction Delay',
      impact: '+24 Mins Traffic Latency',
      confidence: 94,
      desc: 'Flyover widening near IGI Airport exit will surge peak morning traffic density by 38%.',
      action: 'Reroute via Dwarka Expressway secondary corridor to bypass surge.',
      severity: 'medium'
    },
    {
      id: 'INS-103',
      category: 'Fuel Optimization',
      type: 'Efficiency Gain',
      title: 'Mumbai Sea Link Eco-Speed Mode',
      impact: '+28% Fuel Efficiency',
      confidence: 96,
      desc: 'Maintaining 70 km/h steady speed across Bandra-Worli Sea Link lowers fuel consumption per trip.',
      action: 'Enable cruise control mode across Sea Link bridge section.',
      severity: 'low'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black font-mono text-blue-600 uppercase tracking-widest">TRAFFIC RADAR</span>
            <Badge variant="accent" size="sm" icon={Sparkles}>Live Mobility Signals</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Mobility Insights & Traffic Signals
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-1">
            Real-time AI traffic predictions, green wave opportunities, and congestion warnings
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-blue-500/25 shadow-sm">
          {['all', 'Opportunity', 'Risk Alert'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filter === f ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm' : 'text-slate-700 hover:text-blue-700'
              }`}
            >
              {f === 'all' ? 'All Signals' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-6">
        {insights.map((item) => (
          <Card key={item.id} glow className="p-6 border-blue-500/30 glass-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-black text-blue-700">{item.id}</span>
                <Badge variant={item.type === 'Opportunity' ? 'success' : 'danger'} size="sm">
                  {item.type}
                </Badge>
                <span className="text-xs font-black text-slate-800">{item.category}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-black">
                <span className="text-emerald-700 font-extrabold">{item.impact}</span>
                <span className="text-blue-700">Precision: {item.confidence}%</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed font-bold">{item.desc}</p>
            </div>

            {/* RECOMMENDED ACTION Callout Box */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-700 font-black shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest">RECOMMENDED ACTION</span>
                  <p className="text-xs font-black text-slate-900">{item.action}</p>
                </div>
              </div>
              <Button variant="primary" size="sm" icon={ArrowRight} className="shrink-0">
                Apply Route Action
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
