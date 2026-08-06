import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommand } from '../../contexts/CommandContext';
import { useDecision } from '../../contexts/DecisionContext';
import { Modal } from '../ui/Modal';
import {
  Search,
  PlusCircle,
  Swords,
  Sliders,
  Sparkles,
  History,
  FileText,
  LineChart,
  Settings,
  Bot,
  Zap,
  ArrowRight,
  Route
} from 'lucide-react';

export const CommandPalette = () => {
  const { isOpen, closeCommandPalette } = useCommand();
  const { toggleAiDrawer } = useDecision();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'c1', title: 'Run AI Route Optimizer', category: 'Actions', path: '/decisions/new', icon: PlusCircle },
    { id: 'c2', title: 'Launch Route Comparison (Side-by-Side)', category: 'Actions', path: '/decisions/battle', icon: Swords },
    { id: 'c3', title: 'Run Traffic Scenario Simulator', category: 'Actions', path: '/simulator', icon: Sliders },
    { id: 'c4', title: 'Ask Smart Mobility Assistant', category: 'AI Tools', action: () => { toggleAiDrawer(true); }, icon: Bot },
    { id: 'c5', title: 'View Mobility Insights & Traffic Signals', category: 'Analytics', path: '/insights', icon: Sparkles },
    { id: 'c6', title: 'Explore Trip History', category: 'Navigation', path: '/decisions/history', icon: History },
    { id: 'c7', title: 'Fleet History Reports', category: 'Navigation', path: '/reports', icon: FileText },
    { id: 'c8', title: 'Fleet Analytics', category: 'Navigation', path: '/analytics', icon: LineChart },
    { id: 'c9', title: 'User Preferences', category: 'Navigation', path: '/settings', icon: Settings },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    closeCommandPalette();
    setQuery('');
    if (cmd.action) {
      cmd.action();
    } else if (cmd.path) {
      navigate(cmd.path);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeCommandPalette} maxWidth="max-w-xl">
      <div className="-m-6 p-4 bg-white border-b border-blue-500/25 flex items-center gap-3">
        <Search className="w-5 h-5 text-blue-600 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search mobility features..."
          className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-bold focus:outline-none"
          autoFocus
        />
        <kbd className="px-2 py-0.5 text-[10px] font-mono text-blue-700 bg-blue-500/15 rounded border border-blue-500/30 font-black">
          ESC
        </kbd>
      </div>

      <div className="mt-4 max-h-80 overflow-y-auto space-y-1 pr-1">
        {filteredCommands.length === 0 ? (
          <div className="py-8 text-center text-xs font-bold text-slate-600">
            No mobility commands match "{query}"
          </div>
        ) : (
          filteredCommands.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-blue-500/15 hover:border-blue-500/30 border border-transparent transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-500/20 text-blue-700 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">{cmd.title}</p>
                    <span className="text-[10px] font-extrabold text-slate-600">{cmd.category}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors" />
              </button>
            );
          })
        )}
      </div>

      <div className="-mx-6 -mb-6 mt-4 p-3 bg-blue-50/60 border-t border-blue-500/20 flex items-center justify-between text-[11px] text-slate-700 font-bold">
        <span>Navigation Tip: Use <kbd className="px-1 text-slate-800 bg-white rounded border font-mono">↑</kbd> <kbd className="px-1 text-slate-800 bg-white rounded border font-mono">↓</kbd> to navigate</span>
        <span className="text-blue-700 font-black flex items-center gap-1">
          <Route className="w-3 h-3 text-blue-600" /> SmartRoute Command Engine
        </span>
      </div>
    </Modal>
  );
};
