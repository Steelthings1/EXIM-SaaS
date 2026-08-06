"use client";

import React, { useState } from 'react';
import { Factory, Plus, CheckCircle2, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';
import { processProductionBatch, ProductionBatchResult } from '@/lib/production-batch-engine';

export default function ManufacturingOrdersPage() {
  const [batchNum, setBatchNum] = useState('BATCH-2026-COFFEE-10');
  const [prodLine, setProdLine] = useState('Line A (Roasting & Packaging)');
  const [targetYield, setTargetYield] = useState(10000);
  const [actualYield, setActualYield] = useState(9850);
  const [result, setResult] = useState<ProductionBatchResult | null>(null);

  const [orders, setOrders] = useState([
    {
      id: 'mfg-101',
      batch: 'BATCH-2026-COFFEE-09',
      line: 'Line A (Roasting & Packaging)',
      target: 10000,
      actual: 9850,
      yieldPct: 98.50,
      status: 'COMPLETED'
    }
  ]);

  const handleProcess = () => {
    const res = processProductionBatch({
      batchNumber: batchNum,
      productionLine: prodLine,
      targetYieldQty: targetYield,
      actualYieldQty: actualYield,
      status: 'QC_PENDING'
    });
    setResult(res);

    setOrders([
      {
        id: `mfg-${Date.now()}`,
        batch: batchNum,
        line: prodLine,
        target: targetYield,
        actual: actualYield,
        yieldPct: res.yieldEfficiencyPct,
        status: res.status
      },
      ...orders
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Factory className="w-7 h-7 text-indigo-400" />
              Export Manufacturing Production Batch Orders
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Schedule manufacturing orders, allocate production lines, and track formula yield efficiency with automated 90% threshold guards.
            </p>
          </div>
        </div>

        {/* Input Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Record Batch Production Output
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Batch Number</label>
              <input
                type="text"
                value={batchNum}
                onChange={(e) => setBatchNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Production Line Allocation</label>
              <input
                type="text"
                value={prodLine}
                onChange={(e) => setProdLine(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Target Yield (KG)</label>
              <input
                type="number"
                value={targetYield}
                onChange={(e) => setTargetYield(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Actual Yield Produced (KG)</label>
              <input
                type="number"
                value={actualYield}
                onChange={(e) => setActualYield(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleProcess}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Process Batch Yield Output & Verify 90% Threshold</span>
          </button>
        </div>

        {/* Process Result Output */}
        {result && (
          <div className={`p-4 rounded-xl border text-xs font-mono ${
            result.isCompliantYield
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
          }`}>
            <span className="font-bold">Status: {result.status}</span> &bull; {result.notes}
          </div>
        )}

        {/* Manufacturing Orders List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Production Orders Registry
          </h2>

          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white">{o.batch}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{o.line}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Actual vs Target</span>
                    <span className="text-slate-200">{o.actual.toLocaleString()} / {o.target.toLocaleString()} KG</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Yield Efficiency</span>
                    <span className="text-emerald-400 font-bold">{o.yieldPct}%</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded font-bold border ${
                    o.status === 'COMPLETED'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
