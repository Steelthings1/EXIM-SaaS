"use client";

import React, { useState } from 'react';
import { ShoppingBag, Plus, Building2, Calendar, CheckCircle2 } from 'lucide-react';

export default function VendorProcurementPage() {
  const [pos, setPos] = useState([
    {
      id: 'po-101',
      number: 'PO-VENDOR-2026-104',
      supplier: 'Deccan Spice & Commodities Plantations Pvt Ltd',
      amountUsd: 36250.00,
      deliveryDate: '2026-03-01',
      status: 'ACKNOWLEDGED'
    },
    {
      id: 'po-102',
      number: 'PO-PACKAGING-2026-99',
      supplier: 'Apex Polyfilm & Containers Pvt Ltd',
      amountUsd: 4800.00,
      deliveryDate: '2026-02-25',
      status: 'FULFILLED'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShoppingBag className="w-7 h-7 text-indigo-400" />
              Vendor Procurement & Purchase Orders (PO) Registry
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Issue and track vendor purchase orders for raw materials, agricultural commodities, and export packaging supplies.
            </p>
          </div>
        </div>

        {/* PO List */}
        <div className="space-y-4">
          {pos.map((po) => (
            <div key={po.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{po.number}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{po.supplier}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {po.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Total PO Amount</span>
                  <span className="text-emerald-400 font-bold">${po.amountUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Promised Delivery Date</span>
                  <span className="text-slate-200">{po.deliveryDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
