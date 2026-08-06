"use client";

import React, { useState } from 'react';
import { Layers, Plus, DollarSign, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function BillOfMaterialsPage() {
  const [components, setComponents] = useState([
    {
      id: 'bom-101',
      sku: 'RM-COFFEE-BEANS-01',
      name: 'Raw Organic Arabica Coffee Beans',
      qty: 1.05,
      uom: 'KG',
      unitCostInr: 450.00,
      totalCostInr: 472.50,
      origin: 'IND'
    },
    {
      id: 'bom-102',
      sku: 'PKG-FOIL-BAG-250G',
      name: 'Multilayer Aluminum Foil Valve Pouch',
      qty: 4.00,
      uom: 'PCS',
      unitCostInr: 12.50,
      totalCostInr: 50.00,
      origin: 'IND'
    }
  ]);

  const totalCost = components.reduce((sum, c) => sum + c.totalCostInr, 0);
  const localOriginCost = components.filter(c => c.origin === 'IND').reduce((sum, c) => sum + c.totalCostInr, 0);
  const domesticValueAdditionPct = (localOriginCost / totalCost) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Layers className="w-7 h-7 text-indigo-400" />
              Bill of Materials (BOM) & Value-Addition Calculator
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Raw material component breakdown, unit costs, country of origin, and domestic value addition % for preferential Certificate of Origin (CoO).
            </p>
          </div>
        </div>

        {/* Value Addition Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-500 uppercase font-sans font-semibold block">Total Raw Material Cost</span>
            <span className="text-2xl font-extrabold text-white">&#8377;{totalCost.toFixed(2)}</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-500 uppercase font-sans font-semibold block">Domestic Input Value</span>
            <span className="text-2xl font-extrabold text-indigo-300">&#8377;{localOriginCost.toFixed(2)}</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-500 uppercase font-sans font-semibold block">Domestic Value Addition %</span>
            <span className="text-2xl font-extrabold text-emerald-400">{domesticValueAdditionPct.toFixed(1)}%</span>
          </div>
        </div>

        {/* Components Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            BOM Components Breakdown (SKU: PROD-COFFEE-ROASTED-01)
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {components.map((c) => (
              <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-sans text-sm">{c.name}</h3>
                  <p className="text-slate-400 font-mono mt-0.5">SKU: {c.sku} &bull; Origin: {c.origin}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Qty Required</span>
                    <span className="text-slate-200 font-bold">{c.qty} {c.uom}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Cost</span>
                    <span className="text-indigo-300 font-bold">&#8377;{c.totalCostInr.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
