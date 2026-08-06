import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Globe, Sparkles, TrendingUp, ShieldCheck, Activity, Brain, Target, Layers } from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export const WorldMap = () => {
  const [selectedHub, setSelectedHub] = useState({
    id: 'HYD',
    name: 'Hyderabad Tech Hub',
    status: 'Optimal Low Risk (P95)',
    score: 96,
    roi: '+38%',
    payback: '14.2 Months',
    desc: 'Senior ML talent density expanded 34% YoY with 18% lower lease overhead via municipal tax subsidies.'
  });

  const hubs = [
    { id: 'HYD', name: 'Hyderabad Node', status: 'Optimal Low Risk', score: 96, roi: '+38%', payback: '14.2 Months', desc: 'Senior ML talent density expanded 34% YoY with 18% lower lease overhead via municipal tax subsidies.' },
    { id: 'BLR', name: 'Bangalore Node', status: 'Moderate Yield', score: 88, roi: '+32%', payback: '18.4 Months', desc: 'High talent density offset by elevated CRE lease overhead and longer payback horizon.' },
    { id: 'MUM', name: 'Mumbai Financial Node', status: 'High Capital Yield', score: 94, roi: '+42%', payback: '15.1 Months', desc: 'Direct proximity to capital markets with robust regulatory compliance bounds.' },
    { id: 'DEL', name: 'Delhi NCR Node', status: 'Regulatory Hub', score: 90, roi: '+29%', payback: '17.0 Months', desc: 'High government policy alignment with strong regional infrastructure.' }
  ];

  const miniChartData = [
    { val: 65 }, { val: 78 }, { val: 82 }, { val: 90 }, { val: 96 }
  ];

  return (
    <Card glow className="p-8 border-purple-500/30 glass-card rounded-3xl bg-slate-900/80 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-400 uppercase tracking-widest">STRATEGIC NODE TELEMETRY</span>
            <Badge variant="primary" size="sm" icon={Brain}>Decision Intelligence Radar</Badge>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight font-['Space_Grotesk'] mt-1">
            Global Enterprise Telemetry & Node Analysis
          </h3>
        </div>

        <Badge variant="accent" size="md">Sub-Second Neural Latency</Badge>
      </div>

      {/* Hub Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {hubs.map((hub) => (
          <button
            key={hub.id}
            onClick={() => setSelectedHub(hub)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedHub.id === hub.id
                ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-purple-500 text-white shadow-lg'
                : 'bg-slate-950 border-purple-500/20 text-slate-300 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-purple-400 font-mono">{hub.id}</span>
              <Badge variant="success" size="sm">{hub.score}%</Badge>
            </div>
            <p className="text-xs font-black truncate text-white">{hub.name}</p>
            <p className="text-[10px] font-bold text-slate-400 truncate">{hub.roi} ROI</p>
          </button>
        ))}
      </div>

      {/* Active Node Detail Card */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-purple-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] font-mono font-black border border-purple-400/30">
              NODE ACTIVE: {selectedHub.id}
            </span>
            <Badge variant="success" size="sm">{selectedHub.status}</Badge>
          </div>
          <h4 className="text-xl font-black text-white">{selectedHub.name}</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">{selectedHub.desc}</p>
          <div className="pt-2 flex items-center gap-4 text-xs font-black text-purple-400">
            <span>Payback: <strong className="text-emerald-400">{selectedHub.payback}</strong></span>
            <span>Expected ROI: <strong className="text-emerald-400">{selectedHub.roi}</strong></span>
          </div>
        </div>

        <div className="h-28 w-full p-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-black uppercase">Neural Convergence Trajectory</span>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={miniChartData}>
              <Area type="monotone" dataKey="val" stroke="#A855F7" fill="#A855F7" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
