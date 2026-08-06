"use client";

import React, { useState } from 'react';
import { Factory, TrendingUp, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ProductionLinePerformancePage() {
  const [lines, setLines] = useState([
    {
      line: 'Line A (Roasting & Packaging)',
      avgYieldPct: 98.50,
      batchCount: 14,
      status: 'OPTIMAL_EFFICIENCY'
    },
    {
      line: 'Line B (Grinding & Valve Sealing)',
      avgYieldPct: 96.80,
      batchCount: 10,
      status: 'OPERATIONAL'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Factory className="w-7 h-7 text-indigo-400" />
              Production Line Yield Efficiency Analytics
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Performance metrics across manufacturing lines, average batch formula yield efficiency %, and throughput processing counts.
            </p>
          </div>
        </div>

        {/* Lines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lines.map((l, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white font-sans">{l.line}</h2>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {l.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Average Yield Efficiency</span>
                  <span className="text-emerald-400 font-bold text-xl">{l.avgYieldPct}%</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Batches Processed</span>
                  <span className="text-indigo-300 font-bold text-xl">{l.batchCount} Batches</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
