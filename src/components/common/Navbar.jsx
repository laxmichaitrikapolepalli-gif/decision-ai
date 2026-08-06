import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  X
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = ({ isDashboard = false }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { openCommandPalette } = useCommand();
  const { toggleAiDrawer } = useDecision();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicNavLinks = [
    { label: 'Platform', href: '#hero' },
    { label: 'Decision Engine', href: '#workflow' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="sticky top-4 z-40 w-[95%] max-w-7xl mx-auto glass-panel rounded-3xl border border-purple-500/30 px-5 lg:px-8 py-3.5 transition-all duration-300 shadow-xl shadow-purple-500/10">
      <div className="flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3.5 group shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/60 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight font-['Space_Grotesk'] text-white">
                DecisionSphere
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black shadow-sm">
                AI
              </span>
            </div>
            <p className="text-[10px] text-purple-400 font-extrabold hidden sm:block tracking-wider uppercase">Decision Intelligence Platform</p>
          </div>
        </Link>

        {/* Search / Command Trigger for Dashboard */}
        {isDashboard && (
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-8">
            <button
              onClick={openCommandPalette}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-purple-500/30 text-slate-300 text-xs hover:border-purple-500 hover:bg-slate-900 transition-all shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-slate-400 font-medium">Search decisions, scenario simulations, or insights...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono text-purple-300 bg-purple-500/15 rounded-lg border border-purple-500/30 font-black">
                <Command className="w-3 h-3" /> K
              </kbd>
            </button>
          </div>
        )}

        {/* Navigation Links for Public Landing Page */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-8 text-[15px] font-extrabold text-slate-200">
            {publicNavLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="relative py-1.5 transition-colors hover:text-purple-400 group flex items-center"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Floating AI Decision Assistant Quick Trigger */}
              <button
                onClick={toggleAiDrawer}
                className="relative p-2.5 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-600 hover:scale-105 transition-all duration-300 shadow-md shadow-purple-500/15 flex items-center justify-center cursor-pointer"
                title="AI Decision Assistant"
              >
                <Bot className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border-2 border-slate-950" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-purple-500/30 hover:border-purple-400 transition-colors shadow-sm cursor-pointer"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"}
                    alt={user?.name}
                    className="w-8 h-8 rounded-xl object-cover border-2 border-purple-400"
                  />
                  <span className="text-xs font-black text-white hidden lg:inline-block">{user?.name?.split(' ')[0] || 'User'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:inline-block" />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-3 w-60 glass-dropdown rounded-3xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 bg-slate-900 border border-purple-500/30"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <div className="px-3.5 py-2.5 border-b border-purple-500/15 mb-1.5">
                      <p className="text-xs font-black text-white">{user?.name || 'Executive User'}</p>
                      <p className="text-[11px] text-purple-400 font-bold truncate">{user?.role || 'Decision Architect'}</p>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-purple-500/15 hover:text-purple-300 rounded-xl transition-colors"
                    >
                      <Settings className="w-4 h-4 text-purple-400" />
                      Settings & Preferences
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/15 rounded-xl transition-colors mt-1 cursor-pointer"
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
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="primary" size="sm" icon={Sparkles}>Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-slate-900 border border-purple-500/30 text-white flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && !isDashboard && (
        <div className="md:hidden mt-3 pt-3 border-t border-purple-500/20 flex flex-col gap-3 text-[15px] text-slate-100 font-extrabold">
          {publicNavLinks.map((link, idx) => (
            <a key={idx} href={link.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1">
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full">Sign In</Button>
            </Link>
            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
