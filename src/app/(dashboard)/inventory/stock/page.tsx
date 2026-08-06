"use client";

import React, { useState } from 'react';
import { Warehouse, Layers, Calendar, CheckCircle2, Box, ShieldCheck } from 'lucide-react';

export default function MultiWarehouseStockPage() {
  const [batches, setBatches] = useState([
    {
      id: 'b-101',
      warehouseName: 'Nhava Sheva Bonded Customs Warehouse #1',
      warehouseCode: 'INNSA1-BOND',
      sku: 'COF-ARAB-001',
      productName: 'Premium Roasted Arabica Coffee Beans',
      batchNumber: 'BATCH-2026-COF-091',
      qtyAvailable: 5000,
      qtyAllocated: 1200,
      mfgDate: '2026-01-10',
      expiryDate: '2027-01-09'
    },
    {
      id: 'b-102',
      warehouseName: 'Tughlakabad ICD Freight Terminal Warehouse',
      warehouseCode: 'INTKD6-ICD',
      sku: 'RIC-BASM-002',
      productName: 'Traditional Organic Indian Basmati Rice',
      batchNumber: 'LOT-2026-RIC-441',
      qtyAvailable: 12000,
      qtyAllocated: 3500,
      mfgDate: '2025-11-20',
      expiryDate: '2027-11-19'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Warehouse className="w-7 h-7 text-indigo-400" />
              Multi-Warehouse Batch Inventory & Lot Allocation
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track manufacturing dates, expiration timelines, batch/lot numbers, and bonded customs warehouse allocations.
            </p>
          </div>
        </div>

        {/* Inventory Cards */}
        <div className="space-y-4">
          {batches.map((b) => (
            <div key={b.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{b.productName}</h2>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      {b.sku}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1">{b.warehouseName} ({b.warehouseCode})</p>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Lot: {b.batchNumber}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Available Stock</span>
                  <span className="text-base font-bold text-emerald-400">{b.qtyAvailable.toLocaleString()} units</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Allocated to Export Orders</span>
                  <span className="text-base font-bold text-indigo-300">{b.qtyAllocated.toLocaleString()} units</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Mfg Date</span>
                  <span className="text-slate-200">{b.mfgDate}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Expiration Date</span>
                  <span className="text-slate-200">{b.expiryDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
