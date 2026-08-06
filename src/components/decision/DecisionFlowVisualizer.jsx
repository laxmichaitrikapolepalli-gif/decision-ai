import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  Brain,
  Sliders,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const DecisionFlowVisualizer = () => {
  const [activeStage, setActiveStage] = useState(2);

  const stages = [
    {
      id: 1,
      title: 'Stage 1: Raw Parameter Ingestion',
      subtitle: 'NLP & Strategic Dictation',
      desc: 'Ingests strategic options, CapEx bounds, voice memos, and document attachments into encrypted vector buffers.',
      icon: Layers,
      color: 'from-[#FF2DAA] to-[#6C63FF]'
    },
    {
      id: 2,
      title: 'Stage 2: Neural Risk & SWOT Modeling',
      subtitle: 'Multivariate Vector Analysis',
      desc: 'Evaluates real estate overhead, talent availability, tax credit subsidies, and supply chain friction across 7 quantitative vectors.',
      icon: Brain,
      color: 'from-[#6C63FF] to-[#4F7DFF]'
    },
    {
      id: 3,
      title: 'Stage 3: Monte Carlo Simulator',
      subtitle: '10,000 Stochastic Iterations',
      desc: 'Runs high-frequency variance simulations under P95 confidence bounds to stress-test budget and timeline limits.',
      icon: Sliders,
      color: 'from-[#4F7DFF] to-[#8B5CF6]'
    },
    {
      id: 4,
      title: 'Stage 4: Action Matrix Generation',
      subtitle: 'Executive AI Recommendation',
      desc: 'Generates definitive strategic recommendations, expected outcome ROI, action plan timelines, and PDF briefings.',
      icon: ShieldCheck,
      color: 'from-[#10B981] to-[#34D399]'
    }
  ];

  return (
    <Card glow className="p-8 border-[#6C63FF]/20 glass-card bg-white/95 space-y-8 rounded-3xl shadow-lg">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary" size="md" icon={Zap} className="mb-2 bg-[#6C63FF]/15 text-[#6C63FF] border-[#6C63FF]/30 font-bold">
          4-Stage Decision Intelligence Architecture
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Decision Intelligence Workflow Pipeline
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] font-semibold">
          From raw executive inputs to deterministic high-confidence outcomes in sub-second latency
        </p>
      </div>

      {/* Interactive Stage Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF2DAA]/10 to-[#6C63FF]/10 border-[#6C63FF] text-[#6C63FF] shadow-md scale-[1.02]'
                  : 'bg-slate-50 border-slate-200 text-[#0F172A] hover:border-[#6C63FF]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${stage.color} text-white shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#6C63FF]">STEP 0{stage.id}</span>
              </div>
              <h4 className="text-sm font-black text-[#0F172A]">{stage.title}</h4>
              <p className="text-[11px] text-[#6C63FF] font-bold mt-0.5">{stage.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-sm">
        <div className="md:col-span-2 space-y-2">
          <Badge variant="success" size="sm">Active Stage Processing</Badge>
          <h3 className="text-2xl font-black text-[#0F172A] font-['Space_Grotesk']">
            {stages[activeStage - 1].title}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] font-semibold leading-relaxed">
            {stages[activeStage - 1].desc}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#6C63FF]/20 text-center space-y-2 shadow-sm">
          <span className="text-[10px] font-mono font-black text-[#6C63FF] uppercase tracking-widest">STAGE PERFORMANCE</span>
          <div className="text-3xl font-black text-[#6C63FF] font-['Space_Grotesk']">0.4ms</div>
          <span className="text-xs font-black text-[#10B981] block">Sub-second Latency</span>
        </div>
      </div>
    </Card>
  );
};
