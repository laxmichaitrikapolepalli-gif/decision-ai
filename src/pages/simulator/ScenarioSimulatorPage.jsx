import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Sliders, RefreshCw, DollarSign, Clock, Users, ShieldAlert, Car, CloudRain, Construction } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// TODO: Backend endpoint POST /api/simulator is missing. Preserving UI with client-side simulator calculation.
export const ScenarioSimulatorPage = () => {
  const [sliders, setSliders] = useState({
    departureShift: 15,
    weatherIndex: 20,
    constructionDelay: 10,
    fleetSize: 8,
  });

  const [simResults, setSimResults] = useState({
    projectedTimeSaved: '18 mins',
    confidenceScore: '96%',
    trafficLevel: 'Smooth Green Wave',
    chartData: [
      { window: '07:30 AM', standardTime: 45, aiOptimized: 32, peakSurge: 55 },
      { window: '08:15 AM', standardTime: 52, aiOptimized: 36, peakSurge: 68 },
      { window: '09:00 AM', standardTime: 48, aiOptimized: 30, peakSurge: 62 },
      { window: '09:45 AM', standardTime: 38, aiOptimized: 24, peakSurge: 48 },
      { window: '10:30 AM', standardTime: 30, aiOptimized: 20, peakSurge: 38 },
    ]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateSim = () => {
      setLoading(true);
      const { departureShift, weatherIndex, constructionDelay, fleetSize } = sliders;
      const timeSaved = Math.round(10 + (departureShift * 0.4) - (weatherIndex * 0.1) - (constructionDelay * 0.1));
      const confidence = Math.round(92 + (fleetSize * 0.5) - (weatherIndex * 0.15));

      setSimResults({
        projectedTimeSaved: `${Math.max(5, timeSaved)} mins`,
        confidenceScore: `${Math.min(99, Math.max(65, confidence))}%`,
        trafficLevel: weatherIndex > 50 ? 'Heavy Rain Surging' : constructionDelay > 30 ? 'Construction Bottleneck' : 'Smooth Green Wave',
        chartData: [
          { window: '07:30 AM', standardTime: 45 + weatherIndex * 0.2, aiOptimized: 32 + departureShift * 0.1, peakSurge: 55 + constructionDelay * 0.3 },
          { window: '08:15 AM', standardTime: 52 + weatherIndex * 0.2, aiOptimized: 36 + departureShift * 0.1, peakSurge: 68 + constructionDelay * 0.3 },
          { window: '09:00 AM', standardTime: 48 + weatherIndex * 0.2, aiOptimized: 30 + departureShift * 0.1, peakSurge: 62 + constructionDelay * 0.3 },
          { window: '09:45 AM', standardTime: 38 + weatherIndex * 0.2, aiOptimized: 24 + departureShift * 0.1, peakSurge: 48 + constructionDelay * 0.3 },
          { window: '10:30 AM', standardTime: 30 + weatherIndex * 0.2, aiOptimized: 20 + departureShift * 0.1, peakSurge: 38 + constructionDelay * 0.3 },
        ]
      });
      setLoading(false);
    };

    const timer = setTimeout(updateSim, 150);
    return () => clearTimeout(timer);
  }, [sliders]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-widest">TRAFFIC SIMULATOR</span>
            <Badge variant="accent" size="sm" icon={Sliders}>Live "What If" Mobility Sliders</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] mt-1 text-gradient-master">
            Traffic Scenario Simulator
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-1">
            Simulate departure time shifts, weather impacts, and construction bottlenecks in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <RefreshCw className={`w-4 h-4 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
          <span>Real-time recalculation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Control Panel */}
        <Card glow className="lg:col-span-1 p-6 space-y-6 border-blue-500/30 glass-card">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4.5 h-4.5 text-blue-600" /> Variable Mobility Sliders
          </h3>

          {/* Departure Shift Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> Departure Shift (+mins)
              </span>
              <span className="text-blue-700 font-mono">+{sliders.departureShift} mins</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={sliders.departureShift}
              onChange={(e) => setSliders({ ...sliders, departureShift: Number(e.target.value) })}
              className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Weather Index Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-cyan-600" /> Weather / Rain Index
              </span>
              <span className="text-cyan-700 font-mono">{sliders.weatherIndex}% Storm</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={sliders.weatherIndex}
              onChange={(e) => setSliders({ ...sliders, weatherIndex: Number(e.target.value) })}
              className="w-full accent-cyan-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Construction Delay Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Construction className="w-3.5 h-3.5 text-amber-600" /> Road Construction Delay
              </span>
              <span className="text-amber-700 font-mono">{sliders.constructionDelay}% Obstacle</span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              step={5}
              value={sliders.constructionDelay}
              onChange={(e) => setSliders({ ...sliders, constructionDelay: Number(e.target.value) })}
              className="w-full accent-amber-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Fleet Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-emerald-600" /> Monitored Fleet Size
              </span>
              <span className="text-emerald-700 font-mono">{sliders.fleetSize} Vehicles</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={sliders.fleetSize}
              onChange={(e) => setSliders({ ...sliders, fleetSize: Number(e.target.value) })}
              className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </Card>

        {/* Live Recharts Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 border-blue-500/25 glass-card text-center">
              <span className="text-[10px] text-slate-600 uppercase font-black">Projected Time Saved</span>
              <p className="text-3xl font-black text-emerald-700 font-['Space_Grotesk'] mt-1">{simResults.projectedTimeSaved}</p>
            </Card>

            <Card className="p-4 border-blue-500/25 glass-card text-center">
              <span className="text-[10px] text-slate-600 uppercase font-black">Model Precision</span>
              <p className="text-3xl font-black text-blue-700 font-['Space_Grotesk'] mt-1">{simResults.confidenceScore}</p>
            </Card>

            <Card className="p-4 border-blue-500/25 glass-card text-center">
              <span className="text-[10px] text-slate-600 uppercase font-black">Corridor Traffic Status</span>
              <p className="text-sm font-black text-slate-900 mt-2">{simResults.trafficLevel}</p>
            </Card>
          </div>

          {/* Dynamic Area Chart */}
          <Card className="p-6 border-blue-500/30 glass-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Commute Time Simulation Trajectory</h3>
                <p className="text-xs text-slate-700 font-bold">Standard Route vs AI Optimized vs Surge Scenario</p>
              </div>
              <Badge variant="primary" size="sm">Live Graph</Badge>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simResults.chartData}>
                  <defs>
                    <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.8} />
                  <XAxis dataKey="window" stroke="#334155" fontSize={11} fontWeight={700} />
                  <YAxis stroke="#334155" fontSize={11} fontWeight={700} />
                  <Tooltip />
                  <Area type="monotone" dataKey="standardTime" stroke="#f59e0b" strokeWidth={2.5} fill="transparent" name="Standard Route (mins)" />
                  <Area type="monotone" dataKey="aiOptimized" stroke="#2563EB" strokeWidth={2.5} fill="url(#colorOpt)" name="AI Optimized (mins)" />
                  <Area type="monotone" dataKey="peakSurge" stroke="#ef4444" strokeWidth={2.5} fill="transparent" name="Peak Surge Delay (mins)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
