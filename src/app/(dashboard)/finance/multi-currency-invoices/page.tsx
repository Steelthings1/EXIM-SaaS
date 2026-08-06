"use client";

import React, { useState } from 'react';
import { DollarSign, FileText, CheckCircle2, ShieldCheck, Plus, ArrowRightLeft } from 'lucide-react';
import { createCommercialInvoice, CommercialInvoiceResult } from '@/lib/forex-treasury-engine';

export default function MultiCurrencyInvoicesPage() {
  const [invNum, setInvNum] = useState('INV-2026-9041');
  const [buyer, setBuyer] = useState('Dubai Trade LLC');
  const [curr, setCurr] = useState('USD');
  const [amount, setAmount] = useState(49000);
  const [rate, setRate] = useState(83.50);
  const [lut, setLut] = useState('LUT-GST-2026-9041');
  const [result, setResult] = useState<CommercialInvoiceResult | null>(null);

  const [invoices, setInvoices] = useState([
    {
      id: 'inv-101',
      invNum: 'INV-2026-9041',
      buyer: 'Dubai Trade LLC',
      curr: 'USD',
      amount: 49000.00,
      rate: 83.50,
      baseInr: 4091500.00,
      lut: 'LUT-GST-2026-9041',
      status: 'REALIZED_PAID'
    }
  ]);

  const handleCreateInvoice = () => {
    const res = createCommercialInvoice({
      invoiceNumber: invNum,
      buyerName: buyer,
      currency: curr,
      foreignAmount: amount,
      invoiceExchangeRate: rate,
      lutReference: lut
    });
    setResult(res);

    setInvoices([
      {
        id: res.invoiceId,
        invNum: res.invoiceNumber,
        buyer: res.buyerName,
        curr: res.currency,
        amount: res.foreignAmount,
        rate: res.invoiceExchangeRate,
        baseInr: res.baseAmountInr,
        lut: res.lutReference,
        status: 'UNPAID'
      },
      ...invoices
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <DollarSign className="w-7 h-7 text-indigo-400" />
            Multi-Currency Commercial Invoices & Zero-Rated GST (LUT)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Issue multi-currency export commercial invoices (USD, EUR, GBP, AED) tagged under Zero-Rated GST LUT rules (Section 16 IGST Act).
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Issue Multi-Currency Commercial Export Invoice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Invoice Number</label>
              <input type="text" value={invNum} onChange={(e) => setInvNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Buyer Entity</label>
              <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Currency</label>
              <select value={curr} onChange={(e) => setCurr(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="USD">USD ($ US Dollar)</option>
                <option value="EUR">EUR (€ Euro)</option>
                <option value="GBP">GBP (£ British Pound)</option>
                <option value="AED">AED (د.إ UAE Dirham)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Foreign Amount ({curr})</label>
              <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Invoice FX Rate (₹ / {curr})</label>
              <input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">GST LUT Reference</label>
              <input type="text" value={lut} onChange={(e) => setLut(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCreateInvoice}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Generate Invoice & Tag Zero-Rated Export LUT</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>Invoice {result.invoiceNumber} created for {result.currency} {result.foreignAmount.toLocaleString()} (₹ {result.baseAmountInr.toLocaleString()}) tagged under {result.lutReference}!</span>
          </div>
        )}

        {/* Invoices Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Multi-Currency Commercial Invoices Registry
          </h2>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{inv.invNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Buyer: {inv.buyer} &bull; LUT: {inv.lut}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Invoice Total</span>
                    <span className="text-emerald-400 font-bold">{inv.curr} {inv.amount.toLocaleString()} (₹ {inv.baseInr.toLocaleString()})</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {inv.status}
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
