import React, { useState } from 'react';
import { useDecision } from '../../contexts/DecisionContext';
import { DecisionCard } from '../../components/decision/DecisionCard';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter, History, ChevronLeft, ChevronRight } from 'lucide-react';

export const DecisionHistoryPage = () => {
  const { decisions } = useDecision();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Market Growth', 'IT Infrastructure', 'Finance', 'Operations'];

  const filtered = decisions.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-700 uppercase tracking-widest">DECISION ARCHIVE</span>
            <Badge variant="primary" size="sm" icon={History}>{decisions.length} Total Recorded</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Decision History Timeline
          </h1>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl glass-card border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="w-full md:w-72">
          <Input
            icon={Search}
            placeholder="Search decision ID or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-700 hover:text-purple-700 bg-white border border-purple-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'newest', label: 'Sort: Newest First' },
              { value: 'highestConfidence', label: 'Sort: Highest Confidence' },
              { value: 'highestRoi', label: 'Sort: Highest ROI' },
            ]}
          />
        </div>
      </div>

      {/* Grid of Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((dec) => (
          <DecisionCard key={dec.id} decision={dec} />
        ))}
      </div>

      {/* Pagination Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-purple-500/20 text-xs font-extrabold text-slate-700">
        <span>Showing 1-{filtered.length} of {decisions.length} results</span>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={ChevronLeft} disabled>Prev</Button>
          <Button variant="secondary" size="sm" icon={ChevronRight} disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};
