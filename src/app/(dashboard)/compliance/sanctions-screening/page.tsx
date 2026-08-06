"use client";

import React, { useState } from 'react';
import { ShieldAlert, Search, AlertTriangle, CheckCircle2, Sliders, Database, Building2 } from 'lucide-react';
import { screenEntity, SanctionsScreeningResult } from '@/lib/compliance/sanctions-screener';

export default function SanctionsScreeningPage() {
  const [queryName, setQueryName] = useState('Vostok Shipping');
  const [threshold, setThreshold] = useState(0.70);
  const [result, setResult] = useState<SanctionsScreeningResult | null>(null);

  const handleScreening = (e: React.FormEvent) => {
    e.preventDefault();
    const res = screenEntity(queryName, threshold);
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldAlert className="w-7 h-7 text-indigo-400" />
              Fuzzy Sanctions & Denied Party Screening Engine
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Screen buyers, suppliers, vessel owners, and freight forwarders against OFAC SDN, UN, EU, and UK HMT denied party lists using Levenshtein distance.
            </p>
          </div>
        </div>

        {/* Search Controls */}
        <form onSubmit={handleScreening} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                Entity Legal Name or Consignee Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={queryName}
                  onChange={(e) => setQueryName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 font-medium text-base"
                  placeholder="Enter company, vessel, or individual name..."
                />
                <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-4" />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
              >
                <ShieldAlert className="w-5 h-5" />
                <span>Screen Entity</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 w-full max-w-md">
              <Sliders className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-slate-400 font-medium">Similarity Score Threshold:</span>
              <input
                type="range"
                min="0.50"
                max="0.95"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="font-mono font-bold text-indigo-300">{(threshold * 100).toFixed(0)}%</span>
            </div>
            <div className="text-slate-500 text-[11px] font-mono">
              Registries Checked: OFAC, UN Security Council, EU Sanctions, UK HMT
            </div>
          </div>
        </form>

        {/* Screening Results */}
        {result && (
          <div className="space-y-6">
            {result.matches.length > 0 ? (
              <div className="space-y-4">
                <div className="p-4 bg-rose-950/80 border border-rose-500/40 rounded-xl text-rose-200 text-sm flex items-center gap-3 shadow-lg">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>
                    <strong>POTENTIAL SANCTIONS MATCH DETECTED:</strong> Found {result.matches.length} potential match(es) above the {(result.thresholdScore * 100).toFixed(0)}% threshold.
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {result.matches.map((m) => (
                    <div key={m.entity.entityId} className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-5 shadow-xl space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-rose-400" />
                            {m.entity.entityName}
                          </h3>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{m.entity.address}</p>
                        </div>

                        <div className="text-right font-mono">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            {(m.similarityScore * 100).toFixed(0)}% Match (Levenshtein Dist: {m.levenshteinDistance})
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono text-slate-300">
                        <div><span className="text-slate-500">Registry Source:</span> {m.entity.registrySource}</div>
                        <div><span className="text-slate-500">Sanctions Program:</span> {m.entity.programType}</div>
                        <div><span className="text-slate-500">Country:</span> {m.entity.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-emerald-300 text-sm flex items-center gap-4 shadow-xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base">Sanctions Screening Passed (CLEAR)</h4>
                  <p className="text-xs text-emerald-300/90 mt-0.5">
                    No denied party matches found for "{result.queryEntityName}" across OFAC SDN, UN, EU, or UK HMT registries at {(result.thresholdScore * 100).toFixed(0)}% similarity threshold.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
