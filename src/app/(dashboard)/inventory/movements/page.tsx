"use client";

import React, { useState } from 'react';
import { ArrowLeftRight, Plus, PackageCheck, AlertCircle, FileText } from 'lucide-react';
import { executeStockMovement, MovementType, StockMovementResult } from '@/lib/stock-movement-engine';

export default function StockMovementsPage() {
  const [movementType, setMovementType] = useState<MovementType>('OUTWARD_DISPATCH');
  const [quantity, setQuantity] = useState(1500);
  const [currentStock, setCurrentStock] = useState(10000);
  const [result, setResult] = useState<StockMovementResult | null>(null);

  const [movements, setMovements] = useState([
    {
      id: 'mov-101',
      batch: 'BATCH-2026-COFFEE-09',
      warehouse: 'Nhava Sheva Bonded Warehouse (INNSA)',
      type: 'OUTWARD_DISPATCH',
      qty: 5000,
      ref: 'SB-ICEGATE-2026-904128',
      user: 'Warehouse Manager',
      date: '2026-02-05'
    }
  ]);

  const handleExecute = () => {
    const res = executeStockMovement({
      batchId: 'batch-001',
      warehouseId: 'wh-001',
      movementType,
      quantity,
      currentStock,
      minReorderLevel: 500,
      referenceDocNumber: `DISPATCH-${Date.now()}`
    });
    setResult(res);

    if (res.success) {
      setCurrentStock(res.newStock);
      setMovements([
        {
          id: `mov-${Date.now()}`,
          batch: 'BATCH-2026-COFFEE-09',
          warehouse: 'Nhava Sheva Bonded Warehouse (INNSA)',
          type: movementType,
          qty: quantity,
          ref: res.referenceDocNumber,
          user: 'Export Manager',
          date: new Date().toISOString().split('T')[0]
        },
        ...movements
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ArrowLeftRight className="w-7 h-7 text-indigo-400" />
              Stock Movement Audit Ledger & Dispatch Execution
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Execute inward inventory receipts, outward export dispatches, and inter-warehouse transfers with insufficient stock guards.
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Execute Stock Movement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Movement Type</label>
              <select
                value={movementType}
                onChange={(e) => setMovementType(e.target.value as MovementType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              >
                <option value="OUTWARD_DISPATCH">Outward Export Dispatch</option>
                <option value="INWARD_RECEIPT">Inward Production Receipt</option>
                <option value="INTER_WAREHOUSE_TRANSFER">Inter-Warehouse Transfer</option>
                <option value="BIN_ADJUSTMENT">Bin Stock Adjustment</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Current Warehouse Stock</label>
              <input
                type="number"
                value={currentStock}
                onChange={(e) => setCurrentStock(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Quantity to Move (KG)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleExecute}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <span>Execute Movement Transaction</span>
          </button>
        </div>

        {/* Result Message */}
        {result && (
          <div className={`p-4 rounded-xl border text-xs font-mono ${
            result.success
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
          }`}>
            {result.success ? (
              <span>Success: Updated stock balance is {result.newStock.toLocaleString()} KG (Ref: {result.referenceDocNumber})</span>
            ) : (
              <span>Error: {result.errorMessage}</span>
            )}
          </div>
        )}

        {/* Movements Ledger Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Movement Audit Trail Ledger
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {movements.map((m) => (
              <div key={m.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{m.ref}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{m.warehouse} &bull; Batch: {m.batch}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                    {m.type}
                  </span>
                  <span className="text-emerald-400 font-bold">{m.qty.toLocaleString()} KG</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
