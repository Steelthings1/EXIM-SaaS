"use client";

import React, { useState } from 'react';
import { ShieldCheck, Plus, DollarSign, FileCheck, Award, Download } from 'lucide-react';

export default function MarineCargoInsurancePage() {
  const [policies, setPolicies] = useState([
    {
      id: 'pol-101',
      policyNumber: 'POL-ICICI-2026-8810',
      insurerName: 'ICICI Lombard General Insurance Co Ltd',
      coverageClause: 'Institute Cargo Clauses (A) All-Risks',
      cifValuationUsd: 50250.00,
      sumInsuredUsd: 55275.00, // 110% CIF Math
      premiumRatePct: 0.25,
      totalPremiumUsd: 138.19,
      status: 'ACTIVE'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCif, setNewCif] = useState<number>(75000.00);

  const handleIssuePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const sumInsured = Number((newCif * 1.10).toFixed(2));
    const premium = Number(((sumInsured * 0.0025)).toFixed(2));

    setPolicies([
      ...policies,
      {
        id: `pol-${Date.now()}`,
        policyNumber: `POL-TATA-${Date.now().toString().slice(-6)}`,
        insurerName: 'TATA AIG Marine Underwriters',
        coverageClause: 'Institute Cargo Clauses (A) All-Risks',
        cifValuationUsd: newCif,
        sumInsuredUsd: sumInsured,
        premiumRatePct: 0.25,
        totalPremiumUsd: premium,
        status: 'ACTIVE'
      }
    ]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
              Marine Cargo Insurance Policy Management & 110% CIF Calculator
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Issue and manage Institute Cargo Clauses (A) All-Risks ocean freight insurance policies with statutory 110% CIF sum insured valuation.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Marine Insurance Policy</span>
          </button>
        </div>

        {/* Policies List */}
        <div className="space-y-4">
          {policies.map((p) => (
            <div key={p.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{p.policyNumber}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{p.insurerName}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {p.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Coverage Clause</span>
                  <span className="text-indigo-300 font-bold">{p.coverageClause}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">CIF Cargo Valuation</span>
                  <span className="text-slate-200">${p.cifValuationUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Sum Insured (110% CIF)</span>
                  <span className="text-emerald-400 font-bold">${p.sumInsuredUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Insurance Premium ({p.premiumRatePct}%)</span>
                  <span className="text-amber-300 font-bold">${p.totalPremiumUsd.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
              <h2 className="text-lg font-bold text-white">Issue Marine Insurance Policy</h2>

              <form onSubmit={handleIssuePolicy} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CIF Cargo Valuation ($)</label>
                  <input
                    type="number"
                    required
                    value={newCif}
                    onChange={(e) => setNewCif(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    Statutory Sum Insured (110% CIF): <strong className="text-emerald-400">${(newCif * 1.10).toFixed(2)}</strong>
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg text-xs"
                  >
                    Issue Policy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
