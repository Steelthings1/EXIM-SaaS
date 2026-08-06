"use client";

import React, { useState } from 'react';
import { DollarSign, Award, CheckCircle2, TrendingUp } from 'lucide-react';
import { calculateExportIncentives, IncentiveClaimResult } from '@/lib/trade-finance-engine';

export default function ExportIncentiveLedgerPage() {
  const [sbNum, setSbNum] = useState('SB-INNSA-904128');
  const [fobInr, setFobInr] = useState(4091500);
  const [rodtepRate, setRodtepRate] = useState(1.40);
  const [drawbackRate, setDrawbackRate] = useState(1.50);
  const [result, setResult] = useState<IncentiveClaimResult | null>(null);

  const [claims, setClaims] = useState([
    {
      id: 'claim-101',
      claimNum: 'CLM-INC-2026-9041',
      sbNum: 'SB-INNSA-904128',
      fobInr: 4091500.00,
      rodtepAmount: 57281.00,
      drawbackAmount: 61372.50,
      totalIncentive: 118653.50,
      status: 'SCROLL_GENERATED'
    }
  ]);

  const handleCalculateIncentive = () => {
    const res = calculateExportIncentives({
      shippingBillNumber: sbNum,
      fobValueInr: fobInr,
      rodtepRatePct: rodtepRate,
      drawbackRatePct: drawbackRate
    });
    setResult(res);

    setClaims([
      {
        id: `claim-${Date.now()}`,
        claimNum: res.claimNumber,
        sbNum,
        fobInr,
        rodtepAmount: res.rodtepAmountInr,
        drawbackAmount: res.drawbackAmountInr,
        totalIncentive: res.totalIncentiveInr,
        status: res.status
      },
      ...claims
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Award className="w-7 h-7 text-indigo-400" />
            Export Incentive Realization Ledger (RoDTEP & Duty Drawback)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Calculate export tax remissions (RoDTEP e-scrips) and Duty Drawback refunds based on FOB shipping bill values.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Calculate Export Incentive Scrolls
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Shipping Bill Number</label>
              <input type="text" value={sbNum} onChange={(e) => setSbNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">FOB Value (₹ INR)</label>
              <input type="number" value={fobInr} onChange={(e) => setFobInr(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">RoDTEP Rate (%)</label>
              <input type="number" step="0.1" value={rodtepRate} onChange={(e) => setRodtepRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Duty Drawback Rate (%)</label>
              <input type="number" step="0.1" value={drawbackRate} onChange={(e) => setDrawbackRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCalculateIncentive}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Generate Incentive Scroll & e-Scrip Credit Balance</span>
          </button>
        </div>

        {/* Output Result */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <h2 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3">
              Incentive Scroll {result.claimNumber} Generated
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">FOB Export Value</span>
                <span className="text-slate-200 font-bold">₹ {result.fobValueInr.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">RoDTEP ({result.rodtepRatePct}%)</span>
                <span className="text-emerald-400 font-bold">₹ {result.rodtepAmountInr.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Duty Drawback ({result.drawbackRatePct}%)</span>
                <span className="text-emerald-400 font-bold">₹ {result.drawbackAmountInr.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Incentive Realized</span>
                <span className="text-indigo-300 font-bold">₹ {result.totalIncentiveInr.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Claims Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Export Incentive Realization Registry
          </h2>

          <div className="space-y-3">
            {claims.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{c.claimNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Shipping Bill: {c.sbNum}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">RoDTEP + Drawback</span>
                    <span className="text-emerald-400 font-bold">₹ {c.totalIncentive.toLocaleString()}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {c.status}
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
