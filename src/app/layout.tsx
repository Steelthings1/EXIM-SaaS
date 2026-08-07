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
  Key,
  Clock,
  Bell,
  Settings,
  FileBarChart,
  Lock
} from 'lucide-react';

export const metadata = {
  title: 'EXIM.IM — Enterprise Exim Trade SaaS Platform',
  description: 'Complete 30-Module Exim Platform with Security Audit Logs V2, Anomaly Alerts, Workspace Settings V2 & Branding, Scheduled Management Reports, Workspace Settings & Audit Logs, Notification Center, Workflow Automation, Export Incentive Ledger, LC UCP 600 Auditor V3, eBRC / EDPMS Reconciliation, Multi-Currency Finance, Developer API Center, Statutory Vault, and Global Trade Infrastructure.',
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

              {/* Module 28 Security Telemetry Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  Security Telemetry
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/security/activity-logs" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Security Activity Logs V2 & Audit Trail</Link>
                  <Link href="/security/alerts" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Security Anomaly Detection Alerts</Link>
                </div>
              </div>

              {/* Module 26 Complete Report Engine Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <FileBarChart className="w-3.5 h-3.5 text-indigo-400" />
                  Scheduled Reports
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/reports/templates" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Scheduled Report Templates & Dispatch</Link>
                  <Link href="/reports/vault" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Generated Reports Vault & Checksums</Link>
                </div>
              </div>

              {/* Module 25 & 27 Settings & Audit Logs Link */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <Settings className="w-3.5 h-3.5 text-indigo-400" />
                  Settings & Branding
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/settings/workspace-v2" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Workspace Settings & Branding V2</Link>
                  <Link href="/settings/workspace" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Workspace System Settings</Link>
                  <Link href="/settings/audit-logs" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Security Audit Trail & Activity Logs</Link>
                </div>
              </div>

              {/* Module 24 Notifications Bell Link */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <Bell className="w-3.5 h-3.5 text-indigo-400" />
                  Notifications & Alerts
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/notifications/center" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">In-App Notification Center</Link>
                  <Link href="/notifications/preferences" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Delivery Channel Preferences</Link>
                </div>
              </div>

              {/* Module 23 Workflow Automation & Approvals Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Workflow & Approvals
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/workflow/approvals" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Approval Requests & Executive Sign-Off</Link>
                  <Link href="/workflow/reminders" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Automated Reminder Rules & Alerts</Link>
                </div>
              </div>

              {/* Module 22 Export Incentive Links */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 hover:bg-indigo-900/60 text-indigo-300 cursor-pointer transition-colors flex items-center gap-1.5 font-bold">
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  Incentives & e-Scrip
                </span>
                <div className="absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50 space-y-1">
                  <Link href="/incentives/claims-v3" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">Export Incentive Claims V3 (RoDTEP)</Link>
                  <Link href="/incentives/escrip-ledger" className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300">DGFT e-Scrip Credit Balance Ledger</Link>
                </div>
              </div>

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
            <span>Module 28 Security Telemetry Active</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
