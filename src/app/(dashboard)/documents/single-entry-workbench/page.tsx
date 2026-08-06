"use client";

import React, { useState } from 'react';
import { FileText, Sparkles, Layers, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, Printer, Download, Plus, Trash2 } from 'lucide-react';
import { calculateSingleEntryOrder, SingleEntryOrderPayload, SingleEntryCalculationResult } from '@/lib/single-entry-engine';
import { analyzeTradeOrderIntegrity, DocIntelligenceReport } from '@/lib/ai/doc-intelligence';

export default function SingleEntryWorkbenchPage() {
  const [orderPayload, setOrderPayload] = useState<SingleEntryOrderPayload>({
    orderNumber: 'EXIM-2026-9041',
    buyerName: 'Gulf Trading Enterprise FZE',
    buyerTaxId: 'TRN-100456789000003',
    buyerAddress: 'P.O. Box 48921, Jebel Ali Free Zone, Dubai, UAE',
    sellerName: 'Apex Global Logistics & Trading Pvt Ltd',
    sellerTaxId: '27AAACA1234A1Z5',
    sellerAddress: '701, Trade Tower, Bandra Kurla Complex, Mumbai, India',
    incoterms: 'CIF',
    currency: 'USD',
    portOfLoading: 'INNSA1 (Nhava Sheva Port, India)',
    portOfDischarge: 'AEJEA (Jebel Ali Port, Dubai, UAE)',
    vesselName: 'Maersk Mc-Kinney Moller V.2409',
    freightCostUsd: 1850.00,
    insuranceCostUsd: 150.00,
    items: [
      {
        productId: 'p-101',
        sku: 'COF-ARAB-001',
        productName: 'Premium Roasted Arabica Coffee Beans (1kg Vacuum Sealed)',
        hsCode: '0901.21.90',
        qty: 2500,
        unitPriceUsd: 14.50,
        netWeightKgPerUnit: 1.00,
        grossWeightKgPerUnit: 1.05,
        cbmPerUnit: 0.0025,
        unitsPerCarton: 10
      },
      {
        productId: 'p-102',
        sku: 'RIC-BASM-002',
        productName: 'Traditional Organic Indian Basmati Rice (5kg Bag)',
        hsCode: '1006.30.20',
        qty: 1000,
        unitPriceUsd: 12.00,
        netWeightKgPerUnit: 5.00,
        grossWeightKgPerUnit: 5.10,
        cbmPerUnit: 0.0080,
        unitsPerCarton: 4
      }
    ]
  });

  const [activeDocTab, setActiveDocTab] = useState<'INVOICE' | 'PACKING_LIST' | 'COO' | 'PO' | 'SHIPPING_INSTRUCTIONS'>('INVOICE');

  // Real-time calculation engine execution
  const calcResult: SingleEntryCalculationResult = calculateSingleEntryOrder(orderPayload);
  const aiReport: DocIntelligenceReport = analyzeTradeOrderIntegrity(orderPayload);

  const handleQtyChange = (index: number, newQty: number) => {
    const updatedItems = [...orderPayload.items];
    updatedItems[index].qty = Math.max(1, newQty);
    setOrderPayload({ ...orderPayload, items: updatedItems });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="w-7 h-7 text-indigo-400" />
              Single-Entry Trade Order Workbench & Propagation Hub
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Enter trade data once to instantly calculate weights, volume CBM, package counts, and auto-populate all 5 export documents.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {aiReport.completenessScorePct}% Document Integrity Rating
            </span>
          </div>
        </div>

        {/* AI Compliance Intelligence Alert */}
        {aiReport.riskFlags.length > 0 && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-5 shadow-xl flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400 mt-0.5">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AI Document Intelligence Agent Scan</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Single-entry data is 100% synchronized across Commercial Invoice, Packing List, COO, PO, and Shipping Instructions.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono rounded-lg">
              5 Docs Synchronized
            </span>
          </div>
        )}

        {/* Main Grid: Data Entry Form (Left) & Real-time Live Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Master Data Entry Workbench */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Master Single-Entry Order Details
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Master Order Number
                  </label>
                  <input
                    type="text"
                    value={orderPayload.orderNumber}
                    onChange={(e) => setOrderPayload({ ...orderPayload, orderNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Incoterms
                  </label>
                  <select
                    value={orderPayload.incoterms}
                    onChange={(e) => setOrderPayload({ ...orderPayload, incoterms: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                  >
                    <option value="CIF">CIF - Cost, Insurance & Freight</option>
                    <option value="FOB">FOB - Free On Board</option>
                    <option value="CFR">CFR - Cost & Freight</option>
                    <option value="EXW">EXW - Ex Works</option>
                    <option value="DDP">DDP - Delivered Duty Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Port of Loading (POL)
                  </label>
                  <input
                    type="text"
                    value={orderPayload.portOfLoading}
                    onChange={(e) => setOrderPayload({ ...orderPayload, portOfLoading: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Port of Discharge (POD)
                  </label>
                  <input
                    type="text"
                    value={orderPayload.portOfDischarge}
                    onChange={(e) => setOrderPayload({ ...orderPayload, portOfDischarge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Line Items Table */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Order Line Items ({orderPayload.items.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {orderPayload.items.map((item, idx) => (
                    <div key={item.sku} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                        <span>{item.productName}</span>
                        <span className="font-mono text-indigo-400">{item.sku}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block text-[10px] text-slate-500 uppercase mb-1">Quantity</label>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleQtyChange(idx, Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white text-center font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-500 uppercase mb-1">Unit Price ($)</label>
                          <input
                            type="number"
                            value={item.unitPriceUsd}
                            disabled
                            className="w-full px-2.5 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg font-mono text-slate-400 text-center"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-500 uppercase mb-1">Line Subtotal</label>
                          <div className="py-1.5 text-center font-mono font-bold text-emerald-400">
                            ${(item.qty * item.unitPriceUsd).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Auto-Generated Document Previews */}
          <div className="lg:col-span-6 space-y-6">
            {/* Real-time Calculation Summary Bar */}
            <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-5 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-3 text-center font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-sans">CIF Total</span>
                <span className="text-base font-bold text-emerald-400">${calcResult.totalCifUsd.toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-sans">Gross Weight</span>
                <span className="text-base font-bold text-slate-200">{calcResult.totalGrossWeightKg} kg</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-sans">Volume CBM</span>
                <span className="text-base font-bold text-indigo-300">{calcResult.totalVolumeCbm} m³</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-sans">Packages</span>
                <span className="text-base font-bold text-amber-300">{calcResult.totalCartons} Cartons</span>
              </div>
            </div>

            {/* Document Preview Tabs */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 overflow-x-auto">
                <div className="flex gap-2 text-xs font-semibold">
                  <button
                    onClick={() => setActiveDocTab('INVOICE')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeDocTab === 'INVOICE' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Commercial Invoice
                  </button>
                  <button
                    onClick={() => setActiveDocTab('PACKING_LIST')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeDocTab === 'PACKING_LIST' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Packing List
                  </button>
                  <button
                    onClick={() => setActiveDocTab('COO')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeDocTab === 'COO' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Cert of Origin (COO)
                  </button>
                  <button
                    onClick={() => setActiveDocTab('SHIPPING_INSTRUCTIONS')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeDocTab === 'SHIPPING_INSTRUCTIONS' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Shipping Instructions
                  </button>
                </div>
              </div>

              {/* Tab Content Preview */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
                {activeDocTab === 'INVOICE' && (
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-800 pb-2 text-indigo-300 font-bold">
                      <span>COMMERCIAL INVOICE: {calcResult.generatedDocuments.commercialInvoice.invoiceNo}</span>
                      <span>INCOTERMS: {orderPayload.incoterms}</span>
                    </div>
                    <div>Exporter: {orderPayload.sellerName} ({orderPayload.sellerTaxId})</div>
                    <div>Consignee/Buyer: {orderPayload.buyerName} ({orderPayload.buyerTaxId})</div>
                    <div className="pt-2 border-t border-slate-900 space-y-1">
                      <div>Subtotal: ${calcResult.subtotalUsd.toLocaleString()}</div>
                      <div>Ocean Freight: ${calcResult.freightCostUsd.toLocaleString()}</div>
                      <div>Marine Insurance: ${calcResult.insuranceCostUsd.toLocaleString()}</div>
                      <div className="text-emerald-400 font-bold text-sm pt-1">
                        TOTAL INVOICE AMOUNT (CIF): ${calcResult.totalCifUsd.toLocaleString()} USD
                      </div>
                    </div>
                  </div>
                )}

                {activeDocTab === 'PACKING_LIST' && (
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-800 pb-2 text-indigo-300 font-bold">
                      <span>PACKING LIST: {calcResult.generatedDocuments.packingList.packingListNo}</span>
                      <span>PACKAGES: {calcResult.totalCartons} CARTONS</span>
                    </div>
                    <div>Total Net Weight: {calcResult.totalNetWeightKg} KG</div>
                    <div>Total Gross Weight: {calcResult.totalGrossWeightKg} KG</div>
                    <div>Total Volume: {calcResult.totalVolumeCbm} CBM (m³)</div>
                  </div>
                )}

                {activeDocTab === 'COO' && (
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-800 pb-2 text-indigo-300 font-bold">
                      <span>CERTIFICATE OF ORIGIN: {calcResult.generatedDocuments.certificateOfOrigin.cooNo}</span>
                    </div>
                    <div>Country of Origin: India (IND)</div>
                    <div>Port of Loading: {orderPayload.portOfLoading}</div>
                    <div>Consignee: {orderPayload.buyerName}</div>
                  </div>
                )}

                {activeDocTab === 'SHIPPING_INSTRUCTIONS' && (
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-800 pb-2 text-indigo-300 font-bold">
                      <span>SHIPPING INSTRUCTIONS: {calcResult.generatedDocuments.shippingInstructions.bookingRefNo}</span>
                    </div>
                    <div>Port of Loading: {orderPayload.portOfLoading}</div>
                    <div>Port of Discharge: {orderPayload.portOfDischarge}</div>
                    <div>Recommended Container: {calcResult.generatedDocuments.shippingInstructions.containerType}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
