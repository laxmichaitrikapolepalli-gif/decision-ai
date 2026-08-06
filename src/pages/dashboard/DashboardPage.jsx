import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDecision } from '../../contexts/DecisionContext';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { DecisionCard } from '../../components/decision/DecisionCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  PlusCircle,
  TrendingUp,
  Brain,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  BarChart2,
  PieChart,
  LineChart,
  Bot,
  Sliders,
  CheckCircle2,
  Clock
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
  const { decisions, loading, fetchTrips, toggleAiDrawer } = useDecision();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const kpis = [
    {
      label: 'Total Decisions',
      value: decisions.length > 0 ? `${decisions.length}` : '24',
      change: '+14% this month',
      icon: Target,
      color: 'from-[#FF2DAA] to-[#6C63FF]',
      borderColor: 'border-[#FF2DAA]/20'
    },
    {
      label: 'AI Recommendations',
      value: decisions.length > 0 ? `${decisions.length}` : '18',
      change: '100% neural processed',
      icon: Sparkles,
      color: 'from-[#6C63FF] to-[#4F7DFF]',
      borderColor: 'border-[#6C63FF]/20'
    },
    {
      label: 'Decision Confidence',
      value: '96.2%',
      change: 'High-confidence threshold',
      icon: ShieldCheck,
      color: 'from-[#4F7DFF] to-[#8B5CF6]',
      borderColor: 'border-[#4F7DFF]/20'
    },
    {
      label: 'Prediction Accuracy',
      value: '98.4%',
      change: '+12.4% vs baseline',
      icon: TrendingUp,
      color: 'from-[#10B981] to-[#34D399]',
      borderColor: 'border-[#10B981]/20'
    },
    {
      label: 'Active Scenarios',
      value: '12',
      change: 'Monte Carlo models running',
      icon: Layers,
      color: 'from-[#F59E0B] to-[#FBBF24]',
      borderColor: 'border-[#F59E0B]/20'
    },
    {
      label: 'Risk Level',
      value: 'Low (P95)',
      change: 'Optimal risk distribution',
      icon: Activity,
      color: 'from-[#EC4899] to-[#FF2DAA]',
      borderColor: 'border-[#EC4899]/20'
    }
  ];

  const chartData = [
    { month: 'Jan', decisions: 12, accuracy: 94 },
    { month: 'Feb', decisions: 15, accuracy: 95 },
    { month: 'Mar', decisions: 18, accuracy: 96 },
    { month: 'Apr', decisions: 22, accuracy: 97 },
    { month: 'May', decisions: 24, accuracy: 98 },
  ];

  const activityTimeline = [
    { time: '10 mins ago', title: 'Hyderabad Flagship Expansion decision generated', status: 'Optimal' },
    { time: '2 hours ago', title: 'Q4 Sensitivity Scenario Simulation updated', status: 'Completed' },
    { time: '1 day ago', title: 'APAC Supply Chain Risk Alert evaluated', status: 'Actioned' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#0F172A] selection:bg-[#FF2DAA] selection:text-white">
      <Navbar isDashboard={true} />

      <div className="flex pt-4">
        <Sidebar />

        <main className="flex-1 px-4 lg:px-8 pb-16 space-y-8 overflow-x-hidden max-w-7xl">
          
          {/* Executive Welcome Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FF2DAA]/10 via-[#6C63FF]/10 to-[#4F7DFF]/10 border border-[#6C63FF]/20 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-xl z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-[#6C63FF] uppercase tracking-widest">EXECUTIVE PLATFORM</span>
                <Badge variant="primary" size="sm" className="bg-[#6C63FF]/15 text-[#6C63FF]">Active Session</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk']">
                Welcome back, {user?.name?.split(' ')[0] || 'Executive'}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-semibold">
                DecisionSphere AI model v4.2 is actively monitoring strategic parameters and scenario bounds.
              </p>
            </div>

            <div className="flex items-center gap-3 z-10">
              <Link to="/decisions/new">
                <Button variant="primary" size="lg" icon={PlusCircle} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none shadow-lg shadow-[#6C63FF]/25 font-bold">
                  New AI Decision
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <Card key={idx} glow className={`p-6 ${kpi.borderColor} glass-card space-y-3 rounded-3xl bg-white/90`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">{kpi.label}</span>
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-r ${kpi.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-[#0F172A] font-['Space_Grotesk']">{kpi.value}</h3>
                    <p className="text-xs text-[#6C63FF] font-bold">{kpi.change}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Analytics Chart & Health Gauges & Assistant Teaser Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Box */}
            <Card glow className="lg:col-span-2 p-6 border-[#6C63FF]/15 glass-card space-y-4 rounded-3xl bg-white/90">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0F172A]">Decision Velocity & Accuracy Trajectory</h3>
                  <p className="text-xs text-[#64748B] font-semibold">Historical neural performance trends</p>
                </div>
                <Badge variant="success" size="sm">Real-time Stream</Badge>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorDec" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontWeight={700} />
                    <YAxis stroke="#64748b" fontSize={11} fontWeight={700} />
                    <Tooltip />
                    <Area type="monotone" dataKey="decisions" stroke="#6C63FF" strokeWidth={2.5} fill="url(#colorDec)" name="Decisions Evaluated" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Health Gauge & AI Assistant Card */}
            <Card glow className="p-6 border-[#FF2DAA]/20 glass-card space-y-4 rounded-3xl bg-white/90 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white flex items-center justify-center shadow-md">
                    <Bot className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" size="sm">AI Model Health 99.8%</Badge>
                </div>
                <h3 className="text-xl font-black text-[#0F172A]">Ask AI Strategy Copilot</h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-semibold">
                  Query natural language AI models for instant scenario analysis, risk evaluations, and SWOT recommendations.
                </p>
              </div>

              {/* Quick Health Gauge Bar */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs font-black text-[#0F172A]">
                  <span>System Neural Capacity</span>
                  <span className="text-[#10B981]">Optimal (0.4ms)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10B981] to-[#6C63FF] rounded-full w-[94%]" />
                </div>
              </div>

              <Button onClick={toggleAiDrawer} variant="primary" size="md" icon={Sparkles} className="w-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold border-none shadow-md">
                Launch AI Assistant
              </Button>
            </Card>

          </div>

          {/* Activity Timeline & Recent Decisions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Decisions Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-[#0F172A] font-['Space_Grotesk']">Recent AI Decisions</h3>
                  <p className="text-xs text-[#64748B] font-semibold">Latest evaluated business choices and strategic recommendations</p>
                </div>
                <Link to="/decisions/history" className="text-xs font-black text-[#6C63FF] hover:underline flex items-center gap-1">
                  View Decision History <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <div className="py-12 text-center text-xs font-bold text-[#64748B]">
                  Loading decision records...
                </div>
              ) : decisions.length === 0 ? (
                <Card className="p-8 text-center border-[#6C63FF]/15 glass-card space-y-3 rounded-3xl bg-white/90">
                  <p className="text-sm font-black text-[#0F172A]">No AI Decisions Found</p>
                  <p className="text-xs text-[#64748B] font-semibold">Click below to generate your first strategic recommendation.</p>
                  <Link to="/decisions/new">
                    <Button variant="primary" size="sm" icon={PlusCircle} className="mt-2 bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold">
                      Create New Decision
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {decisions.slice(0, 2).map((dec, idx) => (
                    <DecisionCard key={dec.id || dec._id || idx} decision={dec} />
                  ))}
                </div>
              )}
            </div>

            {/* Activity Timeline Panel */}
            <Card glow className="p-6 border-[#6C63FF]/15 glass-card space-y-4 rounded-3xl bg-white/90">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[#0F172A]">Activity Timeline</h3>
                <Badge variant="neutral" size="sm">Audit Log</Badge>
              </div>
              <div className="space-y-3">
                {activityTimeline.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#64748B] font-bold">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#6C63FF]" /> {item.time}</span>
                      <span className="text-[#10B981] font-black">{item.status}</span>
                    </div>
                    <p className="text-xs font-bold text-[#0F172A]">{item.title}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </main>
      </div>
    </div>
  );
};
