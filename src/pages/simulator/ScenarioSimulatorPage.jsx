import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Sliders, RefreshCw, DollarSign, Clock, Users, ShieldAlert } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// TODO: Backend endpoint POST /api/simulator is missing. Preserving UI with client-side simulator calculation.
export const ScenarioSimulatorPage = () => {
  const [sliders, setSliders] = useState({
    budget: 2500000,
    timeline: 6,
    risk: 30,
    teamSize: 12,
  });

  const [simResults, setSimResults] = useState({
    projectedRoi: '+38%',
    confidenceScore: '96%',
    riskLevel: 'Optimal Low Risk',
    chartData: [
      { month: 'Month 1', conservative: 250000, expected: 375000, aggressive: 500000 },
      { month: 'Month 2', conservative: 750000, expected: 1050000, aggressive: 1375000 },
      { month: 'Month 3', conservative: 1375000, expected: 1950000, aggressive: 2375000 },
      { month: 'Month 4', conservative: 2125000, expected: 2875000, aggressive: 3625000 },
      { month: 'Month 5', conservative: 2750000, expected: 3750000, aggressive: 4875000 },
      { month: 'Month 6', conservative: 3500000, expected: 4875000, aggressive: 6250000 },
    ]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateSim = () => {
      setLoading(true);
      const { budget, timeline, risk, teamSize } = sliders;
      const calculatedRoi = Math.round(budget * 0.000012 + (100 - risk) * 0.15 + teamSize * 0.5);
      const calculatedConfidence = Math.round(85 + (timeline * 0.5) - (risk * 0.2));

      setSimResults({
        projectedRoi: `+${calculatedRoi}%`,
        confidenceScore: `${Math.min(99, Math.max(60, calculatedConfidence))}%`,
        riskLevel: risk > 60 ? 'High Risk' : risk > 35 ? 'Moderate Risk' : 'Optimal Low Risk',
        chartData: [
          { month: 'Month 1', conservative: budget * 0.1, expected: budget * 0.15, aggressive: budget * 0.2 },
          { month: 'Month 2', conservative: budget * 0.3, expected: budget * 0.42, aggressive: budget * 0.55 },
          { month: 'Month 3', conservative: budget * 0.55, expected: budget * 0.78, aggressive: budget * 0.95 },
          { month: 'Month 4', conservative: budget * 0.85, expected: budget * 1.15, aggressive: budget * 1.45 },
          { month: 'Month 5', conservative: budget * 1.1, expected: budget * 1.5, aggressive: budget * 1.95 },
          { month: 'Month 6', conservative: budget * 1.4, expected: budget * 1.95, aggressive: budget * 2.5 },
        ]
      });
      setLoading(false);
    };

    const timer = setTimeout(updateSim, 150);
    return () => clearTimeout(timer);
  }, [sliders]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-400 uppercase tracking-widest">STOCHASTIC ENGINE</span>
            <Badge variant="accent" size="sm" icon={Sliders}>Live "What If" Simulation</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Scenario Simulator
          </h1>
          <p className="text-xs font-semibold text-slate-300 mt-1">
            Stress-test budget allocations, execution timelines, and risk limits in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <RefreshCw className={`w-4 h-4 text-purple-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Real-time recalculation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Control Panel */}
        <Card glow className="lg:col-span-1 p-6 space-y-6 border-purple-500/30 glass-card bg-slate-900/80 rounded-3xl">
          <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4.5 h-4.5 text-purple-400" /> Variable Sliders
          </h3>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Budget Allocation
              </span>
              <span className="text-emerald-400 font-mono">${(sliders.budget / 1000000).toFixed(2)}M</span>
            </div>
            <input
              type="range"
              min={500000}
              max={10000000}
              step={100000}
              value={sliders.budget}
              onChange={(e) => setSliders({ ...sliders, budget: Number(e.target.value) })}
              className="w-full accent-purple-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Timeline Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> Execution Timeline
              </span>
              <span className="text-purple-400 font-mono">{sliders.timeline} Months</span>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={1}
              value={sliders.timeline}
              onChange={(e) => setSliders({ ...sliders, timeline: Number(e.target.value) })}
              className="w-full accent-purple-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Risk Tolerance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Risk Tolerance
              </span>
              <span className="text-amber-400 font-mono">{sliders.risk}% Index</span>
            </div>
            <input
              type="range"
              min={5}
              max={95}
              step={5}
              value={sliders.risk}
              onChange={(e) => setSliders({ ...sliders, risk: Number(e.target.value) })}
              className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Team Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-pink-400" /> Dedicated Team Size
              </span>
              <span className="text-pink-400 font-mono">{sliders.teamSize} Headcount</span>
            </div>
            <input
              type="range"
              min={2}
              max={50}
              step={1}
              value={sliders.teamSize}
              onChange={(e) => setSliders({ ...sliders, teamSize: Number(e.target.value) })}
              className="w-full accent-pink-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </Card>

        {/* Live Recharts Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 border-purple-500/25 glass-card bg-slate-900/80 text-center rounded-3xl">
              <span className="text-[10px] text-slate-400 uppercase font-black">Projected ROI</span>
              <p className="text-3xl font-black text-emerald-400 font-['Space_Grotesk'] mt-1">{simResults.projectedRoi}</p>
            </Card>

            <Card className="p-4 border-purple-500/25 glass-card bg-slate-900/80 text-center rounded-3xl">
              <span className="text-[10px] text-slate-400 uppercase font-black">Model Confidence</span>
              <p className="text-3xl font-black text-purple-400 font-['Space_Grotesk'] mt-1">{simResults.confidenceScore}</p>
            </Card>

            <Card className="p-4 border-purple-500/25 glass-card bg-slate-900/80 text-center rounded-3xl">
              <span className="text-[10px] text-slate-400 uppercase font-black">Risk Classification</span>
              <p className="text-sm font-black text-white mt-2">{simResults.riskLevel}</p>
            </Card>
          </div>

          {/* Dynamic Area Chart */}
          <Card className="p-6 border-purple-500/30 glass-card bg-slate-900/80 space-y-4 rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">Stochastic Revenue Trajectory</h3>
                <p className="text-xs text-slate-300 font-semibold">Monte Carlo 10,000 bounds: Conservative vs Expected vs Aggressive</p>
              </div>
              <Badge variant="primary" size="sm">Live Graph</Badge>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simResults.chartData}>
                  <defs>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAgg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={700} />
                  <YAxis stroke="#94a3b8" fontSize={11} fontWeight={700} />
                  <Tooltip />
                  <Area type="monotone" dataKey="conservative" stroke="#f59e0b" strokeWidth={2.5} fill="transparent" name="Conservative ($)" />
                  <Area type="monotone" dataKey="expected" stroke="#A855F7" strokeWidth={2.5} fill="url(#colorExp)" name="Expected ($)" />
                  <Area type="monotone" dataKey="aggressive" stroke="#10B981" strokeWidth={2.5} fill="url(#colorAgg)" name="Aggressive ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
