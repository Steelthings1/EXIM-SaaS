"use client";

import React, { useState } from 'react';
import { RefreshCw, Zap, FileText, CheckCircle2, ShieldCheck, Layers } from 'lucide-react';
import { processCascadingUpdate, CascadingUpdateResult } from '@/lib/cascading-update-engine';

export default function CascadingEditorPage() {
  const [quantity, setQuantity] = useState(2500);
  const [unitPrice, setUnitPrice] = useState(18.50);
  const [freight, setFreight] = useState(2500);
  const [insurance, setInsurance] = useState(250);
  const [result, setResult] = useState<CascadingUpdateResult | null>(null);

  const handleApplyCascadingUpdate = () => {
    const res = processCascadingUpdate({
      orderId: 'EXIM-2026-9041',
      itemQuantity: quantity,
      unitPriceUsd: unitPrice,
      freightCostUsd: freight,
      insuranceCostUsd: insurance
    });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-7 h-7 text-indigo-400" />
              Cascading Document Field Editor & Real-Time Sync
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Edit master order attributes and observe automatic, real-time cascading recalculations across Commercial Invoices, Packing Lists, Shipping Bills, and Certificates of Origin.
            </p>
          </div>
        </div>

        {/* Master Input Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Master Order Attributes Input
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Item Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Unit Price ($ USD)</label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Freight Charges ($ USD)</label>
              <input
                type="number"
                value={freight}
                onChange={(e) => setFreight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Insurance Premium ($ USD)</label>
              <input
                type="number"
                value={insurance}
                onChange={(e) => setInsurance(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleApplyCascadingUpdate}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Propagate Cascading Edits Across Downstream Trade Suite</span>
          </button>
        </div>

        {/* Cascading Impact Output */}
        {result && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Cascading Update Result (Version #{result.versionNumber})
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">SHA-256 Checksum: {result.sha256Checksum}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Subtotal Value</span>
                <span className="text-slate-200 font-bold">${result.subtotalUsd.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">CIF Total Value</span>
                <span className="text-indigo-300 font-bold">${result.cifTotalUsd.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Gross Weight (KG)</span>
                <span className="text-slate-200 font-bold">{result.totalGrossWeightKg.toLocaleString()} KG</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">CBM Volume</span>
                <span className="text-emerald-400 font-bold">{result.totalCbmVolume.toFixed(2)} m³</span>
              </div>
            </div>

            {/* Impacted Documents List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Propagated Downstream Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                {result.impactedDocuments.map((doc, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-indigo-400 block">{doc.documentType}</span>
                    <pre className="text-[11px] text-slate-300 font-mono overflow-x-auto">{JSON.stringify(doc.updatedFields, null, 2)}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
