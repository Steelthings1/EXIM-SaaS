"use client";

import React, { useState } from 'react';
import { AlertTriangle, Plus, CheckCircle2, DollarSign, ShieldAlert } from 'lucide-react';
import { logCargoClaim, CargoClaimResult } from '@/lib/marine-insurance-engine';

export default function TransitClaimsPage() {
  const [description, setDescription] = useState('Water ingress damage observed in container rear door area. 20 cartons affected.');
  const [amount, setAmount] = useState(1250);
  const [result, setResult] = useState<CargoClaimResult | null>(null);

  const [claims, setClaims] = useState([
    {
      id: 'clm-101',
      claimNumber: 'CLM-EXIM-2026-9041',
      policyNumber: 'POL-EXIM-2026-9041',
      description: 'Water ingress damage observed in container rear door area. 20 cartons affected.',
      amount: 1250.00,
      settled: 0.00,
      status: 'UNDER_SURVEY'
    }
  ]);

  const handleLodgeClaim = () => {
    const res = logCargoClaim({
      policyId: 'pol-101',
      surveyorLossDescription: description,
      claimedAmountUsd: amount
    });
    setResult(res);

    setClaims([
      {
        id: `clm-${Date.now()}`,
        claimNumber: res.claimNumber,
        policyNumber: 'POL-EXIM-2026-9041',
        description,
        amount,
        settled: 0.00,
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
            <ShieldAlert className="w-7 h-7 text-indigo-400" />
            Transit Cargo Damage Claims Ledger
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Lodge transit cargo damage claims, upload marine surveyor loss reports, and track underwriter settlement statuses.
          </p>
        </div>

        {/* Claim Input Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Lodge Transit Cargo Claim
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Surveyor Loss Description & Observations</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Claimed Amount ($ USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleLodgeClaim}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Lodge Claim with Underwriter & Assign Surveyor</span>
          </button>
        </div>

        {/* Output Result */}
        {result && (
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-4 text-xs font-mono text-amber-300">
            <span>Claim {result.claimNumber} lodged successfully for ${result.claimedAmountUsd.toLocaleString()}! Status: {result.status}.</span>
          </div>
        )}

        {/* Claims Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Cargo Claims Audit Trail
          </h2>

          <div className="space-y-3">
            {claims.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-white">{c.claimNumber}</h3>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {c.status}
                  </span>
                </div>

                <p className="text-slate-300 font-sans text-xs">{c.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Linked Policy: {c.policyNumber}</span>
                  <span>Claimed: ${c.amount.toLocaleString()} &bull; Settled: ${c.settled.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
