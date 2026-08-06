import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Swords, Award, CheckCircle2 } from 'lucide-react';
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
    confidence: '96.2%',
    risk: 'Low Risk (12%)',
    roi: '+38% ROI',
    payback: '14.2 Months',
    winner: true,
  };

  const contenderB = {
    score: 84,
    confidence: '88.5%',
    risk: 'Moderate Risk (28%)',
    roi: '+28% ROI',
    payback: '22.6 Months',
    winner: false,
  };

  const battleReasoning = "Option A (Hyderabad) wins overall score 95/100 due to 18% lower lease overhead, regional municipal tax credits, 34% higher senior ML engineering availability, and a 14.2-month CapEx payback timeline.";
  const battleRecommendation = "Proceed immediately with Option A (Hyderabad Hitec City Flagship Expansion) to maximize capital efficiency and minimize risk variance.";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#6C63FF] block mb-2">
              Option A (Primary Contender)
            </label>
            <input
              type="text"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
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
              className="w-full rounded-2xl bg-white border border-slate-200 text-[#0F172A] px-4 py-3.5 text-sm font-black transition-all focus:border-[#FF2DAA] focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={() => setIsCalculated(true)} variant="primary" size="lg" icon={Swords} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none font-bold shadow-lg">
            Calculate Decision Battle Winner
          </Button>
        </div>
      </Card>

      {/* Contenders Score Breakdown */}
      {isCalculated && (
        <div className="space-y-8">
          
          {/* Winner Banner & Reasoning */}
          <Card glow className="p-6 border-[#10B981]/30 glass-card bg-white/95 rounded-3xl space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#10B981] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" /> DECISION BATTLE WINNER: OPTION A
              </span>
              <Badge variant="success" size="sm">High Confidence</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#0F172A]">{battleRecommendation}</h3>
              <p className="text-xs sm:text-sm text-[#64748B] font-semibold leading-relaxed">{battleReasoning}</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contender A Card */}
            <Card glow className="p-6 border-[#6C63FF]/30 glass-card space-y-6 rounded-3xl bg-white/95 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#6C63FF] uppercase">OPTION A</span>
                <Badge variant="success" size="md" icon={Award}>WINNER (95/100)</Badge>
              </div>

              <h3 className="text-xl font-black text-[#0F172A]">{optionA}</h3>

              {/* Metrics Grid */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs font-bold text-[#0F172A]">
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Confidence</span>
                  <span className="text-lg font-black text-[#6C63FF]">{contenderA.confidence}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Risk</span>
                  <span className="text-lg font-black text-[#10B981]">{contenderA.risk}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Expected ROI</span>
                  <span className="text-lg font-black text-[#10B981]">{contenderA.roi}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Payback</span>
                  <span className="text-lg font-black text-[#0F172A]">{contenderA.payback}</span>
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
                      <div className="h-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] rounded-full" style={{ width: `${d.OptionA}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contender B Card */}
            <Card className="p-6 border-slate-200 glass-card space-y-6 rounded-3xl bg-white/95 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#FF2DAA] uppercase">OPTION B</span>
                <Badge variant="neutral" size="md">CHALLENGER (84/100)</Badge>
              </div>

              <h3 className="text-xl font-black text-[#0F172A]">{optionB}</h3>

              {/* Metrics Grid */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs font-bold text-[#0F172A]">
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Confidence</span>
                  <span className="text-lg font-black text-[#64748B]">{contenderB.confidence}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Risk</span>
                  <span className="text-lg font-black text-[#F59E0B]">{contenderB.risk}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Expected ROI</span>
                  <span className="text-lg font-black text-[#64748B]">{contenderB.roi}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Payback</span>
                  <span className="text-lg font-black text-[#0F172A]">{contenderB.payback}</span>
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
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${d.OptionB}%` }} />
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
              <Badge variant="accent" size="md">Overlay Active</Badge>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="vector" stroke="#0F172A" fontSize={11} fontWeight={800} />
                  <PolarRadiusAxis stroke="#64748b" fontSize={10} />
                  <Radar name="Option A (Hyderabad)" dataKey="OptionA" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.4} />
                  <Radar name="Option B (Bangalore)" dataKey="OptionB" stroke="#FF2DAA" fill="#FF2DAA" fillOpacity={0.3} />
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
