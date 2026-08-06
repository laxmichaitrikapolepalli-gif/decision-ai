import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { DecisionFlowVisualizer } from '../../components/decision/DecisionFlowVisualizer';
import { WorldMap } from '../../components/common/WorldMap';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Activity,
  Zap,
  CheckCircle2,
  Swords,
  Sliders,
  Bot,
  Star,
  Layers,
  Route,
  Navigation,
  Clock,
  Fuel,
  Car
} from 'lucide-react';

export const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState('annual');

  const stats = [
    { label: "Today's Trips", value: '10,000+', change: 'Real-time optimization', color: 'text-blue-600' },
    { label: 'AI Recommendations', value: '98.4%', change: 'Route precision rate', color: 'text-cyan-600' },
    { label: 'Average Travel Time', value: '24 mins', change: '18% time latency saved', color: 'text-emerald-600' },
    { label: 'Fuel Savings', value: '$4.2M+', change: 'Carbon emissions reduced', color: 'text-blue-600' },
  ];

  const features = [
    {
      title: 'Route Comparison Engine',
      desc: 'Compare alternative routes (e.g. Express Corridor vs City Bypass) with live traffic telemetry and arrival time scoring.',
      icon: Swords,
      color: 'from-blue-600 via-cyan-500 to-emerald-500'
    },
    {
      title: 'Traffic Scenario Simulator',
      desc: 'Simulate departure times, peak hour bottlenecks, and weather delays with interactive mobility sliders.',
      icon: Sliders,
      color: 'from-cyan-500 via-blue-600 to-indigo-600'
    },
    {
      title: 'Predictive Congestion Radar',
      desc: 'Detect upcoming bottleneck surges and construction obstacles before departure.',
      icon: Activity,
      color: 'from-emerald-500 via-teal-500 to-cyan-600'
    },
    {
      title: 'Smart Mobility Assistant',
      desc: 'Autonomous copilot for instant route optimization, fuel efficiency tips, and schedule adjustments.',
      icon: Bot,
      color: 'from-blue-500 via-indigo-600 to-cyan-500'
    }
  ];

  const testimonials = [
    {
      quote: "SmartRoute AI reduced our logistics transit times by 22% between Hyderabad and Bangalore, cutting fuel expenditure significantly.",
      author: "Marcus Vance",
      role: "Logistics Manager, UrbanTrans",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The Traffic Simulator gave our commuters precision departure windows to bypass city bottleneck surges.",
      author: "Elena Rostova",
      role: "Transit Operations Lead, MetroMobility",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent selection:bg-blue-500 selection:text-white overflow-x-hidden">

      <Navbar isDashboard={false} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-32 px-4 lg:px-8 max-w-7xl mx-auto bg-mesh-hero">
        <div className="text-center max-w-5xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="primary" size="lg" icon={Sparkles} className="mb-6 shadow-xl shadow-blue-500/20">
              AI-Powered Intelligent Transportation
            </Badge>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.1] font-['Space_Grotesk']">
              AI-Powered Smart{' '}
              <span className="text-gradient-master font-black block sm:inline mt-2 sm:mt-0">
                Mobility Platform
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg sm:text-2xl text-slate-800 max-w-3xl mx-auto leading-relaxed font-bold"
          >
            Optimize travel routes using AI, real-time traffic analysis, historical mobility patterns, and intelligent recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
          >
            <Link to="/decisions/new">
              <Button variant="primary" size="xl" icon={Route} className="w-full sm:w-auto shadow-2xl shadow-blue-500/30">
                Start Planning
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="xl" icon={Navigation} className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Hero Interactive Floating Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        >
          <Card glow className="glass-card-hover border-blue-500/30 p-6 space-y-3 rounded-3xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-700 font-mono">HYD TO BLR EXPRESS</span>
              <Badge variant="success" size="sm">Smooth Flow</Badge>
            </div>
            <h4 className="text-base font-black text-slate-900">Hyderabad to Bangalore Transit</h4>
            <p className="text-xs text-slate-800 font-bold leading-relaxed">AI route reduces trip duration by 42 mins with minimal toll bottlenecks.</p>
          </Card>

          <Card glow className="glass-card-hover border-cyan-500/30 p-6 space-y-3 rounded-3xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-cyan-700 font-mono">TRAFFIC SIMULATOR</span>
              <Badge variant="accent" size="sm">Peak Hours</Badge>
            </div>
            <h4 className="text-base font-black text-slate-900">Morning Peak Departure</h4>
            <p className="text-xs text-slate-800 font-bold leading-relaxed">Departing at 08:45 AM saves 18% fuel expenditure via green wave traffic corridors.</p>
          </Card>

          <Card glow className="glass-card-hover border-emerald-500/30 p-6 space-y-3 rounded-3xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 font-mono">SMART ASSISTANT</span>
              <Badge variant="warning" size="sm">Live Radar</Badge>
            </div>
            <h4 className="text-base font-black text-slate-900">Real-Time Detour Alert</h4>
            <p className="text-xs text-slate-800 font-bold leading-relaxed">Automatic secondary route re-routing avoids 14-min highway congestion surge.</p>
          </Card>
        </motion.div>
      </section>

      {/* Live Statistics Counter Bar */}
      <section className="py-16 border-y border-blue-500/20 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1.5">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight font-['Space_Grotesk'] ${s.color}`}>
                {s.value}
              </span>
              <p className="text-xs font-black text-slate-900">{s.label}</p>
              <p className="text-[11px] text-slate-700 font-extrabold">{s.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decision Flow Visualizer / Mobility Workflow */}
      <section id="workflow" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto">
        <DecisionFlowVisualizer />
      </section>

      {/* Live Smart Mobility Map */}
      <section id="map" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
        <WorldMap />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto bg-mesh-features">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="accent" size="md" icon={Zap} className="mb-2">
            Smart Mobility Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Intelligent Transport Technologies
          </h2>
          <p className="text-base text-slate-800 font-bold">
            Built for commuters, logistics managers, and fleet operators requiring optimal travel times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} glow className="glass-card-hover border-blue-500/30 p-8 space-y-5 rounded-3xl">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${f.color} flex items-center justify-center text-white shadow-xl shadow-blue-500/20`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-800 leading-relaxed font-bold">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-y border-blue-500/20 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} glow className="glass-card p-8 flex flex-col justify-between space-y-6 border-blue-500/30 rounded-3xl">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-base text-slate-900 italic leading-relaxed font-bold">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-blue-500/20">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500 shadow-md" />
                  <div>
                    <h5 className="text-sm font-black text-slate-900">{t.author}</h5>
                    <p className="text-xs text-blue-600 font-extrabold">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto bg-mesh-pricing">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="primary" size="md" className="mb-4">
            Fleet & Personal Plans
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Optimal Plans for Every Journey
          </h2>

          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white border border-blue-500/30 mt-6 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                billingCycle === 'monthly' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 'text-slate-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 'text-slate-800'
              }`}
            >
              Annual <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter */}
          <Card className="glass-card border-blue-500/20 p-8 space-y-6 flex flex-col justify-between rounded-3xl">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-slate-900">Personal Commuter</h4>
              <p className="text-xs text-slate-800 font-bold">For daily commuters and individual trips.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 font-['Space_Grotesk']">Free</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-800 pt-4 border-t border-blue-500/20 font-bold">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Unlimited AI Route Recommendations</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-Time Traffic Updates</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Travel Time & Fuel Estimation</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full">Start Planning Free</Button>
            </Link>
          </Card>

          {/* Pro Fleet */}
          <Card glow className="glass-card border-blue-500/50 p-8 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-blue-500/20 rounded-3xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
              POPULAR
            </div>
            <div className="space-y-4 pt-2">
              <h4 className="text-xl font-black text-slate-900">Pro Mobility Fleet</h4>
              <p className="text-xs text-slate-800 font-bold">Designed for logistics, taxi, & delivery fleets.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 font-['Space_Grotesk'] text-gradient-master">
                  {billingCycle === 'annual' ? '$49' : '$59'}
                </span>
                <span className="text-xs text-slate-600 font-bold">/ vehicle / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-800 pt-4 border-t border-blue-500/20 font-bold">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-Vehicle Route Optimization</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Traffic Scenario Simulator</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live Mobility Map Telemetry</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Smart Mobility Copilot</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="primary" className="w-full">Start Fleet Trial</Button>
            </Link>
          </Card>

          {/* Enterprise Mobility */}
          <Card className="glass-card border-blue-500/20 p-8 space-y-6 flex flex-col justify-between rounded-3xl">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-slate-900">Transit Enterprise</h4>
              <p className="text-xs text-slate-800 font-bold">Public transport & municipal transit authorities.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 font-['Space_Grotesk']">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-800 pt-4 border-t border-blue-500/20 font-bold">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> City-wide Traffic Heatmap Integration</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Custom Transit API Integration</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dedicated Mobility Architect</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full">Contact Transport Team</Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};
