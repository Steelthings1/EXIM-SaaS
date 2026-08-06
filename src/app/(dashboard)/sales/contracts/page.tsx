"use client";

import React, { useState } from 'react';
import { FileCheck, Sparkles, ShieldAlert, CheckCircle2, AlertTriangle, Scale, Globe, Building } from 'lucide-react';
import { auditInternationalContract, ContractAuditResult } from '@/lib/ai/contract-review';

export default function InternationalSalesContractsPage() {
  const [contracts, setContracts] = useState([
    {
      id: 'ctr-101',
      number: 'EXIM-CONTRACT-2026-004',
      buyer: 'Gulf Trading Enterprise FZE (Dubai)',
      governingLaw: 'UN_CISG_1980 (Vienna Sales Convention)',
      arbitrationForum: 'SIAC (Singapore International Arbitration Centre)',
      incoterms: 'CIF',
      paymentTerms: 'LC_AT_SIGHT',
      riskScore: 10,
      riskRating: 'LOW_RISK',
      status: 'EXECUTED'
    },
    {
      id: 'ctr-102',
      number: 'EXIM-CONTRACT-2026-005',
      buyer: 'EuroAmericana Importers Inc (New York)',
      governingLaw: 'English Law',
      arbitrationForum: 'LCIA (London Court of International Arbitration)',
      incoterms: 'EXW',
      paymentTerms: 'NET_90_OPEN_ACCOUNT',
      riskScore: 65,
      riskRating: 'HIGH_RISK',
      status: 'UNDER_AI_REVIEW'
    }
  ]);

  const [selectedAudit, setSelectedAudit] = useState<ContractAuditResult | null>(null);

  const handleRunAiAudit = (contractNumber: string, law: string, forum: string, terms: string, incoterms: string) => {
    const res = auditInternationalContract({
      contractNumber,
      governingLaw: law,
      arbitrationForum: forum,
      incoterms,
      paymentTerms: terms,
      contractValueUsd: 50000.0
    });
    setSelectedAudit(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Scale className="w-7 h-7 text-indigo-400" />
              International Sales Contracts & AI CISG Risk Auditor
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              UN CISG 1980 sales agreements with automated AI legal risk audit for Incoterms 2020 shifts and credit term exposures.
            </p>
          </div>
        </div>

        {/* Contracts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contracts.map((c) => (
            <div key={c.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{c.number}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{c.buyer}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                  c.riskRating === 'LOW_RISK'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  Risk Score: {c.riskScore}/100
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Governing Law:</span>
                  <span className="text-indigo-300 font-bold">{c.governingLaw}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Arbitration Forum:</span>
                  <span className="text-slate-200">{c.arbitrationForum}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Payment & Incoterms:</span>
                  <span className="text-amber-300">{c.paymentTerms} ({c.incoterms})</span>
                </div>
              </div>

              <button
                onClick={() => handleRunAiAudit(c.number, c.governingLaw, c.arbitrationForum, c.paymentTerms, c.incoterms)}
                className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 rounded-xl text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Run AI CISG Legal Audit</span>
              </button>
            </div>
          ))}
        </div>

        {/* Audit Result Display */}
        {selectedAudit && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                AI Legal Audit Report: {selectedAudit.contractNumber}
              </h3>
              <span className="text-xs font-mono font-bold text-indigo-300">
                Score: {selectedAudit.overallRiskScore}/100 ({selectedAudit.riskRating})
              </span>
            </div>

            {selectedAudit.riskFlags.map((flag, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>{flag.title} [{flag.category}]</span>
                  <span className="text-rose-400">{flag.severity}</span>
                </div>
                <p className="text-slate-300">{flag.finding}</p>
                <p className="text-indigo-400 font-medium pt-1">Recommendation: {flag.recommendation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
