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
  Swords,
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
  BrainCircuit,
  BarChart3,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: '98.4%', label: 'Decision Accuracy', sub: '+12% vs legacy BI', color: 'text-[#0F172A]' },
    { value: '10,000+', label: 'Simulated Decisions', sub: 'Across 42 Countries', color: 'text-[#0F172A]' },
    { value: '35.2%', label: 'Risk Variance Reduction', sub: 'P95 Monte Carlo', color: 'text-[#0F172A]' },
    { value: '$4.2M+', label: 'Capital Saved', sub: 'Avg per Enterprise', color: 'text-[#0F172A]' },
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
      <section id="hero" className="relative pt-20 pb-20 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-5xl mx-auto space-y-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top Pill Badge exact matching screenshot */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/25 text-[#6C63FF] text-xs font-bold shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#6C63FF]" />
              <span>Next-Gen Enterprise AI Platform</span>
            </div>

            {/* Headline exact matching screenshot */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08] font-['Space_Grotesk'] max-w-4xl mx-auto">
              Transform Complex Decisions into{' '}
              <span className="bg-gradient-to-r from-[#FF2DAA] via-[#8B5CF6] to-[#4F7DFF] bg-clip-text text-transparent font-extrabold">
                Intelligent Actions.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base sm:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Empower executive leadership with Monte Carlo neural simulations, side-by-side decision battle engines, and real-time risk telemetry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link to="/signup">
              <Button
                variant="primary"
                size="lg"
                icon={Sparkles}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#FF2DAA] to-[#4F7DFF] hover:from-[#FF2DAA] hover:to-[#3F6DEE] text-white border-none rounded-2xl shadow-lg shadow-[#FF2DAA]/25 font-bold text-sm"
              >
                Start Free Trial
              </Button>
            </Link>

            <Link to="/decisions/battle">
              <Button
                variant="secondary"
                size="lg"
                icon={Swords}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200 rounded-2xl font-bold text-sm shadow-sm"
              >
                Try Decision Battle
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Hero Interactive Cards exact matching screenshot 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-6xl mx-auto"
        >
          {/* Card 1 */}
          <Link to="/decisions/new">
            <Card glow className="glass-card-hover border-slate-100 p-6 space-y-3 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">HYD VS BLR</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] font-bold">
                    96% Win Confidence
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A]">Hyderabad Retail Expansion</h4>
                <p className="text-xs text-[#64748B] font-medium leading-relaxed">
                  Yields 8.4-month faster payback period with 38% lower CRE overhead.
                </p>
              </div>
            </Card>
          </Link>

          {/* Card 2 */}
          <Link to="/simulator">
            <Card glow className="glass-card-hover border-slate-100 p-6 space-y-3 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">SCENARIO SIMULATOR</span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[11px] font-bold">
                    Live Sliders
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A]">Q4 Budget Sensitivity</h4>
                <p className="text-xs text-[#64748B] font-medium leading-relaxed">
                  $2.5M capital allocation yields +38% expected ROI under P95 risk bounds.
                </p>
              </div>
            </Card>
          </Link>

          {/* Card 3 */}
          <Link to="/insights">
            <Card glow className="glass-card-hover border-slate-100 p-6 space-y-3 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">AI COPILOT</span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-[11px] font-bold">
                    Risk Telemetry
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A]">Supply Chain Buffer Alert</h4>
                <p className="text-xs text-[#64748B] font-medium leading-relaxed">
                  Automated secondary supplier contract reduces transit bottleneck by 14 days.
                </p>
              </div>
            </Card>
          </Link>
        </motion.div>
      </section>

      {/* Live Statistics Bar exact matching screenshot 1 */}
      <section className="py-12 bg-white/70 backdrop-blur-md border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-['Space_Grotesk']">
                {s.value}
              </span>
              <p className="text-xs font-bold text-[#0F172A] mt-1">{s.label}</p>
              <p className="text-[11px] text-[#64748B] font-medium">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Telemetry World Map Section */}
      <section className="py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <WorldMap />
      </section>

      {/* Decision Intelligence Workflow Pipeline exact matching screenshot 4 */}
      <section id="workflow" className="py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <DecisionFlowVisualizer />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <Badge variant="accent" size="md" icon={Zap} className="mb-2 bg-[#FF2DAA]/10 text-[#FF2DAA] border-[#FF2DAA]/30">
            Next-Gen Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-['Space_Grotesk']">
            Intelligent Decision Platform
          </h2>
          <p className="text-sm text-[#64748B] font-medium">
            Built for enterprise strategists and decision makers who require high-confidence outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} glow className="glass-card-hover border-slate-100 p-8 space-y-4 rounded-3xl bg-white shadow-md">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${f.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">{f.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-medium">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/70 backdrop-blur-md border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} glow className="glass-card p-8 flex flex-col justify-between space-y-6 border-slate-100 rounded-3xl bg-white shadow-md">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#0F172A] italic leading-relaxed font-medium">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <img src={t.avatar} alt={t.author} className="w-11 h-11 rounded-2xl object-cover border border-[#6C63FF] shadow-sm" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#0F172A]">{t.author}</h5>
                    <p className="text-[11px] text-[#6C63FF] font-semibold">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section exact matching screenshot 2 */}
      <section id="pricing" className="py-20 px-4 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-bold border border-[#6C63FF]/20">
            Transparent Pricing
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-['Space_Grotesk'] leading-tight">
            Invest in High-Confidence<br />
            <span className="bg-gradient-to-r from-[#FF2DAA] via-[#8B5CF6] to-[#4F7DFF] bg-clip-text text-transparent">
              Outcomes
            </span>
          </h2>

          <div className="inline-flex items-center p-1 rounded-full bg-white border border-slate-200 shadow-md mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-sm' : 'text-[#64748B]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual' ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-sm' : 'text-[#64748B]'
              }`}
            >
              <span>Annual</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-extrabold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Starter AI */}
          <Card className="glass-card border-slate-100 p-8 space-y-6 flex flex-col justify-between rounded-3xl bg-white shadow-lg">
            <div className="space-y-4">
              <h4 className="text-xl font-extrabold text-[#0F172A]">Starter AI</h4>
              <p className="text-xs text-[#64748B] font-medium">Ideal for boutique advisory teams and startups.</p>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">
                  {billingCycle === 'annual' ? '$149' : '$189'}
                </span>
                <span className="text-xs text-[#64748B] font-medium">/ user / month</span>
              </div>
              <ul className="space-y-3 text-xs text-[#0F172A] pt-4 border-t border-slate-100 font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to 50 Monte Carlo runs / mo</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Decision Battle Engine</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standard SWOT Generation</li>
              </ul>
            </div>
            <Link to="/signup">
              <Button variant="secondary" className="w-full bg-white text-[#0F172A] border border-slate-200 rounded-2xl py-3 font-bold text-xs shadow-sm">
                Start 14-Day Free Trial
              </Button>
            </Link>
          </Card>

          {/* Card 2: Enterprise AI (Featured) */}
          <Card glow className="glass-card border-slate-200 p-8 space-y-6 flex flex-col justify-between relative shadow-2xl rounded-3xl bg-white">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
              MOST POPULAR
            </div>
            <div className="space-y-4 pt-2">
              <h4 className="text-xl font-extrabold text-[#0F172A]">Enterprise AI</h4>
              <p className="text-xs text-[#64748B] font-medium">Designed for Fortune 500 & scale-up leadership.</p>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] bg-clip-text text-transparent font-['Space_Grotesk']">
                  {billingCycle === 'annual' ? '$399' : '$499'}
                </span>
                <span className="text-xs text-[#64748B] font-medium">/ user / month</span>
              </div>
              <ul className="space-y-3 text-xs text-[#0F172A] pt-4 border-t border-slate-100 font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited Monte Carlo Runs</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Advanced Scenario Simulator</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Global Telemetry Map Access</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24/7 Priority AI Assistant</li>
              </ul>
            </div>
            <Link to="/signup">
              <Button variant="primary" className="w-full bg-gradient-to-r from-[#FF2DAA] via-[#8B5CF6] to-[#4F7DFF] text-white border-none rounded-2xl py-3 font-bold text-xs shadow-lg shadow-[#FF2DAA]/20">
                Deploy Enterprise Node
              </Button>
            </Link>
          </Card>

          {/* Card 3: Custom Quantum */}
          <Card className="glass-card border-slate-100 p-8 space-y-6 flex flex-col justify-between rounded-3xl bg-white shadow-lg">
            <div className="space-y-4">
              <h4 className="text-xl font-extrabold text-[#0F172A]">Custom Quantum</h4>
              <p className="text-xs text-[#64748B] font-medium">Dedicated cloud cluster for defense & finance.</p>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-[#0F172A] pt-4 border-t border-slate-100 font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> On-Premises Neural Cluster</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom LLM Fine-Tuning</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> SLA Guaranteed Support</li>
              </ul>
            </div>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full bg-white text-[#0F172A] border border-slate-200 rounded-2xl py-3 font-bold text-xs shadow-sm">
                Contact Architect
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Badge variant="secondary" size="md" icon={HelpCircle}>FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="p-6 border-slate-100 glass-card bg-white cursor-pointer rounded-2xl transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-[#0F172A]">{faq.q}</h4>
                <ChevronDown className={`w-5 h-5 text-[#6C63FF] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === idx && (
                <p className="text-xs text-[#64748B] font-medium mt-3 pt-3 border-t border-slate-100 leading-relaxed">
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
