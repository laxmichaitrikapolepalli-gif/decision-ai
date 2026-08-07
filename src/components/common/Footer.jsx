import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="border-t border-[#6C63FF]/15 bg-white pt-20 pb-12 px-4 lg:px-8 text-[#0F172A] rounded-t-[40px] shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] p-0.5 shadow-lg shadow-[#FF2DAA]/25 overflow-hidden flex items-center justify-center">
              <img src="/logo.jpg" alt="DecisionSphere AI Logo" className="w-full h-full rounded-[14px] object-cover" />
            </div>
            <span className="text-2xl font-black text-[#0F172A] font-['Space_Grotesk'] tracking-tight">
              DecisionSphere <span className="text-[#FF2DAA]">AI</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#64748B] font-semibold max-w-sm">
            Transforming complex organizational decisions into high-confidence intelligent actions using Monte Carlo neural simulations and predictive spatial models.
          </p>
          <div className="flex items-center gap-3 pt-2 text-[#64748B]">
            <a href="#" className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 hover:text-[#6C63FF] hover:border-[#6C63FF] transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 hover:text-[#6C63FF] hover:border-[#6C63FF] transition-colors">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 hover:text-[#6C63FF] hover:border-[#6C63FF] transition-colors">
              <FaGithub className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-[#6C63FF] mb-4">Platform</h5>
          <ul className="space-y-3 text-xs font-bold text-[#0F172A]">
            <li><Link to="/decisions/new" className="hover:text-[#FF2DAA] transition-colors">Decision Engine</Link></li>
            <li><Link to="/decisions/battle" className="hover:text-[#FF2DAA] transition-colors">Decision Battle</Link></li>
            <li><Link to="/simulator" className="hover:text-[#FF2DAA] transition-colors">Scenario Simulator</Link></li>
            <li><Link to="/insights" className="hover:text-[#FF2DAA] transition-colors">AI Insights</Link></li>
            <li><Link to="/analytics" className="hover:text-[#FF2DAA] transition-colors">Analytics</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-[#6C63FF] mb-4">Resources</h5>
          <ul className="space-y-3 text-xs font-bold text-[#0F172A]">
            <li><a href="#workflow" className="hover:text-[#FF2DAA] transition-colors">AI Architecture</a></li>
            <li><a href="#pricing" className="hover:text-[#FF2DAA] transition-colors">Pricing & Plans</a></li>
            <li><Link to="/reports" className="hover:text-[#FF2DAA] transition-colors">Decision Reports</Link></li>
            <li><Link to="/decisions/history" className="hover:text-[#FF2DAA] transition-colors">Decision History</Link></li>
            <li><a href="#" className="hover:text-[#FF2DAA] transition-colors">Documentation & API</a></li>
          </ul>
        </div>

        {/* Compliance */}
        <div>
          <h5 className="text-xs font-black uppercase tracking-widest text-[#6C63FF] mb-4">Security</h5>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-black text-[#0F172A]">
                <Shield className="w-4 h-4 text-[#10B981]" /> SOC2 Type II Certified
              </div>
              <p className="text-[#64748B] font-semibold">Encrypted neural node storage and token security.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-[#64748B]">
        <p>© 2026 DecisionSphere AI, Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#0F172A]">Privacy Policy</a>
          <a href="#" className="hover:text-[#0F172A]">Terms of Service</a>
          <a href="#" className="hover:text-[#0F172A]">Security Audit</a>
        </div>
      </div>
    </footer>
  );
};
