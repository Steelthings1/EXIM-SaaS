"use client";

import React, { useState } from 'react';
import { Box, Scale, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { calculateContainerLoading, ContainerType, ContainerLoadingResult } from '@/lib/container-loading-engine';

export default function ContainerLoadingPlannerPage() {
  const [containerType, setContainerType] = useState<ContainerType>('20FT_STD');
  const [grossWeightKg, setGrossWeightKg] = useState<number>(19500);
  const [volumeCbm, setVolumeCbm] = useState<number>(28.5);
  const [cartons, setCartons] = useState<number>(850);
  const [sealNumber, setSealNumber] = useState<string>('SEAL-IN-9004128');

  const result: ContainerLoadingResult = calculateContainerLoading({
    containerType,
    cargoTotalGrossWeightKg: grossWeightKg,
    cargoTotalVolumeCbm: volumeCbm,
    numberOfCartons: cartons
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Box className="w-7 h-7 text-indigo-400" />
              3D Container Loading Optimization Planner
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Calculate payload weight and cubic volume utilization, register high-security bolt seals, and prevent port road axle overweight penalties.
            </p>
          </div>
        </div>

        {/* Input Parameters Form & Utilization Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Controls Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              Cargo & Container Parameters
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 font-sans mb-1">Container Type</label>
                <select
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value as ContainerType)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans"
                >
                  <option value="20FT_STD">20ft Standard Dry (21,800 kg / 33.2 m³)</option>
                  <option value="40FT_STD">40ft Standard Dry (26,500 kg / 67.7 m³)</option>
                  <option value="40FT_HC">40ft High Cube (26,500 kg / 76.4 m³)</option>
                  <option value="45FT_HC">45ft High Cube (27,800 kg / 86.0 m³)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-sans mb-1">Cargo Total Gross Weight (kg)</label>
                <input
                  type="number"
                  value={grossWeightKg}
                  onChange={(e) => setGrossWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-sans mb-1">Cargo Total Volume (m³ CBM)</label>
                <input
                  type="number"
                  step="0.1"
                  value={volumeCbm}
                  onChange={(e) => setVolumeCbm(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-sans mb-1">High-Security Bolt Seal Number</label>
                <input
                  type="text"
                  value={sealNumber}
                  onChange={(e) => setSealNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Utilization Meters */}
          <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white">{result.containerName}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">High-Security Seal: {sealNumber}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                result.status === 'SAFE_OPTIMAL'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {result.status}
              </span>
            </div>

            {/* Weight Utilization Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Payload Weight Utilization</span>
                <span className="font-bold text-indigo-300">
                  {grossWeightKg.toLocaleString()} / {result.maxPayloadWeightKg.toLocaleString()} kg ({result.weightUtilizationPct}%)
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    result.weightUtilizationPct > 100 ? 'bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, result.weightUtilizationPct)}%` }}
                />
              </div>
            </div>

            {/* Volume Utilization Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Cubic Volume Utilization (CBM)</span>
                <span className="font-bold text-amber-300">
                  {volumeCbm} / {result.maxVolumeCbm} m³ ({result.volumeUtilizationPct}%)
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    result.volumeUtilizationPct > 100 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, result.volumeUtilizationPct)}%` }}
                />
              </div>
            </div>

            {/* Recommendation Box */}
            <div className={`p-4 rounded-xl border text-xs space-y-1 ${
              result.status === 'SAFE_OPTIMAL'
                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-800/40 text-rose-300'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {result.status === 'SAFE_OPTIMAL' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                <span>Container Safety Assessment</span>
              </div>
              <p className="font-sans text-slate-300">{result.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
