import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, ShieldCheck, TrendingUp, Navigation, Clock, Fuel } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const WorldMap = () => {
  const nodes = [
    {
      id: 'hyderabad',
      city: 'Hyderabad',
      country: 'India',
      x: 64,
      y: 48,
      status: 'Optimal Flow',
      travelTime: '22 mins',
      traffic: 'Low Congestion',
      confidence: 98,
      details: 'Outer Ring Road & Hitec City Transit Corridor operating with green wave signals.'
    },
    {
      id: 'bangalore',
      city: 'Bangalore',
      country: 'India',
      x: 65.5,
      y: 54,
      status: 'Moderate Traffic',
      travelTime: '45 mins',
      traffic: 'Peak Hour Congestion',
      confidence: 92,
      details: 'Silk Board junction bottleneck mitigated via secondary Express Flyover rerouting.'
    },
    {
      id: 'mumbai',
      city: 'Mumbai',
      country: 'India',
      x: 58,
      y: 44,
      status: 'Smooth Flow',
      travelTime: '30 mins',
      traffic: 'Sea Link Express Active',
      confidence: 96,
      details: 'Bandra-Worli Sea Link route clear with 12% faster travel time.'
    },
    {
      id: 'delhi',
      city: 'Delhi',
      country: 'India',
      x: 62,
      y: 32,
      status: 'Heavy Traffic Alert',
      travelTime: '55 mins',
      traffic: 'Construction Bottleneck',
      confidence: 88,
      details: 'Gurugram Expressway experiencing surge. Recommended detour via Eastern Peripheral Expressway.'
    },
    {
      id: 'chennai',
      city: 'Chennai',
      country: 'India',
      x: 68,
      y: 56,
      status: 'Optimal Flow',
      travelTime: '26 mins',
      traffic: 'Smooth Transit',
      confidence: 97,
      details: 'OMR Tech Corridor clear with optimal AI traffic signal synchronization.'
    },
  ];

  const [activeNode, setActiveNode] = useState(nodes[0]);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-blue-500/30 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-5 h-5 text-cyan-500" />
            <h3 className="text-xl font-black text-slate-900 tracking-tight font-['Space_Grotesk']">Live Smart Mobility Map</h3>
          </div>
          <p className="text-xs font-bold text-slate-700">
            Real-time AI traffic monitoring and route optimization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" size="sm" icon={ShieldCheck}>100% Traffic Sensors Active</Badge>
          <Badge variant="accent" size="sm" icon={TrendingUp}>Live AI Telemetry</Badge>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-950/90 border border-blue-500/30 overflow-hidden flex items-center justify-center">
        {/* World Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:2rem_2rem]" />

        {/* Abstract India Silhouette */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-contain opacity-35"
        >
          <path d="M560,100 L680,110 L720,200 L690,320 L660,420 L620,380 L580,260 L540,200 Z" fill="#3b82f6" />
        </svg>

        {/* Mobility Node Pins */}
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
                  isSelected ? 'bg-cyan-500/50 animate-ping' : 'bg-blue-500/30 group-hover:animate-ping'
                }`} />
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                  isSelected
                    ? 'bg-cyan-400 border-white scale-125 shadow-lg shadow-cyan-500/50'
                    : 'bg-blue-500 border-slate-900 group-hover:scale-110'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>
              </div>

              {/* Node Label Tooltip */}
              <span className={`absolute top-5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-black whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-lg'
                  : 'bg-slate-900/90 text-white border-slate-800 opacity-90 group-hover:opacity-100'
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
            className="mt-6 p-5 rounded-2xl bg-white border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-700">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-black text-slate-900">{activeNode.city}, {activeNode.country}</h4>
                  <Badge variant={activeNode.status === 'Optimal Flow' || activeNode.status === 'Smooth Flow' ? 'success' : 'warning'} size="sm">
                    {activeNode.status}
                  </Badge>
                </div>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{activeNode.details}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end md:self-auto font-bold">
              <div className="text-right">
                <span className="text-[10px] text-slate-600 uppercase font-black">Travel Time</span>
                <p className="text-base font-black text-blue-700">{activeNode.travelTime}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-600 uppercase font-black">AI Confidence</span>
                <p className="text-base font-black text-cyan-600">{activeNode.confidence}%</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-600 uppercase font-black">Traffic Status</span>
                <p className="text-xs font-black text-slate-900 mt-1">{activeNode.traffic}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
