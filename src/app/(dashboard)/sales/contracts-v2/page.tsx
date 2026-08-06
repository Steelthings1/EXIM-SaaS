"use client";

import React, { useState } from 'react';
import { Scale, Plus, ShieldCheck, FileCheck, AlertTriangle } from 'lucide-react';
import { auditContractLegalRisk, ContractAuditResult } from '@/lib/contract-audit-engine';

export default function InternationalContractsPage() {
  const [buyer, setBuyer] = useState('Arabica Imports GmbH (Hamburg, Germany)');
  const [seller, setSeller] = useState('Ahamla Organics Pvt Ltd (Bengaluru, India)');
  const [incoterm, setIncoterm] = useState('CIF');
  const [governingLaw, setGoverningLaw] = useState('UN CISG 1980');
  const [arbitration, setArbitration] = useState('SIAC Singapore');
  const [totalValue, setTotalValue] = useState(49000);
  const [paymentTerms, setPaymentTerms] = useState('Irrevocable LC at Sight');
  const [creditDays, setCreditDays] = useState(0);
  const [result, setResult] = useState<ContractAuditResult | null>(null);

  const [contracts, setContracts] = useState([
    {
      id: 'ct-101',
      contractNumber: 'CISG-EXIM-2026-0021',
      buyer: 'Arabica Imports GmbH (Hamburg, Germany)',
      incoterm: 'CIF',
      law: 'UN CISG 1980',
      arbitration: 'SIAC Singapore',
      totalValue: 49000.00,
      riskLevel: 'LOW',
      status: 'EXECUTED'
    }
  ]);

  const handleCreateContract = () => {
    const res = auditContractLegalRisk({
      contractNumber: `CISG-EXIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerEntity: buyer,
      sellerEntity: seller,
      incoterm,
      governingLaw,
      arbitrationVenue: arbitration,
      totalValueUsd: totalValue,
      paymentTerms,
      paymentCreditDays: creditDays,
      status: 'PENDING_SIGNATURE'
    });
    setResult(res);

    setContracts([
      {
        id: `ct-${Date.now()}`,
        contractNumber: res.contractNumber,
        buyer,
        incoterm,
        law: governingLaw,
        arbitration,
        totalValue,
        riskLevel: res.riskLevel,
        status: res.status
      },
      ...contracts
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Scale className="w-7 h-7 text-indigo-400" />
            UN CISG 1980 International Sales Contracts & Legal Audit
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Build international sale of goods agreements compliant with UN CISG 1980, Incoterms 2020, and SIAC/LCIA arbitration forums.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Draft International Sales Agreement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Buyer Legal Entity</label>
              <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Seller Legal Entity</label>
              <input type="text" value={seller} onChange={(e) => setSeller(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Incoterm 2020</label>
              <select value={incoterm} onChange={(e) => setIncoterm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="CIF">CIF</option>
                <option value="FOB">FOB</option>
                <option value="EXW">EXW</option>
                <option value="FCA">FCA</option>
                <option value="DDP">DDP</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Governing Law</label>
              <input type="text" value={governingLaw} onChange={(e) => setGoverningLaw(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Arbitration Forum</label>
              <input type="text" value={arbitration} onChange={(e) => setArbitration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Total Contract Value ($ USD)</label>
              <input type="number" value={totalValue} onChange={(e) => setTotalValue(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCreateContract}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Generate Contract & Run AI Legal Risk Audit</span>
          </button>
        </div>

        {/* Audit Output */}
        {result && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase">AI Risk Audit for {result.contractNumber}</h2>
              <span className={`px-2.5 py-0.5 rounded font-bold ${
                result.riskLevel === 'LOW' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                Risk Level: {result.riskLevel} (Score: {result.aiRiskScore})
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 block font-sans font-bold">Audit Observations:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {result.aiRiskNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Contracts Registry */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Executed Sales Contracts Registry
          </h2>

          <div className="space-y-3">
            {contracts.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white">{c.contractNumber}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{c.buyer} &bull; {c.incoterm}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Governing Forum</span>
                    <span className="text-slate-200">{c.law} &bull; {c.arbitration}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Contract Value</span>
                    <span className="text-indigo-300 font-bold">${c.totalValue.toLocaleString()}</span>
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
