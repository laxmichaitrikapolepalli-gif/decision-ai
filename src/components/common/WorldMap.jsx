import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Activity, Sparkles, MapPin, Zap } from 'lucide-react';

export const WorldMap = () => {
  const [selectedCluster, setSelectedCluster] = useState('APAC');

  const clusters = [
    { id: 'APAC', name: 'APAC Node (Hyderabad / Singapore)', status: 'Active', latency: '0.4ms', nodes: 142, load: '38%' },
    { id: 'AMER', name: 'AMER Node (North America)', status: 'Active', latency: '0.6ms', nodes: 280, load: '45%' },
    { id: 'EMEA', name: 'EMEA Node (Frankfurt / London)', status: 'Active', latency: '0.8ms', nodes: 195, load: '41%' },
  ];

  return (
    <Card glow className="p-8 border-[#6C63FF]/20 glass-card bg-white/95 space-y-6 rounded-3xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-[#6C63FF] uppercase tracking-widest">LIVE NEURAL TELEMETRY</span>
            <Badge variant="success" size="sm" icon={Activity}>10,000 Monte Carlo Iterations / sec</Badge>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-['Space_Grotesk'] mt-1">
            Global Enterprise Telemetry Radar
          </h3>
          <p className="text-xs font-semibold text-[#64748B] mt-1">
            Real-time monitoring of strategic decision nodes, neural latency, and regional market sentiment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-xs font-black text-[#10B981]">All Neural Clusters Online</span>
        </div>
      </div>

      {/* Cluster Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {clusters.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCluster(c.id)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedCluster === c.id
                ? 'bg-gradient-to-r from-[#FF2DAA]/10 to-[#6C63FF]/10 border-[#6C63FF] text-[#6C63FF] shadow-md'
                : 'bg-slate-50 border-slate-200 text-[#0F172A] hover:border-[#6C63FF]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-black">{c.id}</span>
              <Badge variant="success" size="sm">{c.status}</Badge>
            </div>
            <h5 className="text-xs font-black text-[#0F172A] truncate">{c.name}</h5>
            <div className="flex items-center justify-between text-[10px] text-[#64748B] font-bold mt-2">
              <span>Latency: {c.latency}</span>
              <span>Load: {c.load}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Telemetry Box */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-black text-[#6C63FF] uppercase tracking-widest">CLUSTER STATUS</span>
          <h4 className="text-lg font-black text-[#0F172A]">APAC Neural Core (Hyderabad)</h4>
          <p className="text-xs text-[#64748B] font-semibold">142 Dedicated neural compute nodes evaluating Tier-1 expansion options.</p>
        </div>

        <div className="space-y-1 text-center md:border-x border-slate-200 px-4">
          <span className="text-[10px] font-mono font-black text-[#6C63FF] uppercase tracking-widest">MODEL ACCURACY</span>
          <div className="text-3xl font-black text-[#10B981] font-['Space_Grotesk']">98.4%</div>
          <p className="text-xs text-[#64748B] font-semibold">P95 Confidence Bounds</p>
        </div>

        <div className="space-y-1 text-right">
          <span className="text-[10px] font-mono font-black text-[#6C63FF] uppercase tracking-widest">SUB-SECOND LATENCY</span>
          <div className="text-3xl font-black text-[#FF2DAA] font-['Space_Grotesk']">0.4 ms</div>
          <p className="text-xs text-[#64748B] font-semibold">Instant Scenario Recalculation</p>
        </div>
      </div>
    </Card>
  );
};
