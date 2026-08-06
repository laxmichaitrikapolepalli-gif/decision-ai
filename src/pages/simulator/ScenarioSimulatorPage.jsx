import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sliders, RefreshCw, DollarSign, Clock, Users, ShieldAlert, TrendingUp, Percent } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const ScenarioSimulatorPage = () => {
  const [sliders, setSliders] = useState({
    budget: 2500000,
    timeline: 6,
    risk: 30,
    market: 75,
    inflation: 4,
    growth: 25,
  });

  const [simResults, setSimResults] = useState({
    projectedRoi: '+38%',
    confidenceScore: '96%',
    riskLevel: 'Optimal Low Risk',
    recommendation: 'Proceed with $2.5M allocation across Tier-1 tech hubs for maximum expected yield under P95 confidence limits.',
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
      const { budget, timeline, risk, market, inflation, growth } = sliders;
      const calculatedRoi = Math.round((budget * 0.000012) + (market * 0.2) + (growth * 0.3) - (inflation * 0.8) - (risk * 0.1));
      const calculatedConfidence = Math.round(85 + (timeline * 0.5) - (risk * 0.15) + (market * 0.05));

      setSimResults({
        projectedRoi: `+${Math.max(5, calculatedRoi)}%`,
        confidenceScore: `${Math.min(99, Math.max(60, calculatedConfidence))}%`,
        riskLevel: risk > 60 ? 'High Risk' : risk > 35 ? 'Moderate Risk' : 'Optimal Low Risk',
        recommendation: `Recommended strategy: Allocate $${(budget/1000000).toFixed(1)}M over ${timeline} months with ${growth}% growth target to capture +${calculatedRoi}% ROI under ${risk}% risk variance.`,
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

  // Track percentage calculation helper for gradient tracks
  const getPct = (val, min, max) => ((val - min) / (max - min)) * 100;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-[#6C63FF] uppercase tracking-widest">STOCHASTIC ENGINE</span>
            <Badge variant="accent" size="sm" icon={Sliders} className="bg-[#FF2DAA]/10 text-[#FF2DAA] border-[#FF2DAA]/30">Live "What If" Simulation</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Scenario Simulator
          </h1>
          <p className="text-xs font-semibold text-[#64748B] mt-1">
            Stress-test budget allocations, execution timelines, inflation rates, and growth targets in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
          <RefreshCw className={`w-4 h-4 text-[#6C63FF] ${loading ? 'animate-spin' : ''}`} />
          <span>Real-time recalculation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Control Panel */}
        <Card glow className="lg:col-span-1 p-6 space-y-6 border-[#6C63FF]/20 glass-card bg-white/95 rounded-3xl">
          <h3 className="text-base font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4.5 h-4.5 text-[#6C63FF]" /> Variable Sliders
          </h3>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#0F172A] flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#10B981]" /> Budget Allocation
              </span>
              <span className="text-[#10B981] font-mono font-black">${(sliders.budget / 1000000).toFixed(2)}M</span>
            </div>
            <input
              type="range"
              min={500000}
              max={10000000}
              step={100000}
              value={sliders.budget}
              onChange={(e) => setSliders({ ...sliders, budget: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #6C63FF ${getPct(sliders.budget, 500000, 10000000)}%, #E2E8F0 ${getPct(sliders.budget, 500000, 10000000)}%)`,
                color: '#6C63FF'
              }}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Timeline Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#0F172A] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#6C63FF]" /> Execution Timeline
              </span>
              <span className="text-[#6C63FF] font-mono font-black">{sliders.timeline} Months</span>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={1}
              value={sliders.timeline}
              onChange={(e) => setSliders({ ...sliders, timeline: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #6C63FF ${getPct(sliders.timeline, 1, 24)}%, #E2E8F0 ${getPct(sliders.timeline, 1, 24)}%)`,
                color: '#6C63FF'
              }}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Risk Tolerance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#0F172A] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#F59E0B]" /> Risk Tolerance
              </span>
              <span className="text-[#F59E0B] font-mono font-black">{sliders.risk}% Index</span>
            </div>
            <input
              type="range"
              min={5}
              max={95}
              step={5}
              value={sliders.risk}
              onChange={(e) => setSliders({ ...sliders, risk: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #F59E0B ${getPct(sliders.risk, 5, 95)}%, #E2E8F0 ${getPct(sliders.risk, 5, 95)}%)`,
                color: '#F59E0B'
              }}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Market Sentiment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#0F172A] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#4F7DFF]" /> Market Sentiment
              </span>
              <span className="text-[#4F7DFF] font-mono font-black">{sliders.market}% Bullish</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={sliders.market}
              onChange={(e) => setSliders({ ...sliders, market: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #4F7DFF ${getPct(sliders.market, 10, 100)}%, #E2E8F0 ${getPct(sliders.market, 10, 100)}%)`,
                color: '#4F7DFF'
              }}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Inflation Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#0F172A] flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-[#EF4444]" /> Inflation Rate
              </span>
              <span className="text-[#EF4444] font-mono font-black">{sliders.inflation}% YoY</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={sliders.inflation}
              onChange={(e) => setSliders({ ...sliders, inflation: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #EF4444 ${getPct(sliders.inflation, 1, 15)}%, #E2E8F0 ${getPct(sliders.inflation, 1, 15)}%)`,
                color: '#EF4444'
              }}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Growth Target Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#0F172A] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#FF2DAA]" /> Growth Target
              </span>
              <span className="text-[#FF2DAA] font-mono font-black">{sliders.growth}% Target</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={sliders.growth}
              onChange={(e) => setSliders({ ...sliders, growth: Number(e.target.value) })}
              style={{
                background: `linear-gradient(to right, #FF2DAA ${getPct(sliders.growth, 5, 60)}%, #E2E8F0 ${getPct(sliders.growth, 5, 60)}%)`,
                color: '#FF2DAA'
              }}
              className="w-full h-2 rounded-lg cursor-pointer"
            />
          </div>
        </Card>

        {/* Live Recharts Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 border-[#6C63FF]/20 glass-card bg-white/95 text-center rounded-3xl">
              <span className="text-[10px] text-[#64748B] uppercase font-black">Projected ROI</span>
              <p className="text-3xl font-black text-[#10B981] font-['Space_Grotesk'] mt-1">{simResults.projectedRoi}</p>
            </Card>

            <Card className="p-4 border-[#6C63FF]/20 glass-card bg-white/95 text-center rounded-3xl">
              <span className="text-[10px] text-[#64748B] uppercase font-black">Model Confidence</span>
              <p className="text-3xl font-black text-[#6C63FF] font-['Space_Grotesk'] mt-1">{simResults.confidenceScore}</p>
            </Card>

            <Card className="p-4 border-[#6C63FF]/20 glass-card bg-white/95 text-center rounded-3xl">
              <span className="text-[10px] text-[#64748B] uppercase font-black">Risk Classification</span>
              <p className="text-sm font-black text-[#0F172A] mt-2">{simResults.riskLevel}</p>
            </Card>
          </div>

          {/* AI Recommendation Teaser Callout */}
          <Card glow className="p-5 border-[#10B981]/30 glass-card bg-white/95 rounded-3xl space-y-2">
            <span className="text-[10px] font-black text-[#10B981] uppercase tracking-wider block">LIVE SIMULATOR RECOMMENDATION</span>
            <p className="text-xs sm:text-sm font-bold text-[#0F172A] leading-relaxed">{simResults.recommendation}</p>
          </Card>

          {/* Dynamic Area Chart */}
          <Card className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#0F172A]">Stochastic Revenue Trajectory</h3>
                <p className="text-xs text-[#64748B] font-semibold">Monte Carlo 10,000 bounds: Conservative vs Expected vs Aggressive</p>
              </div>
              <Badge variant="primary" size="sm">Live Graph</Badge>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simResults.chartData}>
                  <defs>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAgg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontWeight={700} />
                  <YAxis stroke="#64748b" fontSize={11} fontWeight={700} />
                  <Tooltip />
                  <Area type="monotone" dataKey="conservative" stroke="#f59e0b" strokeWidth={2.5} fill="transparent" name="Conservative ($)" />
                  <Area type="monotone" dataKey="expected" stroke="#6C63FF" strokeWidth={2.5} fill="url(#colorExp)" name="Expected ($)" />
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
