import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCommand } from '../../contexts/CommandContext';
import { useDecision } from '../../contexts/DecisionContext';
import {
  Sparkles,
  Command,
  Search,
  User,
  LogOut,
  Settings,
  Bot,
  ChevronDown,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const Navbar = ({ isDashboard = false }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { openCommandPalette } = useCommand();
  const { toggleAiDrawer } = useDecision();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const publicNavLinks = [
    { label: 'Platform', href: '#hero' },
    { label: 'Decision Engine', href: '#workflow' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="sticky top-4 z-40 w-[95%] max-w-7xl mx-auto glass-panel rounded-3xl border border-[#6C63FF]/15 px-5 lg:px-8 py-3.5 transition-all duration-300 shadow-xl shadow-[#6C63FF]/05 bg-white/90">
      <div className="flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3.5 group shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] p-0.5 shadow-lg shadow-[#FF2DAA]/25 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#6C63FF] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight font-['Space_Grotesk'] text-[#0F172A]">
                DecisionSphere
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-black shadow-sm">
                AI
              </span>
            </div>
            <p className="text-[10px] text-[#6C63FF] font-extrabold hidden sm:block tracking-wider uppercase">Decision Intelligence Platform</p>
          </div>
        </Link>

        {/* Search / Command Trigger for Dashboard */}
        {isDashboard && (
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-8">
            <button
              onClick={openCommandPalette}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white border border-[#6C63FF]/20 text-[#0F172A] text-xs hover:border-[#6C63FF] hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#6C63FF] shrink-0" />
                <span className="text-[#64748B] font-semibold">Search decisions, scenario simulations, or insights...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono text-[#6C63FF] bg-[#6C63FF]/10 rounded-lg border border-[#6C63FF]/20 font-black">
                <Command className="w-3 h-3" /> K
              </kbd>
            </button>
          </div>
        )}

        {/* Navigation Links for Public Landing Page */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-8 text-[15px] font-bold text-[#0F172A]">
            {publicNavLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="relative py-1.5 transition-colors hover:text-[#FF2DAA] group flex items-center"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] rounded-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Notification Trigger */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-[#0F172A] hover:bg-white hover:border-[#6C63FF]/30 transition-all cursor-pointer relative"
                  title="Notifications"
                >
                  <Bell className="w-4.5 h-4.5 text-[#64748B]" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF2DAA] rounded-full" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 glass-dropdown rounded-3xl p-4 z-50 animate-in fade-in slide-in-from-top-2 bg-white border border-[#6C63FF]/20 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h5 className="text-xs font-black uppercase text-[#0F172A] tracking-wider">Executive Signals</h5>
                      <span className="text-[10px] font-bold text-[#6C63FF] bg-[#6C63FF]/10 px-2 py-0.5 rounded-full">3 New</span>
                    </div>
                    <div className="space-y-2.5 pt-3">
                      <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-[#0F172A]">
                        <p className="font-bold text-[#FF2DAA]">P95 Risk Variance Update</p>
                        <p className="text-[11px] text-[#64748B] mt-0.5">Hyderabad Hitec City payback updated to 14.2 months.</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-[#0F172A]">
                        <p className="font-bold text-[#6C63FF]">Decision Simulation Ready</p>
                        <p className="text-[11px] text-[#64748B] mt-0.5">Q4 Sensitivity model calculation completed.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating AI Decision Assistant Quick Trigger */}
              <button
                onClick={toggleAiDrawer}
                className="relative p-2.5 rounded-2xl bg-gradient-to-r from-[#FF2DAA]/10 to-[#6C63FF]/10 border border-[#6C63FF]/30 text-[#6C63FF] hover:text-white hover:bg-gradient-to-r hover:from-[#FF2DAA] hover:to-[#6C63FF] hover:scale-105 transition-all duration-300 shadow-md shadow-[#6C63FF]/15 flex items-center justify-center cursor-pointer"
                title="AI Assistant"
              >
                <Bot className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF2DAA] rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF2DAA] rounded-full border-2 border-white" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-2xl bg-white border border-[#6C63FF]/20 hover:border-[#6C63FF] transition-colors shadow-sm cursor-pointer"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"}
                    alt={user?.name}
                    className="w-8 h-8 rounded-xl object-cover border-2 border-[#6C63FF]"
                  />
                  <span className="text-xs font-bold text-[#0F172A] hidden lg:inline-block">{user?.name?.split(' ')[0] || 'Executive'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hidden lg:inline-block" />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-3 w-60 glass-dropdown rounded-3xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 bg-white border border-[#6C63FF]/20"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <div className="px-3.5 py-2.5 border-b border-slate-100 mb-1.5">
                      <p className="text-xs font-black text-[#0F172A]">{user?.name || 'Dr. Sarah Vance'}</p>
                      <p className="text-[11px] text-[#6C63FF] font-bold truncate">{user?.role || 'Chief Decision Architect'}</p>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] rounded-xl transition-colors"
                    >
                      <Settings className="w-4 h-4 text-[#6C63FF]" />
                      Settings & Preferences
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-bold text-[#0F172A]">Sign In</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="primary" size="sm" icon={Sparkles} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none shadow-md shadow-[#6C63FF]/25 font-bold">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-white border border-slate-200 text-[#0F172A] flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && !isDashboard && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-3 text-[15px] text-[#0F172A] font-bold">
          {publicNavLinks.map((link, idx) => (
            <a key={idx} href={link.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF2DAA] transition-colors py-1">
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full text-[#0F172A]">Sign In</Button>
            </Link>
            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
