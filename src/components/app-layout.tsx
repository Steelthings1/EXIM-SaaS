"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { TenantSwitcher } from '@/components/tenant-switcher';
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
  Ship,
  Landmark,
  DollarSign,
  Code2,
  Store,
  Bell,
  Settings,
  FileBarChart,
  Lock,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User,
  Plus
} from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarGroups = [
    {
      group: "Core Infrastructure",
      items: [
        { label: "Dashboard", href: "/", icon: LayoutDashboard },
        { label: "Organization", href: "/settings/organization", icon: Building2 },
        { label: "Statutory Vault", href: "/settings/statutory-vault", icon: ShieldCheck },
        { label: "Members & RBAC", href: "/settings/members-roles", icon: Users },
        { label: "Workspace V2", href: "/settings/workspace-v2", icon: Settings },
        { label: "Security Logs V2", href: "/security/activity-logs", icon: Lock },
      ]
    },
    {
      group: "Compliance & Banking",
      items: [
        { label: "AI HS Classifier", href: "/compliance/hs-classifier", icon: Network },
        { label: "Landed Cost", href: "/compliance/tariff-calculator", icon: Calculator },
        { label: "Sanctions Screener", href: "/compliance/sanctions-screening", icon: ShieldAlert },
        { label: "Contract Audit", href: "/sales/contract-audit", icon: Scale },
        { label: "LC UCP 600 Auditor V3", href: "/banking/lc-auditor-v3", icon: Landmark },
        { label: "eBRC / EDPMS V3", href: "/banking/edpms-closures-v3", icon: DollarSign },
      ]
    },
    {
      group: "Single-Entry & Logistics",
      items: [
        { label: "Product Master", href: "/products/catalog", icon: Package },
        { label: "Single-Entry Workbench", href: "/documents/single-entry-workbench", icon: FileText },
        { label: "Freight Aggregator", href: "/logistics/freight-rates", icon: Ship },
        { label: "AIS Telemetry", href: "/logistics/ais-telemetry", icon: Globe },
        { label: "Marine Insurance", href: "/insurance/marine-policies", icon: ShieldCheck },
      ]
    },
    {
      group: "Incentives & Ecosystem",
      items: [
        { label: "RoDTEP Claims V3", href: "/incentives/claims-v3", icon: Sparkles },
        { label: "Scheduled Reports", href: "/reports/templates", icon: FileBarChart },
        { label: "Developer API V3", href: "/developer/api-keys-v3", icon: Code2 },
        { label: "Ecosystem Directory", href: "/marketplace/ecosystem-directory", icon: Store },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Command Palette Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-600/30">
              EX
            </div>
            <span className="font-extrabold text-base text-white tracking-tight">EXIM<span className="text-indigo-400">.IM</span></span>
          </Link>

          {/* Quick Search Bar */}
          <div className="relative hidden md:flex items-center">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5" />
            <input
              type="text"
              placeholder="Search trade orders, HS codes, LC SWIFT, partners..."
              className="w-72 pl-9 pr-12 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono transition-all"
            />
            <kbd className="absolute right-3 px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-slate-400 font-mono">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Quick Action Controls */}
        <div className="flex items-center gap-3">
          <Link href="/documents/single-entry-workbench" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            <span>New Order</span>
          </Link>

          <TenantSwitcher />

          <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Left Sidebar */}
        <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-950/80 border-r border-slate-800/80 p-4 flex flex-col justify-between transition-all duration-200 relative`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center z-50 shadow-md"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>

          <div className="space-y-6 overflow-y-auto pr-1">
            {sidebarGroups.map((g, gIdx) => (
              <div key={gIdx} className="space-y-2">
                {!collapsed && (
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                    {g.group}
                  </h4>
                )}

                <div className="space-y-1">
                  {g.items.map((item, iIdx) => {
                    const IconComp = item.icon;
                    return (
                      <Link
                        key={iIdx}
                        href={item.href}
                        className="flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-colors group"
                        title={collapsed ? item.label : undefined}
                      >
                        <IconComp className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!collapsed && (
            <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>EXIM.IM Global Trade OS</span>
              <span className="text-emerald-400 font-bold">v1.0.0</span>
            </div>
          )}
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
