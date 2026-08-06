"use client";

import React, { useState } from 'react';
import { Landmark, ArrowLeftRight, CheckCircle2, DollarSign } from 'lucide-react';
import { reconcileIrmRemittance, IrmReconciliationResult } from '@/lib/trade-finance-engine';

export default function EdpmsReconciliationPage() {
  const [sbNum, setSbNum] = useState('SB-INNSA-904128');
  const [irmRef, setIrmRef] = useState('IRM-SBI-904128');
  const [amountUsd, setAmountUsd] = useState(49000);
  const [rate, setRate] = useState(83.50);
  const [result, setResult] = useState<IrmReconciliationResult | null>(null);

  const [records, setRecords] = useState([
    {
      id: 'ebrc-101',
      ebrcNum: 'EBRC-EXIM-2026-9041',
      sbNum: 'SB-INNSA-904128',
      irmRef: 'IRM-SBI-904128',
      amountUsd: 49000.00,
      amountInr: 4091500.00,
      status: 'CLOSED'
    }
  ]);

  const handleReconcile = () => {
    const res = reconcileIrmRemittance({
      shippingBillNumber: sbNum,
      irmReference: irmRef,
      realizedAmountUsd: amountUsd,
      exchangeRateInrUsd: rate
    });
    setResult(res);

    setRecords([
      {
        id: `ebrc-${Date.now()}`,
        ebrcNum: res.ebrcNumber,
        sbNum,
        irmRef,
        amountUsd,
        amountInr: res.realizedAmountInr,
        status: res.edpmsClosureStatus
      },
      ...records
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ArrowLeftRight className="w-7 h-7 text-indigo-400" />
            Central Bank eBRC & EDPMS Remittance Reconciliation
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Reconcile Inward Remittance References (IRM) against Customs Shipping Bills to issue Electronic Bank Realisation Certificates (eBRC) and close RBI EDPMS records.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Reconcile Inward Remittance (IRM)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Customs Shipping Bill</label>
              <input type="text" value={sbNum} onChange={(e) => setSbNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Inward Remittance (IRM)</label>
              <input type="text" value={irmRef} onChange={(e) => setIrmRef(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Realized Amount ($ USD)</label>
              <input type="number" value={amountUsd} onChange={(e) => setAmountUsd(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Exchange Rate (₹ / $)</label>
              <input type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleReconcile}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Generate eBRC Certificate & Close EDPMS Status</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>eBRC Certificate {result.ebrcNumber} issued for ₹ {result.realizedAmountInr.toLocaleString()}! EDPMS status marked CLOSED.</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Reconciled eBRC & EDPMS Ledger
          </h2>

          <div className="space-y-3">
            {records.map((r) => (
              <div key={r.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{r.ebrcNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Shipping Bill: {r.sbNum} &bull; IRM: {r.irmRef}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Realized Value</span>
                    <span className="text-emerald-400 font-bold">${r.amountUsd.toLocaleString()} (₹ {r.amountInr.toLocaleString()})</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    EDPMS: {r.status}
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
