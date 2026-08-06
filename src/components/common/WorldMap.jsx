import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const WorldMap = () => {
  const nodes = [
    {
      id: 'hyderabad',
      city: 'Hyderabad',
      country: 'India',
      x: 67,
      y: 48,
      status: 'Active Launch Node',
      roi: '+28%',
      risk: 'Low Risk',
      confidence: 96,
      details: 'Primary Expansion Hub for Enterprise Hardware R&D and Retail Flagship.'
    },
    {
      id: 'bangalore',
      city: 'Bangalore',
      country: 'India',
      x: 68.5,
      y: 52,
      status: 'Secondary Evaluated Node',
      roi: '+24%',
      risk: 'Moderate Risk',
      confidence: 84,
      details: 'Software Engineering ecosystem hub under comparative battle analysis.'
    },
    {
      id: 'london',
      city: 'London',
      country: 'UK',
      x: 48,
      y: 28,
      status: 'Operational Node',
      roi: '+35%',
      risk: 'Low Risk',
      confidence: 98,
      details: 'EMEA Corporate headquarters and Financial Risk Management node.'
    },
    {
      id: 'sanfrancisco',
      city: 'San Francisco',
      country: 'USA',
      x: 20,
      y: 35,
      status: 'AI R&D Core',
      roi: '+42%',
      risk: 'Low Risk',
      confidence: 99,
      details: 'Neural Network model training & Quantum-safe infrastructure cluster.'
    },
    {
      id: 'singapore',
      city: 'Singapore',
      country: 'Singapore',
      x: 77,
      y: 58,
      status: 'Logistics Hub',
      roi: '+31%',
      risk: 'Low Risk',
      confidence: 94,
      details: 'APAC maritime trade route predictive monitoring hub.'
    },
    {
      id: 'tokyo',
      city: 'Tokyo',
      country: 'Japan',
      x: 85,
      y: 38,
      status: 'Robotics Node',
      roi: '+38%',
      risk: 'Low Risk',
      confidence: 95,
      details: 'Industrial automation component supply forecasting center.'
    },
  ];

  const [activeNode, setActiveNode] = useState(nodes[0]);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-indigo-500/30 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-fuchsia-400" />
            <h3 className="text-xl font-black text-white tracking-tight">Global Decision Intelligence Map</h3>
          </div>
          <p className="text-xs font-semibold text-slate-100 dark:text-slate-200 light:text-slate-800">
            Real-time spatial node analytics and risk heat monitoring across international strategic hubs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" size="sm" icon={ShieldCheck}>100% Nodes Online</Badge>
          <Badge variant="accent" size="sm" icon={TrendingUp}>Live Telemetry</Badge>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-950/80 border border-indigo-500/30 overflow-hidden flex items-center justify-center">
        {/* World Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:2rem_2rem]" />

        {/* Abstract World Silhouette */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-contain opacity-35"
        >
          <path d="M150,120 Q220,100 280,140 Q250,220 180,240 Q120,200 150,120 Z" fill="#64748b" />
          <path d="M260,260 Q320,270 300,380 Q240,420 230,320 Z" fill="#64748b" />
          <path d="M450,100 Q540,90 560,160 Q480,200 450,100 Z" fill="#64748b" />
          <path d="M460,210 Q560,200 550,340 Q460,370 460,210 Z" fill="#64748b" />
          <path d="M600,100 Q800,80 850,220 Q700,280 600,180 Z" fill="#64748b" />
          <path d="M780,320 Q860,330 840,410 Q760,400 780,320 Z" fill="#64748b" />
        </svg>

        {/* Node Pins */}
        {nodes.map((node) => {
          const isSelected = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-10"
            >
              <div className="relative flex items-center justify-center">
                <span className={`absolute w-7 h-7 rounded-full transition-all duration-300 ${
                  isSelected ? 'bg-fuchsia-500/50 animate-ping' : 'bg-cyan-500/30 group-hover:animate-ping'
                }`} />
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                  isSelected
                    ? 'bg-fuchsia-500 border-white scale-125 shadow-lg shadow-fuchsia-500/50'
                    : 'bg-cyan-400 border-slate-900 group-hover:scale-110'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>
              </div>

              {/* Node Label Tooltip */}
              <span className={`absolute top-5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-black whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-fuchsia-400 shadow-lg'
                  : 'bg-slate-950/90 text-white border-slate-800 opacity-90 group-hover:opacity-100'
              }`}>
                {node.city}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Bar */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-5 rounded-2xl bg-slate-900/90 border border-fuchsia-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-white">{activeNode.city}, {activeNode.country}</h4>
                  <Badge variant="primary" size="sm">{activeNode.status}</Badge>
                </div>
                <p className="text-xs font-semibold text-slate-100 dark:text-slate-200 light:text-slate-800 mt-0.5">{activeNode.details}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end md:self-auto font-bold">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-black">Expected ROI</span>
                <p className="text-base font-black text-emerald-400">{activeNode.roi}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-black">AI Confidence</span>
                <p className="text-base font-black text-fuchsia-400">{activeNode.confidence}%</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-black">Risk Rating</span>
                <p className="text-xs font-black text-slate-100 dark:text-slate-100 light:text-slate-800 mt-1">{activeNode.risk}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
