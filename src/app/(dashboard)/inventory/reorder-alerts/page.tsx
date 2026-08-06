"use client";

import React, { useState } from 'react';
import { AlertCircle, Plus, ShoppingCart, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ReorderAlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-101',
      productName: 'Raw Organic Arabica Coffee Beans',
      sku: 'RM-COFFEE-BEANS-01',
      warehouse: 'Tughlakabad ICD Bonded Warehouse (INTKD)',
      currentStock: 350.00,
      minReorderLevel: 500.00,
      alertType: 'LOW_STOCK_REORDER_TRIGGER',
      severity: 'HIGH_PRIORITY'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertCircle className="w-7 h-7 text-amber-400" />
              Inventory Reorder Level & Batch Expiry Warnings
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Automated reorder point threshold triggers, low-stock warnings, and vendor purchase order generation.
            </p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((a) => (
            <div key={a.id} className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">{a.productName}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">SKU: {a.sku} &bull; {a.warehouse}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {a.severity}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Current Stock</span>
                  <span className="text-rose-400 font-bold">{a.currentStock.toLocaleString()} KG</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Minimum Reorder Threshold</span>
                  <span className="text-slate-200">{a.minReorderLevel.toLocaleString()} KG</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Deficit Deficiency</span>
                  <span className="text-amber-300 font-bold">{(a.minReorderLevel - a.currentStock).toLocaleString()} KG</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
