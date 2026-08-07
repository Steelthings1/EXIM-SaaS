"use client";

import React, { useState } from 'react';
import { Store, Filter, ShieldCheck, Star, Send, Clock, Anchor, Building2 } from 'lucide-react';

export default function EcosystemDirectoryPage() {
  const [selectedPort, setSelectedPort] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [partners, setPartners] = useState([
    {
      id: 'part-101',
      name: 'Chennai Maritime Customs Brokers (CHA License 9041)',
      category: 'Customs Broker (CHA)',
      ports: ['INMAA1', 'INPAV1', 'INCOK1'],
      accreditation: 'AEO-LO Certified customs broker with 24h bill clearance guarantee',
      rating: 4.95,
      sla: '12 Hours SLA',
      status: 'VERIFIED_PARTNER',
      email: 'cha@chennaimaritime.com'
    },
    {
      id: 'part-102',
      name: 'Global Seaways Logistics & Forwarding',
      category: 'Freight Forwarder',
      ports: ['INMAA1', 'AEDXB', 'INBOM1'],
      accreditation: 'IATA & FMC Licensed Multimodal Transport Operator (MTO)',
      rating: 4.90,
      sla: '24 Hours SLA',
      status: 'VERIFIED_PARTNER',
      email: 'quotes@globalseaways.com'
    },
    {
      id: 'part-103',
      name: 'Apex NABL Accredited Chemical & Steel Testing Lab',
      category: 'NABL Accredited Testing Lab',
      ports: ['INMAA1', 'INPAV1'],
      accreditation: 'ISO/IEC 17025 Accredited laboratory for metal composition analysis',
      rating: 4.98,
      sla: '18 Hours SLA',
      status: 'VERIFIED_PARTNER',
      email: 'lab@apextesting.com'
    }
  ]);

  const filtered = partners.filter((p) => {
    const portMatch = selectedPort === 'ALL' || p.ports.includes(selectedPort);
    const catMatch = selectedCategory === 'ALL' || p.category === selectedCategory;
    return portMatch && catMatch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Store className="w-7 h-7 text-indigo-400" />
            Vetted Partner Ecosystem Directory & Trade Network
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Directory of licensed Customs House Agents (CHAs), Freight Forwarders, NABL/ISO 17025 accredited testing laboratories, and trade consultants.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row gap-4 font-mono text-xs">
          <div className="flex-1">
            <label className="block text-slate-400 font-sans mb-1">Filter by Operating Port Code</label>
            <select value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
              <option value="ALL">All Seaports & ICD Codes</option>
              <option value="INMAA1">INMAA1 - Chennai Port</option>
              <option value="INPAV1">INPAV1 - Tuticorin Port</option>
              <option value="INCOK1">INCOK1 - Cochin Port</option>
              <option value="AEDXB">AEDXB - Dubai Jebel Ali</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-slate-400 font-sans mb-1">Filter by Service Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
              <option value="ALL">All Service Categories</option>
              <option value="Customs Broker (CHA)">Customs Broker (CHA)</option>
              <option value="Freight Forwarder">Freight Forwarder</option>
              <option value="NABL Accredited Testing Lab">NABL Accredited Testing Lab</option>
            </select>
          </div>
        </div>

        {/* Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {filtered.map((p) => (
            <div key={p.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {p.category}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {p.rating}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm font-sans">{p.name}</h3>
                <p className="text-slate-400 font-sans text-xs">{p.accreditation}</p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {p.ports.map((port) => (
                    <span key={port} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-300 font-mono text-[10px]">
                      {port}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
                <span className="text-slate-400 font-sans flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {p.sla}
                </span>
                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg flex items-center gap-1 transition-colors">
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
