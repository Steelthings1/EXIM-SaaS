"use client";

import React, { useState } from 'react';
import { Calculator, DollarSign, Sparkles, ShieldCheck, ArrowDownRight, Layers, Percent, TrendingDown } from 'lucide-react';
import { calculateLandedCost, DutyCalculationResult } from '@/lib/compliance/duty-calculator';

export default function TariffCalculatorPage() {
  const [cifValue, setCifValue] = useState(50000);
  const [hsCode, setHsCode] = useState('0901.21.90');
  const [exporterCountry, setExporterCountry] = useState('IND');
  const [importerCountry, setImporterCountry] = useState('ARE');
  const [stdBcd, setStdBcd] = useState(10.0);
  const [vatRate, setVatRate] = useState(5.0);
  const [applyFta, setApplyFta] = useState(true);

  const result: DutyCalculationResult = calculateLandedCost({
    cifValueUsd: Number(cifValue),
    hsCode,
    exporterCountry,
    importerCountry,
    stdBcdRatePct: Number(stdBcd),
    vatIgstRatePct: Number(vatRate),
    applyFtaPreference: applyFta
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Calculator className="w-7 h-7 text-indigo-400" />
              Landed Cost & Duty Calculator (FTA Savings Engine)
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Calculate Basic Customs Duty (BCD), destination VAT/IGST, total landed cost, and duty savings under Free Trade Agreements.
            </p>
          </div>
        </div>

        {/* Form & Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Inputs Column */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-indigo-400" />
              Shipment Valuation & Duty Rates
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                  Shipment CIF Value (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    value={cifValue}
                    onChange={(e) => setCifValue(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-300 font-bold focus:outline-none focus:border-indigo-500 text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                  HS Tariff Code
                </label>
                <input
                  type="text"
                  value={hsCode}
                  onChange={(e) => setHsCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Exporter
                  </label>
                  <select
                    value={exporterCountry}
                    onChange={(e) => setExporterCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs"
                  >
                    <option value="IND">IND - India</option>
                    <option value="USA">USA - United States</option>
                    <option value="CHN">CHN - China</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Importer
                  </label>
                  <select
                    value={importerCountry}
                    onChange={(e) => setImporterCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs"
                  >
                    <option value="ARE">ARE - UAE</option>
                    <option value="AUS">AUS - Australia</option>
                    <option value="USA">USA - United States</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Std BCD Rate (%)
                  </label>
                  <input
                    type="number"
                    value={stdBcd}
                    onChange={(e) => setStdBcd(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg font-mono text-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                    VAT / IGST (%)
                  </label>
                  <input
                    type="number"
                    value={vatRate}
                    onChange={(e) => setVatRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg font-mono text-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-indigo-300 font-semibold">
                  <input
                    type="checkbox"
                    checked={applyFta}
                    onChange={(e) => setApplyFta(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                  />
                  <span>Apply Preferential FTA Tariff (CEPA / ECTA)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="md:col-span-2 space-y-6">
            {/* FTA Savings Highlight Banner */}
            {result.ftaApplied && (
              <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Free Trade Agreement (FTA) Preferential Benefit Applied
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{result.ftaAgreementName}</h3>
                    <p className="text-xs text-slate-300 mt-1 font-mono">{result.ruleOfOrigin}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-emerald-300 block font-semibold">Total Duty Savings</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      ${result.ftaSavingsUsd.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Landed Cost Breakdown */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Landed Cost Component Breakdown
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-[11px] text-slate-500 block uppercase">CIF Value</span>
                  <span className="text-base font-bold text-slate-100 font-mono">${result.cifValueUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-[11px] text-slate-500 block uppercase">Customs Duty ({result.effectiveBcdPct}%)</span>
                  <span className="text-base font-bold text-indigo-300 font-mono">${result.effectiveBcdAmountUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <span className="text-[11px] text-slate-500 block uppercase">VAT / IGST ({result.vatIgstPct}%)</span>
                  <span className="text-base font-bold text-amber-300 font-mono">${result.vatIgstAmountUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-4 bg-indigo-950/20">
                  <span className="text-[11px] text-indigo-400 block uppercase font-bold">Total Landed Cost</span>
                  <span className="text-lg font-extrabold text-white font-mono">${result.totalLandedCostUsd.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
