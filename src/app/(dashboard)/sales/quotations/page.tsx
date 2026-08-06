"use client";

import React, { useState } from 'react';
import { FileText, Plus, Search, Calendar, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ExportQuotationsPage() {
  const [quotations, setQuotations] = useState([
    {
      id: 'q-101',
      number: 'PROF-2026-8801',
      buyer: 'Gulf Trading Enterprise FZE (Dubai)',
      incoterms: 'CIF',
      validity: '2026-03-31',
      subtotalUsd: 48250.00,
      freightUsd: 1850.00,
      totalCifUsd: 50250.00,
      status: 'ISSUED'
    },
    {
      id: 'q-102',
      number: 'PROF-2026-8802',
      buyer: 'EuroAmericana Importers Inc (New York)',
      incoterms: 'FOB',
      validity: '2026-04-15',
      subtotalUsd: 95000.00,
      freightUsd: 0.00,
      totalCifUsd: 95000.00,
      status: 'ACCEPTED'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newQuotation, setNewQuotation] = useState({
    number: '',
    buyer: '',
    incoterms: 'CIF',
    subtotalUsd: 10000.0,
    freightUsd: 1000.0
  });

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = Number(newQuotation.subtotalUsd);
    const freight = Number(newQuotation.freightUsd);

    setQuotations([
      ...quotations,
      {
        id: `q-${Date.now()}`,
        number: newQuotation.number.toUpperCase(),
        buyer: newQuotation.buyer,
        incoterms: newQuotation.incoterms,
        validity: '2026-04-30',
        subtotalUsd: subtotal,
        freightUsd: freight,
        totalCifUsd: subtotal + freight,
        status: 'ISSUED'
      }
    ]);
    setShowModal(false);
    setNewQuotation({ number: '', buyer: '', incoterms: 'CIF', subtotalUsd: 10000.0, freightUsd: 1000.0 });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="w-7 h-7 text-indigo-400" />
              Export Quotations & Proforma Invoices
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Create and manage formal commercial price offers, Incoterms 2020 freight estimates, and validity windows.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Proforma Quotation</span>
          </button>
        </div>

        {/* Quotations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotations.map((q) => (
            <div key={q.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{q.number}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{q.buyer}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  {q.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Incoterms</span>
                  <span className="text-indigo-300 font-bold">{q.incoterms}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Validity Date</span>
                  <span className="text-slate-200 font-semibold">{q.validity}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Subtotal Value</span>
                  <span className="text-slate-200 font-semibold">${q.subtotalUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Total CIF Value</span>
                  <span className="text-emerald-400 font-bold">${q.totalCifUsd.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
              <h2 className="text-lg font-bold text-white">Generate Proforma Quotation</h2>

              <form onSubmit={handleCreateQuotation} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Quotation Number (e.g. PROF-2026-8803)</label>
                  <input
                    type="text"
                    required
                    value={newQuotation.number}
                    onChange={(e) => setNewQuotation({ ...newQuotation, number: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Buyer Name</label>
                  <input
                    type="text"
                    required
                    value={newQuotation.buyer}
                    onChange={(e) => setNewQuotation({ ...newQuotation, buyer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Subtotal ($)</label>
                    <input
                      type="number"
                      required
                      value={newQuotation.subtotalUsd}
                      onChange={(e) => setNewQuotation({ ...newQuotation, subtotalUsd: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Freight Estimate ($)</label>
                    <input
                      type="number"
                      value={newQuotation.freightUsd}
                      onChange={(e) => setNewQuotation({ ...newQuotation, freightUsd: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg text-xs"
                  >
                    Save Quotation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
