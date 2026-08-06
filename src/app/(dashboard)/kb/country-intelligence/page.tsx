"use client";

import React, { useState } from 'react';
import { Globe, Search, ShieldCheck, FileText, CheckCircle2, AlertCircle, Award, PackageCheck } from 'lucide-react';
import { getCountryProfile, getAllCountryProfiles, CountryProfile } from '@/lib/country-kb-engine';

export default function CountryIntelligencePage() {
  const [selectedCode, setSelectedCode] = useState('AE');
  const profiles = getAllCountryProfiles();
  const profile: CountryProfile = getCountryProfile(selectedCode);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Globe className="w-7 h-7 text-indigo-400" />
            Destination Country Knowledge Base & Market Specs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Access customs authority rules, import duty rates, dual-language food labeling mandates, and ISPM-15 packaging specifications across target export markets.
          </p>
        </div>

        {/* Country Selector */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-400" />
            Select Destination Market
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {profiles.map((p) => (
              <button
                key={p.countryCode}
                onClick={() => setSelectedCode(p.countryCode)}
                className={`p-3 rounded-xl font-mono text-xs font-bold text-center border transition-all ${
                  selectedCode === p.countryCode
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {p.countryCode} — {p.countryName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Country Specifications Display */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 font-mono text-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{profile.countryName}</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {profile.countryCode}
                </span>
              </h2>
              <p className="text-slate-400 font-sans mt-1">Customs Authority: {profile.customsAuthority}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
                <span className="text-[10px] text-slate-500 uppercase font-sans block">Avg Import Duty</span>
                <span className="text-emerald-400 font-bold text-sm">{profile.avgImportDutyPct}%</span>
              </div>
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
                <span className="text-[10px] text-slate-500 uppercase font-sans block">Standard VAT / GST</span>
                <span className="text-indigo-300 font-bold text-sm">{profile.standardVatPct}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rules */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-2 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-indigo-400" />
                Regulatory & Labeling Mandates
              </h3>

              <div className="space-y-3 font-sans">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs font-mono font-bold block">Dual-Language Mandate</span>
                  <span className="text-slate-200 text-xs mt-1 block">{profile.dualLanguageMandate}</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-xs font-mono font-bold">ISPM-15 Wooden Pallet Required</span>
                  <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {profile.ispm15PalletRequired ? 'MANDATORY HEAT-TREATMENT' : 'OPTIONAL'}
                  </span>
                </div>
              </div>
            </div>

            {/* FTAs & Restricted */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                FTA Agreements & Restrictions
              </h3>

              <div className="space-y-3 font-sans">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs font-mono font-bold block mb-1">Free Trade Agreements (FTA)</span>
                  {profile.ftaAgreements.map((fta, idx) => (
                    <div key={idx} className="text-emerald-300 text-xs flex items-center gap-1.5 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{fta}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs font-mono font-bold block mb-1">Restricted Items</span>
                  {profile.restrictedItems.map((item, idx) => (
                    <div key={idx} className="text-rose-300 text-xs flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
