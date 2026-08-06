import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Sparkles,
  Sliders,
  History,
  FileText,
  LineChart,
  Settings,
  Zap,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Sidebar = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-purple-400' },
    { name: 'Decision Engine', path: '/decisions/new', icon: PlusCircle, highlight: true, color: 'text-pink-400' },
    { name: 'AI Insights', path: '/insights', icon: Sparkles, badge: 'AI', color: 'text-amber-400' },
    { name: 'Scenario Simulator', path: '/simulator', icon: Sliders, color: 'text-teal-400' },
    { name: 'Decision History', path: '/decisions/history', icon: History, color: 'text-indigo-400' },
    { name: 'Reports', path: '/reports', icon: FileText, color: 'text-cyan-400' },
    { name: 'Analytics', path: '/analytics', icon: LineChart, color: 'text-rose-400' },
    { name: 'Settings', path: '/settings', icon: Settings, color: 'text-purple-400' },
  ];

  return (
    <aside
      className={`h-[calc(100vh-85px)] sticky top-[80px] glass-panel border-r border-purple-500/20 transition-all duration-300 z-30 flex flex-col justify-between ml-4 rounded-3xl bg-slate-950/80 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-purple-400">
          {!collapsed && 'Decision Engine'}
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/15 text-purple-300 border border-purple-400/50 shadow-lg shadow-purple-500/10 scale-[1.02]'
                    : 'text-slate-300 hover:text-purple-400 hover:bg-slate-900 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3.5">
                <Icon
                  className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-purple-400' : item.color
                  } ${item.highlight ? 'animate-bounce' : ''}`}
                />
                {!collapsed && <span>{item.name}</span>}
              </div>

              {!collapsed && item.badge && (
                <Badge
                  variant="accent"
                  size="sm"
                  className="text-[9px] px-2 py-0.5 font-black"
                >
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Decision Engine Info Box */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-3xl bg-gradient-to-br from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-purple-400/30 relative overflow-hidden shadow-lg shadow-purple-500/10">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-xs font-black text-white">DecisionSphere v4.2</span>
          </div>
          <p className="text-[11px] text-slate-300 font-medium leading-snug mb-3">
            AI-powered decision intelligence & predictive scenario simulations
          </p>
          <div className="flex items-center justify-between text-[10px] font-black text-purple-400 uppercase tracking-wider">
            <span>Decision Intelligence Node</span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
          </div>
        </div>
      )}
    </aside>
  );
};
