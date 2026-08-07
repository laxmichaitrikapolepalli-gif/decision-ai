import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { CommandPalette } from '../components/common/CommandPalette';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#0F172A] flex flex-col justify-between p-4 relative overflow-hidden">

      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2DAA]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#6C63FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4 z-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] p-0.5 shadow-lg shadow-[#6C63FF]/20 overflow-hidden flex items-center justify-center">
            <img src="/logo.jpg" alt="DecisionSphere AI Logo" className="w-full h-full rounded-[14px] object-cover" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold text-[#0F172A] font-['Space_Grotesk']">
              DecisionSphere <span className="text-[#FF2DAA]">AI</span>
            </span>
          </div>
        </Link>
      </header>

      {/* Main Form Center Box */}
      <main className="flex-1 flex items-center justify-center py-10 z-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-[#64748B] font-semibold py-4 z-10">
        © 2026 DecisionSphere AI, Inc. All rights reserved.
      </footer>

      <CommandPalette />
    </div>
  );
};
