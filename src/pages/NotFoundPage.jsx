import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Route, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <Card glow className="p-10 border-blue-500/30 text-center max-w-md space-y-6 glass-card">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 mx-auto">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <Route className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-extrabold text-slate-900 font-['Space_Grotesk'] text-gradient-master">
            404
          </span>
          <h2 className="text-xl font-black text-slate-900">Route Not Found</h2>
          <p className="text-xs text-slate-700 font-bold">
            The requested travel corridor or route URL does not exist or has been moved.
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
