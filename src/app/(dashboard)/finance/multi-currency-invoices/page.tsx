"use client";

import React, { useState } from 'react';
import { DollarSign, Plus, TrendingUp, TrendingDown, FileText } from 'lucide-react';

export default function MultiCurrencyInvoicesPage() {
  const [invoices, setInvoices] = useState([
    {
      id: 'inv-101',
      invoiceNumber: 'INV-EXIM-2026-0091',
      buyerName: 'Gulf Trading Enterprise FZE (Dubai)',
      currency: 'USD',
      amountFc: 50250.00,
      bookingRate: 83.00,
      realizedRate: 83.50,
      forexGainInr: 25125.00, // (83.50 - 83.00) * 50250
      status: 'PAID'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <DollarSign className="w-7 h-7 text-indigo-400" />
              Multi-Currency Commercial Invoicing & Realized FX Gain/Loss
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Issue foreign currency commercial export invoices, track booking vs realized spot exchange rates, and ledger realized forex gains.
            </p>
          </div>
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div key={inv.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{inv.invoiceNumber}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{inv.buyerName}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {inv.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Invoice Amount</span>
                  <span className="text-indigo-300 font-bold">${inv.amountFc.toLocaleString()} USD</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Booking Rate</span>
                  <span className="text-slate-200">&#8377;{inv.bookingRate.toFixed(2)}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Realized Bank Rate</span>
                  <span className="text-slate-200">&#8377;{inv.realizedRate.toFixed(2)}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Realized Forex Gain</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +&#8377;{inv.forexGainInr.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
