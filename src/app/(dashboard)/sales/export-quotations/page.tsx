"use client";

import React, { useState } from 'react';
import { FileText, Plus, DollarSign, Globe, CheckCircle2, Clock } from 'lucide-react';
import { processExportQuotation, QuotationResult } from '@/lib/sales-quotation-engine';

export default function ExportQuotationsPage() {
  const [buyer, setBuyer] = useState('Arabica Imports GmbH (Hamburg)');
  const [incoterm, setIncoterm] = useState('CIF');
  const [subtotal, setSubtotal] = useState(46250);
  const [freight, setFreight] = useState(2500);
  const [insurance, setInsurance] = useState(250);
  const [cost, setCost] = useState(38000);
  const [validity, setValidity] = useState(30);
  const [result, setResult] = useState<QuotationResult | null>(null);

  const [quotes, setQuotes] = useState([
    {
      id: 'q-101',
      quoteNumber: 'QTN-EXIM-2026-0041',
      buyer: 'Arabica Imports GmbH (Hamburg)',
      incoterm: 'CIF',
      total: 49000.00,
      marginPct: 22.45,
      validUntil: '2026-03-03',
      status: 'SENT'
    }
  ]);

  const handleCreateQuotation = () => {
    const res = processExportQuotation({
      quoteNumber: `QTN-EXIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: buyer,
      incoterm,
      currency: 'USD',
      subtotalAmount: subtotal,
      freightAmount: freight,
      insuranceAmount: insurance,
      costAmount: cost,
      validityDays: validity
    });
    setResult(res);

    setQuotes([
      {
        id: `q-${Date.now()}`,
        quoteNumber: res.quoteNumber,
        buyer,
        incoterm,
        total: res.totalOfferAmount,
        marginPct: res.grossMarginPct,
        validUntil: res.validUntil,
        status: res.status
      },
      ...quotes
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-indigo-400" />
            Export Sales Quotations & Proforma Invoice Builder
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Build price offers with Incoterms, freight/insurance additions, validity windows, and gross margin analysis.
          </p>
        </div>

        {/* Input Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Create New Export Quotation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Buyer Name</label>
              <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Incoterm</label>
              <select value={incoterm} onChange={(e) => setIncoterm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="CIF">CIF</option>
                <option value="FOB">FOB</option>
                <option value="CFR">CFR</option>
                <option value="EXW">EXW</option>
                <option value="DDP">DDP</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Subtotal ($ USD)</label>
              <input type="number" value={subtotal} onChange={(e) => setSubtotal(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Cost of Goods ($ USD)</label>
              <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Freight Charges ($ USD)</label>
              <input type="number" value={freight} onChange={(e) => setFreight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Insurance Premium ($ USD)</label>
              <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Validity (Days)</label>
              <input type="number" value={validity} onChange={(e) => setValidity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCreateQuotation}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Generate Export Quotation & Margin Analysis</span>
          </button>
        </div>

        {/* Margin Result */}
        {result && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Quotation {result.quoteNumber} — Margin Analysis
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Total CIF Offer</span>
                <span className="text-indigo-300 font-bold">${result.totalOfferAmount.toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Cost of Goods</span>
                <span className="text-slate-200 font-bold">${result.costAmount.toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Gross Profit</span>
                <span className="text-emerald-400 font-bold">${result.grossProfitAmount.toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Gross Margin %</span>
                <span className="text-emerald-400 font-bold text-lg">{result.grossMarginPct}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Quotations List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Export Quotations Registry
          </h2>
          <div className="space-y-3">
            {quotes.map((q) => (
              <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white">{q.quoteNumber}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{q.buyer} &bull; {q.incoterm}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Offer</span>
                    <span className="text-indigo-300 font-bold">${q.total.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Gross Margin</span>
                    <span className="text-emerald-400 font-bold">{q.marginPct}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Valid Until</span>
                    <span className="text-slate-200">{q.validUntil}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {q.status}
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
