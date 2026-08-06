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
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'EXIM.IM — Enterprise Exim Trade SaaS Platform',
  description: 'Multi-tenant Exim platform with AI HS Classification, Statutory Vault, Landed Cost Calculator, and Sanctions Screening.',
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

            {/* Quick Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-300">
              <Link href="/" className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white transition-colors flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                Dashboard
              </Link>
              
              {/* Settings Dropdown / Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  Module 1: Profile & Vault
                </span>
                <div className="absolute left-0 mt-1 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/settings/organization" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Organization Settings</Link>
                  <Link href="/settings/statutory-vault" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Statutory Identity Vault</Link>
                  <Link href="/settings/branches-warehouses" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Branch & Warehouse Registry</Link>
                  <Link href="/settings/members-roles" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Members & 19 RBAC Roles</Link>
                </div>
              </div>

              {/* Compliance Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5 text-emerald-400" />
                  Module 2: Compliance Suite
                </span>
                <div className="absolute left-0 mt-1 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/compliance/hs-classifier" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">AI HS Code Classifier</Link>
                  <Link href="/compliance/country-rules" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Country Regulatory Rules</Link>
                  <Link href="/compliance/tariff-calculator" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Landed Cost & Duty Calculator</Link>
                  <Link href="/compliance/sanctions-screening" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Fuzzy Sanctions Screener</Link>
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
            <span>Module 1 & 2 Active</span>
            <span>•</span>
            <span>WCO 2026 Tariff Engine</span>
            <span>•</span>
            <span>OFAC / UNSC / EU Sanctions Live</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
