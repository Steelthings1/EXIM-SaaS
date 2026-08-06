"use client";

import React, { useState } from 'react';
import { Ship, Search, DollarSign, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { calculateFreightQuote, FreightQuoteResult } from '@/lib/freight-quote-engine';

export default function FreightAggregatorPage() {
  const [pol, setPol] = useState('INNSA (Nhava Sheva)');
  const [pod, setPod] = useState('DEHAM (Hamburg)');
  const [containerType, setContainerType] = useState('40HC');

  const [quotes, setQuotes] = useState<FreightQuoteResult[]>([
    calculateFreightQuote({
      carrierName: 'MSC (Mediterranean Shipping Co)',
      polPortCode: 'INNSA',
      podPortCode: 'DEHAM',
      containerType: '40HC',
      baseFreightUsd: 1950,
      thcOriginUsd: 150,
      thcDestinationUsd: 200,
      bafSurchargeUsd: 350,
      ispsSurchargeUsd: 15,
      transitDays: 22
    }),
    calculateFreightQuote({
      carrierName: 'CMA CGM',
      polPortCode: 'INNSA',
      podPortCode: 'DEHAM',
      containerType: '40HC',
      baseFreightUsd: 2050,
      thcOriginUsd: 140,
      thcDestinationUsd: 190,
      bafSurchargeUsd: 320,
      ispsSurchargeUsd: 15,
      transitDays: 20
    }),
    calculateFreightQuote({
      carrierName: 'Maersk Line',
      polPortCode: 'INNSA',
      podPortCode: 'DEHAM',
      containerType: '40HC',
      baseFreightUsd: 2100,
      thcOriginUsd: 160,
      thcDestinationUsd: 210,
      bafSurchargeUsd: 340,
      ispsSurchargeUsd: 15,
      transitDays: 21
    })
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Ship className="w-7 h-7 text-indigo-400" />
            Multi-Carrier Ocean & Air Freight Rate Aggregator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Compare spot ocean freight rates across global carriers (MSC, CMA CGM, Maersk) with itemized THC, BAF, and ISPS surcharge breakdowns.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Port of Loading (POL)</label>
              <input
                type="text"
                value={pol}
                onChange={(e) => setPol(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Port of Discharge (POD)</label>
              <input
                type="text"
                value={pod}
                onChange={(e) => setPod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Container Equipment</label>
              <select
                value={containerType}
                onChange={(e) => setContainerType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              >
                <option value="40HC">40ft High Cube (40HC)</option>
                <option value="20GP">20ft General Purpose (20GP)</option>
                <option value="40REEFER">40ft Reefer (Temperature Controlled)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quotes Aggregated Grid */}
        <div className="space-y-4 font-mono">
          {quotes.map((q, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-sans">{q.carrierName}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{pol} &rarr; {pod} &bull; {q.containerType}</p>
                </div>

                <div className="text-right">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">All-In Total Freight</span>
                  <span className="text-emerald-400 font-bold text-xl">${q.totalFreightUsd.toLocaleString()}</span>
                </div>
              </div>

              {/* Itemized Surcharges Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block font-sans text-[10px]">Base Ocean Freight</span>
                  <span className="text-slate-200 font-bold">${q.baseFreightUsd}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block font-sans text-[10px]">Origin THC</span>
                  <span className="text-slate-200 font-bold">${q.surchargesBreakdown.thcOrigin}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block font-sans text-[10px]">Destination THC</span>
                  <span className="text-slate-200 font-bold">${q.surchargesBreakdown.thcDestination}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block font-sans text-[10px]">Bunker (BAF)</span>
                  <span className="text-slate-200 font-bold">${q.surchargesBreakdown.bafSurcharge}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block font-sans text-[10px]">ISPS Security</span>
                  <span className="text-slate-200 font-bold">${q.surchargesBreakdown.ispsSurcharge}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span>Estimated Transit: {q.transitDays} Days</span>
                <span>Quote Valid Until: {q.validUntil}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
