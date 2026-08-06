"use client";

import React, { useState } from 'react';
import { ShieldCheck, Search, Building2, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { verifyKybStatutoryIdentity, TaxIdType, KybVerificationResult } from '@/lib/kyb-verification-engine';

export default function KybVerifierPage() {
  const [taxIdType, setTaxIdType] = useState<TaxIdType>('UAE_TRN');
  const [taxIdNumber, setTaxIdNumber] = useState('100412890412803');
  const [annualTurnover, setAnnualTurnover] = useState(2500000);
  const [creditRequested, setCreditRequested] = useState(100000);
  const [verificationResult, setVerificationResult] = useState<KybVerificationResult | null>(null);

  const handleVerify = () => {
    const res = verifyKybStatutoryIdentity({
      taxIdType,
      taxIdNumber,
      annualTurnoverUsd: annualTurnover,
      creditLimitRequestedUsd: creditRequested
    });
    setVerificationResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
              Know Your Business (KYB) Statutory Identity & Credit Risk Auditor
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Audit GSTIN, UAE TRN, and UK VAT tax registration formats and assess corporate credit risk limits for international buyers.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Statutory Tax ID Format Type</label>
              <select
                value={taxIdType}
                onChange={(e) => setTaxIdType(e.target.value as TaxIdType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              >
                <option value="UAE_TRN">UAE TRN (15 Digits)</option>
                <option value="GSTIN">Indian GSTIN (15 Alphanumeric)</option>
                <option value="UK_VAT">UK VAT (GB + 9 Digits)</option>
                <option value="US_EIN">US EIN (9 Digits)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Tax Registration Number</label>
              <input
                type="text"
                value={taxIdNumber}
                onChange={(e) => setTaxIdNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Annual Corporate Turnover ($ USD)</label>
              <input
                type="number"
                value={annualTurnover}
                onChange={(e) => setAnnualTurnover(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Requested Credit Limit ($ USD)</label>
              <input
                type="number"
                value={creditRequested}
                onChange={(e) => setCreditRequested(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Run KYB Statutory Audit & Credit Risk Assessment</span>
          </button>
        </div>

        {/* Verification Result Card */}
        {verificationResult && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                KYB Verification Audit Output
              </h2>

              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                verificationResult.creditRiskRating === 'LOW_RISK'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                Credit Risk: {verificationResult.creditRiskRating}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Verification Status</span>
                <span className="text-emerald-400 font-bold">{verificationResult.verificationStatus}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Recommended Credit Limit</span>
                <span className="text-indigo-300 font-bold">${verificationResult.recommendedCreditLimitUsd.toLocaleString()} USD</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans border-t border-slate-800 pt-3">
              {verificationResult.auditNotes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
