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
  Bot
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
      color: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-500/30'
    },
    {
      label: 'AI Recommendations',
      value: decisions.length > 0 ? `${decisions.length}` : '18',
      change: '100% neural processed',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-600',
      borderColor: 'border-pink-500/30'
    },
    {
      label: 'Decision Confidence',
      value: '96.2%',
      change: 'High-confidence threshold',
      icon: ShieldCheck,
      color: 'from-indigo-500 to-blue-600',
      borderColor: 'border-indigo-500/30'
    },
    {
      label: 'Prediction Accuracy',
      value: '98.4%',
      change: '+12.4% vs baseline',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/30'
    },
    {
      label: 'Active Scenarios',
      value: '12',
      change: 'Monte Carlo models running',
      icon: Layers,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/30'
    },
    {
      label: 'Risk Level',
      value: 'Low (P95)',
      change: 'Optimal risk distribution',
      icon: Activity,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/30'
    }
  ];

  const chartData = [
    { month: 'Jan', decisions: 12, accuracy: 94 },
    { month: 'Feb', decisions: 15, accuracy: 95 },
    { month: 'Mar', decisions: 18, accuracy: 96 },
    { month: 'Apr', decisions: 22, accuracy: 97 },
    { month: 'May', decisions: 24, accuracy: 98 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      <Navbar isDashboard={true} />

      <div className="flex pt-4">
        <Sidebar />

        <main className="flex-1 px-4 lg:px-8 pb-16 space-y-8 overflow-x-hidden max-w-7xl">
          
          {/* Executive Welcome Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-purple-500/30 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 max-w-xl z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-purple-400 uppercase tracking-widest">EXECUTIVE PLATFORM</span>
                <Badge variant="primary" size="sm">Active Session</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
                Welcome back, {user?.name?.split(' ')[0] || 'Executive'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                DecisionSphere AI model v4.2 is actively monitoring strategic parameters and scenario bounds.
              </p>
            </div>

            <div className="flex items-center gap-3 z-10">
              <Link to="/decisions/new">
                <Button variant="primary" size="lg" icon={PlusCircle} className="shadow-lg shadow-purple-500/30">
                  New AI Decision
                </Button>
              </Link>
            </div>
          </div>

          {/* New Exact Required KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <Card key={idx} glow className={`p-6 ${kpi.borderColor} glass-card space-y-3 rounded-3xl bg-slate-900/80`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">{kpi.label}</span>
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-r ${kpi.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-white font-['Space_Grotesk']">{kpi.value}</h3>
                    <p className="text-xs text-purple-400 font-bold">{kpi.change}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Analytics Chart & Assistant Teaser Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Box */}
            <Card glow className="lg:col-span-2 p-6 border-purple-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">Decision Velocity & Accuracy Trajectory</h3>
                  <p className="text-xs text-slate-300 font-medium">Historical neural performance trends</p>
                </div>
                <Badge variant="success" size="sm">Real-time Stream</Badge>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorDec" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={700} />
                    <YAxis stroke="#94a3b8" fontSize={11} fontWeight={700} />
                    <Tooltip />
                    <Area type="monotone" dataKey="decisions" stroke="#A855F7" strokeWidth={2.5} fill="url(#colorDec)" name="Decisions Evaluated" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* AI Copilot Callout Card */}
            <Card glow className="p-6 border-pink-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Ask Decision AI Assistant</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Query natural language AI models for instant scenario analysis, risk evaluations, and SWOT recommendations.
                </p>
              </div>
              <Button onClick={toggleAiDrawer} variant="primary" size="md" icon={Sparkles} className="w-full">
                Launch AI Assistant
              </Button>
            </Card>

          </div>

          {/* Recent Decisions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">Recent AI Decisions</h3>
                <p className="text-xs text-slate-300 font-medium">Latest evaluated business choices and strategic recommendations</p>
              </div>
              <Link to="/decisions/history" className="text-xs font-black text-purple-400 hover:underline flex items-center gap-1">
                View Decision History <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs font-bold text-slate-400">
                Loading decision records...
              </div>
            ) : decisions.length === 0 ? (
              <Card className="p-8 text-center border-purple-500/20 glass-card space-y-3 rounded-3xl bg-slate-900/80">
                <p className="text-sm font-black text-white">No AI Decisions Found</p>
                <p className="text-xs text-slate-400 font-medium">Click below to generate your first strategic recommendation.</p>
                <Link to="/decisions/new">
                  <Button variant="primary" size="sm" icon={PlusCircle} className="mt-2">
                    Create New Decision
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {decisions.slice(0, 3).map((dec, idx) => (
                  <DecisionCard key={dec.id || dec._id || idx} decision={dec} />
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};
