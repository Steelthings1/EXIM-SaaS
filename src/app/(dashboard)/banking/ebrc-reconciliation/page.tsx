"use client";

import React, { useState } from 'react';
import { Landmark, Plus, CheckCircle2, RefreshCw, FileText } from 'lucide-react';

export default function EbrcReconciliationPage() {
  const [records, setRecords] = useState([
    {
      id: 'ebrc-101',
      ebrcNumber: 'EBRC-2026-SBI-8812',
      shippingBillNumber: 'SB-ICEGATE-2026-904128',
      irmReference: 'IRM-SBI-900412',
      fobValueUsd: 50250.00,
      realizedUsd: 50250.00,
      realizedInr: 4195875.00,
      edpmsStatus: 'CLOSED'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Landmark className="w-7 h-7 text-indigo-400" />
              Central Bank eBRC & EDPMS Inward Remittance Reconciliation
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Match foreign exchange Inward Remittance References (IRM) with ICEGATE Shipping Bills for RBI EDPMS closure and electronic Bank Realization Certificate (eBRC) issuance.
            </p>
          </div>
        </div>

        {/* eBRC Records List */}
        <div className="space-y-4">
          {records.map((r) => (
            <div key={r.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{r.ebrcNumber}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Shipping Bill #{r.shippingBillNumber} &bull; IRM #{r.irmReference}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  RBI EDPMS: {r.edpmsStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">FOB Value ($)</span>
                  <span className="text-slate-200">${r.fobValueUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Realized Amount ($)</span>
                  <span className="text-emerald-400 font-bold">${r.realizedUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Realized INR Value</span>
                  <span className="text-indigo-300 font-bold">&#8377;{r.realizedInr.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
