import React from 'react';
import './globals.css';
import { TenantSwitcher } from '@/components/tenant-switcher';
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
  LayoutDashboard,
  FileText,
  Package,
  Layers,
  Scale,
  Box,
  Factory,
  FlaskConical,
  Award,
  Ship,
  Anchor,
  Satellite,
  Landmark,
  DollarSign,
  Bot,
  Code2,
  Store,
  MessageSquare,
  ArrowLeftRight,
  AlertCircle,
  Zap,
  History
} from 'lucide-react';

export const metadata = {
  title: 'EXIM.IM — Enterprise Exim Trade SaaS Platform',
  description: 'Complete 30-Module Exim Platform with Cascading Document Engine, Multi-Warehouse Stock Engine, KYB Verification, and Global Trade Infrastructure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        {/* Navigation Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                EX
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">EXIM<span className="text-indigo-400">.IM</span></span>
                <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">Global Trade OS</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-300">
              <Link href="/" className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white transition-colors flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                Dashboard
              </Link>

              {/* Multi-Modal AI Copilot Link */}
              <Link href="/ai/copilot" className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 transition-colors flex items-center gap-1.5 font-bold">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                AI Copilot
              </Link>
              
              {/* 10-Dashboard Suite Link */}
              <Link href="/analytics/multi-dashboards" className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 transition-colors flex items-center gap-1.5 font-bold">
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                10-Dashboard Suite
              </Link>

              {/* Module 6 Single Entry & Cascading Workbench Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Module 6: Single-Entry
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/documents/single-entry-workbench" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Single-Entry Workbench</Link>
                  <Link href="/documents/cascading-editor" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Cascading Field Editor</Link>
                  <Link href="/documents/version-history" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Version History (SHA-256)</Link>
                </div>
              </div>

              {/* Bundle F Portal & Marketplace Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Bundle F: AI & Platform
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/kb/country-intelligence" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Country Knowledge Base</Link>
                  <Link href="/developer/api-center" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Developer API & Webhooks</Link>
                  <Link href="/marketplace/directory" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Ecosystem Marketplace</Link>
                </div>
              </div>

              {/* Bundle E Banking, Trade Finance & Incentives */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                  Bundle E: Finance & eBRC
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/banking/lc-checker" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">LC UCP 600 Discrepancy Auditor</Link>
                  <Link href="/banking/ebrc-reconciliation" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">eBRC & EDPMS Reconciliation</Link>
                  <Link href="/finance/multi-currency-invoices" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Multi-Currency Invoices & FX</Link>
                  <Link href="/incentives/ledger" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Export Incentives (RoDTEP)</Link>
                </div>
              </div>

              {/* Bundle D Logistics & Insurance Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5 text-indigo-400" />
                  Bundle D: Logistics & Insurance
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/logistics/freight-rates" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Freight Rate Aggregator</Link>
                  <Link href="/logistics/bookings" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Carrier Bookings Registry</Link>
                  <Link href="/logistics/ais-tracking" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Satellite AIS Vessel Tracker</Link>
                  <Link href="/insurance/marine-policies" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Marine Cargo Insurance Vault</Link>
                </div>
              </div>

              {/* Bundle C Manufacturing & QC Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-emerald-400" />
                  Bundle C: Mfg & QC Loading
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/qc/container-loading" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">3D Container Loading Planner</Link>
                  <Link href="/qc/inspections" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">QC & NABL Lab Inspection</Link>
                  <Link href="/production/batches" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Manufacturing Production Batches</Link>
                  <Link href="/certificates/vault" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Statutory Export Certificates Vault</Link>
                </div>
              </div>

              {/* Bundle B Commercial Workflow Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-indigo-400" />
                  Bundle B: Contracts & Sales
                </span>
                <div className="absolute left-0 mt-1 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/sales/quotations" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Proforma Quotations</Link>
                  <Link href="/sales/contracts" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">CISG Sales Contracts & AI</Link>
                  <Link href="/procurement/orders" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Vendor PO Procurement</Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Tenant Switcher Header Widget */}
          <div>
            <TenantSwitcher />
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-6 px-8 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 EXIM.IM SaaS Platform. Enterprise Exim Multi-Tenant Infrastructure.
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>100% Platform Realized (30 Modules Complete)</span>
            <span>•</span>
            <span>Module 6 Cascading Engine Active</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
