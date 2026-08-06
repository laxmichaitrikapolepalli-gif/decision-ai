import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Activity, CheckCircle2, ArrowRight, Sparkles, Layers, Brain } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const DecisionFlowVisualizer = () => {
  const steps = [
    {
      id: 1,
      name: '1. Raw Ingestion',
      icon: Database,
      title: 'Multimodal Data Ingestion',
      desc: 'Ingests unstructured financial reports, market telemetry, supply chain news, & voice memos.',
      metric: '10,000 Data Streams/sec'
    },
    {
      id: 2,
      name: '2. Neural Analysis',
      icon: Cpu,
      title: 'Predictive NLP & Spatial Modeling',
      desc: 'Transforms unstructured text into structured parameter vectors with sentiment & tariff weights.',
      metric: '99.2% Vector Extraction'
    },
    {
      id: 3,
      name: '3. Monte Carlo Engine',
      icon: Activity,
      title: '10,000 Stochastic Iterations',
      desc: 'Simulates market fluctuations, supply chain delays, and interest rate spikes to calculate risk bounds.',
      metric: 'P95 Confidence Calculated'
    },
    {
      id: 4,
      name: '4. Action Matrix',
      icon: CheckCircle2,
      title: 'Actionable Intelligence & SWOT',
      desc: 'Generates optimal strategy recommendation, execution timeline, and alternative scorecards.',
      metric: '+35% Risk Reduction'
    }
  ];

  const [activeStep, setActiveStep] = useState(3);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-10 border border-purple-500/30 relative overflow-hidden bg-slate-900/80">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <Badge variant="primary" size="md" icon={Sparkles} className="mb-2">
          Interactive Architecture
        </Badge>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Decision Intelligence Workflow
        </h2>
        <p className="text-sm font-semibold text-slate-300">
          Watch how raw complexity transforms into deterministic enterprise action in sub-second latency.
        </p>
      </div>

      {/* Steps Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {steps.map((s) => {
          const Icon = s.icon;
          const isSelected = activeStep === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-purple-500 text-white shadow-xl scale-[1.02]'
                  : 'bg-slate-950/60 border-purple-500/20 text-slate-300 hover:text-purple-300 hover:border-purple-400'
              }`}
            >
              <div className={`p-2.5 rounded-xl border ${isSelected ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-purple-400' : 'bg-slate-900 border-purple-500/20 text-purple-400'}`}>
                <Icon className="w-4.5 h-4.5 shrink-0" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black truncate text-white">{s.name}</p>
                <p className="text-[11px] font-bold text-slate-400 truncate">{s.metric}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Visualizer Box */}
      <AnimatePresence mode="wait">
        {steps.map((s) => {
          if (s.id !== activeStep) return null;
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xl"
            >
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-purple-500/15 text-purple-300 text-xs font-mono font-black border border-purple-400/30">
                    STAGE 0{s.id}
                  </span>
                  <Badge variant="accent" size="sm">{s.metric}</Badge>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">{s.title}</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">{s.desc}</p>
                <div className="pt-2 flex items-center gap-4 text-xs font-extrabold text-purple-400">
                  <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> Automatic Vectorization</span>
                  <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-indigo-400" /> Real-time Telemetry</span>
                </div>
              </div>

              {/* Animated Graph / Neural Simulation Mockup */}
              <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 shadow-xl shadow-purple-500/30 animate-pulse">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <p className="text-xs font-black text-white">Neural Decision Simulation</p>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/15 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  Status: Processing 0.4ms
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
