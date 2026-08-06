import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecision } from '../../contexts/DecisionContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  Upload,
  Mic,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Clock,
  ShieldAlert,
  Paperclip,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

export const NewDecisionPage = () => {
  const { addNewDecision, loadingDecision } = useDecision();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: 'Commercial Expansion: Hyderabad Flagship Node',
    description: 'Evaluating spatial-economic indicators, tech talent acquisition cost, real estate lease tax credits, and supply chain fulfillment latency.',
    industry: 'Retail Tech & Enterprise Hardware',
    budget: '$2,500,000',
    timeline: '6 Months',
    riskTolerance: 'Medium',
    expectedRoi: '+32%',
    priority: 'High',
    constraints: 'Requires municipal zoning approval within 30 days and green PPA energy compliance.',
    attachments: [
      { name: 'Hyderabad_RE_Lease_Audit.pdf', size: '2.4 MB' },
      { name: 'Competitor_Density_Map.png', size: '1.1 MB' }
    ]
  });

  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.success('Voice memo recording started... Speak your decision parameters.');
      setTimeout(() => {
        setIsRecording(false);
        toast.success('Voice memo transcribed using AI NLP engine!');
        setFormData(prev => ({
          ...prev,
          constraints: prev.constraints + ' [Voice Memo Added: Prioritize fast-track municipal lease sign-off]'
        }));
      }, 3000);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(f => ({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` }));
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
      toast.success(`Attached ${files.length} file(s)`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addNewDecision(formData);
      navigate(`/decisions/result/${result.id}`);
    } catch (err) {
      toast.error('Simulation error.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black font-mono text-purple-700 uppercase tracking-widest">DECISION SIMULATOR ENGINE</span>
            <Badge variant="primary" size="sm">Step {step} of 4</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            New Strategic AI Decision
          </h1>
        </div>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-4 gap-2 p-2 rounded-2xl bg-white/80 backdrop-blur-md border border-purple-500/25 shadow-sm">
        {[
          { id: 1, label: '1. Overview' },
          { id: 2, label: '2. Capital & Risk' },
          { id: 3, label: '3. Constraints' },
          { id: 4, label: '4. Attachments & Run' },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all text-center cursor-pointer ${
              step === s.id
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-purple-500/20'
                : step > s.id
                ? 'bg-purple-500/10 text-purple-700 border border-purple-500/20'
                : 'text-slate-600 hover:text-purple-700 hover:bg-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <Card glow className="p-8 border-purple-500/30 glass-card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <Input
                label="Decision Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Store Launch: Hyderabad vs Bangalore"
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Comprehensive Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the background context, business objective, and key hypotheses..."
                  className="w-full rounded-2xl bg-white border border-purple-500/25 text-slate-900 placeholder-slate-400 p-4 text-sm font-bold transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none shadow-sm"
                  required
                />
              </div>

              <Select
                label="Target Industry Domain"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                options={[
                  { value: 'Retail Tech & Enterprise Hardware', label: 'Retail Tech & Enterprise Hardware' },
                  { value: 'Financial Services & Fintech', label: 'Financial Services & Fintech' },
                  { value: 'Supply Chain & Logistics', label: 'Supply Chain & Logistics' },
                  { value: 'Healthcare & Biotech', label: 'Healthcare & Biotech' },
                  { value: 'IT Infrastructure & Cloud', label: 'IT Infrastructure & Cloud' },
                ]}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Capital Budget Allocation"
                  icon={DollarSign}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="$2,500,000"
                />

                <Input
                  label="Execution Timeline"
                  icon={Clock}
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="6 Months"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Risk Tolerance"
                  value={formData.riskTolerance}
                  onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
                  options={[
                    { value: 'Low', label: 'Low Risk (Conservative)' },
                    { value: 'Medium', label: 'Medium Risk (Balanced)' },
                    { value: 'High', label: 'High Risk (Aggressive ROI)' },
                  ]}
                />

                <Input
                  label="Target ROI %"
                  value={formData.expectedRoi}
                  onChange={(e) => setFormData({ ...formData, expectedRoi: e.target.value })}
                  placeholder="+32%"
                />

                <Select
                  label="Priority Level"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  options={[
                    { value: 'Low', label: 'Low Priority' },
                    { value: 'Medium', label: 'Medium Priority' },
                    { value: 'High', label: 'High Priority' },
                    { value: 'Critical', label: 'Critical Executive Focus' },
                  ]}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Regulatory & Operation Constraints
                </label>
                <textarea
                  rows={4}
                  value={formData.constraints}
                  onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                  placeholder="Specify legal limits, zoning requirements, team capacity bottlenecks..."
                  className="w-full rounded-2xl bg-white border border-purple-500/25 text-slate-900 placeholder-slate-400 p-4 text-sm font-bold transition-all focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none shadow-sm"
                />
              </div>

              {/* Voice Memo Upload Callout Box */}
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-500/30 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${isRecording ? 'bg-rose-500 text-white border-rose-400 animate-ping' : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-purple-400'}`}>
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">Dictate Voice Memo</h5>
                    <p className="text-xs font-semibold text-slate-700">Record natural speech for AI automatic text parameter extraction</p>
                  </div>
                </div>
                <Button onClick={handleVoiceRecord} variant={isRecording ? 'danger' : 'accent'} size="sm">
                  {isRecording ? 'Recording...' : 'Start Dictation'}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-purple-400/60 hover:border-purple-600 rounded-2xl p-8 text-center bg-purple-50/40 transition-colors relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h5 className="text-sm font-black text-slate-900">Drag & drop files or click to browse</h5>
                <p className="text-xs font-semibold text-slate-700 mt-1">Supports PDF, XLSX, DOCX, PNG, MP3 voice memos up to 50MB</p>
              </div>

              {/* Attached Files List */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-black text-slate-800 uppercase">Attached Documents</span>
                  {formData.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded.xl bg-white border border-purple-500/25 text-xs shadow-sm">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-purple-600" />
                        <span className="font-black text-slate-900">{file.name}</span>
                      </div>
                      <Badge variant="neutral" size="sm">{file.size}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* Final Summary Card */}
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-500/30 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-800 uppercase">10,000 Monte Carlo Iteration Setup</span>
                  <Badge variant="success" size="sm">Ready to Simulate</Badge>
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  Submitting will launch parallel neural tensor processing across spatial economic indices.
                </p>
              </div>
            </div>
          )}

          {/* Form Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
            {step > 1 ? (
              <Button type="button" onClick={() => setStep(step - 1)} variant="ghost" size="md" icon={ArrowLeft}>
                Back
              </Button>
            ) : <div />}

            {step < 4 ? (
              <Button type="button" onClick={() => setStep(step + 1)} variant="primary" size="md" icon={ArrowRight}>
                Continue to Step {step + 1}
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="lg" loading={loadingDecision} icon={Sparkles}>
                Run AI Decision Simulation
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};
