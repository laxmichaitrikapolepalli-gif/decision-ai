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

export const Sidebar = ({ collapsed = false }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-[#6C63FF]' },
    { name: 'New Decision', path: '/decisions/new', icon: PlusCircle, color: 'text-[#FF2DAA]' },
    { name: 'Decision Battle', path: '/decisions/battle', icon: Swords, badge: 'HOT', badgeVariant: 'danger', color: 'text-[#4F7DFF]' },
    { name: 'Scenario Simulator', path: '/simulator', icon: Sliders, color: 'text-[#10B981]' },
    { name: 'AI Insights', path: '/insights', icon: Sparkles, badge: 'AI', badgeVariant: 'primary', color: 'text-[#F59E0B]' },
    { name: 'Decision History', path: '/decisions/history', icon: History, color: 'text-[#8B5CF6]' },
    { name: 'Reports', path: '/reports', icon: FileText, color: 'text-[#10B981]' },
    { name: 'Analytics', path: '/analytics', icon: LineChart, color: 'text-[#EC4899]' },
    { name: 'Settings', path: '/settings', icon: Settings, color: 'text-[#64748B]' },
  ];

  return (
    <aside
      className={`h-[calc(100vh-85px)] sticky top-[80px] glass-panel border border-slate-200/80 transition-all duration-300 z-30 flex flex-col justify-between ml-4 rounded-3xl bg-white/95 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#FF2DAA]">
          {!collapsed && 'DECISION ENGINE'}
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF2DAA]/15 via-[#8B5CF6]/15 to-[#4F7DFF]/15 text-[#6C63FF] border border-[#6C63FF]/30 shadow-md shadow-[#6C63FF]/08'
                    : 'text-[#0F172A] hover:text-[#6C63FF] hover:bg-slate-50 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-[#6C63FF]' : item.color
                  }`}
                />
                {!collapsed && <span>{item.name}</span>}
              </div>

              {!collapsed && item.badge && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                  item.badge === 'HOT'
                    ? 'bg-pink-100 text-pink-600 border border-pink-200'
                    : 'bg-blue-100 text-blue-600 border border-blue-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Quantum Engine Bottom Card exact matching screenshot 1 */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-[#FF2DAA]/10 via-[#6C63FF]/10 to-[#4F7DFF]/10 border border-[#6C63FF]/20 relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3.5 h-3.5 text-[#FF2DAA]" />
            <span className="text-xs font-black text-[#0F172A]">Quantum Engine v4.2</span>
          </div>
          <p className="text-[10px] text-[#64748B] font-medium leading-snug mb-2">
            Monte Carlo simulation capacity: 10,000 iterations/sec
          </p>
          <div className="flex items-center justify-between text-[9px] font-black text-[#6C63FF] uppercase tracking-wider">
            <span>ENTERPRISE NODE</span>
            <ChevronRight className="w-3 h-3 text-[#6C63FF]" />
          </div>
        </div>
      )}
    </aside>
  );
};
