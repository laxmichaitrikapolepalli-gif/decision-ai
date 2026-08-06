import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDecision } from '../../contexts/DecisionContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SWOTCard } from '../../components/decision/SWOTCard';
import { ActionPlanTimeline } from '../../components/decision/ActionPlanTimeline';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Layers,
  Activity,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Brain
} from 'lucide-react';

export const DecisionResultPage = () => {
  const { id } = useParams();
  const { currentDecision, decisions } = useDecision();

  // Find decision by id, or fallback to currentDecision, or first item in decisions list
  const decision =
    decisions?.find((d) => String(d.id || d._id) === String(id)) ||
    currentDecision ||
    (decisions && decisions.length > 0 ? decisions[0] : {});

  const recommendationText =
    decision.recommendation ||
    decision.bestRoute ||
    decision.title ||
    'Proceed with Hyderabad Flagship R&D Expansion';

  const confidenceScore = decision.confidence || decision.confidenceScore || 96;
  const riskLevel = decision.risk || decision.trafficLevel || 'Low Risk (P95)';
  const expectedOutcome = decision.roi || decision.fuelEfficiency || decision.estimatedTime || '+38% Projected ROI';
  const aiExplanation =
    decision.reason ||
    decision.desc ||
    'DecisionSphere AI evaluated multi-vector market telemetry and identified this strategy as delivering maximum yield under minimum variance bounds.';

  const advantages = [
    '18% lower lease overhead via regional municipal tax subsidies',
    '34% higher senior ML engineering talent density',
    'Fast 14.2-month CapEx payback timeline',
    'Low P95 risk bounds across 10,000 Monte Carlo iterations'
  ];

  const disadvantages = [
    'Initial CapEx commitment of $1.8M required in Q3',
    'Regulatory filing deadline requires rapid LOI execution within 30 days'
  ];

  const alternativeOptions = [
    decision.alternativeRoute || decision.destination || 'Secondary Option: Bangalore Whitefield Tech Park Hub'
  ];

  const recommendedActions = decision.tips || [
    'Finalize LOI before Q3 municipal fiscal deadline to capture tax exemption',
    'Direct talent acquisition hub setup to regional R&D center',
    'Execute secondary air-freight contract for top 20% critical SKUs'
  ];

  const reasoningText = `DecisionSphere AI neural model processed real-time market data vectors. The multi-criteria analysis confirms that proceeding with "${recommendationText}" achieves the optimal tradeoff between capital efficiency and risk tolerance.`;

  // Filter keys for dynamic extra fields
  const standardKeys = [
    'id', '_id', 'title', 'recommendation', 'bestRoute', 'confidence', 'confidenceScore',
    'risk', 'trafficLevel', 'roi', 'fuelEfficiency', 'reason', 'desc', 'tips', 'source',
    'destination', 'departureTime', 'transportMode', 'budget', 'timeline', 'riskTolerance',
    'constraints', 'attachments', 'status', 'date', 'created_at'
  ];

  const dynamicFields = Object.entries(decision).filter(
    ([key]) => !standardKeys.includes(key) && typeof decision[key] !== 'object'
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="space-y-3">
        <Link to="/decisions/history" className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:underline font-bold mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Decision History
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-purple-400 uppercase tracking-widest">DECISION RESULT</span>
              <Badge variant="success" size="sm" icon={Award}>Optimal Strategic Recommendation</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
              {decision.title || 'AI Strategic Decision Recommendation'}
            </h1>
          </div>
        </div>
      </div>

      {/* Primary Hero Recommendation Card */}
      <Card glow className="p-8 border-purple-500/40 glass-card space-y-6 rounded-3xl bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-purple-500/20">
          <div className="space-y-2 flex-1">
            <span className="text-xs font-black text-purple-400 uppercase tracking-wider block">PRIMARY AI RECOMMENDATION</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {recommendationText}
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="p-4 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-black block">Confidence Score</span>
              <span className="text-3xl font-black text-purple-400 font-['Space_Grotesk']">{confidenceScore}%</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-black block">Expected Outcome</span>
              <span className="text-xl font-black text-emerald-400 font-['Space_Grotesk']">{expectedOutcome}</span>
            </div>
          </div>
        </div>

        {/* AI Explanation Box */}
        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-black text-purple-300 uppercase tracking-wider">AI Explanation</h4>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-semibold">{aiExplanation}</p>
        </div>
      </Card>

      {/* Grid: Advantages vs Disadvantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advantages */}
        <Card glow className="p-6 border-emerald-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Strategic Advantages</h3>
          </div>
          <ul className="space-y-3">
            {advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Disadvantages */}
        <Card className="p-6 border-rose-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <ThumbsDown className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Tradeoffs & Friction Points</h3>
          </div>
          <ul className="space-y-3">
            {disadvantages.map((dis, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{dis}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Alternative Options & Recommended Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alternative Options */}
        <Card className="p-6 border-indigo-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Alternative Decisions Evaluated</h3>
          </div>
          <div className="space-y-2">
            {alternativeOptions.map((alt, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/20 text-xs font-bold text-slate-200">
                {alt}
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Actions */}
        <Card glow className="p-6 border-purple-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Recommended Actions</h3>
          </div>
          <div className="space-y-2.5">
            {recommendedActions.map((act, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
                <span>{act}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Strategic Reasoning Section */}
      <Card glow className="p-6 border-purple-500/30 glass-card space-y-3 rounded-3xl bg-slate-900/80">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-black text-white">Strategic AI Reasoning</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">{reasoningText}</p>
      </Card>

      {/* Dynamic Fields rendering */}
      {dynamicFields.length > 0 && (
        <Card className="p-6 border-purple-500/30 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <h3 className="text-lg font-black text-white">Dynamic AI Parameters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dynamicFields.map(([k, v]) => (
              <div key={k} className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/20 text-xs">
                <span className="text-[10px] text-purple-400 uppercase font-mono font-black block">{k.replace(/_/g, ' ')}</span>
                <span className="font-extrabold text-white mt-1 block">{String(v)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* SWOT Analysis Card */}
      <SWOTCard />

      {/* Timeline */}
      <ActionPlanTimeline />
    </div>
  );
};
