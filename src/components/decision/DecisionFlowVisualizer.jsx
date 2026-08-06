import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  Database,
  Cpu,
  Activity,
  CheckCircle2,
  Sparkles,
  Layers,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export const DecisionFlowVisualizer = () => {
  const [activeStage, setActiveStage] = useState(3);

  const stages = [
    {
      id: 1,
      stepNum: '01',
      title: '1. Raw Ingestion',
      subtitle: '10,000 Data Streams/sec',
      badgeLabel: '10,000 Data Streams/sec',
      heading: 'High-Velocity Data Ingestion',
      desc: 'Real-time ingestion of financial statements, market feeds, supply chain logs, and unstructured executive memos into vector memory.',
      icon: Database,
      nodeTitle: 'Raw Ingestion Buffer',
      status: 'Status: Ingesting 0.2ms',
    },
    {
      id: 2,
      stepNum: '02',
      title: '2. Neural Analysis',
      subtitle: '99.2% Vector Extraction',
      badgeLabel: '99.2% Vector Extraction',
      heading: 'Multivariate Vector Extraction',
      desc: 'Extracts strategic constraints, CapEx thresholds, labor arbitrage parameters, and tax subsidy metrics via fine-tuned enterprise LLMs.',
      icon: Cpu,
      nodeTitle: 'Neural Processing Cluster',
      status: 'Status: Extracted 0.3ms',
    },
    {
      id: 3,
      stepNum: '03',
      title: '3. Monte Carlo Engine',
      subtitle: 'P95 Confidence Calculated',
      badgeLabel: 'P95 Confidence Calculated',
      heading: '10,000 Stochastic Iterations',
      desc: 'Simulates market fluctuations, supply chain delays, and interest rate spikes to calculate risk bounds.',
      icon: Activity,
      nodeTitle: 'Quantum Node Simulation',
      status: 'Status: Processing 0.4ms',
    },
    {
      id: 4,
      stepNum: '04',
      title: '4. Action Matrix',
      subtitle: '+35% Risk Reduction',
      badgeLabel: '+35% Risk Reduction',
      heading: 'Deterministic Action Matrix',
      desc: 'Transforms complex multi-criteria tradeoffs into clear executive recommendations, SWOT matrixes, and actionable timelines.',
      icon: CheckCircle2,
      nodeTitle: 'Executive Decision Output',
      status: 'Status: Generated 0.1ms',
    }
  ];

  const current = stages.find(s => s.id === activeStage) || stages[2];

  return (
    <Card glow className="p-8 border-slate-100 glass-card bg-white space-y-8 rounded-3xl shadow-xl max-w-6xl mx-auto">
      
      {/* Header exact matching screenshot 4 */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-bold border border-[#6C63FF]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
          <span>Interactive Architecture</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-['Space_Grotesk'] leading-tight">
          <span className="bg-gradient-to-r from-[#FF2DAA] via-[#8B5CF6] to-[#4F7DFF] bg-clip-text text-transparent">
            Decision Intelligence Workflow
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-[#64748B] font-medium max-w-xl mx-auto">
          Watch how raw complexity transforms into deterministic enterprise action in sub-second latency.
        </p>
      </div>

      {/* 4 Pipeline Stage Tabs Bar exact matching screenshot 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF2DAA]/15 via-[#8B5CF6]/15 to-[#4F7DFF]/15 border-[#6C63FF] shadow-lg shadow-[#6C63FF]/10 scale-[1.02]'
                  : 'bg-white border-slate-200 hover:border-[#6C63FF]/40 text-[#0F172A]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-md'
                    : 'bg-slate-50 border border-slate-200 text-[#6C63FF]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{stage.title}</h4>
                  <p className="text-[11px] font-medium text-[#64748B] mt-0.5">{stage.subtitle}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Sub-Card exact matching screenshot 4 */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-lg">
        
        {/* Left Info Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-[10px] font-extrabold uppercase tracking-widest border border-[#6C63FF]/20">
              STAGE {current.stepNum}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold border border-blue-200">
              {current.badgeLabel}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">
            {current.heading}
          </h3>

          <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed max-w-xl">
            {current.desc}
          </p>

          <div className="flex items-center gap-6 pt-2 text-xs font-bold text-[#0F172A]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#6C63FF]" />
              <span>Automatic Vectorization</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF2DAA]" />
              <span>Real-time Telemetry</span>
            </div>
          </div>
        </div>

        {/* Right Side Visual Node Box exact matching screenshot 4 */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 border border-purple-200/60 text-center space-y-3 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-white border border-purple-300/60 flex items-center justify-center mx-auto shadow-md shadow-purple-500/10">
            <Activity className="w-7 h-7 text-[#6C63FF]" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-[#0F172A]">{current.nodeTitle}</h5>
            <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
              {current.status}
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};
