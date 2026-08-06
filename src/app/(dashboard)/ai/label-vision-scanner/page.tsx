"use client";

import React, { useState } from 'react';
import { Camera, CheckCircle2, AlertTriangle, ShieldCheck, Upload } from 'lucide-react';
import { auditPackagingLabelVision, LabelVisionResult, TargetMarket } from '@/lib/multimodal-copilot-engine';

export default function LabelVisionScannerPage() {
  const [market, setMarket] = useState<TargetMarket>('GCC_GSO');
  const [netWeight, setNetWeight] = useState(true);
  const [origin, setOrigin] = useState(true);
  const [allergen, setAllergen] = useState(true);
  const [dualLang, setDualLang] = useState(true);
  const [result, setResult] = useState<LabelVisionResult | null>(null);

  const handleScanLabel = () => {
    const res = auditPackagingLabelVision({
      imageUrl: 'https://exim.im/samples/coffee_label_gcc.jpg',
      targetMarket: market,
      hasNetWeight: netWeight,
      hasCountryOfOrigin: origin,
      hasAllergenWarning: allergen,
      hasDualLanguage: dualLang
    });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Camera className="w-7 h-7 text-indigo-400" />
            Computer Vision Packaging Label Regulatory Scanner
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Audit product packaging labels against FDA (USA), EU EFSA, GCC GSO, and FSSAI destination market labeling mandates.
          </p>
        </div>

        {/* Inputs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Select Destination Market & Label Attributes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Target Regulatory Market</label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value as TargetMarket)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              >
                <option value="GCC_GSO">GCC GSO (Gulf Standardization Org - Dual Arabic/English Mandate)</option>
                <option value="FDA_USA">FDA USA (US Food & Drug Admin Label Rules)</option>
                <option value="EU_EFSA">EU EFSA (European Food Safety Authority)</option>
                <option value="FSSAI_INDIA">FSSAI India (Food Safety Regulations)</option>
              </select>
            </div>

            <div className="space-y-2 font-sans text-xs">
              <span className="text-slate-400 block mb-1">Detected Vision OCR Attributes:</span>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={netWeight} onChange={(e) => setNetWeight(e.target.checked)} className="rounded" />
                  <span>Net Weight Declared</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={origin} onChange={(e) => setOrigin(e.target.checked)} className="rounded" />
                  <span>Country of Origin</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={allergen} onChange={(e) => setAllergen(e.target.checked)} className="rounded" />
                  <span>Allergen Warning</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={dualLang} onChange={(e) => setDualLang(e.target.checked)} className="rounded" />
                  <span>Dual Language (Arabic)</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleScanLabel}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>Execute Computer Vision Packaging Label Regulatory Audit</span>
          </button>
        </div>

        {/* Audit Output */}
        {result && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase">Vision Audit Report — {result.auditId}</h2>
              <span className={`px-2.5 py-0.5 rounded font-bold ${
                result.isCompliant ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {result.isCompliant ? 'LABEL COMPLIANT (100%)' : `NON-COMPLIANT (${result.complianceScore}%)`}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 font-bold block font-sans">Detected Languages: {result.detectedLanguages.join(', ')}</span>
              <div className="space-y-2">
                {result.auditFindings.map((find, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                    {result.isCompliant ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    <span className="text-slate-200">{find}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
