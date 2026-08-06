import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { CommandPalette } from '../components/common/CommandPalette';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between p-4 relative overflow-hidden">

      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4 z-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="text-xl font-extrabold text-white font-['Space_Grotesk']">
            DecisionSphere <span className="text-indigo-400">AI</span>
          </span>
        </Link>
      </header>

      {/* Main Form Center Box */}
      <main className="flex-1 flex items-center justify-center py-10 z-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-4 z-10">
        © 2026 DecisionSphere AI, Inc. SOC2 Type II Certified Enterprise Platform.
      </footer>

      <CommandPalette />
    </div>
  );
};
