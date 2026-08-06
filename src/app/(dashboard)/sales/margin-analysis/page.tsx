"use client";

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calculator } from 'lucide-react';
import { processExportQuotation, QuotationResult } from '@/lib/sales-quotation-engine';

export default function MarginAnalysisPage() {
  const [subtotal, setSubtotal] = useState(46250);
  const [freight, setFreight] = useState(2500);
  const [insurance, setInsurance] = useState(250);
  const [cost, setCost] = useState(38000);
  const [result, setResult] = useState<QuotationResult | null>(null);

  const handleCalcMargin = () => {
    const res = processExportQuotation({
      quoteNumber: 'MARGIN-CALC',
      buyerName: 'Margin Calculator',
      incoterm: 'CIF',
      currency: 'USD',
      subtotalAmount: subtotal,
      freightAmount: freight,
      insuranceAmount: insurance,
      costAmount: cost
    });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-indigo-400" />
            Profit Margin Analysis & Calculator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Interactive margin calculator displaying gross profit amounts, gross margin percentages, and total CIF quotation values.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Enter Price Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Subtotal ($ USD)</label>
              <input type="number" value={subtotal} onChange={(e) => setSubtotal(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Freight ($ USD)</label>
              <input type="number" value={freight} onChange={(e) => setFreight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Insurance ($ USD)</label>
              <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 font-sans mb-1">Cost of Goods ($ USD)</label>
              <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCalcMargin}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Calculate Gross Margin & Profit Analysis</span>
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3">Revenue Breakdown</h2>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="text-slate-200">${result.subtotalAmount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">+ Freight</span><span className="text-slate-200">${result.freightAmount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">+ Insurance</span><span className="text-slate-200">${result.insuranceAmount.toLocaleString()}</span></div>
                <div className="flex justify-between border-t border-slate-800 pt-2"><span className="text-white font-bold">Total CIF Offer</span><span className="text-indigo-300 font-bold">${result.totalOfferAmount.toLocaleString()}</span></div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3">Profitability Analysis</h2>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-400">Total Revenue</span><span className="text-slate-200">${result.totalOfferAmount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Cost of Goods</span><span className="text-rose-300">${result.costAmount.toLocaleString()}</span></div>
                <div className="flex justify-between border-t border-slate-800 pt-2"><span className="text-white font-bold">Gross Profit</span><span className="text-emerald-400 font-bold">${result.grossProfitAmount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-white font-bold">Gross Margin</span><span className="text-emerald-400 font-bold text-lg">{result.grossMarginPct}%</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
