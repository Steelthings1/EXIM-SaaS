"use client";

import React, { useState } from 'react';
import { Award, Plus, DollarSign, CheckCircle2, Scroll, Wallet } from 'lucide-react';

export default function ExportIncentiveLedgerPage() {
  const [claims, setClaims] = useState([
    {
      id: 'clm-101',
      shippingBillNumber: 'SB-ICEGATE-2026-904128',
      fobValueUsd: 50250.00,
      fobValueInr: 4195875.00,
      rodtepRatePct: 1.40,
      rodtepAmountInr: 58742.25,
      drawbackRatePct: 1.50,
      drawbackAmountInr: 62938.13,
      totalIncentiveInr: 121680.38,
      dgftStatus: 'CREDITED'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Award className="w-7 h-7 text-indigo-400" />
              Export Incentive Ledger & DGFT e-Scrip Scrolls (RoDTEP & Duty Drawback)
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track DGFT RoDTEP e-scrip credits (1.4% FOB) and Customs Duty Drawback (1.5% FOB) claims generated from ICEGATE Shipping Bills.
            </p>
          </div>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          {claims.map((c) => (
            <div key={c.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">Shipping Bill #{c.shippingBillNumber}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    FOB Value: ${c.fobValueUsd.toLocaleString()} (&bull; &#8377;{c.fobValueInr.toLocaleString()})
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  DGFT Status: {c.dgftStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">RoDTEP Claim ({c.rodtepRatePct}%)</span>
                  <span className="text-indigo-300 font-bold">&#8377;{c.rodtepAmountInr.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Duty Drawback ({c.drawbackRatePct}%)</span>
                  <span className="text-indigo-300 font-bold">&#8377;{c.drawbackAmountInr.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Export Incentive</span>
                  <span className="text-emerald-400 font-bold">&#8377;{c.totalIncentiveInr.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
