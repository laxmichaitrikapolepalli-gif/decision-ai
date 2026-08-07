import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDecision } from '../../contexts/DecisionContext';
import { useCommand } from '../../contexts/CommandContext';
import { DecisionCard } from '../../components/decision/DecisionCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  PlusCircle,
  Swords,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layers,
  Activity,
  ArrowRight,
  Bot,
  Calendar,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { decisions, fetchTrips, toggleAiDrawer, setCurrentDecision } = useDecision();
  const { openCommandPalette } = useCommand();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const kpis = [
    {
      label: 'TOTAL DECISIONS',
      value: '1,248',
      change: '+14% vs Q2',
      sub: '10,000 Monte Carlo runs',
      icon: Layers,
      iconBg: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'MODEL ACCURACY',
      value: '98.4%',
      change: '+2.1%',
      sub: 'High-fidelity confidence bound',
      icon: ShieldCheck,
      iconBg: 'bg-pink-100 text-pink-600',
    },
    {
      label: 'RISK REDUCTION',
      value: '35.2%',
      change: 'P95 Variance',
      sub: 'Sub-second threat mitigation',
      icon: Activity,
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'CAPITAL SAVED',
      value: '₹4.2M',
      change: 'YTD Benefit',
      sub: 'Validated across 42 projects',
      icon: TrendingUp,
      iconBg: 'bg-amber-100 text-amber-600',
    }
  ];

  const chartData = [
    { month: 'Mar', roi: 18, confidence: 91 },
    { month: 'Apr', roi: 24, confidence: 93 },
    { month: 'May', roi: 28, confidence: 95 },
    { month: 'Jun', roi: 34, confidence: 96 },
    { month: 'Jul', roi: 42, confidence: 98 },
  ];

  const recentSimulations = [
    {
      id: 'DEC-2026-089',
      tag: 'Market Growth',
      title: 'Store Expansion: Hyderabad vs...',
      confidence: '96%',
      risk: 'Medium',
      riskColor: 'bg-amber-100 text-amber-700 border-amber-200',
      roi: '+28%',
      date: '2026-08-04',
      status: 'Approved',
      statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      id: 'DEC-2026-088',
      tag: 'IT Infrastructure',
      title: 'Cloud Infrastructure Migration to...',
      confidence: '98%',
      risk: 'Low',
      riskColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      roi: '+42%',
      date: '2026-08-01',
      status: 'Completed',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    {
      id: 'DEC-2026-087',
      tag: 'Finance',
      title: 'AI R&D Budget Allocation Q3-Q4',
      confidence: '91%',
      risk: 'High',
      riskColor: 'bg-rose-100 text-rose-700 border-rose-200',
      roi: '+35%',
      date: '2026-07-28',
      status: 'In Review',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    {
      id: 'DEC-2026-086',
      tag: 'Operations',
      title: 'Supply Chain Supplier Redundancy...',
      confidence: '94%',
      risk: 'Low',
      riskColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      roi: '+18%',
      date: '2026-07-22',
      status: 'Executed',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
    }
  ];

  const upcomingQueue = [
    { title: 'Automated Factory Robotics Rollout', risk: 'High Risk', riskColor: 'bg-rose-100 text-rose-700 border-rose-200', due: 'Aug 12, 2026' },
    { title: 'Direct-to-Consumer EU Licensing', risk: 'Medium', riskColor: 'bg-slate-100 text-slate-700 border-slate-200', due: 'Aug 18, 2026' },
    { title: 'Generative Design Patent Acquisition', risk: 'Low Risk', riskColor: 'bg-slate-100 text-slate-700 border-slate-200', due: 'Aug 25, 2026' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xl space-y-1 text-xs">
          <p className="font-extrabold text-[#0F172A]">{label}</p>
          <p className="text-[#64748B] font-semibold">Actualized ROI % : <span className="text-[#10B981] font-bold">{payload[0]?.value}</span></p>
          <p className="text-[#64748B] font-semibold">Model Confidence % : <span className="text-[#6C63FF] font-bold">{payload[1]?.value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Welcome Banner exact matching screenshot 1 */}
      <div className="p-7 rounded-3xl bg-white border border-slate-200/80 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-extrabold text-[#64748B] uppercase tracking-widest">AEROTECH DYNAMICS</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold border border-purple-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Quantum v4.2 Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Space_Grotesk'] flex items-center gap-2">
            Welcome back, Dr. <span className="text-[#6C63FF]">👋</span>
          </h1>
          <p className="text-xs text-[#64748B] font-medium leading-relaxed">
            DecisionSphere engine evaluated 1,248 multi-variance scenarios this week. Average confidence rating is at an optimal 98.4%.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 z-10">
          <Link to="/decisions/new">
            <Button variant="primary" size="md" icon={PlusCircle} className="bg-gradient-to-r from-[#FF2DAA] to-[#4F7DFF] text-white border-none rounded-2xl font-bold shadow-md shadow-[#FF2DAA]/20 text-xs py-3 px-5">
              New Decision
            </Button>
          </Link>
          <Link to="/decisions/battle">
            <Button variant="accent" size="md" icon={Swords} className="bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white border-none rounded-2xl font-bold shadow-md text-xs py-3 px-5">
              Decision Battle
            </Button>
          </Link>
          <Button onClick={openCommandPalette} variant="secondary" size="md" icon={Zap} className="bg-white border-slate-200 text-[#0F172A] rounded-2xl font-bold text-xs py-3 px-4 shadow-sm">
            Cmd (Ctrl+K)
          </Button>
        </div>
      </div>

      {/* 4 KPI Cards exact matching screenshot 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} glow className="p-5 border-slate-100 glass-card space-y-3 rounded-3xl bg-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">{kpi.label}</span>
                <div className={`p-2 rounded-xl ${kpi.iconBg} shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">{kpi.value}</h3>
                  <span className="text-xs font-bold text-[#FF2DAA]">{kpi.change}</span>
                </div>
                <p className="text-[11px] text-[#64748B] font-medium">{kpi.sub}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Strategic Confidence Chart & Health Gauges Grid exact matching screenshots 1 & 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recharts Area Chart */}
        <Card glow className="lg:col-span-2 p-6 border-slate-100 glass-card space-y-4 rounded-3xl bg-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">Strategic Confidence & ROI Projection</h3>
              <p className="text-xs text-[#64748B] font-medium">Real-time neural feedback curves</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold border border-purple-200">
              P95 Horizon
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontWeight={700} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={700} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="confidence" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#colorConf)" name="Model Confidence %" />
                <Area type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={2.5} fill="url(#colorRoi)" name="Actualized ROI %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Health Gauges Box exact matching screenshots 1 & 2 */}
        <Card glow className="p-6 border-slate-100 glass-card space-y-5 rounded-3xl bg-white shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-extrabold text-[#64748B] uppercase tracking-widest">HEALTH GAUGES</h3>

            {/* Gauge 1 */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#64748B] uppercase text-[10px]">PLATFORM RISK SCORE</span>
                <span className="text-emerald-700 font-extrabold">Low Risk</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">24</span>
                <span className="text-xs font-medium text-[#64748B]">/100 Risk Index</span>
              </div>
              <div className="w-full h-2 rounded-full bg-emerald-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[24%]" />
              </div>
            </div>

            {/* Gauge 2 */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#64748B] uppercase text-[10px]">DECISION PRECISION</span>
                <span className="text-blue-700 font-extrabold">Highly Reliable</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">96%</span>
                <span className="text-xs font-medium text-[#64748B]">Model Precision</span>
              </div>
              <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[96%]" />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button onClick={toggleAiDrawer} variant="primary" size="md" icon={Bot} className="w-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold rounded-2xl border-none shadow-md">
              Ask AI Copilot
            </Button>
          </div>
        </Card>

      </div>

      {/* Today's Executive AI Summary Bar exact matching screenshots 2 & 3 */}
      <Card glow className="p-5 border-slate-100 glass-card bg-white rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 flex-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] text-white flex items-center justify-center shadow-md shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-[#0F172A]">Today's Executive AI Summary</h4>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-200">
                Aug 5, 2026
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-medium leading-relaxed italic">
              "Spatial expansion models show high readiness for Hyderabad Tech Corridor Phase II. Real estate tax subsidies offset initial infrastructure expenditure, offering an 8.4-month faster payback period than Bangalore."
            </p>
          </div>
        </div>

        <Button onClick={toggleAiDrawer} variant="primary" size="md" icon={Sparkles} className="shrink-0 bg-gradient-to-r from-[#FF2DAA] via-[#8B5CF6] to-[#4F7DFF] text-white font-bold rounded-2xl border-none shadow-md text-xs py-2.5 px-5">
          Ask AI Assistant
        </Button>
      </Card>

      {/* Recent Decisions & Simulations + Upcoming Queue Grid exact matching screenshot 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Decisions 2x2 Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#0F172A] font-['Space_Grotesk']">Recent Decisions & Simulations</h3>
            <Link to="/decisions/history" className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1">
              View All History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {decisions.length === 0 ? (
            <Card className="p-8 text-center border-slate-100 glass-card bg-white rounded-3xl space-y-3">
              <p className="text-xs text-[#64748B] font-semibold">No recent decisions found in Supabase database.</p>
              <Link to="/decisions/new">
                <Button variant="primary" size="sm" icon={PlusCircle} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold text-xs">
                  Create First Decision
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decisions.slice(0, 4).map((dec) => (
                <DecisionCard key={dec.id || dec._id} decision={dec} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Queue Right Column Box exact matching screenshot 3 */}
        <Card glow className="p-5 border-slate-100 glass-card space-y-4 rounded-3xl bg-white shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0F172A]">Upcoming Queue</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                3 Pending
              </span>
            </div>

            <div className="space-y-3">
              {upcomingQueue.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#0F172A] truncate max-w-[180px]">{item.title}</h5>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${item.riskColor}`}>
                      {item.risk}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-medium text-[#64748B]">
                    <Clock className="w-3 h-3 text-purple-500" />
                    <span>Due: {item.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
};
