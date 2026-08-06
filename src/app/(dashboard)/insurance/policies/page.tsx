"use client";

import React, { useState } from 'react';
import { ShieldCheck, Plus, CheckCircle2, DollarSign, FileCheck, Anchor } from 'lucide-react';
import { processMarineCargoPolicy, CargoPolicyResult, CargoClauseType } from '@/lib/marine-insurance-engine';

export default function MarinePoliciesPage() {
  const [insurer, setInsurer] = useState('Lloyds of London Syndicate 1980');
  const [clause, setClause] = useState<CargoClauseType>('CLAUSE_A');
  const [cifValue, setCifValue] = useState(49000);
  const [result, setResult] = useState<CargoPolicyResult | null>(null);

  const [policies, setPolicies] = useState([
    {
      id: 'pol-101',
      policyNumber: 'POL-EXIM-2026-9041',
      insurer: 'Lloyds of London Syndicate 1980',
      clause: 'CLAUSE_A',
      cifValue: 49000.00,
      sumInsured: 53900.00,
      premiumRate: 0.30,
      premium: 161.70,
      status: 'ACTIVE'
    }
  ]);

  const handleIssuePolicy = () => {
    const res = processMarineCargoPolicy({
      orderId: 'EXIM-2026-9041',
      insurerName: insurer,
      clauseType: clause,
      cifOrderValueUsd: cifValue
    });
    setResult(res);

    setPolicies([
      {
        id: `pol-${Date.now()}`,
        policyNumber: res.policyNumber,
        insurer,
        clause,
        cifValue,
        sumInsured: res.sumInsuredUsd,
        premiumRate: res.premiumRatePct,
        premium: res.premiumAmountUsd,
        status: res.status
      },
      ...policies
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-indigo-400" />
            Marine Cargo Insurance Vault & Policy Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Issue marine cargo insurance policies with automated 110% CIF sum insured valuation and Institute Cargo Clauses (A/B/C) coverage rules.
          </p>
        </div>

        {/* Policy Generator Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Generate Marine Cargo Insurance Policy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Underwriter / Insurer Name</label>
              <input
                type="text"
                value={insurer}
                onChange={(e) => setInsurer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Institute Cargo Clause Coverage</label>
              <select
                value={clause}
                onChange={(e) => setClause(e.target.value as CargoClauseType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              >
                <option value="CLAUSE_A">Institute Cargo Clause A (All-Risks, 0.30%)</option>
                <option value="CLAUSE_B">Institute Cargo Clause B (Major Perils, 0.20%)</option>
                <option value="CLAUSE_C">Institute Cargo Clause C (Basic Cover, 0.12%)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Total Order CIF Value ($ USD)</label>
              <input
                type="number"
                value={cifValue}
                onChange={(e) => setCifValue(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleIssuePolicy}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Generate Policy with 110% CIF Valuation ($ {(cifValue * 1.10).toLocaleString()})</span>
          </button>
        </div>

        {/* Policy Certificate Output */}
        {result && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <h2 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3">
              Policy Certificate Issued — {result.policyNumber}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">CIF Order Value</span>
                <span className="text-slate-200 font-bold">${result.cifOrderValueUsd.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Sum Insured (110% CIF)</span>
                <span className="text-indigo-300 font-bold">${result.sumInsuredUsd.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Premium Rate</span>
                <span className="text-slate-200 font-bold">{result.premiumRatePct}%</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Premium Payable</span>
                <span className="text-emerald-400 font-bold">${result.premiumAmountUsd.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Policy Vault Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Marine Policy Vault
          </h2>

          <div className="space-y-3">
            {policies.map((p) => (
              <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{p.policyNumber}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{p.insurer} &bull; {p.clause}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Sum Insured (110%)</span>
                    <span className="text-indigo-300 font-bold">${p.sumInsured.toLocaleString()}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Premium</span>
                    <span className="text-emerald-400 font-bold">${p.premium.toLocaleString()}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {p.status}
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
