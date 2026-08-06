"use client";

import React, { useState } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown, CheckCircle2, DollarSign } from 'lucide-react';
import { calculateForexRealization, ForexRealizationResult } from '@/lib/forex-treasury-engine';

export default function ForexTreasuryPage() {
  const [invNum, setInvNum] = useState('INV-2026-9041');
  const [receivedUsd, setReceivedUsd] = useState(49000);
  const [bookedRate, setBookedRate] = useState(83.50);
  const [realizedRate, setRealizedRate] = useState(84.10);
  const [irmRef, setIrmRef] = useState('IRM-SBI-904128');
  const [result, setResult] = useState<ForexRealizationResult | null>(null);

  const [realizations, setRealizations] = useState([
    {
      id: 'fx-101',
      invNum: 'INV-2026-9041',
      amountUsd: 49000.00,
      bookedRate: 83.50,
      realizedRate: 84.10,
      gainLossInr: 29400.00,
      isGain: true,
      irmRef: 'IRM-SBI-904128'
    }
  ]);

  const handleCalculateFx = () => {
    const res = calculateForexRealization({
      invoiceNumber: invNum,
      foreignAmountReceived: receivedUsd,
      invoiceExchangeRate: bookedRate,
      bankRealizedExchangeRate: realizedRate,
      irmReference: irmRef
    });
    setResult(res);

    setRealizations([
      {
        id: res.realizationId,
        invNum: res.invoiceNumber,
        amountUsd: res.foreignAmountReceived,
        bookedRate: res.invoiceExchangeRate,
        realizedRate: res.bankRealizedExchangeRate,
        gainLossInr: res.fxGainLossInr,
        isGain: res.isGain,
        irmRef: res.irmReference
      },
      ...realizations
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ArrowRightLeft className="w-7 h-7 text-indigo-400" />
            Foreign Exchange Treasury Realized Gain/Loss Calculator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Calculate spot booking rates vs bank remittance realization exchange rates to determine realized foreign exchange gain/loss in INR.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Calculate Remittance FX Gain/Loss
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Invoice Number</label>
              <input type="text" value={invNum} onChange={(e) => setInvNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Received ($ USD)</label>
              <input type="number" value={receivedUsd} onChange={(e) => setReceivedUsd(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Booked Rate (₹ / $)</label>
              <input type="number" step="0.01" value={bookedRate} onChange={(e) => setBookedRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Realized Rate (₹ / $)</label>
              <input type="number" step="0.01" value={realizedRate} onChange={(e) => setRealizedRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCalculateFx}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Calculate Realized FX Gain/Loss</span>
          </button>
        </div>

        {/* Output Result */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <h2 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Remittance Realization {result.realizationId}</span>
              <span className={`px-2.5 py-0.5 rounded font-bold ${
                result.isGain ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {result.isGain ? 'REALIZED FX GAIN' : 'REALIZED FX LOSS'}
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Booked Base (INR)</span>
                <span className="text-slate-200 font-bold">₹ {result.bookedBaseAmountInr.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Realized Base (INR)</span>
                <span className="text-slate-200 font-bold">₹ {result.realizedAmountInr.toLocaleString()}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Net FX Gain/Loss</span>
                <span className={`font-bold ${result.isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.isGain ? '+' : ''} ₹ {result.fxGainLossInr.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">IRM Ref</span>
                <span className="text-indigo-300 font-bold">{result.irmReference}</span>
              </div>
            </div>
          </div>
        )}

        {/* Realizations Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Realized Forex Treasury Ledger
          </h2>

          <div className="space-y-3">
            {realizations.map((r) => (
              <div key={r.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{r.invNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">IRM: {r.irmRef} &bull; Booked: ₹{r.bookedRate} / $ &bull; Realized: ₹{r.realizedRate} / $</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">FX Gain / Loss</span>
                    <span className={`font-bold ${r.isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {r.isGain ? '+' : ''} ₹ {r.gainLossInr.toLocaleString()}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded font-bold ${
                    r.isGain ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {r.isGain ? 'GAIN' : 'LOSS'}
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
