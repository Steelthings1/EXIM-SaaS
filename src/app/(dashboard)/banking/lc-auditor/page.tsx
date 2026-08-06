"use client";

import React, { useState } from 'react';
import { Landmark, ShieldAlert, CheckCircle2, FileCheck, Search, AlertTriangle } from 'lucide-react';
import { auditLcPresentation, LcAuditResult } from '@/lib/trade-finance-engine';

export default function LcAuditorPage() {
  const [lcNum, setLcNum] = useState('LC-DB-2026-9041');
  const [issuingBank, setIssuingBank] = useState('Deutsche Bank AG (Frankfurt)');
  const [advisingBank, setAdvisingBank] = useState('State Bank of India (Mumbai)');
  const [lcAmount, setLcAmount] = useState(50000);
  const [invoiceAmount, setInvoiceAmount] = useState(49000);
  const [expiry, setExpiry] = useState('2026-03-15');
  const [shipmentDate, setShipmentDate] = useState('2026-02-05');
  const [presentationDays, setPresentationDays] = useState(21);
  const [transshipmentAllowed, setTransshipmentAllowed] = useState(true);
  const [transshipmentOccurred, setTransshipmentOccurred] = useState(false);
  const [invoiceWeight, setInvoiceWeight] = useState(12500);
  const [blWeight, setBlWeight] = useState(12500);
  const [result, setResult] = useState<LcAuditResult | null>(null);

  const [audits, setAudits] = useState([
    {
      id: 'lc-101',
      lcNum: 'LC-DB-2026-9041',
      issuingBank: 'Deutsche Bank AG',
      lcAmount: 50000.00,
      invoiceAmount: 49000.00,
      discrepancyCount: 0,
      status: 'AUDITED_COMPLIANT'
    }
  ]);

  const handleAuditLc = () => {
    const res = auditLcPresentation({
      lcNumber: lcNum,
      issuingBank,
      advisingBank,
      lcAmountUsd: lcAmount,
      invoiceAmountUsd: invoiceAmount,
      expiryDate: expiry,
      shipmentDate,
      presentationPeriodDays: presentationDays,
      transshipmentAllowed,
      actualTransshipmentOccurred: transshipmentOccurred,
      weightOnInvoiceKg: invoiceWeight,
      weightOnBlKg: blWeight
    });
    setResult(res);

    setAudits([
      {
        id: `lc-${Date.now()}`,
        lcNum,
        issuingBank,
        lcAmount,
        invoiceAmount,
        discrepancyCount: res.discrepancyCount,
        status: res.status
      },
      ...audits
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Landmark className="w-7 h-7 text-indigo-400" />
            Letter of Credit UCP 600 & ISBP 745 Pre-Presentation Auditor
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Audit Commercial Invoices, Bills of Lading, and Packing Lists against Letter of Credit clauses prior to bank submission to eliminate discrepancies.
          </p>
        </div>

        {/* Audit Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Enter Presentation Document Clauses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">LC Reference Number</label>
              <input type="text" value={lcNum} onChange={(e) => setLcNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Issuing Bank Name</label>
              <input type="text" value={issuingBank} onChange={(e) => setIssuingBank(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Advising / Confirming Bank</label>
              <input type="text" value={advisingBank} onChange={(e) => setAdvisingBank(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">LC Value ($ USD)</label>
              <input type="number" value={lcAmount} onChange={(e) => setLcAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Invoice Value ($ USD)</label>
              <input type="number" value={invoiceAmount} onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Invoice Weight (kg)</label>
              <input type="number" value={invoiceWeight} onChange={(e) => setInvoiceWeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">B/L Weight (kg)</label>
              <input type="number" value={blWeight} onChange={(e) => setBlWeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleAuditLc}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Execute UCP 600 Pre-Presentation Discrepancy Audit</span>
          </button>
        </div>

        {/* Audit Output */}
        {result && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase">Discrepancy Audit Report for {result.lcNumber}</h2>
              <span className={`px-2.5 py-0.5 rounded font-bold ${
                result.isCompliant ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {result.isCompliant ? 'UCP 600 COMPLIANT (0 Discrepancies)' : `DISCREPANT (${result.discrepancyCount} Discrepancies)`}
              </span>
            </div>

            {result.discrepancies.length > 0 ? (
              <div className="space-y-2">
                <span className="text-rose-400 font-bold block font-sans">UCP 600 / ISBP 745 Discrepancies Detected:</span>
                {result.discrepancies.map((disc, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-rose-500/30 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{disc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30 text-emerald-300">
                <span>All documents strictly comply with UCP 600 Art. 14, 18, and ISBP 745 Para A40. Safe for bank presentation.</span>
              </div>
            )}
          </div>
        )}

        {/* Audited LCs Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            LC Presentation Audit History
          </h2>

          <div className="space-y-3">
            {audits.map((a) => (
              <div key={a.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{a.lcNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{a.issuingBank}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">LC / Invoice Value</span>
                    <span className="text-indigo-300 font-bold">${a.lcAmount.toLocaleString()} / ${a.invoiceAmount.toLocaleString()}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded font-bold ${
                    a.discrepancyCount === 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {a.discrepancyCount === 0 ? 'COMPLIANT' : `${a.discrepancyCount} DISCREPANCIES`}
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
