import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FileText, Download, FileCheck, Route, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

// TODO: Backend endpoint GET /api/reports is missing. Preserving UI with mock reports data.
const MOCK_REPORTS = [
  { id: 'REP-01', title: 'Q3 Fleet Transit Efficiency & Route Summary', date: '2026-08-01', format: 'PDF', size: '2.4 MB' },
  { id: 'REP-02', title: 'Hyderabad-Bangalore Corridor Congestion Audit', date: '2026-07-28', format: 'PDF', size: '4.1 MB' },
  { id: 'REP-03', title: 'Fuel Savings & Carbon Emissions Reduction Matrix', date: '2026-07-15', format: 'PDF', size: '1.8 MB' },
];

export const ReportsPage = () => {
  const [reports, setReports] = useState(MOCK_REPORTS);

  useEffect(() => {
    // Retaining mock data because backend endpoint GET /api/reports does not exist.
    setReports(MOCK_REPORTS);
  }, []);

  const handleExport = (title) => {
    toast.success(`Exporting ${title} as PDF...`);
    setTimeout(() => {
      toast.success(`${title}.pdf saved!`);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest">SMARTROUTE TELEMETRY</span>
            <Badge variant="primary" size="sm" icon={FileText}>Audit Ready</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Trip & Fleet History Reports
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-1">
            Download comprehensive AI traffic logs, travel time audits, and fuel reduction summaries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((rep) => (
          <Card key={rep.id} glow className="p-6 space-y-4 border-blue-500/30 glass-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-700">
                  <FileCheck className="w-5 h-5" />
                </div>
                <Badge variant="neutral" size="sm">{rep.format} • {rep.size}</Badge>
              </div>
              <h3 className="text-base font-black text-slate-900 leading-snug">{rep.title}</h3>
              <p className="text-xs text-slate-700 font-bold">Generated on {rep.date} by SmartRoute AI Node v4</p>
            </div>

            <Button
              onClick={() => handleExport(rep.title)}
              variant="secondary"
              size="sm"
              icon={Download}
              className="w-full"
            >
              Export Report
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
