"use client";

import React, { useState } from 'react';
import { Package, Plus, Search, Tag, Scale, Box, Layers, CheckCircle2 } from 'lucide-react';

export default function ProductCatalogPage() {
  const [products, setProducts] = useState([
    {
      id: 'p-101',
      sku: 'COF-ARAB-001',
      name: 'Premium Roasted Arabica Coffee Beans (1kg Vacuum Sealed)',
      hsCode: '0901.21.90',
      uom: 'KGS',
      unitPriceUsd: 14.50,
      netWeightKg: 1.00,
      grossWeightKg: 1.05,
      cbmPerUnit: 0.0025,
      unitsPerCarton: 10
    },
    {
      id: 'p-102',
      sku: 'RIC-BASM-002',
      name: 'Traditional Organic Indian Basmati Rice (5kg Bag)',
      hsCode: '1006.30.20',
      uom: 'BAGS',
      unitPriceUsd: 12.00,
      netWeightKg: 5.00,
      grossWeightKg: 5.10,
      cbmPerUnit: 0.0080,
      unitsPerCarton: 4
    },
    {
      id: 'p-103',
      sku: 'SHI-TEXT-003',
      name: 'Woven Mens Organic Cotton Shirts (Pack of 5)',
      hsCode: '6205.20.00',
      uom: 'PCS',
      unitPriceUsd: 45.00,
      netWeightKg: 1.20,
      grossWeightKg: 1.35,
      cbmPerUnit: 0.0065,
      unitsPerCarton: 8
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    sku: '',
    name: '',
    hsCode: '',
    unitPriceUsd: 10.0,
    netWeightKg: 1.0,
    grossWeightKg: 1.1,
    cbmPerUnit: 0.003
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts([
      ...products,
      {
        id: `p-${Date.now()}`,
        sku: newProduct.sku.toUpperCase(),
        name: newProduct.name,
        hsCode: newProduct.hsCode,
        uom: 'KGS',
        unitPriceUsd: Number(newProduct.unitPriceUsd),
        netWeightKg: Number(newProduct.netWeightKg),
        grossWeightKg: Number(newProduct.grossWeightKg),
        cbmPerUnit: Number(newProduct.cbmPerUnit),
        unitsPerCarton: 10
      }
    ]);
    setShowModal(false);
    setNewProduct({ sku: '', name: '', hsCode: '', unitPriceUsd: 10.0, netWeightKg: 1.0, grossWeightKg: 1.1, cbmPerUnit: 0.003 });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Package className="w-7 h-7 text-indigo-400" />
              Product Master Catalog & Packaging Factor Registry
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Centralized SKU directory mapping HS tariff codes, net/gross weights, and cubic meter (CBM) volume factors for single-entry order propagation.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Product SKU</span>
          </button>
        </div>

        {/* Catalog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-300 px-2.5 py-0.5 rounded bg-indigo-950 border border-indigo-800/40">
                    {p.sku}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ${p.unitPriceUsd.toFixed(2)} / {p.uom}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-white mt-2 line-clamp-2">{p.name}</h2>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">HS Code:</span>
                  <span className="text-indigo-300 font-bold">{p.hsCode}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Net / Gross Weight:</span>
                  <span>{p.netWeightKg}kg / {p.grossWeightKg}kg</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Volume CBM Factor:</span>
                  <span className="text-amber-300">{p.cbmPerUnit} m³</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
              <h2 className="text-lg font-bold text-white">Register Product SKU</h2>

              <form onSubmit={handleAddProduct} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">SKU Code (e.g. COF-ARAB-001)</label>
                  <input
                    type="text"
                    required
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Product Description</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">HS Code</label>
                    <input
                      type="text"
                      required
                      value={newProduct.hsCode}
                      onChange={(e) => setNewProduct({ ...newProduct, hsCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Unit Price ($)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.unitPriceUsd}
                      onChange={(e) => setNewProduct({ ...newProduct, unitPriceUsd: Number(e.target.value) })}
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
                    Save SKU
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
