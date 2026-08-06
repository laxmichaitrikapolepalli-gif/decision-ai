import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LineChart as LineIcon, Route, Car } from 'lucide-react';
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
    { subject: 'Speed Index', A: 120, B: 110, fullMark: 150 },
    { subject: 'Fuel Economy', A: 98, B: 130, fullMark: 150 },
    { subject: 'Low Congestion', A: 86, B: 130, fullMark: 150 },
    { subject: 'Safety Score', A: 99, B: 100, fullMark: 150 },
    { subject: 'Road Surface', A: 85, B: 90, fullMark: 150 },
    { subject: 'Signal Sync', A: 65, B: 85, fullMark: 150 },
  ];

  const pieData = [
    { name: 'Car Express', value: 400, color: '#2563EB' },
    { name: 'Bus Transit', value: 300, color: '#06B6D4' },
    { name: 'High-Speed Rail', value: 300, color: '#10B981' },
    { name: 'Air Freight', value: 200, color: '#F59E0B' },
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
            <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest">TELEMETRY DEEP DIVE</span>
            <Badge variant="primary" size="sm" icon={LineIcon}>Live Analytics</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Fleet & Traffic Analytics
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-1">
            Real-time route vector analytics, transport mode share, and AI precision curves
          </p>
        </div>
      </div>

      {/* Grid of Multi-Type Recharts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className="p-6 border-blue-500/30 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Multivariate Traffic Vector Radar</h3>
            <Badge variant="accent" size="sm">Route A vs B</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" stroke="#0f172a" fontSize={11} fontWeight={800} />
                <PolarRadiusAxis stroke="#64748b" fontSize={10} />
                <Radar name="Outer Ring Expressway" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.5} />
                <Radar name="City Center Bypass" dataKey="B" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6 border-blue-500/30 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Transport Mode Distribution</h3>
            <Badge variant="success" size="sm">Active Trips</Badge>
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

      {/* Latency & Confidence Line Chart */}
      <Card className="p-6 border-blue-500/30 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">Traffic Processing Latency vs Route Precision</h3>
          <Badge variant="primary" size="sm">Sub-second Latency</Badge>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.8} />
              <XAxis dataKey="week" stroke="#334155" fontSize={11} fontWeight={700} />
              <YAxis stroke="#334155" fontSize={11} fontWeight={700} />
              <Tooltip />
              <Area type="monotone" dataKey="confidence" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Route Precision %" />
              <Area type="monotone" dataKey="latency" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} name="Latency (ms)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
