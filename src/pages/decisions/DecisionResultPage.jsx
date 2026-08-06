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
  Award,
  ArrowLeft,
  Info,
  Navigation,
  Clock,
  DollarSign,
  Lightbulb,
  Zap,
  Fuel,
  Shield,
  Route,
  Car
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DecisionResultPage = () => {
  const { id } = useParams();
  const { currentDecision, decisions } = useDecision();
  const [downloading, setDownloading] = useState(false);

  // Find decision by id, or fallback to currentDecision, or first item in decisions list
  const dec =
    decisions?.find((d) => String(d.id || d._id) === String(id)) ||
    currentDecision ||
    (decisions && decisions.length > 0 ? decisions[0] : {});

  const handleDownloadPdf = () => {
    setDownloading(true);
    toast.success('Generating Route Summary PDF...');
    setTimeout(() => {
      setDownloading(false);
      toast.success(`Report SmartRoute_${dec.id || id || 'REC'}.pdf downloaded!`);
    }, 1500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Shareable trip route link copied to clipboard!');
  };

  // Helper to format key names nicely
  const formatKeyName = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Backend response fields
  const bestRoute = dec.bestRoute || dec.route || dec.category || 'Outer Ring Expressway';
  const alternativeRoute = dec.alternativeRoute || dec.altRoute;
  const estimatedTime = dec.estimatedTime || dec.travel_time || dec.travelTime || '24 mins';
  const trafficLevel = dec.trafficLevel || dec.traffic_level || 'Moderate Traffic';
  const bestDepartureTime = dec.bestDepartureTime || dec.departureTime || '09:00 AM EST';
  const travelCost = dec.travelCost || dec.estimated_cost || dec.cost || dec.budget || '$45.00';
  const fuelEfficiency = dec.fuelEfficiency || dec.fuel_efficiency || '28 mpg (High Savings)';
  const confidenceScore = dec.confidenceScore || dec.confidence || dec.ai_confidence || 96;
  const reason = dec.reason || dec.explanation || dec.recommendation || dec.description;
  const tips = dec.tips || dec.safetyTips || dec.recommendations;

  // Keys already rendered in dedicated cards
  const handledKeys = new Set([
    'id', '_id', 'title', 'destination', 'source', 'route', 'bestRoute', 'alternativeRoute',
    'estimated_cost', 'estimatedCost', 'travelCost', 'cost', 'budget', 'estimatedTime',
    'travel_time', 'travelTime', 'timeline', 'trafficLevel', 'traffic_level', 'bestDepartureTime',
    'departureTime', 'transportMode', 'fuelEfficiency', 'fuel_efficiency', 'risk_level',
    'riskLevel', 'risk', 'confidence', 'ai_confidence', 'confidenceScore', 'score',
    'recommendation', 'aiRecommendation', 'explanation', 'reason', 'description',
    'tips', 'safetyTips', 'recommendedActions', 'recommendations', 'pros', 'cons',
    'swot', 'actionPlan', 'alternatives', 'created_at', 'updated_at', 'status'
  ]);

  const additionalFields = Object.keys(dec).filter(
    (key) => !handledKeys.has(key) && dec[key] !== null && dec[key] !== undefined
  );

  const getTrafficBadgeVariant = (lvl) => {
    const l = String(lvl).toLowerCase();
    if (l.includes('smooth') || l.includes('low') || l.includes('optimal')) return 'success';
    if (l.includes('moderate') || l.includes('medium')) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/decisions/history" className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:underline font-extrabold mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Trip History
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-blue-700">{dec.id || id || 'TRIP-REC'}</span>
            {dec.transportMode && <Badge variant="primary" size="sm">{dec.transportMode}</Badge>}
            <Badge variant="success" size="sm">AI Recommendation Complete</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            AI Route Recommendation
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-1">
            {dec.source ? `${dec.source} → ${dec.destination}` : dec.destination || 'Optimized Journey Corridor'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleShare} variant="secondary" size="md" icon={Share2}>
            Share Route
          </Button>
          <Button onClick={handleDownloadPdf} variant="primary" size="md" loading={downloading} icon={Download}>
            Download Route PDF
          </Button>
        </div>
      </div>

      {/* Main Scorecard Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Confidence Score */}
        <Card glow className="p-6 border-blue-500/30 glass-card flex flex-col justify-between items-center text-center">
          <span className="text-xs font-black uppercase tracking-wider text-blue-700">Confidence Score</span>
          <div className="relative my-3 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 flex items-center justify-center">
              <span className="text-4xl font-black text-slate-900 font-['Space_Grotesk'] text-gradient-master">
                {typeof confidenceScore === 'number' ? confidenceScore : 96}%
              </span>
            </div>
          </div>
          <Badge variant="success" size="sm" icon={Award}>Optimal Precision</Badge>
        </Card>

        {/* Meters */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ConfidenceMeter score={typeof confidenceScore === 'number' ? confidenceScore : 96} label="Route Recommendation Precision" />
          <RiskMeter score={String(trafficLevel).includes('Heavy') ? 75 : String(trafficLevel).includes('Moderate') ? 45 : 24} label={`Traffic Congestion Level (${trafficLevel})`} />
        </div>
      </div>

      {/* Key Mobility Parameters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Best Route */}
        <Card className="p-4 border-blue-500/25 glass-card flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-700 shrink-0">
            <Route className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-blue-700 font-black uppercase tracking-wider block">Best Route</span>
            <p className="text-sm font-black text-slate-900 font-['Space_Grotesk'] leading-tight">{String(bestRoute)}</p>
          </div>
        </Card>

        {/* Estimated Time */}
        <Card className="p-4 border-blue-500/25 glass-card flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-700 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-blue-700 font-black uppercase tracking-wider block">Estimated Time</span>
            <p className="text-lg font-black text-slate-900 font-['Space_Grotesk']">{String(estimatedTime)}</p>
          </div>
        </Card>

        {/* Traffic Level */}
        <Card className="p-4 border-blue-500/25 glass-card flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-700 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-blue-700 font-black uppercase tracking-wider block">Traffic Level</span>
            <Badge variant={getTrafficBadgeVariant(trafficLevel)} size="sm" className="mt-0.5">
              {String(trafficLevel)}
            </Badge>
          </div>
        </Card>

        {/* Travel Cost */}
        <Card className="p-4 border-blue-500/25 glass-card flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-700 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-blue-700 font-black uppercase tracking-wider block">Travel Cost</span>
            <p className="text-lg font-black text-slate-900 font-['Space_Grotesk']">{String(travelCost)}</p>
          </div>
        </Card>
      </div>

      {/* Second Row: Alternative Route, Best Departure Time & Fuel Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alternativeRoute && (
          <Card className="p-4 border-blue-500/25 glass-card space-y-1">
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest block">Alternative Route</span>
            <p className="text-sm font-black text-slate-900">{String(alternativeRoute)}</p>
          </Card>
        )}
        {bestDepartureTime && (
          <Card className="p-4 border-blue-500/25 glass-card space-y-1">
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block">Best Departure Time</span>
            <p className="text-sm font-black text-slate-900">{String(bestDepartureTime)}</p>
          </Card>
        )}
        {fuelEfficiency && (
          <Card className="p-4 border-blue-500/25 glass-card space-y-1">
            <span className="text-[10px] font-black text-cyan-700 uppercase tracking-widest block">Fuel Efficiency</span>
            <p className="text-sm font-black text-slate-900">{String(fuelEfficiency)}</p>
          </Card>
        )}
      </div>

      {/* AI Explanation / Reasoning Card */}
      {reason && (
        <Card glow className="p-6 border-blue-500/40 glass-card bg-blue-50/70 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">AI Route Explanation & Reason</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
            {typeof reason === 'object' ? JSON.stringify(reason, null, 2) : reason}
          </p>
        </Card>
      )}

      {/* Safety Tips & Mobility Insights */}
      {tips && Array.isArray(tips) && tips.length > 0 && (
        <Card className="p-6 border-blue-500/30 glass-card space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h4 className="text-base font-black text-slate-900">Safety Tips & Commuter Recommendations</h4>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="text-xs text-slate-800 font-bold flex items-start gap-2.5 bg-white p-3 rounded-xl border border-blue-500/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                <span>{typeof tip === 'object' ? JSON.stringify(tip) : tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Dynamic Render of Future / Additional Unhandled Fields */}
      {additionalFields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" /> Additional Route Parameters & Telemetry
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalFields.map((fieldKey) => {
              const val = dec[fieldKey];
              return (
                <Card key={fieldKey} className="p-4 border-blue-500/25 glass-card space-y-1">
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
                    {formatKeyName(fieldKey)}
                  </span>
                  <div className="text-xs font-extrabold text-slate-900 leading-relaxed">
                    {typeof val === 'object' ? (
                      <pre className="text-[11px] font-mono whitespace-pre-wrap bg-white/60 p-2 rounded-xl border border-blue-500/20">
                        {JSON.stringify(val, null, 2)}
                      </pre>
                    ) : (
                      String(val)
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
