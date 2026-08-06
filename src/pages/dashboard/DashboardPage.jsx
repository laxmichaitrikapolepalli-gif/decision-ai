import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDecision } from '../../contexts/DecisionContext';
import { useCommand } from '../../contexts/CommandContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RiskMeter, ConfidenceMeter } from '../../components/ui/RiskMeter';
import { DecisionCard } from '../../components/decision/DecisionCard';
import {
  Sparkles,
  PlusCircle,
  Swords,
  Sliders,
  TrendingUp,
  ShieldCheck,
  Zap,
  Bot,
  Calendar,
  ArrowRight,
  Activity,
  Layers,
  Clock,
  Award
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
  const { decisions, toggleAiDrawer } = useDecision();
  const { openCommandPalette } = useCommand();

  const chartData = [
    { month: 'Mar', accuracy: 91, riskReduced: 24, roi: 18 },
    { month: 'Apr', accuracy: 93, riskReduced: 28, roi: 24 },
    { month: 'May', accuracy: 95, riskReduced: 31, roi: 30 },
    { month: 'Jun', accuracy: 97, riskReduced: 33, roi: 36 },
    { month: 'Jul', accuracy: 98, riskReduced: 35, roi: 42 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-8 rounded-3xl glass-card border border-purple-500/30 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black font-mono text-purple-700 uppercase tracking-widest">
              {user?.company || 'Enterprise AI Node'}
            </span>
            <Badge variant="primary" size="sm" icon={ShieldCheck}>Quantum v4.2 Active</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 max-w-xl font-bold leading-relaxed">
            DecisionSphere engine evaluated <span className="text-purple-700 font-black">1,248 multi-variance scenarios</span> this week. Average confidence rating is at an optimal 98.4%.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <Link to="/decisions/new">
            <Button variant="primary" size="md" icon={PlusCircle}>
              New Decision
            </Button>
          </Link>
          <Link to="/decisions/battle">
            <Button variant="accent" size="md" icon={Swords}>
              Decision Battle
            </Button>
          </Link>
          <Button onClick={openCommandPalette} variant="secondary" size="md" icon={Zap}>
            Cmd (Ctrl+K)
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card glow className="glass-card-hover border-purple-500/30 p-6">
          <div className="flex items-center justify-between text-slate-700 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-700">Total Decisions</span>
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-700">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">1,248</span>
            <span className="text-xs font-black text-emerald-600">+14% vs Q2</span>
          </div>
          <p className="text-[11px] text-slate-700 mt-1 font-bold">10,000 Monte Carlo runs</p>
        </Card>

        <Card glow className="glass-card-hover border-pink-500/30 p-6">
          <div className="flex items-center justify-between text-slate-700 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-pink-700">Model Accuracy</span>
            <div className="p-2 rounded-xl bg-pink-500/15 text-pink-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">98.4%</span>
            <span className="text-xs font-black text-emerald-600">+2.1%</span>
          </div>
          <p className="text-[11px] text-slate-700 mt-1 font-bold">High-fidelity confidence bound</p>
        </Card>

        <Card glow className="glass-card-hover border-blue-500/30 p-6">
          <div className="flex items-center justify-between text-slate-700 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-700">Risk Reduction</span>
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-700">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">35.2%</span>
            <span className="text-xs font-black text-blue-600">P95 Variance</span>
          </div>
          <p className="text-[11px] text-slate-700 mt-1 font-bold">Sub-second threat mitigation</p>
        </Card>

        <Card glow className="glass-card-hover border-amber-500/30 p-6">
          <div className="flex items-center justify-between text-slate-700 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800">Capital Saved</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk'] text-gradient-master">$4.2M</span>
            <span className="text-xs font-black text-amber-700">YTD Benefit</span>
          </div>
          <p className="text-[11px] text-slate-700 mt-1 font-bold">Validated across 42 projects</p>
        </Card>
      </div>

      {/* Recharts Analytics & Health Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <Card className="lg:col-span-2 space-y-4 border-purple-500/30 p-6 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Strategic Confidence & ROI Projection</h3>
              <p className="text-xs text-slate-700 font-semibold">Real-time neural feedback curves</p>
            </div>
            <Badge variant="primary" size="sm">P95 Horizon</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.8} />
                <XAxis dataKey="month" stroke="#334155" fontSize={11} fontWeight={700} />
                <YAxis stroke="#334155" fontSize={11} fontWeight={700} />
                <Tooltip />
                <Area type="monotone" dataKey="accuracy" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#colorAccuracy)" name="Model Confidence %" />
                <Area type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRoi)" name="Actualized ROI %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Health Gauges Column */}
        <div className="space-y-6">
          <Card className="space-y-4 border-purple-500/30 p-6 glass-card">
            <h3 className="text-xs font-black text-purple-700 uppercase tracking-widest">Health Gauges</h3>
            <RiskMeter score={24} label="Platform Risk Score" />
            <ConfidenceMeter score={96} label="Decision Precision" />
          </Card>
        </div>
      </div>

      {/* AI Daily Summary Card */}
      <Card glow className="p-6 border-purple-500/40 glass-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-extrabold text-slate-900">Today's Executive AI Summary</h4>
              <Badge variant="accent" size="sm">Aug 5, 2026</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed max-w-3xl font-bold">
              "Spatial expansion models show high readiness for Hyderabad Tech Corridor Phase II. Real estate tax subsidies offset initial infrastructure expenditure, offering an 8.4-month faster payback period than Bangalore."
            </p>
          </div>
        </div>
        <Button onClick={() => toggleAiDrawer(true)} variant="primary" size="md" icon={Sparkles} className="shrink-0">
          Ask AI Assistant
        </Button>
      </Card>

      {/* Recent Decisions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Recent Decisions & Simulations</h3>
            <Link to="/decisions/history" className="text-xs font-black text-purple-700 hover:underline flex items-center gap-1">
              View All History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {decisions.slice(0, 4).map((dec) => (
              <DecisionCard key={dec.id} decision={dec} />
            ))}
          </div>
        </div>

        {/* Upcoming Queue */}
        <Card className="space-y-4 border-purple-500/30 p-6 glass-card">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Upcoming Queue</h3>
            <Badge variant="warning" size="sm">3 Pending</Badge>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Automated Factory Robotics Rollout', due: 'Aug 12, 2026', priority: 'High Risk' },
              { title: 'Direct-to-Consumer EU Licensing', due: 'Aug 18, 2026', priority: 'Medium' },
              { title: 'Generative Design Patent Acquisition', due: 'Aug 25, 2026', priority: 'Low Risk' },
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-purple-500/20 space-y-1 hover:border-purple-400 transition-colors shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <h5 className="font-black text-slate-900">{item.title}</h5>
                  <Badge variant={item.priority === 'High Risk' ? 'danger' : 'neutral'} size="sm">
                    {item.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>Due: {item.due}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
