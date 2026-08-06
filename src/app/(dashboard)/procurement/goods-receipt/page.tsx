"use client";

import React, { useState } from 'react';
import { PackageCheck, Plus, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { generateGoodsReceiptNote, GoodsReceiptResult } from '@/lib/procurement-engine';

export default function GoodsReceiptPage() {
  const [receivedQty, setReceivedQty] = useState(10000);
  const [acceptedQty, setAcceptedQty] = useState(9950);
  const [result, setResult] = useState<GoodsReceiptResult | null>(null);

  const [grns, setGrns] = useState([
    {
      id: 'grn-101',
      grnNumber: 'GRN-2026-900412',
      poNumber: 'PO-2026-RAW-0091',
      received: 10000,
      accepted: 9950,
      rejected: 50,
      ratePct: 99.50,
      notes: 'Moisture content verified at 11.2%. 50 kg damaged bags rejected.',
      date: '2026-02-14'
    }
  ]);

  const handleGenerateGrn = () => {
    const res = generateGoodsReceiptNote({
      poId: 'po-101',
      receivedQty,
      acceptedQty,
      inspectionNotes: 'Quality inspection passed upon inward unloading.'
    });
    setResult(res);

    setGrns([
      {
        id: `grn-${Date.now()}`,
        grnNumber: res.grnNumber,
        poNumber: 'PO-2026-RAW-0091',
        received: receivedQty,
        accepted: acceptedQty,
        rejected: res.rejectedQty,
        ratePct: res.acceptanceRatePct,
        notes: 'Quality inspection completed.',
        date: new Date().toISOString().split('T')[0]
      },
      ...grns
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <PackageCheck className="w-7 h-7 text-indigo-400" />
              Goods Receipt Notes (GRN) & Inward Inspection Ledger
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Record raw material inward receipts, track accepted vs rejected quantities, and calculate quality acceptance rates.
            </p>
          </div>
        </div>

        {/* Generate GRN Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Record Inward Stock Inspection & Issue GRN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Total Quantity Received (KG)</label>
              <input
                type="number"
                value={receivedQty}
                onChange={(e) => setReceivedQty(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Accepted Quantity Passed (KG)</label>
              <input
                type="number"
                value={acceptedQty}
                onChange={(e) => setAcceptedQty(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateGrn}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <span>Generate Goods Receipt Note (GRN)</span>
          </button>
        </div>

        {/* Output Result */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>GRN {result.grnNumber} issued! Quality acceptance rate: {result.acceptanceRatePct}% ({result.acceptedQty} KG accepted, {result.rejectedQty} KG rejected).</span>
          </div>
        )}

        {/* GRN Ledger Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Goods Receipt Notes Audit Ledger
          </h2>

          <div className="space-y-3">
            {grns.map((g) => (
              <div key={g.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-white">{g.grnNumber}</h3>
                  <span className="text-emerald-400 font-bold">Acceptance: {g.ratePct}%</span>
                </div>

                <p className="text-slate-300 font-sans text-xs">{g.notes}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>PO Reference: {g.poNumber}</span>
                  <span>Received: {g.received} KG &bull; Accepted: {g.accepted} KG &bull; Rejected: {g.rejected} KG</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
