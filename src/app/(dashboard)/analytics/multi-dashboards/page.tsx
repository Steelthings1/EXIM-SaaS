"use client";

import React, { useState } from 'react';
import { LayoutDashboard, TrendingUp, Globe, ShoppingBag, Ship, Users, Factory, Warehouse, DollarSign, ShieldCheck, Sparkles } from 'lucide-react';
import { getDashboardViewData, DashboardViewType, DashboardViewData } from '@/lib/analytics-engine';

export default function MultiDashboardsPage() {
  const [activeView, setActiveView] = useState<DashboardViewType>('EXECUTIVE');

  const data: DashboardViewData = getDashboardViewData(activeView);

  const views: Array<{ type: DashboardViewType; label: string; icon: React.ElementType }> = [
    { type: 'EXECUTIVE', label: '1. Executive C-Suite', icon: LayoutDashboard },
    { type: 'COUNTRY', label: '2. Destination Country', icon: Globe },
    { type: 'SALES', label: '3. Sales & Quotations', icon: ShoppingBag },
    { type: 'SHIPMENT', label: '4. Shipment AIS', icon: Ship },
    { type: 'CUSTOMER', label: '5. Customer CRM', icon: Users },
    { type: 'SUPPLIER', label: '6. Supplier Procurement', icon: Factory },
    { type: 'INVENTORY', label: '7. Multi-Warehouse', icon: Warehouse },
    { type: 'FINANCIAL', label: '8. Financial & eBRC', icon: DollarSign },
    { type: 'RISK', label: '9. Risk & Sanctions', icon: ShieldCheck },
    { type: 'AI_INSIGHTS', label: '10. AI Predictive Insights', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7 text-indigo-400" />
              10-Dashboard Operational Intelligence Suite
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Switch seamlessly across 10 specialized executive and operational dashboard views powered by real-time platform telemetry.
            </p>
          </div>
        </div>

        {/* 10 Dashboard Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs font-mono">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = activeView === v.type;
            return (
              <button
                key={v.type}
                onClick={() => setActiveView(v.type)}
                className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-indigo-950 border-indigo-500 text-indigo-300 font-bold shadow-lg ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{v.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Dashboard Title & Summary */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white">{data.title}</h2>
            <p className="text-xs text-indigo-400 font-mono font-medium">{data.summaryMessage}</p>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.kpiCards.map((kpi, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-sans text-slate-500 uppercase font-semibold block">{kpi.label}</span>
                <span className="text-2xl font-extrabold text-white font-mono block">{kpi.value}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {kpi.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
