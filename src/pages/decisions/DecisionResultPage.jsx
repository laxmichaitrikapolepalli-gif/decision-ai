import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDecision } from '../../contexts/DecisionContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RiskMeter, ConfidenceMeter } from '../../components/ui/RiskMeter';
import { SWOTCard } from '../../components/decision/SWOTCard';
import { ActionPlanTimeline } from '../../components/decision/ActionPlanTimeline';
import {
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileText,
  Award,
  Layers,
  ArrowLeft,
  Copy
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DecisionResultPage = () => {
  const { id } = useParams();
  const { currentDecision } = useDecision();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = () => {
    setDownloading(true);
    toast.success('Generating Executive PDF Report...');
    setTimeout(() => {
      setDownloading(false);
      toast.success(`Report DecisionSphere_${currentDecision.id || 'DEC-2026-089'}.pdf downloaded!`);
    }, 1500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Shareable decision report link copied to clipboard!');
  };

  const dec = currentDecision;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/decisions/history" className="inline-flex items-center gap-1.5 text-xs text-purple-700 hover:underline font-extrabold mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Decisions History
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-700">{dec.id}</span>
            <Badge variant="primary" size="sm">{dec.industry}</Badge>
            <Badge variant="success" size="sm">Approved Strategy</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            {dec.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleShare} variant="secondary" size="md" icon={Share2}>
            Share
          </Button>
          <Button onClick={handleDownloadPdf} variant="primary" size="md" loading={downloading} icon={Download}>
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* Main Scorecard Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Score */}
        <Card glow className="p-6 border-purple-500/30 glass-card flex flex-col justify-between items-center text-center">
          <span className="text-xs font-black uppercase tracking-wider text-purple-700">Decision Score</span>
          <div className="relative my-3 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 flex items-center justify-center">
              <span className="text-4xl font-black text-slate-900 font-['Space_Grotesk'] text-gradient-master">
                {dec.score || 92}
              </span>
            </div>
          </div>
          <Badge variant="success" size="sm" icon={Award}>Optimal Strategy</Badge>
        </Card>

        {/* Meters */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ConfidenceMeter score={dec.confidenceMeter || 96} />
          <RiskMeter score={dec.riskMeter || 28} />
        </div>
      </div>

      {/* AI Recommendation Card */}
      <Card glow className="p-6 border-purple-500/40 glass-card bg-purple-50/70 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">Executive AI Recommendation</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
          {dec.aiRecommendation}
        </p>
      </Card>

      {/* Pros & Cons Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <Card className="border-purple-500/25 glass-card space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h4 className="text-base font-black text-slate-900">Strategic Pros & Advantages</h4>
          </div>
          <ul className="space-y-2">
            {dec.pros?.map((pro, i) => (
              <li key={i} className="text-xs text-slate-800 font-bold flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Cons */}
        <Card className="border-purple-500/25 glass-card space-y-3">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-500" />
            <h4 className="text-base font-black text-slate-900">Friction Points & Mitigations</h4>
          </div>
          <ul className="space-y-2">
            {dec.cons?.map((con, i) => (
              <li key={i} className="text-xs text-slate-800 font-bold flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* SWOT Matrix */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">Comprehensive SWOT Analysis Matrix</h3>
        <SWOTCard swot={dec.swot} />
      </div>

      {/* Action Plan Roadmap */}
      <Card className="border-purple-500/30 glass-card space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900">Recommended Execution Roadmap</h3>
          <Badge variant="primary" size="sm">4 Execution Phases</Badge>
        </div>
        <ActionPlanTimeline plan={dec.actionPlan} />
      </Card>

      {/* Alternative Options Scorecard */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">Evaluated Strategic Alternatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dec.alternatives?.map((alt, idx) => (
            <Card key={idx} className="border-purple-500/25 glass-card space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-black text-slate-900">{alt.name}</h5>
                <Badge variant="neutral" size="sm">Score: {alt.score}/100</Badge>
              </div>
              <p className="text-xs font-bold text-slate-700">{alt.recommendation}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
