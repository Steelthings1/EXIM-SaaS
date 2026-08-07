"use client";

import React, { useState } from 'react';
import { Award, CheckCircle2, DollarSign, FileText, Plus, Zap } from 'lucide-react';
import { calculateIncentiveClaim, IncentiveClaimResult } from '@/lib/export-incentive-engine';

export default function IncentiveClaimsV3Page() {
  const [sbNum, setSbNum] = useState('SB-INNSA-904128');
  const [scheme, setScheme] = useState<'RODTEP' | 'ROSCTL' | 'DUTY_DRAWBACK' | 'ADVANCE_AUTHORIZATION'>('RODTEP');
  const [fobInr, setFobInr] = useState(4091500);
  const [hsCode, setHsCode] = useState('7210.49.00');

  const [result, setResult] = useState<IncentiveClaimResult | null>(null);

  const [claims, setClaims] = useState([
    {
      id: 'clm-101',
      claimNum: 'CLM-DGFT-2026-9041',
      sbNum: 'SB-INNSA-904128',
      scheme: 'RODTEP',
      fobInr: 4091500.00,
      ratePct: 1.40,
      claimInr: 57281.00,
      scrollNum: 'SCRL-ICEGATE-2026-88123',
      status: 'SCROLL_ISSUED'
    }
  ]);

  const handleCreateClaim = () => {
    const res = calculateIncentiveClaim({
      shippingBillNumber: sbNum,
      schemeType: scheme,
      fobValueInr: fobInr,
      customsHsCode: hsCode
    });
    setResult(res);

    setClaims([
      {
        id: res.claimId,
        claimNum: res.claimNumber,
        sbNum: res.shippingBillNumber,
        scheme: res.schemeType,
        fobInr: res.fobValueInr,
        ratePct: res.incentiveRatePct,
        claimInr: res.claimAmountInr,
        scrollNum: res.scrollNumber,
        status: res.claimStatus
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
            Export Incentive Realization Claims Ledger (RoDTEP, RoSCTL & Duty Drawback)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate DGFT & Customs e-scrip scrolls for RoDTEP (Remission of Duties and Taxes on Exported Products) and Duty Drawback claims on FOB export realization.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            File Export Incentive Claim
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Shipping Bill Number</label>
              <input type="text" value={sbNum} onChange={(e) => setSbNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Incentive Scheme</label>
              <select value={scheme} onChange={(e: any) => setScheme(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="RODTEP">RoDTEP (1.4% Rate)</option>
                <option value="ROSCTL">RoSCTL (3.15% Rate)</option>
                <option value="DUTY_DRAWBACK">Duty Drawback Sec 75 (1.5% Rate)</option>
                <option value="ADVANCE_AUTHORIZATION">Advance Authorization (Duty-Free)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">FOB Value Realized (₹ INR)</label>
              <input type="number" value={fobInr} onChange={(e) => setFobInr(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">HS Code</label>
              <input type="text" value={hsCode} onChange={(e) => setHsCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCreateClaim}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Generate DGFT e-Scrip Scroll Record</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>Scroll {result.scrollNumber} generated for {result.schemeType} claim {result.claimNumber} worth ₹ {result.claimAmountInr.toLocaleString()}!</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Export Incentive Claims Registry V3
          </h2>

          <div className="space-y-3">
            {claims.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{c.claimNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Scheme: {c.scheme} ({c.ratePct}%) &bull; Shipping Bill: {c.sbNum} &bull; Scroll: {c.scrollNum}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Claim Amount</span>
                    <span className="text-emerald-400 font-bold">₹ {c.claimInr.toLocaleString()}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
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
