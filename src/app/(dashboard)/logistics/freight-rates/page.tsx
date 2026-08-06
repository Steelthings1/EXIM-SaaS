"use client";

import React, { useState } from 'react';
import { Ship, Search, DollarSign, Clock, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { aggregateFreightQuotes, FreightQuote } from '@/lib/freight-aggregator';

export default function FreightRatesAggregatorPage() {
  const [originPort, setOriginPort] = useState('INNSA');
  const [destinationPort, setDestinationPort] = useState('AEDXB');
  const [sortBy, setSortBy] = useState<'CHEAPEST' | 'FASTEST'>('CHEAPEST');

  const quotes: FreightQuote[] = aggregateFreightQuotes({
    originPort,
    destinationPort,
    sortBy
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Ship className="w-7 h-7 text-indigo-400" />
              Multi-Carrier Ocean & Air Freight Rate Aggregator
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Compare spot freight rates across Maersk, MSC, and CMA CGM with itemized Terminal Handling Charges (THC) and Bunker Adjustment Factors (BAF).
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Port of Loading (POL)</label>
              <input
                type="text"
                value={originPort}
                onChange={(e) => setOriginPort(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Port of Discharge (POD)</label>
              <input
                type="text"
                value={destinationPort}
                onChange={(e) => setDestinationPort(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Sort Quotes By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'CHEAPEST' | 'FASTEST')}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans"
              >
                <option value="CHEAPEST">Cheapest Total Freight Cost</option>
                <option value="FASTEST">Fastest Transit Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Freight Quotes Results List */}
        <div className="space-y-4">
          {quotes.map((q) => (
            <div key={q.quoteId} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{q.carrierName}</h2>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      {q.carrierCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Route: {q.originPort} &rarr; {q.destinationPort} ({q.mode})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">${q.totalFreightCostUsd.toLocaleString()}</span>
                  <span className="block text-[11px] text-slate-500 font-mono">Valid until {q.validUntil}</span>
                </div>
              </div>

              {/* Surcharges Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Base Ocean Freight</span>
                  <span className="text-slate-200 font-bold">${q.baseRateUsd}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">THC Terminal Fee</span>
                  <span className="text-slate-200">${q.surcharges.terminalHandlingChargeUsd}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Bunker BAF Fuel Fee</span>
                  <span className="text-slate-200">${q.surcharges.bunkerAdjustmentFactorUsd}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Transit Duration</span>
                  <span className="text-indigo-300 font-bold">{q.transitDays} Days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
