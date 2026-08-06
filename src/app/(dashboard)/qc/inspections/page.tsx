"use client";

import React, { useState } from 'react';
import { ShieldCheck, Plus, FlaskConical, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function QualityControlInspectionsPage() {
  const [reports, setReports] = useState([
    {
      id: 'qc-101',
      batchNumber: 'BATCH-2026-COF-091',
      labName: 'SGS India NABL Accredited Testing Laboratory',
      isoAccreditation: 'ISO_17025',
      moisturePct: 4.8,
      activeIngredientPct: 2.1, // Caffeine 2.1%
      heavyMetalsPpm: 0.12,
      microbialStatus: 'PASS_CLEAR',
      overallResult: 'PASS'
    },
    {
      id: 'qc-102',
      batchNumber: 'LOT-2026-RIC-441',
      labName: 'Intertek Food Testing Services',
      isoAccreditation: 'ISO_17025',
      moisturePct: 11.2,
      activeIngredientPct: 99.1,
      heavyMetalsPpm: 0.05,
      microbialStatus: 'PASS_CLEAR',
      overallResult: 'PASS'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FlaskConical className="w-7 h-7 text-indigo-400" />
              Quality Control (QC) & Accredited NABL Lab Inspection Registry
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Log ISO 17025 accredited laboratory test results for active ingredient purity, moisture content %, and heavy metal limits.
            </p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((r) => (
            <div key={r.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{r.batchNumber}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{r.labName} ({r.isoAccreditation})</p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {r.overallResult}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Moisture Content</span>
                  <span className="text-indigo-300 font-bold">{r.moisturePct}% (Limit: &le;12%)</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Active Ingredient Purity</span>
                  <span className="text-emerald-400 font-bold">{r.activeIngredientPct}%</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Heavy Metals (Pb/Cd)</span>
                  <span className="text-slate-200">{r.heavyMetalsPpm} PPM</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Microbial Screening</span>
                  <span className="text-emerald-400 font-bold">{r.microbialStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
