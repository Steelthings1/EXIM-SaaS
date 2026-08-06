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
  History,
  ShoppingCart,
  PackageCheck,
  Camera,
  Key
} from 'lucide-react';

export const metadata = {
  title: 'EXIM.IM — Enterprise Exim Trade SaaS Platform',
  description: 'Complete 30-Module Exim Platform with LC UCP 600 Auditor V3, eBRC / EDPMS Reconciliation, Multi-Currency Finance & Forex Treasury, Developer API Center, Statutory Vault, and Global Trade Infrastructure.',
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

              {/* Module 21 Banking, LC Auditor & EDPMS Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <Landmark className="w-3.5 h-3.5 text-indigo-400" />
                  Banking & LC Auditor
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/banking/lc-auditor-v3" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Letter of Credit UCP 600 Auditor V3</Link>
                  <Link href="/banking/edpms-closures-v3" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">eBRC & EDPMS Closures V3</Link>
                  <Link href="/finance/multi-currency-invoices" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Multi-Currency Invoices (LUT)</Link>
                  <Link href="/finance/forex-treasury" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Forex Realized Gain/Loss</Link>
                </div>
              </div>

              {/* Developer API & Webhooks Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  Developer & Webhooks
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/developer/api-keys" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Developer API Keys</Link>
                  <Link href="/developer/webhooks" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Webhook Subscriptions (HMAC)</Link>
                </div>
              </div>

              {/* Module 16 10-Dashboard Suite Link */}
              <Link href="/analytics/suite" className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 transition-colors flex items-center gap-1.5 font-bold">
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                10-Dashboard Suite
              </Link>
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
            <span>Module 21 Banking Auditor Active</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
