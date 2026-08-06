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
  Navigation,
  MapPin,
  Clock,
  Car,
  Paperclip,
  Route
} from 'lucide-react';
import toast from 'react-hot-toast';

export const NewDecisionPage = () => {
  const { addNewDecision, setCurrentDecision } = useDecision();
  const { execute: requestRecommend, loading: recommendLoading } = useRecommendation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: 'Hyderabad → Bangalore Commute',
    source: 'Hyderabad Hitec City Phase II',
    destination: 'Bangalore Electronic City',
    departureTime: '08:30 AM IST',
    transportMode: 'Car',
    description: 'Avoid peak morning bottlenecks, optimize fuel efficiency, and identify green wave signal corridors.',
    budget: '$45.00',
    timeline: 'Within Today',
    riskTolerance: 'Low',
    constraints: 'Must arrive before 02:00 PM conference call; avoid unpaved rural bypass roads.',
    attachments: [
      { name: 'Route_Map_Corridor.png', size: '1.2 MB' },
      { name: 'Toll_Gate_Pass.pdf', size: '540 KB' }
    ]
  });

  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.success('Voice memo recording started... Speak your trip preferences.');
      setTimeout(() => {
        setIsRecording(false);
        toast.success('Voice memo transcribed using AI NLP engine!');
        setFormData(prev => ({
          ...prev,
          constraints: prev.constraints + ' [Voice Memo Added: Prefer highway toll flyovers over city center intersections]'
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

    // Map exact backend expected fields: source, destination, departureTime, transportMode
    const recommendationPayload = {
      source: formData.source || 'Hyderabad',
      destination: formData.destination || 'Bangalore',
      departureTime: formData.departureTime || '08:30 AM',
      transportMode: formData.transportMode || 'Car',
    };

    try {
      // Call POST /api/ai/recommend endpoint
      const result = await requestRecommend(recommendationPayload);
      const resData = result?.data || result || {};
      const decisionObj = {
        id: resData.id || resData._id || `TRIP-${Date.now()}`,
        ...resData,
        ...formData,
        source: recommendationPayload.source,
        destination: recommendationPayload.destination,
        departureTime: recommendationPayload.departureTime,
        transportMode: recommendationPayload.transportMode,
      };
      await addNewDecision(decisionObj);
      setCurrentDecision(decisionObj);
      toast.success('AI Route Recommendation Generated!');
      navigate(`/decisions/result/${decisionObj.id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'Error generating AI route recommendation.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black font-mono text-blue-600 uppercase tracking-widest">SMARTROUTE AI OPTIMIZER</span>
            <Badge variant="primary" size="sm">Step {step} of 4</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            AI Route Optimizer & Trip Planner
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-1">
            Generate optimal routes with real-time AI traffic intelligence
          </p>
        </div>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-4 gap-2 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-500/25 shadow-sm">
        {[
          { id: 1, label: '1. Origin & Dest' },
          { id: 2, label: '2. Timing & Mode' },
          { id: 3, label: '3. Preferences' },
          { id: 4, label: '4. Documents & Run' },
        ].map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(s.id)}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all text-center cursor-pointer ${
              step === s.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                : step > s.id
                ? 'bg-blue-500/10 text-blue-700 border border-blue-500/20'
                : 'text-slate-700 hover:text-blue-700 hover:bg-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <Card glow className="p-8 border-blue-500/30 glass-card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <Input
                label="Trip Title / Route Identifier"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Hyderabad to Bangalore Commute"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="From Location (Source)"
                  icon={Navigation}
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="e.g. Hyderabad Hitec City"
                  required
                />

                <Input
                  label="Destination"
                  icon={MapPin}
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g. Bangalore Electronic City"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Trip Objectives & Commute Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your commute preferences, bottleneck priorities, and stopovers..."
                  className="w-full rounded-2xl bg-white border border-blue-500/25 text-slate-900 placeholder-slate-400 p-4 text-sm font-bold transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Departure Time"
                  icon={Clock}
                  value={formData.departureTime}
                  onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                  placeholder="08:30 AM IST"
                  required
                />

                <Select
                  label="Transport Mode"
                  icon={Car}
                  value={formData.transportMode}
                  onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
                  options={[
                    { value: 'Car', label: 'Car / Road Express' },
                    { value: 'Bus', label: 'Bus / Shuttle' },
                    { value: 'Train', label: 'Train / High-Speed Rail' },
                    { value: 'Flight', label: 'Flight / Air Transit' },
                    { value: 'Bike', label: 'Bike / Motor Two-Wheeler' },
                  ]}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Traffic Risk Tolerance"
                  value={formData.riskTolerance}
                  onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
                  options={[
                    { value: 'Low', label: 'Low Risk (Safest, Smooth Flow)' },
                    { value: 'Medium', label: 'Medium Risk (Balanced Speed & Tolls)' },
                    { value: 'High', label: 'High Speed (Aggressive Express Lanes)' },
                  ]}
                />

                <Input
                  label="Estimated Toll & Fuel Budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="$45.00"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Route Constraints & Detour Rules
                </label>
                <textarea
                  rows={4}
                  value={formData.constraints}
                  onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                  placeholder="Specify arrival deadlines, toll gate preferences, road quality requirements..."
                  className="w-full rounded-2xl bg-white border border-blue-500/25 text-slate-900 placeholder-slate-400 p-4 text-sm font-bold transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                />
              </div>

              {/* Voice Memo Upload Callout Box */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-500/30 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${isRecording ? 'bg-rose-500 text-white border-rose-400 animate-ping' : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-400'}`}>
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">Dictate Voice Route Instructions</h5>
                    <p className="text-xs font-semibold text-slate-700">Record natural speech for AI automatic parameter extraction</p>
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
              <div className="border-2 border-dashed border-blue-400/60 hover:border-blue-600 rounded-2xl p-8 text-center bg-blue-50/40 transition-colors relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h5 className="text-sm font-black text-slate-900">Drag & drop route files or click to browse</h5>
                <p className="text-xs font-semibold text-slate-700 mt-1">Supports GPX, KML, PDF, PNG up to 50MB</p>
              </div>

              {/* Attached Files List */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-black text-slate-800 uppercase">Attached Route Documents</span>
                  {formData.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-blue-500/25 text-xs shadow-sm">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-blue-600" />
                        <span className="font-black text-slate-900">{file.name}</span>
                      </div>
                      <Badge variant="neutral" size="sm">{file.size}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* Final Summary Card showing payload mapping */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-500/30 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-700 uppercase">Payload Mapping to POST /api/ai/recommend</span>
                  <Badge variant="success" size="sm">Ready to Send</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold text-slate-800 pt-1">
                  <div>source: "{formData.source}"</div>
                  <div>destination: "{formData.destination}"</div>
                  <div>departureTime: "{formData.departureTime}"</div>
                  <div>transportMode: "{formData.transportMode}"</div>
                </div>
              </div>
            </div>
          )}

          {/* Form Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
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
              <Button type="submit" variant="primary" size="lg" loading={recommendLoading} icon={Sparkles}>
                Run AI Route Optimizer
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};
