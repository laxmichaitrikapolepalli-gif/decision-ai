import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LineChart as LineIcon, Activity, Brain, Download, Share2, Filter } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

// TODO: Backend endpoint GET /api/analytics is missing. Preserving UI with mock chart data.
export const AnalyticsPage = () => {
  const [timeFilter, setTimeFilter] = useState('quarterly');

  const radarData = [
    { subject: 'Cost Efficiency', A: 120, B: 110, fullMark: 150 },
    { subject: 'ROI Margin', A: 98, B: 130, fullMark: 150 },
    { subject: 'Risk Bounds', A: 86, B: 130, fullMark: 150 },
    { subject: 'Market Fit', A: 99, B: 100, fullMark: 150 },
    { subject: 'Talent Density', A: 85, B: 90, fullMark: 150 },
    { subject: 'Growth Velocity', A: 65, B: 85, fullMark: 150 },
  ];

  const pieData = [
    { name: 'Market Expansion', value: 400, color: '#FF2DAA' },
    { name: 'IT Infra', value: 300, color: '#6C63FF' },
    { name: 'Finance & Tax', value: 300, color: '#4F7DFF' },
    { name: 'Operations', value: 200, color: '#10B981' },
  ];

  const barData = [
    { category: 'Real Estate', budget: 2.5, yield: 3.8 },
    { category: 'R&D Talent', budget: 1.8, yield: 2.9 },
    { category: 'Cloud Infra', budget: 1.2, yield: 1.9 },
    { category: 'Marketing', budget: 0.9, yield: 1.4 },
  ];

  const lineData = [
    { week: 'W1', latency: 45, confidence: 92 },
    { week: 'W2', latency: 38, confidence: 94 },
    { week: 'W3', latency: 28, confidence: 96 },
    { week: 'W4', latency: 19, confidence: 98 },
  ];

  // Heatmap Risk Grid simulation
  const heatmapData = [
    { zone: 'Q1 APAC', risk: 'Low (12%)', level: 'bg-emerald-100 text-emerald-800' },
    { zone: 'Q2 EMEA', risk: 'Moderate (28%)', level: 'bg-amber-100 text-amber-800' },
    { zone: 'Q3 AMER', risk: 'Low (14%)', level: 'bg-emerald-100 text-emerald-800' },
    { zone: 'Q4 LATAM', risk: 'High (42%)', level: 'bg-rose-100 text-rose-800' },
  ];

  const handleExport = (type) => {
    toast.success(`Exporting Analytics Data as ${type.toUpperCase()}...`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-[#6C63FF] uppercase tracking-widest">TELEMETRY DEEP DIVE</span>
            <Badge variant="primary" size="sm" icon={LineIcon}>Executive Analytics</Badge>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Executive Decision Analytics
          </h1>
          <p className="text-xs font-semibold text-[#64748B] mt-1">
            Multivariate vector analysis, capital distribution share, bar charts, line curves, and risk heatmaps
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => handleExport('csv')} variant="secondary" size="md" icon={Download}>
            Export CSV
          </Button>
          <Button onClick={() => handleExport('pdf')} variant="primary" size="md" icon={Share2} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none shadow-md font-bold">
            Export Report
          </Button>
        </div>
      </div>

      {/* Filter Header */}
      <Card glow className="p-4 border-[#6C63FF]/20 glass-card bg-white/95 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
          <Filter className="w-4 h-4 text-[#6C63FF]" />
          <span>Analytics Timeframe Filter:</span>
        </div>
        <div className="flex items-center gap-2">
          {['monthly', 'quarterly', 'annual'].map((f) => (
            <button
              key={f}
              onClick={() => setTimeFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black capitalize transition-all cursor-pointer ${
                timeFilter === f ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-md' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      {/* Grid of Recharts (Radar + Pie + Bar + Area + Heatmap) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Radar Chart */}
        <Card className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#0F172A]">Multivariate Vector Radar Chart</h3>
            <Badge variant="accent" size="sm">Option A vs B</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#0F172A" fontSize={11} fontWeight={800} />
                <PolarRadiusAxis stroke="#64748b" fontSize={10} />
                <Radar name="Hyderabad Node" dataKey="A" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.5} />
                <Radar name="Bangalore Node" dataKey="B" stroke="#FF2DAA" fill="#FF2DAA" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 2. Pie Chart */}
        <Card className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#0F172A]">Capital Distribution Pie Chart</h3>
            <Badge variant="success" size="sm">Active Allocations</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 3. Bar Chart */}
        <Card className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#0F172A]">CapEx Budget vs Expected Yield Bar Chart</h3>
            <Badge variant="primary" size="sm">$ Millions</Badge>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} fontWeight={700} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={700} />
                <Tooltip />
                <Bar dataKey="budget" fill="#6C63FF" name="Budget ($M)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="yield" fill="#10B981" name="Yield ($M)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 4. Risk Heatmap Grid */}
        <Card className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#0F172A]">Regional Risk Variance Heatmap</h3>
            <Badge variant="warning" size="sm">Risk Matrix</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {heatmapData.map((h, i) => (
              <div key={i} className={`p-4 rounded-2xl border border-slate-200 ${h.level} text-center space-y-1`}>
                <span className="text-xs font-black uppercase tracking-wider block">{h.zone}</span>
                <span className="text-sm font-black block">{h.risk}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 5. Line/Area Chart */}
      <Card className="p-6 border-[#6C63FF]/20 glass-card bg-white/95 space-y-4 rounded-3xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-[#0F172A]">Neural Latency & Model Confidence Line Chart</h3>
          <Badge variant="primary" size="sm">Sub-Second Latency</Badge>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="week" stroke="#64748b" fontSize={11} fontWeight={700} />
              <YAxis stroke="#64748b" fontSize={11} fontWeight={700} />
              <Tooltip />
              <Area type="monotone" dataKey="confidence" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Confidence %" />
              <Area type="monotone" dataKey="latency" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} name="Latency (ms)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
