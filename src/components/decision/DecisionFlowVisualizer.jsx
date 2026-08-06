import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Activity, CheckCircle2, ArrowRight, Sparkles, Layers, Route } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const DecisionFlowVisualizer = () => {
  const steps = [
    {
      id: 1,
      name: '1. Sensor Ingestion',
      icon: Database,
      title: 'Multimodal Mobility Data Ingestion',
      desc: 'Ingests real-time GPS telemetry, weather radars, highway toll passes, & commuter voice notes.',
      metric: '10,000 Traffic Signals/sec'
    },
    {
      id: 2,
      name: '2. Neural Analysis',
      icon: Cpu,
      title: 'Predictive Route & Congestion Modeling',
      desc: 'Transforms unstructured traffic signals into structured route parameter vectors with signal weights.',
      metric: '99.2% Route Precision'
    },
    {
      id: 3,
      name: '3. Traffic Simulator',
      icon: Activity,
      title: 'Stochastic Congestion Iterations',
      desc: 'Simulates peak hour surges, weather delays, and construction bottlenecks to calculate optimal departure windows.',
      metric: 'Real-time Green Wave'
    },
    {
      id: 4,
      name: '4. AI Route Matrix',
      icon: CheckCircle2,
      title: 'Actionable Route Recommendation',
      desc: 'Generates optimal route, alternative bypass, travel time, fuel efficiency, and safety tips.',
      metric: '-18% Travel Time Saved'
    }
  ];

  const [activeStep, setActiveStep] = useState(3);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-10 border border-blue-500/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <Badge variant="primary" size="md" icon={Sparkles} className="mb-2">
          Interactive Mobility Architecture
        </Badge>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Smart Mobility Intelligence Workflow
        </h2>
        <p className="text-sm font-semibold text-slate-700">
          Watch how raw traffic telemetry transforms into optimal route recommendations in sub-second latency.
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
                  ? 'bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-500/20 border-blue-500 text-slate-900 shadow-xl shadow-blue-500/15 scale-[1.02]'
                  : 'bg-white/60 border-blue-500/20 text-slate-700 hover:text-blue-600 hover:border-blue-400'
              }`}
            >
              <div className={`p-2.5 rounded-xl border ${isSelected ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-400' : 'bg-white border-blue-500/20 text-blue-600'}`}>
                <Icon className="w-4.5 h-4.5 shrink-0" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black truncate text-slate-900">{s.name}</p>
                <p className="text-[11px] font-bold text-slate-600 truncate">{s.metric}</p>
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
              className="p-6 md:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-blue-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xl"
            >
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-blue-500/15 text-blue-700 text-xs font-mono font-black border border-blue-400/30">
                    STAGE 0{s.id}
                  </span>
                  <Badge variant="accent" size="sm">{s.metric}</Badge>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{s.title}</h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-semibold">{s.desc}</p>
                <div className="pt-2 flex items-center gap-4 text-xs font-extrabold text-blue-600">
                  <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> Automatic Route Vectorization</span>
                  <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-cyan-600" /> Real-time Traffic Telemetry</span>
                </div>
              </div>

              {/* Animated Graph / Route Mockup */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-500/20 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-500 p-0.5 shadow-xl shadow-blue-500/30 animate-pulse">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Route className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs font-black text-slate-900">Smart Mobility AI Node</p>
                <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-500/15 px-2.5 py-1 rounded-md border border-emerald-500/30">
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
