import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Warehouse, 
  Users, 
  Network, 
  Globe, 
  Calculator, 
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  FileCheck
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Module 1 & Module 2 Verified & Complete
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            EXIM.IM — Enterprise Exim Trade SaaS Platform
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            End-to-end multi-tenant international trade OS combining statutory identity vaults, 19-role RBAC permissions, natural language AI HS classification, landed cost calculators with FTA savings, and real-time fuzzy sanctions screening.
          </p>
        </div>
      </div>

      {/* Module 1 Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Module 1: Business Profile & Multi-Tenant Setup
          </h2>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
            Verified Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/settings/organization" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">Organization Profile</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Multi-tenant tax IDs (GSTIN, IEC, EORI, PAN) & billing currency.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link href="/settings/statutory-vault" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">Statutory Identity Vault</h3>
                  <p className="text-xs text-slate-400 mt-0.5">AI Certificate vision OCR auto-parser & verification badges.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link href="/settings/branches-warehouses" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">Branch & Warehouse Registry</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Operating offices, sea port codes (INNSA1), and bonded customs warehouses.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link href="/settings/members-roles" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">Members & 19 RBAC Roles</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Granular permissions for internal teams and Customs Brokers (CHA).</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>

      {/* Module 2 Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
            <Network className="w-5 h-5 text-emerald-400" />
            Module 2: Compliance, HS Code & Regulatory Engine
          </h2>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
            Verified Compliance Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/compliance/hs-classifier" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">AI HS Code Classifier</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Natural language 8-10 digit tariff prediction & WCO hierarchy trees.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link href="/compliance/country-rules" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">Country Regulatory Rules</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Statutory certificate checklists, packaging & labeling mandates.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link href="/compliance/tariff-calculator" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">Landed Cost & Tariff Calculator</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Basic Customs Duty (BCD), VAT/IGST, and FTA savings engine.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link href="/compliance/sanctions-screening" className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">Fuzzy Sanctions Screener</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Levenshtein similarity search against OFAC SDN, UN, EU, UK registries.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
