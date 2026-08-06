import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Swords,
  Sliders,
  Sparkles,
  History,
  FileText,
  LineChart,
  Settings,
  Zap,
  ChevronRight,
  Route
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Sidebar = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-blue-600' },
    { name: 'Route Optimizer', path: '/decisions/new', icon: PlusCircle, highlight: true, color: 'text-cyan-600' },
    { name: 'Route Comparison', path: '/decisions/battle', icon: Swords, badge: 'LIVE', color: 'text-emerald-600' },
    { name: 'Traffic Simulator', path: '/simulator', icon: Sliders, color: 'text-teal-600' },
    { name: 'Mobility Insights', path: '/insights', icon: Sparkles, badge: 'AI', color: 'text-amber-600' },
    { name: 'Trip History', path: '/decisions/history', icon: History, color: 'text-indigo-600' },
    { name: 'Fleet Reports', path: '/reports', icon: FileText, color: 'text-cyan-600' },
    { name: 'Fleet Analytics', path: '/analytics', icon: LineChart, color: 'text-rose-600' },
    { name: 'User Preferences', path: '/settings', icon: Settings, color: 'text-blue-600' },
  ];

  return (
    <aside
      className={`h-[calc(100vh-85px)] sticky top-[80px] glass-panel border-r border-blue-500/20 transition-all duration-300 z-30 flex flex-col justify-between ml-4 rounded-3xl ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-blue-600">
          {!collapsed && 'Smart Mobility Engine'}
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
                    ? 'bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-500/15 text-blue-800 border border-blue-400/50 shadow-lg shadow-blue-500/10 scale-[1.02]'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-white/70 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3.5">
                <Icon
                  className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-blue-600' : item.color
                  } ${item.highlight ? 'animate-bounce' : ''}`}
                />
                {!collapsed && <span>{item.name}</span>}
              </div>

              {!collapsed && item.badge && (
                <Badge
                  variant={item.badge === 'LIVE' ? 'secondary' : 'accent'}
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

      {/* Mobility Engine Info Box */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-3xl bg-gradient-to-br from-blue-500/15 via-cyan-500/15 to-emerald-500/15 border border-blue-400/40 relative overflow-hidden shadow-lg shadow-blue-500/10">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-xs font-black text-slate-900">SmartRoute AI v4.2</span>
          </div>
          <p className="text-[11px] text-slate-600 font-semibold leading-snug mb-3">
            Real-time traffic monitoring & AI route optimization engine
          </p>
          <div className="flex items-center justify-between text-[10px] font-black text-blue-700 uppercase tracking-wider">
            <span>Smart Mobility Node</span>
            <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
          </div>
        </div>
      )}
    </aside>
  );
};
