"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';

export default function ServiceRfqsPage() {
  const [rfqs, setRfqs] = useState([
    {
      id: 'rfq-901',
      partner: 'Chennai Maritime Customs Brokers (License 9041)',
      order: 'ORD-2026-9041',
      service: 'Customs Clearance & Duty Assessment',
      port: 'INMAA1',
      quoted: '₹18,500.00',
      status: 'Quote Received',
      date: '2026-02-04'
    },
    {
      id: 'rfq-902',
      partner: 'Apex NABL Accredited Chemical & Steel Testing Lab',
      order: 'ORD-2026-9042',
      service: 'Metal Composition & Chemical Analysis',
      port: 'INPAV1',
      quoted: '₹12,000.00',
      status: 'Booked',
      date: '2026-02-03'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Send className="w-7 h-7 text-indigo-400" />
            Service RFQs Collaboration Ledger
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Collaboration workspace tracking service Requests for Quotation (RFQs) sent to partner Customs Brokers, Freight Forwarders, and NABL Testing Labs.
          </p>
        </div>

        {/* RFQs Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Dispatched Service RFQs ({rfqs.length})
          </h2>

          <div className="space-y-3">
            {rfqs.map((r) => (
              <div key={r.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white font-mono">{r.service} &bull; Order: {r.order}</h3>
                  <p className="text-slate-400 font-sans text-xs">Partner: {r.partner} &bull; Port: {r.port}</p>
                  <p className="text-emerald-400 font-mono text-xs">Quoted Value: {r.quoted}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono text-[11px]">{r.date}</span>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {r.status}
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
