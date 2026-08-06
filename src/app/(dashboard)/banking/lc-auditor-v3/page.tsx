"use client";

import React, { useState } from 'react';
import { Landmark, ShieldAlert, CheckCircle2, AlertTriangle, Scale, FileText } from 'lucide-react';
import { auditLcPresentation, LcAuditResult } from '@/lib/banking-auditor-engine';

export default function LcAuditorV3Page() {
  const [lcNum, setLcNum] = useState('LC-DB-2026-9041');
  const [issuingBank, setIssuingBank] = useState('Emirates NBD Dubai');
  const [advisingBank, setAdvisingBank] = useState('State Bank of India');
  const [lcAmount, setLcAmount] = useState(50000);
  const [invAmount, setInvAmount] = useState(49000);
  const [lastShipDate, setLastShipDate] = useState('2026-02-15');
  const [actualShipDate, setActualShipDate] = useState('2026-02-01');
  const [presDate, setPresDate] = useState('2026-02-10');
  const [allowTransshipment, setAllowTransshipment] = useState(false);
  const [isTransshipped, setIsTransshipped] = useState(false);
  const [invWeight, setInvWeight] = useState(12500);
  const [blWeight, setBlWeight] = useState(12500);

  const [result, setResult] = useState<LcAuditResult | null>(null);

  const handleAudit = () => {
    const res = auditLcPresentation({
      lcNumber: lcNum,
      issuingBank,
      advisingBank,
      lcAmountUsd: lcAmount,
      invoiceAmountUsd: invAmount,
      latestShipmentDate: lastShipDate,
      actualShipmentDate: actualShipDate,
      presentationDate: presDate,
      allowTransshipment,
      isTransshipped,
      invoiceWeightKg: invWeight,
      blWeightKg: blWeight
    });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Landmark className="w-7 h-7 text-indigo-400" />
            Letter of Credit UCP 600 & ISBP 745 Auditor V3
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pre-presentation audit engine evaluating Commercial Invoices, Bills of Lading, and Packing Lists against LC terms before bank submission.
          </p>
        </div>

        {/* Audit Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-400" />
            Input Presentation Document Terms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">LC Number</label>
              <input type="text" value={lcNum} onChange={(e) => setLcNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Issuing Bank</label>
              <input type="text" value={issuingBank} onChange={(e) => setIssuingBank(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Advising Bank</label>
              <input type="text" value={advisingBank} onChange={(e) => setAdvisingBank(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">LC Limit Amount ($ USD)</label>
              <input type="number" value={lcAmount} onChange={(e) => setLcAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Invoice Value ($ USD)</label>
              <input type="number" value={invAmount} onChange={(e) => setInvAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Actual Shipment Date</label>
              <input type="date" value={actualShipDate} onChange={(e) => setActualShipDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Presentation Date to Bank</label>
              <input type="date" value={presDate} onChange={(e) => setPresDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Invoice Weight (KG)</label>
              <input type="number" value={invWeight} onChange={(e) => setInvWeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">BL Weight (KG)</label>
              <input type="number" value={blWeight} onChange={(e) => setBlWeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div className="md:col-span-3 flex items-center gap-6 font-sans text-xs pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={allowTransshipment} onChange={(e) => setAllowTransshipment(e.target.checked)} className="rounded" />
                <span>LC Allows Transshipment</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isTransshipped} onChange={(e) => setIsTransshipped(e.target.checked)} className="rounded" />
                <span>Shipment Transshipped En-Route</span>
              </label>
            </div>
          </div>

          <button onClick={handleAudit}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Execute UCP 600 Pre-Presentation Discrepancy Audit</span>
          </button>
        </div>

        {/* Audit Output */}
        {result && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase">UCP 600 Audit Report — {result.auditId}</h2>
              <span className={`px-2.5 py-0.5 rounded font-bold ${
                result.isCompliant ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
              }`}>
                {result.auditStatus}
              </span>
            </div>

            {result.isCompliant ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 text-emerald-300 flex items-center gap-3 font-sans">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Presentation documents are fully compliant with UCP 600 & ISBP 745 rules. Ready for bank submission!</span>
              </div>
            ) : (
              <div className="space-y-3 font-sans">
                <h3 className="text-rose-400 font-bold uppercase text-xs">Discrepancies Detected ({result.discrepancies.length}):</h3>
                {result.discrepancies.map((disc, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-rose-500/30 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 text-rose-200 text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{disc}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold text-[10px] shrink-0 border border-rose-500/30">
                      {result.articleReferences[idx]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
