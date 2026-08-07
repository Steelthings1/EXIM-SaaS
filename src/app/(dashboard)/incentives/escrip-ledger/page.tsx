"use client";

import React, { useState } from 'react';
import { Award, CheckCircle2, DollarSign, ArrowRightLeft } from 'lucide-react';
import { utilizeEscripCredit, EscripUtilizeResult } from '@/lib/export-incentive-engine';

export default function EscripLedgerPage() {
  const [scrollNum, setScrollNum] = useState('SCRL-ICEGATE-2026-88123');
  const [currentBalance, setCurrentBalance] = useState(57281);
  const [offsetAmount, setOffsetAmount] = useState(20000);
  const [beNum, setBeNum] = useState('BE-INNSA-2026-10492');

  const [result, setResult] = useState<EscripUtilizeResult | null>(null);

  const [escrips, setEscrips] = useState([
    {
      id: 'esc-101',
      scrollNum: 'SCRL-ICEGATE-2026-88123',
      scheme: 'RODTEP',
      issuedInr: 57281.00,
      utilizedInr: 20000.00,
      balanceInr: 37281.00,
      expDate: '2027-02-03'
    }
  ]);

  const handleUtilize = () => {
    const res = utilizeEscripCredit(currentBalance, {
      scrollNumber: scrollNum,
      dutyOffsetAmountInr: offsetAmount,
      importBillOfEntry: beNum
    });
    setResult(res);

    setCurrentBalance(res.remainingBalanceInr);
    setEscrips([
      {
        id: `esc-${Date.now()}`,
        scrollNum: res.scrollNumber,
        scheme: 'RODTEP',
        issuedInr: 57281.00,
        utilizedInr: 57281.00 - res.remainingBalanceInr,
        balanceInr: res.remainingBalanceInr,
        expDate: '2027-02-03'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Award className="w-7 h-7 text-indigo-400" />
            DGFT e-Scrip Credit Balance & Duty Offset Trading Ledger
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor active ICEGATE e-scrip scroll balances and offset basic customs duty on import Bills of Entry (BOE).
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
            Offset Import Duty Using e-Scrip Balance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">e-Scrip Scroll Number</label>
              <input type="text" value={scrollNum} onChange={(e) => setScrollNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Import Bill of Entry (BOE)</label>
              <input type="text" value={beNum} onChange={(e) => setBeNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Duty Offset Amount (₹ INR)</label>
              <input type="number" value={offsetAmount} onChange={(e) => setOffsetAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleUtilize}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Apply Duty Offset Against Import Bill of Entry</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>Offset of ₹ {result.utilizedInr.toLocaleString()} applied against BOE {result.importBillOfEntry}! Remaining balance: ₹ {result.remainingBalanceInr.toLocaleString()}.</span>
          </div>
        )}

        {/* Ledger */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active ICEGATE e-Scrip Scrolls Ledger
          </h2>

          <div className="space-y-3">
            {escrips.map((e) => (
              <div key={e.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{e.scrollNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Scheme: {e.scheme} &bull; Issued: ₹{e.issuedInr.toLocaleString()} &bull; Utilized: ₹{e.utilizedInr.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Available Balance</span>
                    <span className="text-emerald-400 font-bold">₹ {e.balanceInr.toLocaleString()}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    EXP: {e.expDate}
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
