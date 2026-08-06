import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDecision } from '../../contexts/DecisionContext';
import { useCommand } from '../../contexts/CommandContext';
import { useTrips } from '../../hooks/useTrips';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { RiskMeter, ConfidenceMeter } from '../../components/ui/RiskMeter';
import { DecisionCard } from '../../components/decision/DecisionCard';
import {
  Sparkles,
  PlusCircle,
  Swords,
  TrendingUp,
  ShieldCheck,
  Zap,
  Bot,
  ArrowRight,
  Activity,
  Layers,
  Clock,
  Car,
  Fuel,
  Leaf,
  Navigation,
  Route
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
  const { toggleAiDrawer } = useDecision();
  const { openCommandPalette } = useCommand();
  const { data: trips, loading, error, refetch } = useTrips();

  // Dynamic calculations from GET /api/trips
  const totalTrips = trips?.length || 0;
  const recentTrips = trips?.slice(0, 4) || [];
  const lastRecommendation = trips?.[0] || null;

  // Calculate Average Travel Time if available
  const avgTravelTime = React.useMemo(() => {
    if (!trips || trips.length === 0) return '24 mins';
    const times = trips.map(t => {
      const timeStr = t.estimatedTime || t.travelTime || t.travel_time;
      if (typeof timeStr === 'number') return timeStr;
      if (typeof timeStr === 'string') {
        const num = parseFloat(timeStr.replace(/[^0-9.]/g, ''));
        return isNaN(num) ? 0 : num;
      }
      return 0;
    }).filter(v => v > 0);

    if (times.length === 0) return '24 mins';
    const sum = times.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / times.length);
    return `${avg} mins`;
  }, [trips]);

  // Calculate AI Confidence Average if available
  const avgConfidence = React.useMemo(() => {
    if (!trips || trips.length === 0) return 98.4;
    const confs = trips.map(t => {
      const conf = t.confidence || t.ai_confidence || t.confidenceScore || t.confidenceMeter;
      return typeof conf === 'number' ? conf : parseFloat(conf);
    }).filter(val => !isNaN(val) && val > 0);

    if (confs.length === 0) return 98.4;
    const sum = confs.reduce((a, b) => a + b, 0);
    return (sum / confs.length).toFixed(1);
  }, [trips]);

  // Trend Chart Data for Mobility Optimization
  const chartData = [
    { month: '08:00 AM', accuracy: 91, travelTime: 32, fuelSaved: 12 },
    { month: '09:00 AM', accuracy: 94, travelTime: 28, fuelSaved: 18 },
    { month: '10:00 AM', accuracy: 96, travelTime: 24, fuelSaved: 22 },
    { month: '11:00 AM', accuracy: 98, travelTime: 21, fuelSaved: 28 },
    { month: '12:00 PM', accuracy: Number(avgConfidence) || 98.4, travelTime: 19, fuelSaved: 35 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-8 rounded-3xl glass-card border border-blue-500/30 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black font-mono text-blue-600 uppercase tracking-widest">
              {user?.company || user?.organization || 'Smart Mobility Operations'}
            </span>
            <Badge variant="primary" size="sm" icon={ShieldCheck}>SmartRoute AI v4.2</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Welcome back, {user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 max-w-xl font-bold leading-relaxed">
            SmartRoute AI evaluated <span className="text-blue-700 font-black">{totalTrips > 0 ? `${totalTrips} trip recommendation(s)` : 'live traffic corridors'}</span>. Average route precision rate is at <span className="text-blue-700 font-black">{avgConfidence}%</span>.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <Link to="/decisions/new">
            <Button variant="primary" size="md" icon={PlusCircle}>
              Route Optimizer
            </Button>
          </Link>
          <Link to="/decisions/battle">
            <Button variant="accent" size="md" icon={Swords}>
              Route Comparison
            </Button>
          </Link>
          <Button onClick={openCommandPalette} variant="secondary" size="md" icon={Zap}>
            Cmd (Ctrl+K)
          </Button>
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <ErrorState message={error} onRetry={refetch} />
      )}

      {/* Rebranded Mobility KPI Cards Row */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Today's Trips */}
          <Card glow className="glass-card-hover border-blue-500/30 p-6">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700">Today's Trips</span>
              <div className="p-2 rounded-xl bg-blue-500/15 text-blue-700">
                <Car className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">{totalTrips}</span>
              <span className="text-xs font-black text-emerald-600">Monitored</span>
            </div>
            <p className="text-[11px] text-slate-700 mt-1 font-bold">Live transit routes in system</p>
          </Card>

          {/* 2. AI Recommendations */}
          <Card glow className="glass-card-hover border-cyan-500/30 p-6">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-700">AI Recommendations</span>
              <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">{avgConfidence}%</span>
              <span className="text-xs font-black text-emerald-600">Optimal</span>
            </div>
            <p className="text-[11px] text-slate-700 mt-1 font-bold">Route precision confidence rate</p>
          </Card>

          {/* 3. Average Travel Time */}
          <Card glow className="glass-card-hover border-emerald-500/30 p-6">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Average Travel Time</span>
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-700">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">{avgTravelTime}</span>
              <span className="text-xs font-black text-emerald-600">-18% Latency</span>
            </div>
            <p className="text-[11px] text-slate-700 mt-1 font-bold">Average duration per trip</p>
          </Card>

          {/* 4. Traffic Status */}
          <Card glow className="glass-card-hover border-amber-500/30 p-6">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">Traffic Status</span>
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-600 font-['Space_Grotesk']">Optimal Flow</span>
              <span className="text-xs font-black text-emerald-600">Green Wave</span>
            </div>
            <p className="text-[11px] text-slate-700 mt-1 font-bold">Real-time corridor sync active</p>
          </Card>

          {/* 5. Fuel Savings */}
          <Card glow className="glass-card-hover border-indigo-500/30 p-6">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700">Fuel Savings</span>
              <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-700">
                <Fuel className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk'] text-gradient-master">$4.2M+</span>
              <span className="text-xs font-black text-emerald-600">+22% Efficiency</span>
            </div>
            <p className="text-[11px] text-slate-700 mt-1 font-bold">Estimated aggregate fuel saved</p>
          </Card>

          {/* 6. Carbon Emissions Saved */}
          <Card glow className="glass-card-hover border-teal-500/30 p-6">
            <div className="flex items-center justify-between text-slate-700 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-teal-700">Carbon Emissions Saved</span>
              <div className="p-2 rounded-xl bg-teal-500/15 text-teal-700">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">35.2%</span>
              <span className="text-xs font-black text-emerald-600">CO2 Reduced</span>
            </div>
            <p className="text-[11px] text-slate-700 mt-1 font-bold">Eco-friendly AI routing</p>
          </Card>
        </div>
      )}

      {/* Analytics & Health Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <Card className="lg:col-span-2 space-y-4 border-blue-500/30 p-6 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Traffic Efficiency & Route Precision</h3>
              <p className="text-xs text-slate-700 font-semibold">Real-time mobility feedback curves</p>
            </div>
            <Badge variant="primary" size="sm">Peak Horizon</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.8} />
                <XAxis dataKey="month" stroke="#334155" fontSize={11} fontWeight={700} />
                <YAxis stroke="#334155" fontSize={11} fontWeight={700} />
                <Tooltip />
                <Area type="monotone" dataKey="accuracy" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorAccuracy)" name="Model Precision %" />
                <Area type="monotone" dataKey="fuelSaved" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorFuel)" name="Fuel Saved %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Health Gauges Column */}
        <div className="space-y-6">
          <Card className="space-y-4 border-blue-500/30 p-6 glass-card">
            <h3 className="text-xs font-black text-blue-700 uppercase tracking-widest">Mobility Gauges</h3>
            <RiskMeter score={lastRecommendation?.risk_level === 'High' ? 65 : 24} label="Route Risk Score" />
            <ConfidenceMeter score={Number(lastRecommendation?.confidence || lastRecommendation?.confidenceScore || avgConfidence) || 96} label="Route Precision" />
          </Card>
        </div>
      </div>

      {/* AI Daily Summary Card / Last Recommendation */}
      <Card glow className="p-6 border-blue-500/40 glass-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-extrabold text-slate-900">Latest AI Route Recommendation</h4>
              <Badge variant="accent" size="sm">Live Traffic</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed max-w-3xl font-bold">
              {lastRecommendation?.recommendation || lastRecommendation?.reason || lastRecommendation?.explanation || "AI route optimizer recommends taking the Outer Ring Road express lane. Avoid Outer Bypass between 08:30 AM and 09:15 AM to save 18 minutes in transit."}
            </p>
          </div>
        </div>
        <Button onClick={() => toggleAiDrawer(true)} variant="primary" size="md" icon={Sparkles} className="shrink-0">
          Ask Mobility Assistant
        </Button>
      </Card>

      {/* Recent Trips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Recent Trips & AI Recommendations</h3>
            <Link to="/decisions/history" className="text-xs font-black text-blue-700 hover:underline flex items-center gap-1">
              View Trip History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-40 rounded-2xl" />
              <Skeleton className="h-40 rounded-2xl" />
            </div>
          ) : recentTrips.length === 0 ? (
            <EmptyState title="No trips recorded yet" description="Generate a new route recommendation to populate your trip history." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentTrips.map((dec, idx) => (
                <DecisionCard key={dec.id || dec._id || idx} decision={{
                  id: dec.id || dec._id || `TRIP-${idx + 1}`,
                  title: `${dec.source || 'Origin'} → ${dec.destination || 'Destination'}`,
                  category: dec.transportMode || dec.route || 'Express',
                  impact: dec.trafficLevel || dec.risk_level || 'Smooth',
                  confidence: dec.confidence || dec.confidenceScore || 96,
                  risk: dec.trafficLevel === 'Heavy' ? 'High' : 'Low',
                  status: 'Completed',
                  date: dec.created_at || dec.date || 'Today',
                  roi: dec.estimatedTime || dec.travel_time || '24 mins'
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Departures Queue */}
        <Card className="space-y-4 border-blue-500/30 p-6 glass-card">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Upcoming Departures</h3>
            <Badge variant="warning" size="sm">3 Scheduled</Badge>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Hyderabad → Bangalore Freight Route', due: '08:30 AM', priority: 'Optimal Window' },
              { title: 'Hitec City → Airport Commute', due: '11:15 AM', priority: 'Green Wave' },
              { title: 'Mumbai Sea Link Fleet Delivery', due: '02:00 PM', priority: 'Smooth' },
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-blue-500/20 space-y-1 hover:border-blue-400 transition-colors shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <h5 className="font-black text-slate-900">{item.title}</h5>
                  <Badge variant="neutral" size="sm">
                    {item.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Departure: {item.due}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
