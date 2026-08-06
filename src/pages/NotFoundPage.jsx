import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Globe, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <Card glow className="p-10 border-indigo-500/30 text-center max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 mx-auto">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Globe className="w-8 h-8 text-indigo-400" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-extrabold text-white font-['Space_Grotesk'] text-gradient-primary">
            404
          </span>
          <h2 className="text-xl font-bold text-white">Decision Node Not Found</h2>
          <p className="text-xs text-slate-400">
            The requested decision parameter URL does not exist or has been archived.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button variant="primary" size="md" icon={Home}>
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
