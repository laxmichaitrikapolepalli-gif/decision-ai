import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <Card glow className="p-10 border-purple-500/30 text-center max-w-md space-y-6 glass-card bg-slate-900/80 rounded-3xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 mx-auto">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-extrabold text-white font-['Space_Grotesk'] text-gradient-master">
            404
          </span>
          <h2 className="text-xl font-black text-white">Decision Node Not Found</h2>
          <p className="text-xs text-slate-300 font-semibold">
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
