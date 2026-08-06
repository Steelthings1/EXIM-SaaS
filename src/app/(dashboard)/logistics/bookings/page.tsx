"use client";

import React, { useState } from 'react';
import { Anchor, Plus, Calendar, Ship, CheckCircle2, Box } from 'lucide-react';

export default function CarrierBookingsPage() {
  const [bookings, setBookings] = useState([
    {
      id: 'bkg-101',
      bookingReference: 'BKG-MAERSK-2026-9041',
      carrierName: 'Maersk Line',
      vesselName: 'MAERSK MC-KINNEY MOLLER',
      voyageNumber: 'VOY-2604W',
      containerNumber: 'MSKU-904182-4',
      sealNumber: 'SEAL-IN-9004128',
      portLoading: 'INNSA (Nhava Sheva)',
      portDischarge: 'AEDXB (Jebel Ali, Dubai)',
      etdDate: '2026-02-03',
      etaDate: '2026-02-17',
      freightCostUsd: 1850.00,
      status: 'IN_TRANSIT'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Anchor className="w-7 h-7 text-indigo-400" />
              Carrier Shipping Bookings & Allocation Registry
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage ocean carrier shipping confirmations, container numbers, high-security bolt seals, and ETD/ETA schedules.
            </p>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white font-mono">{b.bookingReference}</h2>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      {b.carrierName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Vessel: {b.vesselName} ({b.voyageNumber})
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {b.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Container & Seal #</span>
                  <span className="text-indigo-300 font-bold">{b.containerNumber}</span>
                  <span className="block text-[10px] text-slate-500">{b.sealNumber}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Route (POL &rarr; POD)</span>
                  <span className="text-slate-200">{b.portLoading} &rarr; {b.portDischarge}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">ETD / ETA Schedule</span>
                  <span className="text-slate-200">{b.etdDate} &rarr; {b.etaDate}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Freight Cost</span>
                  <span className="text-emerald-400 font-bold">${b.freightCostUsd.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
