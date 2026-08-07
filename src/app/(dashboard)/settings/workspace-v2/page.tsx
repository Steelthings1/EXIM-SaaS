"use client";

import React, { useState } from 'react';
import { Building2, Save, Globe, FileText, CheckCircle2, DollarSign, Image } from 'lucide-react';

export default function WorkspaceSettingsV2Page() {
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [taxSystem, setTaxSystem] = useState('INDIA_GST');
  const [subdomain, setSubdomain] = useState('trade.steelthings.com');
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
            Workspace Settings, Branding & Regional System Configuration V2
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Master tenant system settings, regional tax rules (GST / VAT / Sales Tax), custom CNAME aliases, and export legal document branding headers/footers.
          </p>
        </div>

        {/* Configuration Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            Regional Tax System & Localization Defaults
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
              <label className="block text-slate-400 font-sans mb-1">Regional Tax System</label>
              <select value={taxSystem} onChange={(e) => setTaxSystem(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="INDIA_GST">India GST (CGST/SGST/IGST)</option>
                <option value="UAE_VAT">UAE VAT (5% Federal Tax)</option>
                <option value="US_SALES_TAX">US State Sales Tax</option>
                <option value="UK_EU_VAT">UK/EU VAT (Value Added Tax)</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-400 font-sans mb-1">Custom Subdomain Alias</label>
              <input type="text" value={subdomain} onChange={(e) => setSubdomain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 pt-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Export Document Branding Header & Footer Customization
          </h2>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Official Document Letterhead Header Banner</label>
              <textarea rows={2} value={headerText} onChange={(e) => setHeaderText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Official Document Letterhead Footer Banner</label>
              <textarea rows={2} value={footerText} onChange={(e) => setFooterText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" />
            </div>
          </div>

          <button onClick={handleSave}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Save className="w-4 h-4 text-emerald-400" />
            <span>Save Workspace Settings & Branding V2 Configuration</span>
          </button>

          {saved && (
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
              Workspace V2 configuration saved and letterhead banners formatted successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
