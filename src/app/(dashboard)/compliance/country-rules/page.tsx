"use client";

import React, { useState } from 'react';
import { Globe, FileCheck, Package, Tag, ShieldAlert, CheckCircle2, Building, AlertTriangle } from 'lucide-react';

export default function CountryRegulatoryRulesPage() {
  const [selectedCountry, setSelectedCountry] = useState('ARE');
  const [hsCodeInput, setHsCodeInput] = useState('0901.21.90');

  const rules = {
    destinationCountry: selectedCountry,
    countryName: selectedCountry === 'ARE' ? 'United Arab Emirates (UAE)' : selectedCountry === 'USA' ? 'United States of America' : 'European Union (Germany / Netherlands)',
    hsCode: hsCodeInput,
    restrictedStatus: 'PERMITTED_WITH_CERTIFICATES',
    certificates: [
      { name: 'Phytosanitary Certificate', issuer: 'National Plant Quarantine Authority', status: 'MANDATORY' },
      { name: 'Certificate of Analysis (CoA)', issuer: 'ISO 17025 Accredited Laboratory', status: 'MANDATORY' },
      { name: 'Halal Certificate', issuer: 'GCC Accredited Halal Halal Board', status: selectedCountry === 'ARE' ? 'MANDATORY' : 'OPTIONAL' },
      { name: 'Certificate of Origin (Form A / Preferential)', issuer: 'DGFT / Chamber of Commerce', status: 'MANDATORY' }
    ],
    packagingMandates: 'Food-grade moisture barrier vacuum foil lined polypropylene bags; ISPM 15 heat-treated wood pallets with stamps.',
    labelingRules: 'Dual language (Arabic & English); Net weight in metric (kg/g); Production & Expiry Date in DD/MM/YYYY; Batch/Lot Number; Country of Origin statement; Importer Tax Registration printed on master cartons.'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Globe className="w-7 h-7 text-indigo-400" />
              Destination Market Regulatory Rules & Mandatory Checklists
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Verify statutory certificate requirements, food-grade packaging standards, and dual-language labeling rules per destination country.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
              Destination Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="ARE">United Arab Emirates (UAE)</option>
              <option value="USA">United States (US CBP & FDA)</option>
              <option value="DEU">Germany / EU (EFSA & Customs)</option>
              <option value="GBR">United Kingdom (HMRC & DEFRA)</option>
              <option value="AUS">Australia (DAFF Biosecurity)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
              Product Tariff Code (HS Code)
            </label>
            <input
              type="text"
              value={hsCodeInput}
              onChange={(e) => setHsCodeInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-indigo-300 font-mono font-semibold focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-end">
            <div className="w-full p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Import Permitted under standard trade compliance rules.</span>
            </div>
          </div>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Statutory Certificates Checklist */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileCheck className="w-5 h-5 text-indigo-400" />
              Mandatory Pre-Shipment Certificates
            </h2>

            <div className="space-y-3">
              {rules.certificates.map((cert) => (
                <div key={cert.name} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-slate-200">{cert.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-slate-500" />
                      Issuer: {cert.issuer}
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                    cert.status === 'MANDATORY'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Packaging & Labeling Mandates */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Package className="w-5 h-5 text-emerald-400" />
                Packaging & Container Standards
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950 p-3.5 border border-slate-800 rounded-xl">
                {rules.packagingMandates}
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Tag className="w-5 h-5 text-amber-400" />
                Destination Labeling Rules
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950 p-3.5 border border-slate-800 rounded-xl">
                {rules.labelingRules}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
