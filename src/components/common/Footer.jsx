import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, Globe } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="border-t border-purple-500/30 bg-slate-950 pt-20 pb-12 px-4 lg:px-8 text-slate-300 rounded-t-[40px] shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <span className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
              DecisionSphere <span className="text-purple-400">AI</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 font-medium max-w-sm">
            Transforming complex organizational decisions into high-confidence intelligent actions using Monte Carlo neural simulations and predictive spatial models.
          </p>
          <div className="flex items-center gap-3 pt-2 text-slate-300">
            <a href="#" className="p-2.5 rounded-2xl bg-slate-900 border border-purple-500/20 hover:text-purple-400 hover:border-purple-400 transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-2xl bg-slate-900 border border-purple-500/20 hover:text-purple-400 hover:border-purple-400 transition-colors">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-2xl bg-slate-900 border border-purple-500/20 hover:text-purple-400 hover:border-purple-400 transition-colors">
              <FaGithub className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-4">Platform</h5>
          <ul className="space-y-3 text-xs font-bold text-slate-300">
            <li><Link to="/decisions/new" className="hover:text-purple-400 transition-colors">Decision Engine</Link></li>
            <li><Link to="/decisions/battle" className="hover:text-purple-400 transition-colors">Decision Battle</Link></li>
            <li><Link to="/simulator" className="hover:text-purple-400 transition-colors">Scenario Simulator</Link></li>
            <li><Link to="/insights" className="hover:text-purple-400 transition-colors">AI Insights</Link></li>
            <li><Link to="/analytics" className="hover:text-purple-400 transition-colors">Analytics</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-4">Resources</h5>
          <ul className="space-y-3 text-xs font-bold text-slate-300">
            <li><a href="#workflow" className="hover:text-purple-400 transition-colors">AI Architecture</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing & Plans</a></li>
            <li><Link to="/reports" className="hover:text-purple-400 transition-colors">Decision Reports</Link></li>
            <li><Link to="/decisions/history" className="hover:text-purple-400 transition-colors">Decision History</Link></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Documentation & API</a></li>
          </ul>
        </div>

        {/* Compliance */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-4">Security</h5>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/20 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-extrabold text-white">
                <Shield className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
              </div>
              <p className="text-slate-400 font-medium">Encrypted neural node storage and token security.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
        <p>© 2026 DecisionSphere AI, Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Security Audit</a>
        </div>
      </div>
    </footer>
  );
};
