"use client";

import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, DollarSign, Landmark } from 'lucide-react';
import { processEdpmsClosure, EdpmsClosureResult } from '@/lib/banking-auditor-engine';

export default function EdpmsClosuresV3Page() {
  const [sbNum, setSbNum] = useState('SB-INNSA-904128');
  const [portCode, setPortCode] = useState('INNSA1');
  const [fobInr, setFobInr] = useState(4091500);
  const [irmRef, setIrmRef] = useState('IRM-SBI-904128');
  const [receivedUsd, setReceivedUsd] = useState(49000);
  const [exchangeRate, setExchangeRate] = useState(83.50);

  const [result, setResult] = useState<EdpmsClosureResult | null>(null);

  const [closures, setClosures] = useState([
    {
      id: 'clos-101',
      ebrcNum: 'EBRC-RBI-2026-9041',
      sbNum: 'SB-INNSA-904128',
      portCode: 'INNSA1',
      fobInr: 4091500.00,
      irmRef: 'IRM-SBI-904128',
      status: 'CLOSED'
    }
  ]);

  const handleCloseEdpms = () => {
    const res = processEdpmsClosure({
      shippingBillNumber: sbNum,
      portCode,
      fobValueInr: fobInr,
      irmReference: irmRef,
      realizedAmountUsd: receivedUsd,
      exchangeRate
    });
    setResult(res);

    setClosures([
      {
        id: res.closureId,
        ebrcNum: res.ebrcNumber,
        sbNum,
        portCode,
        fobInr,
        irmRef,
        status: res.edpmsStatus
      },
      ...closures
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Landmark className="w-7 h-7 text-indigo-400" />
            Central Bank eBRC & RBI EDPMS Inward Remittance Reconciliation V3
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Reconcile Inward Remittance References (IRM) against Customs Shipping Bills to issue Electronic Bank Realisation Certificates (eBRC) and close RBI EDPMS records.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-indigo-400" />
            Reconcile Inward Remittance (IRM)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Customs Shipping Bill</label>
              <input type="text" value={sbNum} onChange={(e) => setSbNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Customs Port Code</label>
              <input type="text" value={portCode} onChange={(e) => setPortCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">FOB Value (₹ INR)</label>
              <input type="number" value={fobInr} onChange={(e) => setFobInr(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Inward Remittance (IRM)</label>
              <input type="text" value={irmRef} onChange={(e) => setIrmRef(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Realized Amount ($ USD)</label>
              <input type="number" value={receivedUsd} onChange={(e) => setReceivedUsd(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Exchange Rate (₹ / $)</label>
              <input type="number" step="0.01" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCloseEdpms}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Generate Central Bank eBRC & Close EDPMS File</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>Certificate {result.ebrcNumber} generated for ₹ {result.realizedAmountInr.toLocaleString()}! RBI EDPMS record marked CLOSED.</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Central Bank eBRC & EDPMS Ledger V3
          </h2>

          <div className="space-y-3">
            {closures.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{c.ebrcNum}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Shipping Bill: {c.sbNum} ({c.portCode}) &bull; IRM: {c.irmRef}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Realized Value</span>
                    <span className="text-emerald-400 font-bold">₹ {c.fobInr.toLocaleString()}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    EDPMS: {c.status}
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
