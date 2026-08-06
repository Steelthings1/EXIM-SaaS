"use client";

import React, { useState } from 'react';
import { Building2, Save, Globe, ShieldCheck, DollarSign, FileCheck, Layers, CheckCircle } from 'lucide-react';

export default function OrganizationSettingsPage() {
  const [formData, setFormData] = useState({
    legalName: 'Apex Global Logistics & Trading Pvt Ltd',
    tradeName: 'Apex Exim Global',
    entityType: 'PRIVATE_LIMITED',
    taxIdGstin: '27AAACA1234A1Z5',
    iecCode: '0304005001',
    eoriNumber: 'GB123456789000',
    panNumber: 'AAACA1234A',
    defaultCurrency: 'USD',
    subscriptionTier: 'ENTERPRISE_TIER_1',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Building2 className="w-7 h-7 text-indigo-400" />
              Organization & Business Profile
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Configure multi-tenant legal identity, statutory tax IDs (GSTIN/EIN), IEC DGFT credentials, and invoicing currency.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Tier 1 Enterprise Identity Verified
            </span>
          </div>
        </div>

        {isSaved && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm flex items-center gap-3 shadow-lg">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Organization profile and statutory identity updated successfully in multi-tenant vault.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Legal Profile */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Globe className="w-5 h-5 text-indigo-400" />
              Legal Corporate Structure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  Registered Legal Name *
                </label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  Trade / Brand Name
                </label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  Legal Entity Classification
                </label>
                <select
                  value={formData.entityType}
                  onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="PRIVATE_LIMITED">Private Limited Company (Pvt Ltd)</option>
                  <option value="PUBLIC_LIMITED">Public Limited Company</option>
                  <option value="LLP">Limited Liability Partnership (LLP)</option>
                  <option value="PROPRIETORSHIP">Sole Proprietorship</option>
                  <option value="FOREIGN_BRANCH">Foreign Branch / Liaison Office</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  Default Trade Invoicing Currency
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.defaultCurrency}
                    onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="USD">USD - United States Dollar ($)</option>
                    <option value="EUR">EUR - Euro (€)</option>
                    <option value="INR">INR - Indian Rupee (₹)</option>
                    <option value="GBP">GBP - British Pound (£)</option>
                    <option value="AED">AED - UAE Dirham (AED)</option>
                    <option value="SGD">SGD - Singapore Dollar (S$)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Statutory Identifiers & Tax Vault */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              Statutory Exim Identifiers & Tax Credentials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  GSTIN (India GST Identifier)
                </label>
                <input
                  type="text"
                  value={formData.taxIdGstin}
                  onChange={(e) => setFormData({ ...formData, taxIdGstin: e.target.value.toUpperCase() })}
                  maxLength={15}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-300 text-base font-semibold focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="27AAACA1234A1Z5"
                />
                <p className="text-[11px] text-slate-500 mt-1">15-digit GSTIN verified against Central Board of Indirect Taxes & Customs.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  Import Export Code (IEC - DGFT)
                </label>
                <input
                  type="text"
                  value={formData.iecCode}
                  onChange={(e) => setFormData({ ...formData, iecCode: e.target.value.toUpperCase() })}
                  maxLength={10}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-300 text-base font-semibold focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="0304005001"
                />
                <p className="text-[11px] text-slate-500 mt-1">10-character DGFT statutory code for customs export-import operations.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  EORI Number (EU / UK Trade)
                </label>
                <input
                  type="text"
                  value={formData.eoriNumber}
                  onChange={(e) => setFormData({ ...formData, eoriNumber: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-300 text-base font-semibold focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="GB123456789000"
                />
                <p className="text-[11px] text-slate-500 mt-1">Economic Operators Registration and Identification for European/UK customs.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                  PAN Number (India Income Tax)
                </label>
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                  maxLength={10}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-300 text-base font-semibold focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="AAACA1234A"
                />
                <p className="text-[11px] text-slate-500 mt-1">10-character Permanent Account Number identifier.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
            >
              <Save className="w-5 h-5" />
              Save Organization Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
