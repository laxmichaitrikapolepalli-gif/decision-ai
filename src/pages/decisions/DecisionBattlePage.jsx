import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Swords, Award } from 'lucide-react';
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

// TODO: Backend endpoint POST /api/decisions/battle is missing. Preserving UI with side-by-side battle simulation data.
export const DecisionBattlePage = () => {
  const [optionA, setOptionA] = useState('Expand Flagship Store in Hyderabad Hitec City');
  const [optionB, setOptionB] = useState('Expand Regional Hub in Bangalore Whitefield');
  const [isCalculated, setIsCalculated] = useState(true);

  const radarData = [
    { vector: 'Cost Efficiency', OptionA: 88, OptionB: 74 },
    { vector: 'Talent Acquisition', OptionA: 92, OptionB: 95 },
    { vector: 'Regulatory Ease', OptionA: 85, OptionB: 70 },
    { vector: 'Market Growth %', OptionA: 96, OptionB: 88 },
    { vector: 'CRE Overhead', OptionA: 90, OptionB: 68 },
    { vector: 'Tax Incentives', OptionA: 94, OptionB: 80 },
    { vector: 'Supply Chain Friction', OptionA: 86, OptionB: 82 },
  ];

  const contenderA = {
    score: 95,
    payback: '14.2 Months',
    risk: 'Low Risk (12%)',
    capex: '$1.8M',
    winner: true,
  };

  const contenderB = {
    score: 84,
    payback: '22.6 Months',
    risk: 'Moderate Risk (28%)',
    capex: '$2.4M',
    winner: false,
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="secondary" size="md" icon={Swords}>
          Side-by-Side Comparison Engine
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Decision Battle Mode
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-semibold">
          Compare conflicting strategic options across 7 quantitative vectors with instant AI scoring.
        </p>
      </div>

      {/* Inputs Contender Selector Bar */}
      <Card glow className="p-6 border-purple-500/30 glass-card bg-slate-900/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-purple-400 block mb-2">
              Option A (Primary Contender)
            </label>
            <input
              type="text"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              className="w-full rounded-2xl bg-slate-950 border border-purple-500/25 text-white px-4 py-3.5 text-sm font-black transition-all focus:border-purple-500 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-pink-400 block mb-2">
              Option B (Challenger Option)
            </label>
            <input
              type="text"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              className="w-full rounded-2xl bg-slate-950 border border-purple-500/25 text-white px-4 py-3.5 text-sm font-black transition-all focus:border-purple-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={() => setIsCalculated(true)} variant="primary" size="lg" icon={Swords}>
            Calculate Decision Battle Winner
          </Button>
        </div>
      </Card>

      {/* Contenders Score Breakdown */}
      {isCalculated && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contender A Card */}
            <Card glow className="p-6 border-purple-500/40 glass-card space-y-6 rounded-3xl bg-slate-900/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-400 uppercase">OPTION A</span>
                <Badge variant="success" size="md" icon={Award}>WINNER</Badge>
              </div>

              <h3 className="text-xl font-black text-white">{optionA}</h3>

              {/* Total Strategic Score Box */}
              <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs text-slate-400 font-extrabold uppercase block">Total Strategic Score</span>
                  <span className="text-5xl font-black text-purple-400 font-['Space_Grotesk']">{contenderA.score}/100</span>
                </div>
                <div className="text-right text-xs font-black text-slate-300 space-y-1">
                  <p>Payback: <span className="text-emerald-400">{contenderA.payback}</span></p>
                  <p>CapEx: <span className="text-white">{contenderA.capex}</span></p>
                  <p>Risk: <span className="text-emerald-400">{contenderA.risk}</span></p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase text-slate-300">Criteria Breakdown</h5>
                {radarData.map((d, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-slate-300">
                      <span>{d.vector}</span>
                      <span className="text-purple-400 font-black">{d.OptionA}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" style={{ width: `${d.OptionA}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contender B Card */}
            <Card className="p-6 border-slate-700 glass-card space-y-6 rounded-3xl bg-slate-900/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-pink-400 uppercase">OPTION B</span>
                <Badge variant="neutral" size="md">CHALLENGER</Badge>
              </div>

              <h3 className="text-xl font-black text-white">{optionB}</h3>

              {/* Total Strategic Score Box */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs text-slate-400 font-extrabold uppercase block">Total Strategic Score</span>
                  <span className="text-5xl font-black text-slate-300 font-['Space_Grotesk']">{contenderB.score}/100</span>
                </div>
                <div className="text-right text-xs font-black text-slate-300 space-y-1">
                  <p>Payback: <span className="text-amber-400">{contenderB.payback}</span></p>
                  <p>CapEx: <span className="text-white">{contenderB.capex}</span></p>
                  <p>Risk: <span className="text-amber-400">{contenderB.risk}</span></p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase text-slate-300">Criteria Breakdown</h5>
                {radarData.map((d, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-slate-300">
                      <span>{d.vector}</span>
                      <span className="text-pink-400 font-black">{d.OptionB}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-slate-700 rounded-full" style={{ width: `${d.OptionB}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recharts Multi-Vector Radar Comparison Chart */}
          <Card glow className="p-8 border-purple-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">7-Vector Radar Multi-Criteria Chart</h3>
                <p className="text-xs text-slate-300 font-semibold">Superimposed neural score overlay</p>
              </div>
              <Badge variant="accent" size="md">Overlay Active</Badge>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="vector" stroke="#e2e8f0" fontSize={11} fontWeight={800} />
                  <PolarRadiusAxis stroke="#64748b" fontSize={10} />
                  <Radar name="Option A (Hyderabad)" dataKey="OptionA" stroke="#A855F7" fill="#A855F7" fillOpacity={0.4} />
                  <Radar name="Option B (Bangalore)" dataKey="OptionB" stroke="#EC4899" fill="#EC4899" fillOpacity={0.3} />
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
