import React, { useState } from 'react';
import { useTrips } from '../../hooks/useTrips';
import { DecisionCard } from '../../components/decision/DecisionCard';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { Search, History, ChevronLeft, ChevronRight } from 'lucide-react';

export const DecisionHistoryPage = () => {
  const { data: decisions, loading, error, refetch } = useTrips();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Market Growth', 'IT Infrastructure', 'Finance', 'Operations'];

  // Filter decisions / trips
  const filtered = decisions.filter((d) => {
    const titleText = d.destination || d.title || d.name || '';
    const idText = String(d.id || d._id || '');
    const matchesSearch = titleText.toLowerCase().includes(search.toLowerCase()) || idText.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || d.category === filterCategory || d.route === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-700 uppercase tracking-widest">DECISION & TRIP ARCHIVE</span>
            <Badge variant="primary" size="sm" icon={History}>{decisions.length} Total Recorded</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Decision & Trip Recommendation History
          </h1>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl glass-card border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="w-full md:w-72">
          <Input
            icon={Search}
            placeholder="Search destination, ID or title..."
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

      {/* Loading Skeleton State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Skeleton className="h-60 rounded-2xl" />
          <Skeleton className="h-60 rounded-2xl" />
          <Skeleton className="h-60 rounded-2xl" />
        </div>
      )}

      {/* Error State with Retry Button */}
      {error && !loading && (
        <ErrorState message={error} onRetry={refetch} />
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState title="No recommendations or trips found" description="There are no trip recommendations recorded in your history yet." />
      )}

      {/* Grid of Decision / Trip Cards */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dec, idx) => (
            <DecisionCard key={dec.id || dec._id || idx} decision={{
              id: dec.id || dec._id || `DEC-${idx + 1}`,
              title: dec.destination || dec.title || dec.name || 'AI Recommendation',
              category: dec.category || dec.route || 'Strategy',
              impact: dec.risk_level || dec.impact || 'High',
              confidence: dec.confidence || dec.ai_confidence || 95,
              risk: dec.risk_level || dec.risk || 'Low',
              status: dec.status || 'Approved',
              date: dec.created_at || dec.date || 'Recent',
              roi: dec.estimated_cost || dec.roi || '+28%'
            }} />
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && !error && (
        <div className="flex items-center justify-between pt-4 border-t border-purple-500/20 text-xs font-extrabold text-slate-700">
          <span>Showing 1-{filtered.length} of {decisions.length} results</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={ChevronLeft} disabled>Prev</Button>
            <Button variant="secondary" size="sm" icon={ChevronRight} disabled>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
};
