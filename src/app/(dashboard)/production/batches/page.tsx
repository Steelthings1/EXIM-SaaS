"use client";

import React, { useState } from 'react';
import { Factory, Plus, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';

export default function ManufacturingBatchesPage() {
  const [batches, setBatches] = useState([
    {
      id: 'b-101',
      batchNumber: 'BATCH-2026-COF-091',
      productName: 'Premium Roasted Arabica Coffee Beans (1kg)',
      plannedQty: 5000,
      producedQty: 4950,
      yieldPct: 99.0,
      mfgDate: '2026-01-10',
      expiryDate: '2027-01-09',
      status: 'RELEASED'
    },
    {
      id: 'b-102',
      batchNumber: 'LOT-2026-RIC-441',
      productName: 'Traditional Organic Indian Basmati Rice (5kg)',
      plannedQty: 12000,
      producedQty: 11800,
      yieldPct: 98.3,
      mfgDate: '2025-11-20',
      expiryDate: '2027-11-19',
      status: 'IN_PRODUCTION'
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
              Export Manufacturing Batch Production Execution
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Schedule factory production runs, track batch yields, and manage manufacturing/expiration timelines for global trade consignments.
            </p>
          </div>
        </div>

        {/* Batches Grid */}
        <div className="space-y-4">
          {batches.map((b) => (
            <div key={b.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">{b.productName}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Batch #{b.batchNumber}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Planned vs Produced Qty</span>
                  <span className="text-slate-200">{b.plannedQty.toLocaleString()} / {b.producedQty.toLocaleString()} units</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Yield Efficiency</span>
                  <span className="text-emerald-400 font-bold">{b.yieldPct}%</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Mfg Date</span>
                  <span className="text-slate-200">{b.mfgDate}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Expiry Date</span>
                  <span className="text-slate-200">{b.expiryDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
