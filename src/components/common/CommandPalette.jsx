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
  ArrowRight
} from 'lucide-react';

export const CommandPalette = () => {
  const { isOpen, closeCommandPalette } = useCommand();
  const { toggleAiDrawer } = useDecision();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'c1', title: 'Create New AI Decision', category: 'Actions', path: '/decisions/new', icon: PlusCircle },
    { id: 'c2', title: 'Launch Decision Battle (Compare Options)', category: 'Actions', path: '/decisions/battle', icon: Swords },
    { id: 'c3', title: 'Run "What If" Scenario Simulator', category: 'Actions', path: '/simulator', icon: Sliders },
    { id: 'c4', title: 'Ask AI Decision Assistant', category: 'AI Tools', action: () => { toggleAiDrawer(true); }, icon: Bot },
    { id: 'c5', title: 'View Strategic AI Insights', category: 'Analytics', path: '/insights', icon: Sparkles },
    { id: 'c6', title: 'Explore Decision History', category: 'Navigation', path: '/decisions/history', icon: History },
    { id: 'c7', title: 'Executive Summary Reports', category: 'Navigation', path: '/reports', icon: FileText },
    { id: 'c8', title: 'Platform Performance Analytics', category: 'Navigation', path: '/analytics', icon: LineChart },
    { id: 'c9', title: 'System & Security Settings', category: 'Navigation', path: '/settings', icon: Settings },
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
      <div className="-m-6 p-4 bg-white border-b border-purple-500/25 flex items-center gap-3">
        <Search className="w-5 h-5 text-purple-600 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search platform features..."
          className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-bold focus:outline-none"
          autoFocus
        />
        <kbd className="px-2 py-0.5 text-[10px] font-mono text-purple-700 bg-purple-500/15 rounded border border-purple-500/30 font-black">
          ESC
        </kbd>
      </div>

      <div className="mt-4 max-h-80 overflow-y-auto space-y-1 pr-1">
        {filteredCommands.length === 0 ? (
          <div className="py-8 text-center text-xs font-bold text-slate-600">
            No commands match "{query}"
          </div>
        ) : (
          filteredCommands.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-purple-500/15 hover:border-purple-500/30 border border-transparent transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 border border-purple-500/20 text-purple-700 group-hover:bg-purple-600 group-hover:text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">{cmd.title}</p>
                    <span className="text-[10px] font-extrabold text-slate-600">{cmd.category}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 transition-colors" />
              </button>
            );
          })
        )}
      </div>

      <div className="-mx-6 -mb-6 mt-4 p-3 bg-purple-50/60 border-t border-purple-500/20 flex items-center justify-between text-[11px] text-slate-700 font-bold">
        <span>Navigation Tip: Use <kbd className="px-1 text-slate-800 bg-white rounded border font-mono">↑</kbd> <kbd className="px-1 text-slate-800 bg-white rounded border font-mono">↓</kbd> to navigate</span>
        <span className="text-purple-700 font-black flex items-center gap-1">
          <Zap className="w-3 h-3 text-purple-600" /> DecisionSphere Command Engine
        </span>
      </div>
    </Modal>
  );
};
