import React, { useState } from 'react';
import { useTrips } from '../../hooks/useTrips';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { DecisionCard } from '../../components/decision/DecisionCard';
import {
  Search,
  History,
  Trash2,
  Calendar,
  Clock,
  Car,
  Navigation,
  MapPin,
  Route,
  Zap,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DecisionHistoryPage = () => {
  const { data: trips, loading, error, refetch, removeTrip } = useTrips();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await removeTrip(id);
      toast.success('Trip removed from history.');
    } catch (err) {
      toast.error('Failed to delete trip.');
    }
  };

  const filteredTrips = (trips || []).filter((t) => {
    const title = (t.destination || t.title || t.name || '').toLowerCase();
    const source = (t.source || '').toLowerCase();
    const mode = (t.transportMode || t.route || '').toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || source.includes(searchTerm.toLowerCase());
    const matchesMode = selectedMode === 'all' || mode.includes(selectedMode.toLowerCase());
    return matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black font-mono text-blue-600 uppercase tracking-widest font-bold">SMARTROUTE TELEMETRY</span>
            <Badge variant="primary" size="sm" icon={History}>Trip History</Badge>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Trip History & Saved Routes
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-1">
            Historical trip logs, travel times, and AI traffic recommendations from backend database
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-64">
            <Input
              placeholder="Search source or destination..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-blue-500/25 shadow-sm">
            {['all', 'Car', 'Flight', 'Bus', 'Train'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedMode === mode
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                    : 'text-slate-700 hover:text-blue-700'
                }`}
              >
                {mode === 'all' ? 'All Modes' : mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <ErrorState message={error} onRetry={refetch} />
      )}

      {/* Empty State */}
      {!loading && !error && filteredTrips.length === 0 && (
        <EmptyState
          title="No trips found in history"
          description="Submit a new route recommendation to populate your trip logs."
        />
      )}

      {/* Trips Grid displaying Source, Destination, Transport Mode, Travel Time, Traffic Level, Date */}
      {!loading && !error && filteredTrips.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTrips.map((dec, idx) => {
            const id = dec.id || dec._id || `TRIP-${idx + 1}`;
            const source = dec.source || 'Origin Node';
            const destination = dec.destination || dec.title || 'Destination Node';
            const transportMode = dec.transportMode || dec.route || 'Car';
            const travelTime = dec.estimatedTime || dec.travel_time || dec.travelTime || '24 mins';
            const trafficLevel = dec.trafficLevel || dec.traffic_level || dec.risk_level || 'Smooth';
            const dateStr = dec.created_at ? new Date(dec.created_at).toLocaleDateString() : dec.date || 'Today';

            return (
              <Card
                key={id}
                className="group glass-card border-blue-500/25 p-5 hover:border-blue-400 space-y-4 shadow-sm"
                glow
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-black text-blue-700">{id}</span>
                    <Badge variant="primary" size="sm" icon={Car}>{transportMode}</Badge>
                  </div>
                  <button
                    onClick={(e) => handleDelete(id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{source}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base font-black text-slate-900">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{destination}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-blue-50/70 border border-blue-500/20 text-xs font-bold">
                  <div>
                    <span className="text-[10px] text-blue-700 font-black uppercase block">Travel Time</span>
                    <span className="font-black text-slate-900 text-sm">{travelTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-700 font-black uppercase block">Traffic Level</span>
                    <Badge
                      variant={
                        String(trafficLevel).includes('Smooth') || String(trafficLevel).includes('Low')
                          ? 'success'
                          : String(trafficLevel).includes('Moderate')
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {trafficLevel}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 font-bold pt-1 border-t border-blue-500/20">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{dateStr}</span>
                  </div>
                  <span className="text-[11px] font-black text-blue-700 uppercase">AI Verified</span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
