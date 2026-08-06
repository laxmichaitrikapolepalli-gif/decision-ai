import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Swords, Award, Route } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

// TODO: Backend endpoint POST /api/decisions/battle is missing. Preserving UI with side-by-side route comparison data.
export const DecisionBattlePage = () => {
  const [optionA, setOptionA] = useState('Outer Ring Expressway (Hyd to Blr)');
  const [optionB, setOptionB] = useState('City Center Inner Bypass');
  const [isCalculated, setIsCalculated] = useState(true);

  const radarData = [
    { vector: 'Travel Speed', OptionA: 94, OptionB: 68 },
    { vector: 'Traffic Flow', OptionA: 96, OptionB: 62 },
    { vector: 'Fuel Efficiency', OptionA: 92, OptionB: 70 },
    { vector: 'Safety Score', OptionA: 95, OptionB: 84 },
    { vector: 'Road Quality', OptionA: 98, OptionB: 76 },
    { vector: 'Signal Synchronization', OptionA: 90, OptionB: 60 },
    { vector: 'Toll Cost Efficiency', OptionA: 82, OptionB: 92 },
  ];

  const contenderA = {
    score: 95,
    travelTime: '22 Mins',
    traffic: 'Smooth Flow (Green Wave)',
    fuelCost: '$12.50',
    winner: true,
  };

  const contenderB = {
    score: 73,
    travelTime: '45 Mins',
    traffic: 'Heavy Congestion (Surge)',
    fuelCost: '$18.20',
    winner: false,
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="secondary" size="md" icon={Swords}>
          Side-by-Side Route Comparison
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Route Comparison & Battle Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-800 font-extrabold">
          Compare alternative travel corridors across 7 quantitative traffic vectors with instant AI scoring.
        </p>
      </div>

      {/* Inputs Contender Selector Bar */}
      <Card glow className="p-6 border-blue-500/30 glass-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-blue-700 block mb-2">
              Route A (Primary Expressway)
            </label>
            <input
              type="text"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              className="w-full rounded-2xl bg-white border border-blue-500/25 text-slate-900 px-4 py-3.5 text-sm font-black transition-all focus:border-blue-500 focus:bg-white focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-cyan-700 block mb-2">
              Route B (Alternate Corridor)
            </label>
            <input
              type="text"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              className="w-full rounded-2xl bg-white border border-blue-500/25 text-slate-900 px-4 py-3.5 text-sm font-black transition-all focus:border-blue-500 focus:bg-white focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={() => setIsCalculated(true)} variant="primary" size="lg" icon={Swords}>
            Calculate Optimal Route Winner
          </Button>
        </div>
      </Card>

      {/* Contenders Score Breakdown */}
      {isCalculated && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contender A Card */}
            <Card glow className="p-6 border-blue-500/40 glass-card space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-700 uppercase">ROUTE A</span>
                <Badge variant="success" size="md" icon={Award}>OPTIMAL ROUTE</Badge>
              </div>

              <h3 className="text-xl font-black text-slate-900">{optionA}</h3>

              {/* Total Mobility Score Box */}
              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-500/30 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs text-slate-700 font-extrabold uppercase block">Overall Route Score</span>
                  <span className="text-5xl font-black text-blue-700 font-['Space_Grotesk']">{contenderA.score}/100</span>
                </div>
                <div className="text-right text-xs font-black text-slate-800 space-y-1">
                  <p>Travel Time: <span className="text-emerald-700">{contenderA.travelTime}</span></p>
                  <p>Fuel Cost: <span className="text-slate-900">{contenderA.fuelCost}</span></p>
                  <p>Traffic: <span className="text-emerald-700">{contenderA.traffic}</span></p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase text-slate-800">Vector Breakdown</h5>
                {radarData.map((d, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-slate-800">
                      <span>{d.vector}</span>
                      <span className="text-blue-700 font-black">{d.OptionA}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" style={{ width: `${d.OptionA}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contender B Card */}
            <Card className="p-6 border-slate-300 glass-card space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-700 uppercase">ROUTE B</span>
                <Badge variant="neutral" size="md">CHALLENGER</Badge>
              </div>

              <h3 className="text-xl font-black text-slate-900">{optionB}</h3>

              {/* Total Mobility Score Box */}
              <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-300 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs text-slate-700 font-extrabold uppercase block">Overall Route Score</span>
                  <span className="text-5xl font-black text-slate-800 font-['Space_Grotesk']">{contenderB.score}/100</span>
                </div>
                <div className="text-right text-xs font-black text-slate-800 space-y-1">
                  <p>Travel Time: <span className="text-amber-700">{contenderB.travelTime}</span></p>
                  <p>Fuel Cost: <span className="text-slate-900">{contenderB.fuelCost}</span></p>
                  <p>Traffic: <span className="text-amber-700">{contenderB.traffic}</span></p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase text-slate-800">Vector Breakdown</h5>
                {radarData.map((d, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-slate-800">
                      <span>{d.vector}</span>
                      <span className="text-cyan-700 font-black">{d.OptionB}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-slate-700 rounded-full" style={{ width: `${d.OptionB}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recharts Multi-Vector Radar Comparison Chart */}
          <Card glow className="p-8 border-blue-500/30 glass-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">7-Vector Route Comparison Radar</h3>
                <p className="text-xs text-slate-700 font-extrabold">Real-time traffic score overlay</p>
              </div>
              <Badge variant="accent" size="md">Live Telemetry</Badge>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="vector" stroke="#0f172a" fontSize={11} fontWeight={800} />
                  <PolarRadiusAxis stroke="#64748b" fontSize={10} />
                  <Radar name="Route A (Expressway)" dataKey="OptionA" stroke="#2563EB" fill="#2563EB" fillOpacity={0.4} />
                  <Radar name="Route B (City Center)" dataKey="OptionB" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
