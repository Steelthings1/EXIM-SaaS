"use client";

import React, { useState } from 'react';
import { ShoppingCart, Plus, Calendar, DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { processPurchaseOrder, PurchaseOrderResult } from '@/lib/procurement-engine';

export default function PurchaseOrdersPage() {
  const [supplier, setSupplier] = useState('Coorg Estate Plantations & Raw Spices Ltd');
  const [qty, setQty] = useState(10000);
  const [unitPrice, setUnitPrice] = useState(450);
  const [deliveryDate, setDeliveryDate] = useState('2026-02-15');
  const [result, setResult] = useState<PurchaseOrderResult | null>(null);

  const [orders, setOrders] = useState([
    {
      id: 'po-101',
      poNumber: 'PO-2026-RAW-0091',
      supplier: 'Coorg Estate Plantations & Raw Spices Ltd',
      amountInr: 4500000.00,
      deliveryDate: '2026-02-15',
      status: 'CONFIRMED'
    }
  ]);

  const handleIssuePo = () => {
    const res = processPurchaseOrder({
      poNumber: `PO-2026-RAW-${Math.floor(1000 + Math.random() * 9000)}`,
      supplierName: supplier,
      lineItems: [
        { componentSku: 'RM-COFFEE-BEANS-01', componentName: 'Raw Arabica Beans', quantity: qty, unitPriceInr: unitPrice }
      ],
      expectedDeliveryDate: deliveryDate
    });
    setResult(res);

    setOrders([
      {
        id: `po-${Date.now()}`,
        poNumber: res.poNumber,
        supplier,
        amountInr: res.totalAmountInr,
        deliveryDate,
        status: res.status
      },
      ...orders
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShoppingCart className="w-7 h-7 text-indigo-400" />
              Vendor Purchase Orders (PO) Dashboard & Delivery Schedules
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Issue raw material procurement POs to verified suppliers, track delivery dates, and monitor PO fulfillment states.
            </p>
          </div>
        </div>

        {/* Input Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Issue New Vendor Purchase Order
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Supplier Name</label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Quantity (KG)</label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Unit Price (₹ INR)</label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Expected Delivery Date</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleIssuePo}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            <span>Issue Vendor Purchase Order</span>
          </button>
        </div>

        {/* PO List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Vendor Purchase Orders
          </h2>

          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{o.poNumber}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">{o.supplier}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Expected Delivery</span>
                    <span className="text-slate-200">{o.deliveryDate}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Total Amount</span>
                    <span className="text-indigo-300 font-bold">&#8377;{o.amountInr.toLocaleString()}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {o.status}
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
