import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { DecisionFlowVisualizer } from '../../components/decision/DecisionFlowVisualizer';
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
  Sliders,
  Bot,
  Star,
  Layers,
  Brain,
  BrainCircuit,
  BarChart3,
  LineChart,
  PieChart,
  Target
} from 'lucide-react';

export const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState('annual');

  const stats = [
    { label: 'Total Decisions Evaluated', value: '10,000+', change: 'Real-time neural analysis', color: 'text-purple-400' },
    { label: 'Prediction Accuracy', value: '98.4%', change: '+12% vs legacy BI', color: 'text-pink-400' },
    { label: 'Risk Variance Reduction', value: '35.2%', change: 'P95 Confidence bounds', color: 'text-indigo-400' },
    { label: 'Capital Optimized', value: '$4.2M+', change: 'Avg per organization', color: 'text-emerald-400' },
  ];

  const features = [
    {
      title: 'Predictive Decision Engine',
      desc: 'Evaluate complex strategic alternatives with multi-dimensional criteria scoring and dynamic risk telemetry.',
      icon: BrainCircuit,
      color: 'from-pink-500 via-purple-500 to-indigo-500'
    },
    {
      title: 'Scenario Simulator',
      desc: 'Simulate budget shifts, execution timelines, and risk limits with interactive real-time decision sliders.',
      icon: Sliders,
      color: 'from-indigo-500 via-purple-500 to-pink-500'
    },
    {
      title: 'Predictive Risk Radar',
      desc: 'Detect hidden strategic friction points, supply bottlenecks, and market volatility before commitment.',
      icon: Activity,
      color: 'from-purple-500 via-pink-500 to-rose-500'
    },
    {
      title: 'Explainable AI Assistant',
      desc: 'Autonomous assistant providing natural language explanations, confidence metrics, and strategic recommendations.',
      icon: Bot,
      color: 'from-teal-500 via-indigo-500 to-purple-500'
    }
  ];

  const testimonials = [
    {
      quote: "DecisionSphere AI identified an 18% capital efficiency arbitrage that saved our expansion initiative $1.4M in year one.",
      author: "Dr. Marcus Vance",
      role: "VP of Global Operations, AeroTech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The Scenario Simulator allowed our executive board to stress-test 10,000 variance models in under 30 seconds. Unmatched clarity.",
      author: "Elena Rostova",
      role: "Chief Strategy Officer, FinCore APAC",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white overflow-x-hidden">

      <Navbar isDashboard={false} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-32 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-5xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="primary" size="lg" icon={Sparkles} className="mb-6 shadow-xl shadow-purple-500/20">
              AI-Powered Decision Intelligence Platform
            </Badge>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] font-['Space_Grotesk']">
              DecisionSphere{' '}
              <span className="text-gradient-master font-black block sm:inline mt-2 sm:mt-0">
                AI
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-semibold"
          >
            Make smarter decisions using AI, predictive analytics, risk analysis, explainable AI, and intelligent recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
          >
            <Link to="/decisions/new">
              <Button variant="primary" size="xl" icon={Sparkles} className="w-full sm:w-auto shadow-2xl shadow-purple-500/30">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="xl" icon={BarChart3} className="w-full sm:w-auto">
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
          <Card glow className="glass-card-hover border-purple-500/30 p-6 space-y-3 rounded-3xl bg-slate-900/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-400 font-mono">PREDICTIVE MODEL</span>
              <Badge variant="success" size="sm">98% Accuracy</Badge>
            </div>
            <h4 className="text-base font-black text-white">Strategic Capital Allocation</h4>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">Yields 8.4-month faster payback period with 38% lower operational risk bounds.</p>
          </Card>

          <Card glow className="glass-card-hover border-pink-500/30 p-6 space-y-3 rounded-3xl bg-slate-900/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-pink-400 font-mono">SCENARIO SIMULATOR</span>
              <Badge variant="accent" size="sm">Live Sliders</Badge>
            </div>
            <h4 className="text-base font-black text-white">Q4 Sensitivity Analysis</h4>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">$2.5M capital allocation yields +38% expected outcome under P95 confidence.</p>
          </Card>

          <Card glow className="glass-card-hover border-indigo-500/30 p-6 space-y-3 rounded-3xl bg-slate-900/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-400 font-mono">AI ASSISTANT</span>
              <Badge variant="warning" size="sm">Risk Telemetry</Badge>
            </div>
            <h4 className="text-base font-black text-white">Risk Mitigation Alert</h4>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">Automated secondary supplier contract reduces operational friction by 14 days.</p>
          </Card>
        </motion.div>
      </section>

      {/* Live Statistics Counter Bar */}
      <section className="py-16 border-y border-purple-500/20 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1.5">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight font-['Space_Grotesk'] ${s.color}`}>
                {s.value}
              </span>
              <p className="text-xs font-black text-white">{s.label}</p>
              <p className="text-[11px] text-slate-400 font-semibold">{s.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decision Flow Visualizer / Decision Intelligence Workflow */}
      <section id="workflow" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto">
        <DecisionFlowVisualizer />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="accent" size="md" icon={Zap} className="mb-2">
            State-of-the-Art Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Intelligent Decision Platform
          </h2>
          <p className="text-base text-slate-300 font-medium">
            Built for enterprise strategists and decision makers who require high-confidence outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} glow className="glass-card-hover border-purple-500/30 p-8 space-y-5 rounded-3xl bg-slate-900/80">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${f.color} flex items-center justify-center text-white shadow-xl shadow-purple-500/20`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-y border-purple-500/20 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} glow className="glass-card p-8 flex flex-col justify-between space-y-6 border-purple-500/30 rounded-3xl bg-slate-900/80">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-base text-white italic leading-relaxed font-medium">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-purple-500/20">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-500 shadow-md" />
                  <div>
                    <h5 className="text-sm font-black text-white">{t.author}</h5>
                    <p className="text-xs text-purple-400 font-bold">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="primary" size="md" className="mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Invest in High-Confidence Outcomes
          </h2>

          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-purple-500/30 mt-6 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                billingCycle === 'monthly' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' : 'text-slate-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' : 'text-slate-300'
              }`}
            >
              Annual <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter */}
          <Card className="glass-card border-purple-500/20 p-8 space-y-6 flex flex-col justify-between rounded-3xl bg-slate-900/80">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-white">Starter AI</h4>
              <p className="text-xs text-slate-300 font-medium">Ideal for small advisory teams and growing startups.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white font-['Space_Grotesk']">
                  {billingCycle === 'annual' ? '$149' : '$189'}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ user / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-purple-500/20 font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 50 Decision Simulations / mo</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Decision Engine Access</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard SWOT Analysis</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full">Start Free Trial</Button>
            </Link>
          </Card>

          {/* Enterprise */}
          <Card glow className="glass-card border-purple-500/50 p-8 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-purple-500/20 rounded-3xl bg-slate-900">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
              POPULAR
            </div>
            <div className="space-y-4 pt-2">
              <h4 className="text-xl font-black text-white">Enterprise AI</h4>
              <p className="text-xs text-slate-300 font-medium">Designed for scale-up & enterprise leadership.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white font-['Space_Grotesk'] text-gradient-master">
                  {billingCycle === 'annual' ? '$399' : '$499'}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ user / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-purple-500/20 font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Scenario Simulations</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Predictive Risk Radar</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Executive Analytics Dashboard</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Priority AI Assistant</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="primary" className="w-full">Get Started</Button>
            </Link>
          </Card>

          {/* Custom */}
          <Card className="glass-card border-purple-500/20 p-8 space-y-6 flex flex-col justify-between rounded-3xl bg-slate-900/80">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-white">Custom Platform</h4>
              <p className="text-xs text-slate-300 font-medium">Dedicated private cluster for defense & finance.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white font-['Space_Grotesk']">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-purple-500/20 font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated Neural Cluster</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom LLM Fine-Tuning</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SLA Guaranteed Support</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full">Contact Architect</Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};
