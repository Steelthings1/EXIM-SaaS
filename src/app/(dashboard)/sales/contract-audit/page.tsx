"use client";

import React, { useState } from 'react';
import { ShieldAlert, Scale, CheckCircle2, AlertTriangle, Search } from 'lucide-react';
import { auditContractLegalRisk, ContractAuditResult } from '@/lib/contract-audit-engine';

export default function ContractAuditPage() {
  const [incoterm, setIncoterm] = useState('DDP');
  const [value, setValue] = useState(75000);
  const [terms, setPaymentTerms] = useState('Open Account 60 Days');
  const [creditDays, setCreditDays] = useState(60);
  const [result, setResult] = useState<ContractAuditResult | null>(null);

  const handleAudit = () => {
    const res = auditContractLegalRisk({
      contractNumber: 'AUDIT-SCAN-01',
      buyerEntity: 'Global Trade Partner Inc',
      sellerEntity: 'Exporter Enterprise',
      incoterm,
      governingLaw: 'UN CISG 1980',
      arbitrationVenue: 'LCIA London',
      totalValueUsd: value,
      paymentTerms: terms,
      paymentCreditDays: creditDays
    });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-indigo-400" />
            AI Contract Legal Risk Auditor Scanner
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Scan international trade contracts for Incoterm liability shifts, destination tax exposures (DDP vs EXW), and credit risk penalties.
          </p>
        </div>

        {/* Audit Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Scan Contract Clause Terms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Incoterm Risk Point</label>
              <select value={incoterm} onChange={(e) => setIncoterm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="DDP">DDP (Maximum Duty/Tax Risk)</option>
                <option value="EXW">EXW (Zero Export Clearance Control)</option>
                <option value="FCA">FCA (Carrier Appointment Gap)</option>
                <option value="CIF">CIF (Standard Marine Cover)</option>
                <option value="FOB">FOB (Standard Port Clearance)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Contract Value ($ USD)</label>
              <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Payment Method</label>
              <input type="text" value={terms} onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Credit Duration (Days)</label>
              <input type="number" value={creditDays} onChange={(e) => setCreditDays(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleAudit}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Run Deep AI Legal Risk Audit</span>
          </button>
        </div>

        {/* Audit Result */}
        {result && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase">Legal Risk Audit Summary</h2>
              <span className={`px-2.5 py-0.5 rounded font-bold ${
                result.riskLevel === 'LOW' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {result.riskLevel} Risk (Score: {result.aiRiskScore})
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 block font-sans font-bold">Identified Risk Factors:</span>
              <div className="space-y-2">
                {result.aiRiskNotes.map((note, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{note}</span>
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
