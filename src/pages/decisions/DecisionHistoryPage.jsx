import React, { useEffect, useState } from 'react';
import { useDecision } from '../../contexts/DecisionContext';
import { DecisionCard } from '../../components/decision/DecisionCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import {
  History,
  Search,
  Filter,
  Trash2,
  Sparkles,
  PlusCircle,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const DecisionHistoryPage = () => {
  const { decisions, loading, fetchTrips, deleteTrip } = useDecision();
  const [query, setQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDelete = async (id) => {
    const success = await deleteTrip(id);
    if (success) {
      toast.success('Decision record deleted from history');
    }
  };

  const filteredDecisions = decisions.filter((dec) => {
    const title = dec.title || dec.bestRoute || dec.recommendation || '';
    const matchQuery = title.toLowerCase().includes(query.toLowerCase());
    const matchRisk = filterRisk === 'all' || (dec.risk || dec.trafficLevel || '').toLowerCase().includes(filterRisk.toLowerCase());
    return matchQuery && matchRisk;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-purple-400 uppercase tracking-widest">DECISION ARCHIVE</span>
            <Badge variant="primary" size="sm" icon={History}>Supabase DB Sync</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Decision History
          </h1>
          <p className="text-xs font-semibold text-slate-300 mt-1">
            Explore past strategic evaluations, AI recommendations, risk bounds, and outcome scores
          </p>
        </div>

        <Link to="/decisions/new">
          <Button variant="primary" size="md" icon={PlusCircle} className="shadow-lg shadow-purple-500/20">
            Create Decision
          </Button>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <Card glow className="p-4 border-purple-500/30 glass-card bg-slate-900/80">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <Input
              icon={Search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search decision history by title or recommendation..."
              className="bg-slate-950 border-purple-500/25"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-purple-400 shrink-0" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="rounded-2xl bg-slate-950 border border-purple-500/25 text-white px-4 py-3 text-xs font-black transition-all focus:border-purple-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium / Moderate Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Decision Cards List */}
      {loading ? (
        <div className="py-16 text-center text-xs font-bold text-slate-400">
          Loading decision history from database...
        </div>
      ) : filteredDecisions.length === 0 ? (
        <Card className="p-12 text-center border-purple-500/20 glass-card space-y-4 rounded-3xl bg-slate-900/80">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white">No Decisions Found</h3>
          <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
            {query ? `No decision records match "${query}"` : 'Your decision history is currently empty. Run the AI Decision Engine to generate your first recommendation.'}
          </p>
          <Link to="/decisions/new">
            <Button variant="primary" size="md" icon={PlusCircle} className="mt-2">
              Create New Decision
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecisions.map((dec, idx) => (
            <div key={dec.id || dec._id || idx} className="relative group">
              <DecisionCard decision={dec} />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(dec.id || dec._id);
                }}
                className="absolute top-4 right-4 p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all cursor-pointer z-10"
                title="Delete Decision Record"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
