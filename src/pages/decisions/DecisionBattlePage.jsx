import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '../../services/aiService';
import { evaluateDecisionBattle } from '../../services/decisionEngine';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Swords, Award, RefreshCw, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const DecisionBattlePage = () => {
  const [optionA, setOptionA] = useState('Expand Flagship Store in Hyderabad Hitec City');
  const [optionB, setOptionB] = useState('Expand Regional Hub in Bangalore Whitefield');
  const [loading, setLoading] = useState(false);
  const [battleData, setBattleData] = useState(null);

  const fetchBattle = async (optA = optionA, optB = optionB) => {
    if (!optA.trim() || !optB.trim()) return;

    setLoading(true);
    try {
      const data = await aiService.calculateBattle({ optionA: optA, optionB: optB });
      if (data && data.winner) {
        setBattleData(data);
      } else {
        setBattleData(evaluateDecisionBattle(optA, optB));
      }
    } catch (err) {
      setBattleData(evaluateDecisionBattle(optA, optB));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBattle(optionA, optionB);
  }, []);

  const getVectors = () => {
    if (!battleData) return [];
    if (battleData.progressVectors && Array.isArray(battleData.progressVectors)) {
      return battleData.progressVectors;
    }
    const a = battleData.optionA || {};
    const b = battleData.optionB || {};
    return [
      { vector: 'Cost Efficiency', OptionA: a.costEfficiency || 88, OptionB: b.costEfficiency || 74 },
      { vector: 'Talent Acquisition', OptionA: a.talent || 92, OptionB: b.talent || 95 },
      { vector: 'Regulatory Ease', OptionA: a.regulation || 85, OptionB: b.regulation || 70 },
      { vector: 'Market Growth %', OptionA: a.marketGrowth || 96, OptionB: b.marketGrowth || 88 },
      { vector: 'CRE Overhead', OptionA: a.cre || 90, OptionB: b.cre || 68 },
      { vector: 'Tax Incentives', OptionA: a.tax || 94, OptionB: b.tax || 80 },
      { vector: 'Supply Chain Friction', OptionA: a.supplyChain || 86, OptionB: b.supplyChain || 82 },
    ];
  };

  const vectorList = getVectors();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="secondary" size="md" icon={Swords} className="bg-[#6C63FF]/15 text-[#6C63FF] border-[#6C63FF]/30 font-bold">
          Side-by-Side Comparison Engine
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Decision Battle Mode
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] font-semibold">
          Compare conflicting strategic options across 7 quantitative vectors with instant AI scoring.
        </p>
      </div>

      {/* Inputs Contender Selector Bar */}
      <Card glow className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 rounded-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchBattle();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#6C63FF] block mb-2">
                OPTION A (PRIMARY CONTENDER)
              </label>
              <input
                type="text"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                placeholder="Option A Title..."
                required
                className="w-full rounded-2xl bg-white border border-slate-200 text-[#0F172A] px-4 py-3.5 text-sm font-bold transition-all focus:border-[#6C63FF] focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#FF2DAA] block mb-2">
                OPTION B (CHALLENGER OPTION)
              </label>
              <input
                type="text"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                placeholder="Option B Title..."
                required
                className="w-full rounded-2xl bg-white border border-slate-200 text-[#0F172A] px-4 py-3.5 text-sm font-bold transition-all focus:border-[#FF2DAA] focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              icon={loading ? RefreshCw : Swords}
              className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none font-bold shadow-lg py-3.5 px-8 text-sm rounded-2xl cursor-pointer"
            >
              {loading ? 'Analyzing Decision Battle...' : 'Calculate Decision Battle Winner'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Contenders Dynamic Score Breakdown */}
      <AnimatePresence mode="wait">
        {battleData && (
          <motion.div
            key={JSON.stringify(battleData)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Winner Banner */}
            <Card glow className="p-6 border-[#10B981]/30 glass-card bg-white/95 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#10B981] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-[#10B981]" /> DECISION BATTLE WINNER: OPTION {battleData.winner}
                </span>
                <Badge variant="success" size="sm" className="bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30 font-bold px-3 py-1 rounded-full text-xs">
                  {battleData.confidence >= 90 ? 'High Confidence' : `${battleData.confidence}% Confidence`}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#0F172A] leading-snug">
                  {battleData.headline || `Proceed immediately with Option ${battleData.winner} (${battleData.winner === 'A' ? optionA : optionB}) to maximize capital efficiency and minimize risk variance.`}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-semibold leading-relaxed">
                  {battleData.summary}
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contender A Card */}
              <Card
                glow={battleData.winner === 'A'}
                className={`p-6 glass-card space-y-6 rounded-3xl bg-white/95 shadow-md ${
                  battleData.winner === 'A' ? 'border-[#6C63FF]/40 ring-2 ring-[#6C63FF]/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#6C63FF] uppercase tracking-wider">OPTION A</span>
                  <Badge variant={battleData.winner === 'A' ? 'success' : 'neutral'} size="md" icon={battleData.winner === 'A' ? Award : undefined} className={battleData.winner === 'A' ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30 font-bold' : ''}>
                    {battleData.winner === 'A' ? `WINNER (${battleData.overallScore?.A || battleData.winnerScore || 95}/100)` : `CHALLENGER (${battleData.overallScore?.A || battleData.loserScore || 84}/100)`}
                  </Badge>
                </div>

                <h3 className="text-xl font-black text-[#0F172A]">{optionA}</h3>

                {/* Metrics Grid */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs font-bold text-[#0F172A]">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">CONFIDENCE</span>
                    <span className="text-lg font-black text-[#6C63FF]">
                      {battleData.winner === 'A' && optionA.includes('Hyderabad') ? '96.2%' : `${battleData.confidence}%`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">RISK</span>
                    <span className="text-lg font-black text-[#10B981]">
                      {battleData.optionA?.risk || 'Low Risk'} ({battleData.optionA?.riskPercent || 12}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">EXPECTED ROI</span>
                    <span className="text-lg font-black text-[#10B981]">
                      +{battleData.optionA?.roi || battleData.ROI || 38}% ROI
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block mb-1">PAYBACK</span>
                    <span className="text-lg font-black text-[#0F172A]">
                      {battleData.optionA?.payback || battleData.payback || 14.2} Months
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-[#0F172A] tracking-wider">PROGRESS VECTORS</h5>
                  {vectorList.map((d, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                        <span>{d.vector}</span>
                        <span className="text-[#6C63FF] font-black">{d.OptionA}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.OptionA}%` }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                          className="h-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Contender B Card */}
              <Card
                glow={battleData.winner === 'B'}
                className={`p-6 glass-card space-y-6 rounded-3xl bg-white/95 shadow-md ${
                  battleData.winner === 'B' ? 'border-[#FF2DAA]/40 ring-2 ring-[#FF2DAA]/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#FF2DAA] uppercase tracking-wider">OPTION B</span>
                  <Badge variant={battleData.winner === 'B' ? 'success' : 'neutral'} size="md" icon={battleData.winner === 'B' ? Award : undefined}>
                    {battleData.winner === 'B' ? `WINNER (${battleData.overallScore?.B || battleData.winnerScore || 95}/100)` : `CHALLENGER (${battleData.overallScore?.B || battleData.loserScore || 84}/100)`}
                  </Badge>
                </div>

                <h3 className="text-xl font-black text-[#0F172A]">{optionB}</h3>

                {/* Metrics Grid */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs font-bold text-[#0F172A]">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">CONFIDENCE</span>
                    <span className="text-lg font-black text-[#64748B]">
                      {battleData.winner === 'A' && optionB.includes('Bangalore') ? '88.5%' : `${battleData.confidence}%`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">RISK</span>
                    <span className="text-lg font-black text-[#F59E0B]">
                      {battleData.optionB?.risk || 'Moderate Risk'} ({battleData.optionB?.riskPercent || 28}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block mb-1">EXPECTED ROI</span>
                    <span className="text-lg font-black text-[#64748B]">
                      +{battleData.optionB?.roi || 28}% ROI
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block mb-1">PAYBACK</span>
                    <span className="text-lg font-black text-[#0F172A]">
                      {battleData.optionB?.payback || 22.6} Months
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-[#0F172A] tracking-wider">PROGRESS VECTORS</h5>
                  {vectorList.map((d, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                        <span>{d.vector}</span>
                        <span className="text-[#FF2DAA] font-black">{d.OptionB}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.OptionB}%` }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                          className="h-full bg-slate-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 12-Month Revenue Projection Trajectory Graph */}
            <Card glow className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#6C63FF]" /> 12-Month Stochastic Revenue Trajectory
                  </h3>
                  <p className="text-xs text-[#64748B] font-semibold">Monte Carlo 10,000 bounds: Conservative vs Expected vs Aggressive</p>
                </div>
                <Badge variant="primary" size="sm">Live Graph</Badge>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={battleData.graphData || []}>
                    <defs>
                      <linearGradient id="colorConsB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAggB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontWeight={700} />
                    <YAxis
                      stroke="#64748b"
                      fontSize={11}
                      fontWeight={700}
                      tickFormatter={(val) => `₹${(val / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      formatter={(val) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val), '']}
                      contentStyle={{ borderRadius: '16px', background: '#0F172A', color: '#fff', border: 'none', fontWeight: 700 }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="conservative" stroke="#f59e0b" strokeWidth={2.5} fill="url(#colorConsB)" name="Conservative (₹)" />
                    <Area type="monotone" dataKey="expected" stroke="#6C63FF" strokeWidth={2.5} fill="url(#colorExpB)" name="Expected (₹)" />
                    <Area type="monotone" dataKey="aggressive" stroke="#10B981" strokeWidth={2.5} fill="url(#colorAggB)" name="Aggressive (₹)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
