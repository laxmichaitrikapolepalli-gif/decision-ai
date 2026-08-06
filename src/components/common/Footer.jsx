import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Sparkles, Shield, Navigation } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="border-t border-blue-500/30 bg-[#0f172a]/95 backdrop-blur-2xl pt-20 pb-12 px-4 lg:px-8 text-slate-300 rounded-t-[40px] shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/30">
              <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
                <Route className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <span className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
              SmartRoute <span className="text-blue-400">AI</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300 font-medium max-w-sm">
            AI-powered intelligent transportation and route optimization platform. Optimizing travel routes using real-time traffic analysis and AI recommendations.
          </p>
          <div className="flex items-center gap-3 pt-2 text-slate-300">
            <a href="#" className="p-2.5 rounded-2xl bg-white/10 border border-white/10 hover:text-blue-400 hover:border-blue-400 transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-2xl bg-white/10 border border-white/10 hover:text-blue-400 hover:border-blue-400 transition-colors">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-2xl bg-white/10 border border-white/10 hover:text-blue-400 hover:border-blue-400 transition-colors">
              <FaGithub className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-4">Platform</h5>
          <ul className="space-y-3 text-xs font-bold text-slate-200">
            <li><Link to="/decisions/new" className="hover:text-blue-400 transition-colors">Route Optimizer</Link></li>
            <li><Link to="/decisions/battle" className="hover:text-blue-400 transition-colors">Route Comparison</Link></li>
            <li><Link to="/simulator" className="hover:text-blue-400 transition-colors">Traffic Simulator</Link></li>
            <li><Link to="/insights" className="hover:text-blue-400 transition-colors">Mobility Insights</Link></li>
            <li><Link to="/analytics" className="hover:text-blue-400 transition-colors">Fleet Analytics</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-4">Resources</h5>
          <ul className="space-y-3 text-xs font-bold text-slate-200">
            <li><a href="#workflow" className="hover:text-blue-400 transition-colors">AI Architecture</a></li>
            <li><a href="#map" className="hover:text-blue-400 transition-colors">Live Mobility Map</a></li>
            <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Fleet Pricing</a></li>
            <li><Link to="/reports" className="hover:text-blue-400 transition-colors">Trip History Reports</Link></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
          </ul>
        </div>

        {/* Compliance */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-4">Security</h5>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-extrabold text-white">
                <Shield className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
              </div>
              <p className="text-slate-300 font-medium">Encrypted real-time traffic telemetry and token storage.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
        <p>© 2026 SmartRoute AI, Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Security Audit</a>
        </div>
      </div>
    </footer>
  );
};
