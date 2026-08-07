import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecision } from '../../contexts/DecisionContext';
import { useRecommendation } from '../../hooks/useRecommendation';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  Upload,
  Mic,
  ArrowRight,
  ArrowLeft,
  Building,
  DollarSign,
  ShieldAlert,
  FileText,
  Eye,
  Play
} from 'lucide-react';
import toast from 'react-hot-toast';

export const NewDecisionPage = () => {
  const { addNewDecision, setCurrentDecision } = useDecision();
  const { execute: requestRecommend, loading: recommendLoading } = useRecommendation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: 'Commercial Expansion: Hyderabad Flagship Node',
    description: 'Evaluating spatial-economic indicators, tech talent acquisition cost, real estate lease tax credits, and supply chain fulfillment latency.',
    domain: 'Retail Tech & Enterprise Hardware',
    source: 'Expand Store in Hyderabad Hitec City',
    destination: 'Expand Store in Bangalore Whitefield',
    departureTime: 'Q3 2026 Fiscal Target',
    transportMode: 'Capital Investment',
    budget: '₹2,500,000',
    timeline: '6 Months',
    riskTolerance: 'Low Risk (12%)',
    constraints: 'CapEx payback must occur within 18 months; municipal tax subsidies required.',
    attachments: [
      { name: 'Hyderabad_Lease_Subsidy_TermSheet.pdf', size: '1.4 MB' },
      { name: 'APAC_Talent_Density_Model.xlsx', size: '820 KB' }
    ]
  });

  const [isRecording, setIsRecording] = useState(false);

  const stepsList = [
    { id: 1, name: '1. Overview' },
    { id: 2, name: '2. Capital & Risk' },
    { id: 3, name: '3. Constraints' },
    { id: 4, name: '4. Attachments & Run' },
  ];

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.success('Voice memo recording started...');
      setTimeout(() => {
        setIsRecording(false);
        toast.success('Voice memo transcribed!');
        setFormData(prev => ({
          ...prev,
          constraints: prev.constraints + ' [Voice Memo: Prioritize municipal tax credits]'
        }));
      }, 3000);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(f => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` }));
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
      toast.success(`Attached ${files.length} document(s)`);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const recommendationPayload = {
      source: formData.source || 'Hyderabad Option A',
      destination: formData.destination || 'Bangalore Option B',
      departureTime: formData.departureTime || 'Q3 2026 Target',
      transportMode: formData.transportMode || 'Capital Investment',
    };

    let resData = {};
    try {
      const result = await requestRecommend(recommendationPayload);
      resData = result?.data || result || {};
    } catch (err) {
      toast.error('AI Recommendation Engine fallback active.');
      resData = {
        bestRoute: `Primary Strategic Recommendation: ${formData.source}`,
        alternativeRoute: `Secondary Option: ${formData.destination}`,
        estimatedTime: '14.2 Months Payback',
        trafficLevel: 'Low Risk (P95)',
        bestDepartureTime: formData.departureTime || 'Q3 2026 Target',
        travelCost: formData.budget || '₹2,500,000',
        fuelEfficiency: '+38% Projected ROI',
        confidenceScore: 96,
        reason: `DecisionSphere AI neural model identified ${formData.source} as the optimal strategic path, delivering superior payback velocity, municipal tax credits, and lower risk exposure.`,
        tips: [
          'Finalize municipal tax exemption LOI prior to Q3 fiscal deadline',
          'Allocate ₹1.8M CapEx for initial hardware node deployment',
          'Establish regional R&D hub to capture senior talent density'
        ]
      };
    }

    const decisionObj = {
      id: resData.id || resData._id || `DEC-${Date.now()}`,
      ...resData,
      ...formData,
      source: recommendationPayload.source,
      destination: recommendationPayload.destination,
      departureTime: recommendationPayload.departureTime,
      transportMode: recommendationPayload.transportMode,
      recommendation: resData.bestRoute || `Proceed with ${formData.source}`,
      confidence: resData.confidenceScore || 96,
      risk: resData.trafficLevel || 'Low Risk',
      roi: resData.fuelEfficiency || '+38% ROI',
      status: 'Approved',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    await addNewDecision(decisionObj);
    setCurrentDecision(decisionObj);
    toast.success('AI Strategic Recommendation Generated!');
    navigate(`/decisions/result/${decisionObj.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header exact matching screenshot 5 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-extrabold text-[#64748B] uppercase tracking-widest">DECISION SIMULATOR ENGINE</span>
          <span className="px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-extrabold border border-purple-200">
            Step {step} of 4
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#FF2DAA] via-[#8B5CF6] to-[#4F7DFF] bg-clip-text font-['Space_Grotesk']">
          New Strategic AI Decision
        </h1>
      </div>

      {/* 4-Step Navigation Bar exact matching screenshot 5 */}
      <div className="grid grid-cols-4 gap-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
        {stepsList.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(s.id)}
            className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center truncate cursor-pointer ${
              step === s.id
                ? 'bg-gradient-to-r from-[#FF2DAA] to-[#8B5CF6] text-white shadow-md font-extrabold'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Form Card exact matching screenshot 5 */}
      <Card glow className="p-8 border-slate-200 glass-card bg-white rounded-3xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: Overview */}
          {step === 1 && (
            <div className="space-y-5">
              <Input
                label="DECISION TITLE"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Commercial Expansion: Hyderabad Flagship Node"
                className="bg-white border-slate-200"
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#0F172A]">
                  COMPREHENSIVE DESCRIPTION
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-2xl bg-white border border-slate-200 text-[#0F172A] p-4 text-xs font-medium focus:border-[#6C63FF] focus:outline-none shadow-sm"
                  placeholder="Evaluating spatial-economic indicators, tech talent acquisition cost..."
                  required
                />
              </div>

              <Select
                label="TARGET INDUSTRY DOMAIN"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                options={[
                  { value: 'Retail Tech & Enterprise Hardware', label: 'Retail Tech & Enterprise Hardware' },
                  { value: 'Cloud Computing & IT Infrastructure', label: 'Cloud Computing & IT Infrastructure' },
                  { value: 'Financial Services & Banking', label: 'Financial Services & Banking' },
                  { value: 'Supply Chain & Logistics', label: 'Supply Chain & Logistics' },
                ]}
                className="bg-white border-slate-200"
              />
            </div>
          )}

          {/* Step 2: Capital & Risk */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Option A (Primary Contender)"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="Expand Store in Hyderabad Hitec City"
                  required
                />
                <Input
                  label="Option B (Challenger Option)"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Expand Store in Bangalore Whitefield"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="CapEx Allocation"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="₹2,500,000"
                  required
                />
                <Input
                  label="Execution Horizon"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="6 Months"
                  required
                />
              </div>
              <Select
                label="Risk Classification"
                value={formData.riskTolerance}
                onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
                options={[
                  { value: 'Low Risk (12%)', label: 'Low Risk (High Confidence Bounds)' },
                  { value: 'Moderate Risk (28%)', label: 'Moderate Risk (Balanced Yield)' },
                  { value: 'High Risk (45%)', label: 'High Risk (Aggressive Yield)' },
                ]}
              />
            </div>
          )}

          {/* Step 3: Constraints */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#0F172A]">
                STRATEGIC CONSTRAINTS & REQUIREMENTS
              </label>
              <textarea
                rows={4}
                value={formData.constraints}
                onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                className="w-full rounded-2xl bg-white border border-slate-200 text-[#0F172A] p-4 text-xs font-medium focus:border-[#6C63FF] focus:outline-none shadow-sm"
              />
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${isRecording ? 'bg-rose-500 text-white animate-ping' : 'bg-[#6C63FF] text-white'}`}>
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-[#0F172A]">Dictate Voice Memo Instructions</h5>
                    <p className="text-[11px] font-medium text-[#64748B]">Natural NLP parameter extraction</p>
                  </div>
                </div>
                <Button type="button" onClick={handleVoiceRecord} variant={isRecording ? 'danger' : 'accent'} size="sm">
                  {isRecording ? 'Recording...' : 'Start Dictation'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Attachments & Run */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4">
              <div className="border-2 border-dashed border-[#6C63FF]/30 hover:border-[#6C63FF] rounded-2xl p-8 text-center bg-slate-50 relative">
                <input type="file" multiple onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                <Upload className="w-8 h-8 text-[#6C63FF] mx-auto mb-2" />
                <h5 className="text-xs font-extrabold text-[#0F172A]">Drag & drop executive reports or click to browse</h5>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0F172A] text-left space-y-1">
                <p><strong>Title:</strong> {formData.title}</p>
                <p><strong>Domain:</strong> {formData.domain}</p>
                <p><strong>Option A:</strong> {formData.source}</p>
                <p><strong>Option B:</strong> {formData.destination}</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <Button type="button" onClick={() => setStep(step - 1)} variant="ghost" size="md" icon={ArrowLeft} className="text-[#0F172A] font-bold">
                Back
              </Button>
            ) : <div />}

            {step < 4 ? (
              <Button type="button" onClick={() => setStep(step + 1)} variant="primary" size="md" icon={ArrowRight} className="bg-gradient-to-r from-[#FF2DAA] to-[#4F7DFF] text-white font-bold shadow-md rounded-2xl py-3 px-6 text-xs">
                Continue to Step {step + 1}
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="lg" loading={recommendLoading} icon={Sparkles} className="bg-gradient-to-r from-[#FF2DAA] via-[#8B5CF6] to-[#4F7DFF] text-white font-bold shadow-xl rounded-2xl py-3 px-8 text-xs">
                Run AI Strategic Simulation
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};
