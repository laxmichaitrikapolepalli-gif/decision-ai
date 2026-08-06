import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LineChart as LineIcon } from 'lucide-react';
import {
  AreaChart,
  Area,
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

// TODO: Backend endpoint GET /api/analytics is missing. Preserving UI with mock chart data.
export const AnalyticsPage = () => {
  const radarData = [
    { subject: 'Cost Efficiency', A: 120, B: 110, fullMark: 150 },
    { subject: 'ROI Margin', A: 98, B: 130, fullMark: 150 },
    { subject: 'Risk Bounds', A: 86, B: 130, fullMark: 150 },
    { subject: 'Market Fit', A: 99, B: 100, fullMark: 150 },
    { subject: 'Talent Density', A: 85, B: 90, fullMark: 150 },
    { subject: 'Growth Velocity', A: 65, B: 85, fullMark: 150 },
  ];

  const pieData = [
    { name: 'Market Expansion', value: 400, color: '#A855F7' },
    { name: 'IT Infra', value: 300, color: '#EC4899' },
    { name: 'Finance & Tax', value: 300, color: '#3B82F6' },
    { name: 'Operations', value: 200, color: '#10B981' },
  ];

  const lineData = [
    { week: 'W1', latency: 45, confidence: 92 },
    { week: 'W2', latency: 38, confidence: 94 },
    { week: 'W3', latency: 28, confidence: 96 },
    { week: 'W4', latency: 19, confidence: 98 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-700 uppercase tracking-widest">TELEMETRY DEEP DIVE</span>
            <Badge variant="primary" size="sm" icon={LineIcon}>Live Analytics</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Enterprise Decision Analytics
          </h1>
        </div>
      </div>

      {/* Grid of Multi-Type Recharts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className="p-6 border-purple-500/30 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Multivariate Vector Radar</h3>
            <Badge variant="accent" size="sm">Option A vs B</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" stroke="#0f172a" fontSize={11} fontWeight={800} />
                <PolarRadiusAxis stroke="#64748b" fontSize={10} />
                <Radar name="Hyderabad Node" dataKey="A" stroke="#A855F7" fill="#A855F7" fillOpacity={0.5} />
                <Radar name="Bangalore Node" dataKey="B" stroke="#EC4899" fill="#EC4899" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6 border-purple-500/30 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Capital Distribution Share</h3>
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
      </div>

      {/* Neural Latency & Confidence Line Chart */}
      <Card className="p-6 border-purple-500/30 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">Neural Processing Latency vs Model Confidence</h3>
          <Badge variant="primary" size="sm">Latency Optimization</Badge>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.8} />
              <XAxis dataKey="week" stroke="#334155" fontSize={11} fontWeight={700} />
              <YAxis stroke="#334155" fontSize={11} fontWeight={700} />
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
