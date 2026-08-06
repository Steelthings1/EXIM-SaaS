"use client";

import React, { useState } from 'react';
import { Store, Search, Star, ShieldCheck, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function EcosystemMarketplacePage() {
  const [partners, setPartners] = useState([
    {
      id: 'part-101',
      name: 'Deccan Customs House Agents (CHA) Pvt Ltd',
      type: 'CHA_CUSTOMS_BROKER',
      rating: 4.95,
      locations: 'Nhava Sheva (INNSA) & Delhi ICD (INTKD)',
      email: 'customs@deccancha.com',
      isVerified: true
    },
    {
      id: 'part-102',
      name: 'Apex Global Logistics & Freight Forwarders',
      type: 'FREIGHT_FORWARDER',
      rating: 4.90,
      locations: 'Global Ocean FCL / Air Freight',
      email: 'bookings@apexlogistics.com',
      isVerified: true
    },
    {
      id: 'part-103',
      name: 'SGS India NABL Accredited Testing Laboratory',
      type: 'NABL_TESTING_LAB',
      rating: 4.98,
      locations: 'ISO 17025 Food & Chemical Analysis',
      email: 'lab.india@sgs.com',
      isVerified: true
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Store className="w-7 h-7 text-indigo-400" />
              Ecosystem Marketplace Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Find and book vetted Customs House Agents (CHAs), Freight Forwarders, NABL testing labs, and marine insurers.
            </p>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div key={p.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-300 px-2.5 py-0.5 rounded bg-indigo-950 border border-indigo-800/40">
                    {p.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {p.rating}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-white mt-2">{p.name}</h2>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Service Coverage:</span>
                  <span className="text-slate-200 font-semibold">{p.locations}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Verified Contact:</span>
                  <span className="text-emerald-400 font-bold">{p.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
