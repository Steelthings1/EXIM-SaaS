"use client";

import React, { useState } from 'react';
import { Search, Sparkles, Network, CheckCircle2, ShieldAlert, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { classifyProductDescription, HSClassificationResult } from '@/lib/ai/hs-classifier';

export default function HSClassifierDashboardPage() {
  const [query, setQuery] = useState('Roasted Arabica specialty coffee beans, whole bean 1kg export packs');
  const [country, setCountry] = useState('IND');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HSClassificationResult | null>(null);

  const handleClassify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      const res = await classifyProductDescription(query, country);
      setResult(res);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Network className="w-7 h-7 text-indigo-400" />
              AI Natural Language HS Code Classifier
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Classify products into WCO 6-digit base and 8-10 digit national tariff sub-headings using AI keyword vector search.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleClassify} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                Enter Product Description or Commercial Invoice Line Item
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 font-medium transition-colors"
                  placeholder="e.g., Organic Basmati Rice, 5G Wireless Smartphones, Cotton Woven Mens Shirts"
                />
                <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-4" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                Target Customs Jurisdiction
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="IND">India (ITC-HS 8-digit)</option>
                <option value="USA">United States (HTS 10-digit)</option>
                <option value="ARE">UAE (GCC Common Customs 8-digit)</option>
                <option value="EU">European Union (TARIC 10-digit)</option>
                <option value="GBR">United Kingdom (UK Tariff 8-digit)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isLoading ? 'Predicting Tariff Code...' : 'Predict AI HS Code'}</span>
            </button>
          </div>
        </form>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Primary Classification Result */}
            <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                    AI Predicted National Tariff Subheading
                  </span>
                  <div className="text-3xl font-extrabold text-white font-mono tracking-widest flex items-center gap-3">
                    <span>{result.predictedHsCode}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-sans font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {(result.confidenceScore * 100).toFixed(0)}% AI Confidence Rating
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono text-sm">
                  <span className="text-slate-400 block text-xs font-sans">Standard Basic Customs Duty (BCD)</span>
                  <span className="text-xl font-bold text-amber-300">{result.stdDutyRate}%</span>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-mono mb-1">Tariff Schedule Description</span>
                  <p className="text-base text-slate-200 font-medium">{result.description}</p>
                </div>

                {/* Hierarchy Tree */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono">
                  <div className="text-slate-500 font-bold uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    WCO Nomenclature Hierarchy Tree
                  </div>
                  <div className="text-slate-300"><strong>Section:</strong> {result.hierarchy.section}</div>
                  <div className="text-slate-300"><strong>Chapter {result.chapter}:</strong> {result.hierarchy.chapterName}</div>
                  <div className="text-slate-300"><strong>Heading {result.heading}:</strong> {result.hierarchy.headingName}</div>
                  <div className="text-indigo-300"><strong>Subheading {result.subheading}:</strong> {result.hierarchy.subheadingName}</div>
                </div>
              </div>
            </div>

            {/* Alternative Candidates */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Alternative Related Tariff Codes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.alternativeMatches.map((alt) => (
                  <div key={alt.hsCode} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between text-indigo-300 font-bold">
                      <span>{alt.hsCode}</span>
                      <span className="text-slate-500">{(alt.confidenceScore * 100).toFixed(0)}% score</span>
                    </div>
                    <div className="text-slate-400 font-sans line-clamp-2">{alt.description}</div>
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
