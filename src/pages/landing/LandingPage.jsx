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
  Sliders,
  Bot,
  Star,
  Layers,
  Brain,
  BrainCircuit,
  BarChart3,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { label: 'Total Decisions Evaluated', value: '10,000+', change: 'Real-time neural analysis', color: 'text-[#6C63FF]' },
    { label: 'Prediction Accuracy', value: '98.4%', change: '+12% vs legacy BI', color: 'text-[#FF2DAA]' },
    { label: 'Risk Variance Reduction', value: '35.2%', change: 'P95 Confidence bounds', color: 'text-[#4F7DFF]' },
    { label: 'Capital Optimized', value: '$4.2M+', change: 'Avg per organization', color: 'text-[#10B981]' },
  ];

  const features = [
    {
      title: 'Predictive Decision Engine',
      desc: 'Evaluate complex strategic alternatives with multi-dimensional criteria scoring and dynamic risk telemetry.',
      icon: BrainCircuit,
      color: 'from-[#FF2DAA] to-[#6C63FF]'
    },
    {
      title: 'Scenario Simulator',
      desc: 'Simulate budget shifts, execution timelines, and risk limits with interactive real-time decision sliders.',
      icon: Sliders,
      color: 'from-[#6C63FF] to-[#4F7DFF]'
    },
    {
      title: 'Predictive Risk Radar',
      desc: 'Detect hidden strategic friction points, supply bottlenecks, and market volatility before commitment.',
      icon: Activity,
      color: 'from-[#FF2DAA] to-[#EC4899]'
    },
    {
      title: 'Explainable AI Assistant',
      desc: 'Autonomous assistant providing natural language explanations, confidence metrics, and strategic recommendations.',
      icon: Bot,
      color: 'from-[#4F7DFF] to-[#8B5CF6]'
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

  const faqs = [
    {
      q: "How does DecisionSphere AI calculate confidence scores?",
      a: "Our neural model runs 10,000 stochastic Monte Carlo iterations across market telemetry, historical outcome data, and sentiment vectors to calculate P95 confidence intervals."
    },
    {
      q: "Can we integrate internal enterprise databases?",
      a: "Yes! DecisionSphere AI supports REST APIs, Supabase, PostgreSQL, Snowflake, and custom data streams with encrypted AES-256 node storage."
    },
    {
      q: "Is SOC2 Type II certification verified?",
      a: "Absolutely. DecisionSphere AI undergoes quarterly third-party penetration testing and SOC2 Type II security audits."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#0F172A] selection:bg-[#FF2DAA] selection:text-white overflow-x-hidden">

      <Navbar isDashboard={false} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-28 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-5xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="primary" size="lg" icon={Sparkles} className="mb-6 shadow-lg shadow-[#6C63FF]/15 bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30 font-bold">
              AI-Powered Decision Intelligence Platform
            </Badge>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#0F172A] leading-[1.1] font-['Space_Grotesk']">
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
            className="text-lg sm:text-2xl text-[#64748B] max-w-3xl mx-auto leading-relaxed font-semibold"
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
              <Button variant="primary" size="xl" icon={Sparkles} className="w-full sm:w-auto bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none shadow-2xl shadow-[#6C63FF]/30 font-bold">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="xl" icon={BarChart3} className="w-full sm:w-auto bg-white border-slate-200 text-[#0F172A] font-bold">
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
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        >
          <Card glow className="glass-card-hover border-[#6C63FF]/20 p-6 space-y-3 rounded-3xl bg-white/90">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#6C63FF] font-mono">PREDICTIVE MODEL</span>
              <Badge variant="success" size="sm">98% Accuracy</Badge>
            </div>
            <h4 className="text-base font-black text-[#0F172A]">Strategic Capital Allocation</h4>
            <p className="text-xs text-[#64748B] font-semibold leading-relaxed">Yields 8.4-month faster payback period with 38% lower operational risk bounds.</p>
          </Card>

          <Card glow className="glass-card-hover border-[#FF2DAA]/20 p-6 space-y-3 rounded-3xl bg-white/90">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#FF2DAA] font-mono">SCENARIO SIMULATOR</span>
              <Badge variant="accent" size="sm">Live Sliders</Badge>
            </div>
            <h4 className="text-base font-black text-[#0F172A]">Q4 Sensitivity Analysis</h4>
            <p className="text-xs text-[#64748B] font-semibold leading-relaxed">$2.5M capital allocation yields +38% expected outcome under P95 confidence.</p>
          </Card>

          <Card glow className="glass-card-hover border-[#4F7DFF]/20 p-6 space-y-3 rounded-3xl bg-white/90">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#4F7DFF] font-mono">AI ASSISTANT</span>
              <Badge variant="warning" size="sm">Risk Telemetry</Badge>
            </div>
            <h4 className="text-base font-black text-[#0F172A]">Risk Mitigation Alert</h4>
            <p className="text-xs text-[#64748B] font-semibold leading-relaxed">Automated secondary supplier contract reduces operational friction by 14 days.</p>
          </Card>
        </motion.div>
      </section>

      {/* Live Telemetry World Map Section */}
      <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
        <WorldMap />
      </section>

      {/* Live Statistics Counter Bar */}
      <section className="py-16 border-y border-[#6C63FF]/15 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1.5">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight font-['Space_Grotesk'] ${s.color}`}>
                {s.value}
              </span>
              <p className="text-xs font-black text-[#0F172A]">{s.label}</p>
              <p className="text-[11px] text-[#64748B] font-semibold">{s.change}</p>
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
          <Badge variant="accent" size="md" icon={Zap} className="mb-2 bg-[#FF2DAA]/10 text-[#FF2DAA] border-[#FF2DAA]/30">
            State-of-the-Art Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Intelligent Decision Platform
          </h2>
          <p className="text-base text-[#64748B] font-semibold">
            Built for enterprise strategists and decision makers who require high-confidence outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} glow className="glass-card-hover border-[#6C63FF]/15 p-8 space-y-5 rounded-3xl bg-white/90">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${f.color} flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/20`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-[#0F172A]">{f.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed font-semibold">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-y border-[#6C63FF]/15 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} glow className="glass-card p-8 flex flex-col justify-between space-y-6 border-[#6C63FF]/15 rounded-3xl bg-white/90">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-base text-[#0F172A] italic leading-relaxed font-semibold">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-2xl object-cover border-2 border-[#6C63FF] shadow-md" />
                  <div>
                    <h5 className="text-sm font-black text-[#0F172A]">{t.author}</h5>
                    <p className="text-xs text-[#6C63FF] font-bold">{t.role}</p>
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
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] text-gradient-master">
            Invest in High-Confidence Outcomes
          </h2>

          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white border border-[#6C63FF]/20 mt-6 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                billingCycle === 'monthly' ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-md' : 'text-[#64748B]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-md' : 'text-[#64748B]'
              }`}
            >
              Annual <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter */}
          <Card className="glass-card border-[#6C63FF]/15 p-8 space-y-6 flex flex-col justify-between rounded-3xl bg-white/90">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-[#0F172A]">Starter AI</h4>
              <p className="text-xs text-[#64748B] font-semibold">Ideal for small advisory teams and growing startups.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0F172A] font-['Space_Grotesk']">
                  {billingCycle === 'annual' ? '$149' : '$189'}
                </span>
                <span className="text-xs text-[#64748B] font-semibold">/ user / month</span>
              </div>
              <ul className="space-y-3 text-xs text-[#0F172A] pt-4 border-t border-slate-100 font-semibold">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to 50 Decision Simulations / mo</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Decision Engine Access</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standard SWOT Analysis</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full bg-slate-100 text-[#0F172A] font-bold">Start Free Trial</Button>
            </Link>
          </Card>

          {/* Enterprise */}
          <Card glow className="glass-card border-[#FF2DAA]/30 p-8 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-[#6C63FF]/15 rounded-3xl bg-white">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
              POPULAR
            </div>
            <div className="space-y-4 pt-2">
              <h4 className="text-xl font-black text-[#0F172A]">Enterprise AI</h4>
              <p className="text-xs text-[#64748B] font-semibold">Designed for scale-up & enterprise leadership.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0F172A] font-['Space_Grotesk'] text-gradient-master">
                  {billingCycle === 'annual' ? '$399' : '$499'}
                </span>
                <span className="text-xs text-[#64748B] font-semibold">/ user / month</span>
              </div>
              <ul className="space-y-3 text-xs text-[#0F172A] pt-4 border-t border-slate-100 font-semibold">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited Scenario Simulations</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Predictive Risk Radar</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Executive Analytics Dashboard</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24/7 Priority AI Assistant</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="primary" className="w-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none font-bold shadow-lg">Get Started</Button>
            </Link>
          </Card>

          {/* Custom */}
          <Card className="glass-card border-[#6C63FF]/15 p-8 space-y-6 flex flex-col justify-between rounded-3xl bg-white/90">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-[#0F172A]">Custom Platform</h4>
              <p className="text-xs text-[#64748B] font-semibold">Dedicated private cluster for defense & finance.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0F172A] font-['Space_Grotesk']">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-[#0F172A] pt-4 border-t border-slate-100 font-semibold">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dedicated Neural Cluster</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom LLM Fine-Tuning</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> SLA Guaranteed Support</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full bg-slate-100 text-[#0F172A] font-bold">Contact Architect</Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary" size="md" icon={HelpCircle}>FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-['Space_Grotesk']">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="p-6 border-[#6C63FF]/15 glass-card bg-white cursor-pointer rounded-2xl transition-all"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-[#0F172A]">{faq.q}</h4>
                <ChevronDown className={`w-5 h-5 text-[#6C63FF] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === idx && (
                <p className="text-xs text-[#64748B] font-semibold mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
