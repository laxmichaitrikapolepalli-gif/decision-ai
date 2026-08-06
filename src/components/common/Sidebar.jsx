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
  Swords
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Sidebar = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-[#6C63FF]' },
    { name: 'Decision Engine', path: '/decisions/new', icon: PlusCircle, highlight: true, color: 'text-[#FF2DAA]' },
    { name: 'AI Insights', path: '/insights', icon: Sparkles, badge: 'AI', color: 'text-[#F59E0B]' },
    { name: 'Scenario Simulator', path: '/simulator', icon: Sliders, color: 'text-[#4F7DFF]' },
    { name: 'Decision History', path: '/decisions/history', icon: History, color: 'text-[#8B5CF6]' },
    { name: 'Reports', path: '/reports', icon: FileText, color: 'text-[#10B981]' },
    { name: 'Analytics', path: '/analytics', icon: LineChart, color: 'text-[#EC4899]' },
    { name: 'Settings', path: '/settings', icon: Settings, color: 'text-[#64748B]' },
  ];

  return (
    <aside
      className={`h-[calc(100vh-85px)] sticky top-[80px] glass-panel border-r border-[#6C63FF]/15 transition-all duration-300 z-30 flex flex-col justify-between ml-4 rounded-3xl bg-white/95 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-[#6C63FF]">
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
                `flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF2DAA]/15 to-[#6C63FF]/15 text-[#6C63FF] border border-[#6C63FF]/30 shadow-md shadow-[#6C63FF]/08 scale-[1.02]'
                    : 'text-[#0F172A] hover:text-[#6C63FF] hover:bg-slate-100/80 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3.5">
                <Icon
                  className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-[#6C63FF]' : item.color
                  } ${item.highlight ? 'animate-bounce' : ''}`}
                />
                {!collapsed && <span>{item.name}</span>}
              </div>

              {!collapsed && item.badge && (
                <Badge
                  variant="accent"
                  size="sm"
                  className="text-[9px] px-2 py-0.5 font-black bg-[#FF2DAA]/15 text-[#FF2DAA] border border-[#FF2DAA]/30"
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
        <div className="p-4 m-3 rounded-3xl bg-gradient-to-br from-[#FF2DAA]/10 via-[#6C63FF]/10 to-[#4F7DFF]/10 border border-[#6C63FF]/20 relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-[#FF2DAA] animate-pulse" />
            <span className="text-xs font-black text-[#0F172A]">DecisionSphere v4.2</span>
          </div>
          <p className="text-[11px] text-[#64748B] font-semibold leading-snug mb-3">
            AI-powered decision intelligence & predictive scenario simulations
          </p>
          <div className="flex items-center justify-between text-[10px] font-black text-[#6C63FF] uppercase tracking-wider">
            <span>Decision Intelligence Node</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#6C63FF]" />
          </div>
        </div>
      )}
    </aside>
  );
};
