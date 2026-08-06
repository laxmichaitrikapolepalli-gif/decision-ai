import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RiskMeter, ConfidenceMeter } from '../../components/ui/RiskMeter';
import { Sliders, RefreshCw, Sparkles, TrendingUp, DollarSign, Clock, Users, ShieldAlert } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { apiService } from '../../services/api';

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
    const updateSim = async () => {
      setLoading(true);
      const res = await apiService.getSimulatorData(sliders);
      setSimResults(res.data);
      setLoading(false);
    };
    const timer = setTimeout(updateSim, 200);
    return () => clearTimeout(timer);
  }, [sliders]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-700 uppercase tracking-widest">STOCHASTIC ENGINE</span>
            <Badge variant="accent" size="sm" icon={Sliders}>Live "What If" Simulation</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Scenario Simulator
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <RefreshCw className={`w-4 h-4 text-purple-600 ${loading ? 'animate-spin' : ''}`} />
          <span>Real-time recalculation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Control Panel */}
        <Card glow className="lg:col-span-1 p-6 space-y-6 border-purple-500/30 glass-card">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4.5 h-4.5 text-purple-600" /> Variable Sliders
          </h3>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Budget Allocation
              </span>
              <span className="text-emerald-700 font-mono">${(sliders.budget / 1000000).toFixed(2)}M</span>
            </div>
            <input
              type="range"
              min={500000}
              max={10000000}
              step={100000}
              value={sliders.budget}
              onChange={(e) => setSliders({ ...sliders, budget: Number(e.target.value) })}
              className="w-full accent-purple-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Timeline Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> Execution Timeline
              </span>
              <span className="text-blue-700 font-mono">{sliders.timeline} Months</span>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={1}
              value={sliders.timeline}
              onChange={(e) => setSliders({ ...sliders, timeline: Number(e.target.value) })}
              className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Risk Tolerance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Risk Tolerance
              </span>
              <span className="text-amber-700 font-mono">{sliders.risk}% Index</span>
            </div>
            <input
              type="range"
              min={5}
              max={95}
              step={5}
              value={sliders.risk}
              onChange={(e) => setSliders({ ...sliders, risk: Number(e.target.value) })}
              className="w-full accent-amber-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Team Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-pink-600" /> Dedicated Team Size
              </span>
              <span className="text-pink-700 font-mono">{sliders.teamSize} Headcount</span>
            </div>
            <input
              type="range"
              min={2}
              max={50}
              step={1}
              value={sliders.teamSize}
              onChange={(e) => setSliders({ ...sliders, teamSize: Number(e.target.value) })}
              className="w-full accent-pink-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </Card>

        {/* Live Recharts Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 border-purple-500/25 glass-card text-center">
              <span className="text-[10px] text-slate-600 uppercase font-black">Projected ROI</span>
              <p className="text-3xl font-black text-emerald-700 font-['Space_Grotesk'] mt-1">{simResults.projectedRoi}</p>
            </Card>

            <Card className="p-4 border-purple-500/25 glass-card text-center">
              <span className="text-[10px] text-slate-600 uppercase font-black">Model Confidence</span>
              <p className="text-3xl font-black text-purple-700 font-['Space_Grotesk'] mt-1">{simResults.confidenceScore}</p>
            </Card>

            <Card className="p-4 border-purple-500/25 glass-card text-center">
              <span className="text-[10px] text-slate-600 uppercase font-black">Risk Classification</span>
              <p className="text-sm font-black text-slate-900 mt-2">{simResults.riskLevel}</p>
            </Card>
          </div>

          {/* Dynamic Area Chart */}
          <Card className="p-6 border-purple-500/30 glass-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Stochastic Revenue Trajectory</h3>
                <p className="text-xs text-slate-700 font-bold">Monte Carlo 10,000 bounds: Conservative vs Expected vs Aggressive</p>
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.8} />
                  <XAxis dataKey="month" stroke="#334155" fontSize={11} fontWeight={700} />
                  <YAxis stroke="#334155" fontSize={11} fontWeight={700} />
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
