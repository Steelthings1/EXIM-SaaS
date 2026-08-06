"use client";

import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, ShieldCheck, Anchor } from 'lucide-react';
import { generateShippingInstruction, ShippingInstructionResult } from '@/lib/freight-quote-engine';

export default function ShippingInstructionsPage() {
  const [bkgRef, setBkgRef] = useState('BKG-MSC-904128');
  const [shipper, setShipper] = useState('Ahamla Organics Pvt Ltd (Bengaluru, India)');
  const [consignee, setConsignee] = useState('Arabica Imports GmbH (Hamburg, Germany)');
  const [vessel, setVessel] = useState('MSC Oscar');
  const [voyage, setVoyage] = useState('2604W');
  const [container, setContainer] = useState('MSCU-9041285');
  const [seal, setSeal] = useState('SEAL-MSC-9041');
  const [result, setResult] = useState<ShippingInstructionResult | null>(null);

  const [sis, setSis] = useState([
    {
      id: 'si-101',
      siNumber: 'SI-EXIM-2026-9041',
      bkgRef: 'BKG-MSC-904128',
      vessel: 'MSC Oscar (Voyage 2604W)',
      container: 'MSCU-9041285',
      status: 'SUBMITTED'
    }
  ]);

  const handleSubmitSi = () => {
    const res = generateShippingInstruction({
      bookingReference: bkgRef,
      shipperName: shipper,
      consigneeName: consignee,
      vesselName: vessel,
      voyageNumber: voyage,
      containerNumber: container,
      sealNumber: seal
    });
    setResult(res);

    setSis([
      {
        id: `si-${Date.now()}`,
        siNumber: res.siNumber,
        bkgRef,
        vessel: `${vessel} (Voyage ${voyage})`,
        container,
        status: res.status
      },
      ...sis
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-indigo-400" />
            Shipping Instructions (SI) Dispatch & Bill of Lading Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Submit final Shipping Instructions (SI) to ocean carriers for draft Bill of Lading (B/L) generation and container seal registration.
          </p>
        </div>

        {/* SI Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Dispatch Shipping Instructions (SI) Payload
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Carrier Booking Ref</label>
              <input
                type="text"
                value={bkgRef}
                onChange={(e) => setBkgRef(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Shipper Name</label>
              <input
                type="text"
                value={shipper}
                onChange={(e) => setShipper(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Consignee Name</label>
              <input
                type="text"
                value={consignee}
                onChange={(e) => setConsignee(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Vessel Name</label>
              <input
                type="text"
                value={vessel}
                onChange={(e) => setVessel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Voyage Number</label>
              <input
                type="text"
                value={voyage}
                onChange={(e) => setVoyage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Container Number</label>
              <input
                type="text"
                value={container}
                onChange={(e) => setContainer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Seal Number</label>
              <input
                type="text"
                value={seal}
                onChange={(e) => setSeal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleSubmitSi}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Submit Shipping Instructions to Ocean Carrier</span>
          </button>
        </div>

        {/* Output Result */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>Shipping Instructions {result.siNumber} submitted! Carrier booking {result.bookingReference} linked for draft B/L.</span>
          </div>
        )}

        {/* SI Registry Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Submitted Shipping Instructions Registry
          </h2>

          <div className="space-y-3">
            {sis.map((s) => (
              <div key={s.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{s.siNumber}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{s.vessel} &bull; Container: {s.container}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-slate-400">Booking: {s.bkgRef}</span>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {s.status}
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
