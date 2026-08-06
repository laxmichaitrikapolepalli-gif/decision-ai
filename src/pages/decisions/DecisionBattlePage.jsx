import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '../../services/aiService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Swords, Award, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
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
import toast from 'react-hot-toast';

export const DecisionBattlePage = () => {
  const [optionA, setOptionA] = useState('Expand Flagship Store in Hyderabad Hitec City');
  const [optionB, setOptionB] = useState('Expand Regional Hub in Bangalore Whitefield');
  const [loading, setLoading] = useState(false);
  const [battleData, setBattleData] = useState(null);

  const fetchBattle = async (optA = optionA, optB = optionB) => {
    if (!optA.trim() || !optB.trim()) {
      toast.error('Please enter titles for both Option A and Option B.');
      return;
    }

    setLoading(true);
    try {
      const data = await aiService.calculateBattle({ optionA: optA, optionB: optB });
      setBattleData(data);
      toast.success('Decision Battle calculated successfully!');
    } catch (err) {
      console.error('Decision Battle API Error:', err);
      toast.error('Failed to calculate Decision Battle. Check backend API connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBattle(optionA, optionB);
  }, []);

  const getRadarData = () => {
    if (!battleData) return [];
    const a = battleData.optionA || {};
    const b = battleData.optionB || {};
    return [
      { vector: 'Cost Efficiency', OptionA: a.costEfficiency || 80, OptionB: b.costEfficiency || 70 },
      { vector: 'Talent Acquisition', OptionA: a.talent || 80, OptionB: b.talent || 70 },
      { vector: 'Regulatory Ease', OptionA: a.regulation || 80, OptionB: b.regulation || 70 },
      { vector: 'Market Growth %', OptionA: a.marketGrowth || 80, OptionB: b.marketGrowth || 70 },
      { vector: 'CRE Overhead', OptionA: a.cre || 80, OptionB: b.cre || 70 },
      { vector: 'Tax Incentives', OptionA: a.tax || 80, OptionB: b.tax || 70 },
      { vector: 'Supply Chain Friction', OptionA: a.supplyChain || 80, OptionB: b.supplyChain || 70 },
    ];
  };

  const radarData = getRadarData();

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
                Option A (Primary Contender)
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
                Option B (Challenger Option)
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
              className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none font-bold shadow-lg py-3.5 px-8 text-sm rounded-2xl"
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
            {/* Winner Banner & Reasoning */}
            <Card glow className="p-6 border-[#10B981]/30 glass-card bg-white/95 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#10B981] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4.5 h-4.5" /> DECISION BATTLE WINNER: OPTION {battleData.winner}
                </span>
                <Badge variant="success" size="sm">{battleData.confidence}% Confidence</Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#0F172A]">
                  Primary Recommendation: Option {battleData.winner} ({battleData.winner === 'A' ? optionA : optionB})
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
                  <span className="text-xs font-black text-[#6C63FF] uppercase">OPTION A</span>
                  <Badge variant={battleData.winner === 'A' ? 'success' : 'neutral'} size="md" icon={battleData.winner === 'A' ? Award : undefined}>
                    {battleData.winner === 'A' ? `WINNER (${battleData.overallScore?.A || 0}/100)` : `CHALLENGER (${battleData.overallScore?.A || 0}/100)`}
                  </Badge>
                </div>

                <h3 className="text-xl font-black text-[#0F172A]">{optionA}</h3>

                {/* Metrics Grid */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs font-bold text-[#0F172A]">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Confidence</span>
                    <span className="text-lg font-black text-[#6C63FF]">{battleData.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Risk</span>
                    <span className="text-lg font-black text-[#10B981]">{battleData.optionA?.risk} ({battleData.optionA?.riskPercent}%)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Expected ROI</span>
                    <span className="text-lg font-black text-[#10B981]">+{battleData.optionA?.roi}% ROI</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Payback</span>
                    <span className="text-lg font-black text-[#0F172A]">{battleData.optionA?.payback} Months</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-[#0F172A]">Progress Vectors</h5>
                  {radarData.map((d, i) => (
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
                  <span className="text-xs font-black text-[#FF2DAA] uppercase">OPTION B</span>
                  <Badge variant={battleData.winner === 'B' ? 'success' : 'neutral'} size="md" icon={battleData.winner === 'B' ? Award : undefined}>
                    {battleData.winner === 'B' ? `WINNER (${battleData.overallScore?.B || 0}/100)` : `CHALLENGER (${battleData.overallScore?.B || 0}/100)`}
                  </Badge>
                </div>

                <h3 className="text-xl font-black text-[#0F172A]">{optionB}</h3>

                {/* Metrics Grid */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs font-bold text-[#0F172A]">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Confidence</span>
                    <span className="text-lg font-black text-[#64748B]">{battleData.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Risk</span>
                    <span className="text-lg font-black text-[#F59E0B]">{battleData.optionB?.risk} ({battleData.optionB?.riskPercent}%)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Expected ROI</span>
                    <span className="text-lg font-black text-[#64748B]">+{battleData.optionB?.roi}% ROI</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">Payback</span>
                    <span className="text-lg font-black text-[#0F172A]">{battleData.optionB?.payback} Months</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-[#0F172A]">Progress Vectors</h5>
                  {radarData.map((d, i) => (
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

            {/* Recharts Multi-Vector Radar Comparison Chart */}
            <Card glow className="p-8 border-[#6C63FF]/20 glass-card space-y-4 rounded-3xl bg-white/95 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0F172A]">7-Vector Radar Multi-Criteria Chart</h3>
                  <p className="text-xs text-[#64748B] font-semibold">Superimposed neural score overlay</p>
                </div>
                <Badge variant="accent" size="md">Live Dynamic Radar</Badge>
              </div>

              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="vector" stroke="#0F172A" fontSize={11} fontWeight={800} />
                    <PolarRadiusAxis stroke="#64748b" fontSize={10} />
                    <Radar name={`Option A (${optionA.substring(0, 18)}...)`} dataKey="OptionA" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.4} />
                    <Radar name={`Option B (${optionB.substring(0, 18)}...)`} dataKey="OptionB" stroke="#FF2DAA" fill="#FF2DAA" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
