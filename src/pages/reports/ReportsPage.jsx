import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { generatePdfReport } from '../../utils/generatePdfReport';
import {
  FileText,
  Download,
  Share2,
  Eye,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ReportsPage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const pdfReports = [
    {
      id: 'REP-2026-Q3',
      title: 'Q3 Executive Capital Allocation & Risk Audit',
      date: 'Aug 06, 2026',
      size: '2.4 MB',
      type: 'Executive PDF',
      confidence: '96.8%',
      roi: '+38.4%',
      risk: 'Low Risk (P95)',
      payback: '14.2 Months',
      summary: 'Comprehensive audit of $4.2M capital allocation across Tier-1 technology nodes, payback timelines, and P95 variance bounds.',
      recommendations: [
        'Finalize LOI prior to Q3 municipal fiscal deadline to capture 18% tax credit.',
        'Allocate $1.8M CapEx for initial hardware node deployment in Hyderabad Hitec City.',
        'Establish regional R&D hub to capture senior Machine Learning engineering talent density.',
        'Execute secondary air-freight contingency contract for top 20% critical component SKUs.'
      ]
    },
    {
      id: 'REP-2026-R&D',
      title: 'APAC R&D Talent Arbitrage & Tax Exemption Report',
      date: 'Jul 28, 2026',
      size: '1.8 MB',
      type: 'Strategy PDF',
      confidence: '94.2%',
      roi: '+28.0%',
      risk: 'Low Risk',
      payback: '12.0 Months',
      summary: 'Analysis of senior ML engineering density in Hyderabad vs Bangalore, municipal tax incentives, and 14.2-month payback metrics.',
      recommendations: [
        'Target senior ML engineering candidates with 12% lower compensation baseline.',
        'Apply for Tier-1 municipal software development grants.',
        'Establish strategic partnership with local technical university research labs.'
      ]
    },
    {
      id: 'REP-2026-SUPPLY',
      title: 'Global Supply Chain Contingency & Maritime Sensitivity',
      date: 'Jul 15, 2026',
      size: '3.1 MB',
      type: 'Risk Audit PDF',
      confidence: '91.5%',
      roi: '+18.5%',
      risk: 'Moderate Risk',
      payback: '18.5 Months',
      summary: 'Stochastic simulation of Singapore straits shipping friction, air-freight contract overrides, and 14-day latency reductions.',
      recommendations: [
        'Contract secondary air-freight provider for high-priority components.',
        'Increase regional buffer inventory by 15% during Q3 monsoon season.',
        'Implement real-time GPS telemetry tracking across all primary shipping lanes.'
      ]
    }
  ];

  const handleAction = async (action, rep) => {
    if (action === 'preview') {
      setSelectedReport(rep);
      setPreviewOpen(true);
    } else if (action === 'download') {
      try {
        await generatePdfReport(rep);
        toast.success(`Downloaded ${rep.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}.pdf`);
      } catch (err) {
        console.error('Failed to generate PDF report:', err);
        toast.error('Failed to generate PDF report. Check console for details.');
      }
    } else if (action === 'share') {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Report access link copied to clipboard!');
      } catch (err) {
        toast.success(`Share link generated for ${rep.id}`);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-[#6C63FF] uppercase tracking-widest">EXECUTIVE AUDIT</span>
            <Badge variant="primary" size="sm" icon={FileText} className="bg-[#6C63FF]/15 text-[#6C63FF]">PDF Reports Engine</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Decision Reports & PDF Audits
          </h1>
          <p className="text-xs font-semibold text-[#64748B] mt-1">
            Preview, download, share, and export executive decision reports and PDF briefings
          </p>
        </div>
      </div>

      {/* Premium PDF Report Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {pdfReports.map((rep) => (
          <Card key={rep.id} glow className="p-8 border-[#6C63FF]/20 glass-card bg-white/95 space-y-5 rounded-3xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] text-white shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-[#6C63FF]">{rep.id}</span>
                    <Badge variant="success" size="sm">{rep.type}</Badge>
                  </div>
                  <h3 className="text-xl font-black text-[#0F172A] mt-0.5">{rep.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => handleAction('preview', rep)} variant="ghost" size="sm" icon={Eye} className="text-[#0F172A] font-bold">
                  Preview
                </Button>
                <Button onClick={() => handleAction('download', rep)} variant="secondary" size="sm" icon={Download} className="bg-slate-100 text-[#0F172A] font-bold">
                  Download
                </Button>
                <Button onClick={() => handleAction('share', rep)} variant="primary" size="sm" icon={Share2} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none shadow-md font-bold">
                  Share
                </Button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#64748B] font-semibold leading-relaxed">{rep.summary}</p>

            <div className="flex items-center justify-between text-xs font-bold text-[#64748B] pt-2">
              <span>Generated: {rep.date}</span>
              <span>File Size: {rep.size}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="max-w-2xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-black text-[#6C63FF]">{selectedReport.id}</span>
                <h3 className="text-xl font-black text-[#0F172A]">{selectedReport.title}</h3>
              </div>
              <Badge variant="success" size="sm">SOC2 Certified</Badge>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-black uppercase text-[#6C63FF] tracking-wider">PDF Executive Briefing Preview</h4>
              <p className="text-xs text-[#0F172A] font-semibold leading-relaxed">
                {selectedReport.summary}
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#64748B]">
                <span>P95 Confidence: {selectedReport.confidence}</span>
                <span>Deterministic Payback: {selectedReport.payback}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button onClick={() => setPreviewOpen(false)} variant="ghost" size="md">
                Close Preview
              </Button>
              <Button onClick={() => handleAction('download', selectedReport)} variant="primary" size="md" icon={Download} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold">
                Download PDF Briefing
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
