import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-[#FF2DAA]/10 rounded-full blur-[140px] pointer-events-none" />

      <Card glow className="p-10 border-[#6C63FF]/20 text-center max-w-md space-y-6 glass-card bg-white/95 rounded-3xl shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] p-0.5 mx-auto shadow-lg shadow-[#FF2DAA]/25">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#6C63FF]" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-[#0F172A] font-['Space_Grotesk'] text-gradient-master">
            404
          </span>
          <h2 className="text-xl font-black text-[#0F172A]">Decision Node Not Found</h2>
          <p className="text-xs text-[#64748B] font-semibold">
            The requested decision parameter URL does not exist or has been archived.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button variant="primary" size="md" icon={Home} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold border-none shadow-md">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
