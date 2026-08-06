"use client";

import React, { useState } from 'react';
import { Globe, Search, ShieldCheck, FileText, CheckCircle2, Award } from 'lucide-react';

export default function CountryKnowledgeBasePage() {
  const [countries, setCountries] = useState([
    {
      code: 'ARE',
      name: 'United Arab Emirates (Dubai)',
      authority: 'Dubai Customs / Federal Customs Authority',
      certs: ['PHYTOSANITARY', 'CERTIFICATE_OF_ANALYSIS', 'HALAL'],
      labeling: 'Dual-language English/Arabic packaging labels required with production/expiry dates.',
      fta: 'India-UAE CEPA (Comprehensive Economic Partnership Agreement) - 0% Duty for HS 0901'
    },
    {
      code: 'USA',
      name: 'United States of America',
      authority: 'U.S. Customs and Border Protection (CBP) & US FDA',
      certs: ['FDA_PRIOR_NOTICE', 'CERTIFICATE_OF_ANALYSIS'],
      labeling: 'US FDA Nutrition Facts panel with net weight in oz/g and allergen statements.',
      fta: 'GSP Preferential Duty Eligibility'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Globe className="w-7 h-7 text-indigo-400" />
              Destination Country Customs & Regulatory Knowledge Base
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Destination market customs mandates, food packaging rules, mandatory certificate checklists, and Free Trade Agreement (FTA) preferences.
            </p>
          </div>
        </div>

        {/* Country Profiles List */}
        <div className="space-y-4">
          {countries.map((c) => (
            <div key={c.code} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{c.name}</span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      {c.code}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{c.authority}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block uppercase font-sans text-[10px]">Mandatory Customs Certificates</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {c.certs.map((cert, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-bold">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-sans text-slate-300">
                  <span className="text-slate-500 block uppercase font-sans text-[10px] mb-0.5">Food Packaging & Labeling Mandate</span>
                  <p>{c.labeling}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-sans text-indigo-300">
                  <span className="text-slate-500 block uppercase font-sans text-[10px] mb-0.5">Free Trade Agreement (FTA) Preference</span>
                  <p>{c.fta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
