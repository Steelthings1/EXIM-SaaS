"use client";

import React, { useState } from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, FileText, AlertTriangle, Scale, Building } from 'lucide-react';
import { auditLetterOfCredit, LcAuditResult, LcTermsPayload, ShippingDocumentsPayload } from '@/lib/lc-checker-engine';

export default function LcCheckerAuditorPage() {
  const [lcNumber, setLcNumber] = useState('LC-SWIFT-2026-904');
  const [issuingBank, setIssuingBank] = useState('First Abu Dhabi Bank (Dubai)');
  const [latestShipmentDate, setLatestShipmentDate] = useState('2026-02-15');
  const [transshipmentAllowed, setTransshipmentAllowed] = useState(false);
  const [lcAmountUsd, setLcAmountUsd] = useState(50250.0);

  const [blDate, setBlDate] = useState('2026-02-10');
  const [transshipmentOccurred, setTransshipmentOccurred] = useState(false);
  const [invoiceWeightKg, setInvoiceWeightKg] = useState(1000.0);
  const [blWeightKg, setBlWeightKg] = useState(1000.0);

  const [auditResult, setAuditResult] = useState<LcAuditResult | null>(null);

  const handleRunAudit = () => {
    const lcPayload: LcTermsPayload = {
      lcNumber,
      expiryDate: '2026-03-15',
      latestShipmentDate,
      partialShipmentAllowed: true,
      transshipmentAllowed,
      maxPresentationDays: 21,
      lcAmountUsd
    };

    const docsPayload: ShippingDocumentsPayload = {
      invoiceNumber: 'INV-EXIM-2026-0091',
      invoiceDate: '2026-02-05',
      invoiceAmountUsd: lcAmountUsd,
      blNumber: 'BL-MAERSK-90041',
      blShapedDate: blDate,
      blTransshipmentOccurred: transshipmentOccurred,
      grossWeightKgInvoice: invoiceWeightKg,
      grossWeightKgBl: blWeightKg
    };

    const res = auditLetterOfCredit(lcPayload, docsPayload);
    setAuditResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldAlert className="w-7 h-7 text-indigo-400" />
              Letter of Credit (LC) UCP 600 & ISBP 745 Discrepancy Auditor
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Pre-presentation documentary credit audit engine detecting late shipment, transshipment violations, and weight discrepancies prior to bank submission.
            </p>
          </div>

          <button
            onClick={handleRunAudit}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>Audit Documents Against UCP 600</span>
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          {/* LC Terms Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-400" />
              LC Terms & Conditions (SWIFT MT700)
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 font-sans mb-1">LC Number & Issuing Bank</label>
                <input
                  type="text"
                  value={lcNumber}
                  onChange={(e) => setLcNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-sans mb-1">LC Latest Shipment Date</label>
                <input
                  type="date"
                  value={latestShipmentDate}
                  onChange={(e) => setLatestShipmentDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="transshipmentAllowed"
                  checked={transshipmentAllowed}
                  onChange={(e) => setTransshipmentAllowed(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                <label htmlFor="transshipmentAllowed" className="text-slate-300 font-sans">
                  Transshipment Allowed in LC
                </label>
              </div>
            </div>
          </div>

          {/* Shipping Docs Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Actual Shipping Documents Data
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 font-sans mb-1">Bill of Lading Shipped-on-Board Date</label>
                <input
                  type="date"
                  value={blDate}
                  onChange={(e) => setBlDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-sans mb-1">Invoice Gross Wt (kg)</label>
                  <input
                    type="number"
                    value={invoiceWeightKg}
                    onChange={(e) => setInvoiceWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-sans mb-1">B/L Gross Wt (kg)</label>
                  <input
                    type="number"
                    value={blWeightKg}
                    onChange={(e) => setBlWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="transshipmentOccurred"
                  checked={transshipmentOccurred}
                  onChange={(e) => setTransshipmentOccurred(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                <label htmlFor="transshipmentOccurred" className="text-slate-300 font-sans">
                  Transshipment Port Loading Occurred on B/L
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Results Display */}
        {auditResult && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                UCP 600 Pre-Presentation Audit Results
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                auditResult.isCompliantUcp600
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {auditResult.status} ({auditResult.discrepanciesFoundCount} Discrepancies)
              </span>
            </div>

            {auditResult.discrepancies.length === 0 ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>CLEAN PRESENTATION APPROVED: Documents 100% compliant with UCP 600 rules. Safe for negotiating bank presentation!</span>
              </div>
            ) : (
              <div className="space-y-3">
                {auditResult.discrepancies.map((disc, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1 text-xs font-mono">
                    <div className="flex items-center justify-between font-bold text-amber-300">
                      <span>{disc.title} [{disc.ucp600Article}]</span>
                      <span className="text-rose-400">{disc.severity}</span>
                    </div>
                    <p className="text-slate-300 font-sans">{disc.finding}</p>
                    <p className="text-indigo-400 font-sans font-medium pt-1">Remedy Action: {disc.remedyAction}</p>
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
