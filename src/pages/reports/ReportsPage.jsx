import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  FileText,
  Download,
  Share2,
  TrendingUp,
  ShieldCheck,
  PieChart,
  BarChart2,
  Sparkles,
  Layers,
  CheckCircle2,
  Activity
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart as RePie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

export const ReportsPage = () => {
  const [reportType, setReportType] = useState('executive');

  const predictionTrends = [
    { month: 'Jan', expectedYield: 85, actualYield: 88, riskVariance: 12 },
    { month: 'Feb', expectedYield: 88, actualYield: 91, riskVariance: 10 },
    { month: 'Mar', expectedYield: 92, actualYield: 94, riskVariance: 8 },
    { month: 'Apr', expectedYield: 95, actualYield: 96, riskVariance: 7 },
    { month: 'May', expectedYield: 98, actualYield: 98.4, riskVariance: 5 },
  ];

  const riskDistribution = [
    { name: 'Low Risk (P95)', value: 65, color: '#10B981' },
    { name: 'Moderate Risk (P75)', value: 25, color: '#3B82F6' },
    { name: 'High Risk / Opportunistic', value: 10, color: '#F59E0B' },
  ];

  const handleExport = (format) => {
    toast.success(`Exporting Decision Report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-400 uppercase tracking-widest">EXECUTIVE AUDIT</span>
            <Badge variant="primary" size="sm" icon={FileText}>Decision Intelligence Report</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Decision Reports
          </h1>
          <p className="text-xs font-semibold text-slate-300 mt-1">
            Executive summaries, prediction trends, confidence analysis, and risk distribution reports
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => handleExport('pdf')} variant="secondary" size="md" icon={Download}>
            Export PDF
          </Button>
          <Button onClick={() => handleExport('excel')} variant="primary" size="md" icon={Share2}>
            Export Dataset
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-purple-500/25 max-w-md">
        {['executive', 'trends', 'risk'].map((tab) => (
          <button
            key={tab}
            onClick={() => setReportType(tab)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all capitalize cursor-pointer ${
              reportType === tab
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-purple-300'
            }`}
          >
            {tab === 'executive' ? 'Executive Summary' : tab === 'trends' ? 'Prediction Trends' : 'Risk Distribution'}
          </button>
        ))}
      </div>

      {/* 1. Executive Summary Section */}
      <Card glow className="p-8 border-purple-500/30 glass-card space-y-6 rounded-3xl bg-slate-900/80">
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
          <div>
            <h2 className="text-2xl font-black text-white font-['Space_Grotesk']">Executive Summary</h2>
            <p className="text-xs text-purple-400 font-bold">Quarterly Decision Performance Briefing</p>
          </div>
          <Badge variant="success" size="md">Audit Passed (SOC2 Type II)</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-black">Capital Optimized</span>
            <p className="text-3xl font-black text-emerald-400 font-['Space_Grotesk']">$4,250,000</p>
            <p className="text-xs text-slate-300 font-bold">+18.4% YoY Efficiency Gain</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-black">Average Confidence Score</span>
            <p className="text-3xl font-black text-purple-400 font-['Space_Grotesk']">96.8%</p>
            <p className="text-xs text-slate-300 font-bold">P95 Stochastic Limit</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-black">Prediction Accuracy</span>
            <p className="text-3xl font-black text-indigo-400 font-['Space_Grotesk']">98.4%</p>
            <p className="text-xs text-slate-300 font-bold">Tested against Q1-Q2 outcomes</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
          <h4 className="text-xs font-black text-purple-300 uppercase tracking-wider">Executive Synthesis</h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
            Across 10,000 stochastic model runs, DecisionSphere AI identified capital expansion in Tier-1 technology hubs as delivering 8.4-month faster CapEx payback while reducing supply chain vulnerability by 35%.
          </p>
        </div>
      </Card>

      {/* 2. Prediction Trends & Confidence Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-purple-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white">Prediction Trends</h3>
            <Badge variant="primary" size="sm">Actual vs Expected Yield</Badge>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={700} />
                <YAxis stroke="#94a3b8" fontSize={11} fontWeight={700} />
                <Tooltip />
                <Area type="monotone" dataKey="actualYield" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Actual Yield %" />
                <Area type="monotone" dataKey="expectedYield" stroke="#A855F7" fill="#A855F7" fillOpacity={0.1} name="Expected Yield %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 3. Risk Distribution */}
        <Card className="p-6 border-purple-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white">Risk Distribution</h3>
            <Badge variant="accent" size="sm">Portfolio Spread</Badge>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePie>
                <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePie>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
