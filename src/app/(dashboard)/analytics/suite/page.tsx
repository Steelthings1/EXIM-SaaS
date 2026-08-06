"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  TrendingUp, 
  Ship, 
  Users, 
  Factory, 
  Warehouse, 
  Landmark, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { getDashboardViewData, DashboardViewType, DashboardViewData } from '@/lib/multi-dashboard-engine';

export default function MultiDashboardSuitePage() {
  const [activeTab, setActiveTab] = useState<DashboardViewType>('EXECUTIVE');
  const viewData: DashboardViewData = getDashboardViewData(activeTab);

  const tabs: { id: DashboardViewType; label: string; icon: any }[] = [
    { id: 'EXECUTIVE', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'DESTINATION_MARKETS', label: 'Destination Markets', icon: Globe },
    { id: 'EXPORT_SALES', label: 'Export Sales & Pipeline', icon: TrendingUp },
    { id: 'VESSEL_CONTAINER', label: 'Vessel & Container Telemetry', icon: Ship },
    { id: 'BUYER_PERFORMANCE', label: 'Buyer Performance', icon: Users },
    { id: 'VENDOR_PROCUREMENT', label: 'Vendor Procurement', icon: Factory },
    { id: 'MULTI_WAREHOUSE', label: 'Multi-Warehouse Inventory', icon: Warehouse },
    { id: 'FINANCIAL_TREASURY', label: 'Financial & Treasury', icon: Landmark },
    { id: 'SANCTIONS_RISK', label: 'Sanctions & Compliance Risk', icon: ShieldCheck },
    { id: 'AI_PREDICTIVE', label: 'AI Predictive Insights', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7 text-indigo-400" />
              10-Dashboard Operational & Executive Intelligence Suite
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Unified cross-functional telemetry dashboard providing 1-click access to all 10 specialized trade intelligence views.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
              LIVE TELEMETRY STREAMING
            </span>
          </div>
        </div>

        {/* 10 Tab Switching Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold shrink-0 flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                    : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active View Header */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{viewData.title}</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans">{viewData.description}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {viewData.metrics.map((metric) => (
            <div key={metric.key} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 font-mono">
              <span className="text-xs font-sans text-slate-400 block">{metric.label}</span>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">
                  {metric.unit === '$' || metric.unit === '₹' ? `${metric.unit} ${metric.value.toLocaleString()}` : `${metric.value.toLocaleString()} ${metric.unit}`}
                </span>

                <span className={`text-xs font-bold flex items-center ${
                  metric.yoyTrendPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {metric.yoyTrendPct >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {Math.abs(metric.yoyTrendPct)}%
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-sans text-slate-400">
                {metric.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
