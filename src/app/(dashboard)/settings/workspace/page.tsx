"use client";

import React, { useState } from 'react';
import { Building2, CheckCircle2, Globe, Clock, FileText, Save } from 'lucide-react';

export default function WorkspaceSettingsPage() {
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [language, setLanguage] = useState('en');
  const [domain, setDomain] = useState('trade.steelthings.com');
  const [headerText, setHeaderText] = useState('STEELTHINGS EXIM PRIVATE LIMITED - ISO 9001:2015 CERTIFIED EXPORTER');
  const [footerText, setFooterText] = useState('Registered Office: Chennai Port Trust Road, TN, India. AD Code: 0001892.');

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Building2 className="w-7 h-7 text-indigo-400" />
            Workspace System Settings & Document Headers/Footers
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure multi-tenant system time zone, default currency, custom domain CNAME aliases, and legal export document header/footer text.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            System Localization & Domain Parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Base Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="INR">INR (₹ Indian Rupee)</option>
                <option value="USD">USD ($ US Dollar)</option>
                <option value="EUR">EUR (€ Euro)</option>
                <option value="AED">AED (د.إ UAE Dirham)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">System Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Custom Domain Alias</label>
              <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 pt-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Export Legal Document Formatting (Commercial Invoices & Shipping Bills)
          </h2>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Official Header Text</label>
              <textarea rows={2} value={headerText} onChange={(e) => setHeaderText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Official Footer Text</label>
              <textarea rows={2} value={footerText} onChange={(e) => setFooterText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" />
            </div>
          </div>

          <button onClick={handleSave}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Save className="w-4 h-4 text-emerald-400" />
            <span>Save Workspace Configuration Settings</span>
          </button>

          {saved && (
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
              Workspace system parameters updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
