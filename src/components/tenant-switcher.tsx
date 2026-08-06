"use client";

import React, { useState } from 'react';
import { Building2, ChevronDown, Check, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export interface TenantInfo {
  id: string;
  legalName: string;
  taxId: string;
  iecCode: string;
  tier: 'ENTERPRISE_TIER_1' | 'GROWTH' | 'FREE_STARTER';
  isPrimary?: boolean;
}

const SAMPLE_TENANTS: TenantInfo[] = [
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    legalName: 'Apex Global Logistics & Trading Pvt Ltd',
    taxId: 'GSTIN: 27AAACA1234A1Z5',
    iecCode: 'IEC: 0304005001',
    tier: 'ENTERPRISE_TIER_1',
    isPrimary: true,
  },
  {
    id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    legalName: 'Apex Overseas Europe GmbH (Frankfurt Hub)',
    taxId: 'DE321987654',
    iecCode: 'EORI: DE123456789',
    tier: 'GROWTH',
  },
  {
    id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    legalName: 'Apex Maritime Freight Logistics FZE (Dubai)',
    taxId: 'TRN: 100456789000003',
    iecCode: 'UAE-CUSTOMS-449',
    tier: 'ENTERPRISE_TIER_1',
  }
];

export function TenantSwitcher() {
  const [activeTenant, setActiveTenant] = useState<TenantInfo>(SAMPLE_TENANTS[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 rounded-xl transition-all duration-200 shadow-md backdrop-blur-md text-left"
      >
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg text-white shadow-inner">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-100 truncate max-w-[220px]">
              {activeTenant.legalName}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-2.5 h-2.5 mr-1" />
              {activeTenant.tier.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-0.5">
            <span>{activeTenant.taxId}</span>
            <span className="text-slate-600">•</span>
            <span>{activeTenant.iecCode}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl z-50 overflow-hidden divide-y divide-slate-800">
          <div className="p-3 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Multi-Tenant Identity Vault
            </span>
            <span className="text-slate-500">{SAMPLE_TENANTS.length} Active Organizations</span>
          </div>

          <div className="py-2 max-h-72 overflow-y-auto">
            {SAMPLE_TENANTS.map((tenant) => {
              const isSelected = tenant.id === activeTenant.id;
              return (
                <button
                  key={tenant.id}
                  onClick={() => {
                    setActiveTenant(tenant);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-start justify-between transition-colors ${
                    isSelected ? 'bg-indigo-950/50 text-white' : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-slate-100">{tenant.legalName}</span>
                      {tenant.isPrimary && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          PRIMARY HQ
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <span>{tenant.taxId}</span>
                      <span className="text-slate-600">|</span>
                      <span>{tenant.iecCode}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="p-1 bg-indigo-500/20 rounded-full text-indigo-400">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-950/80 text-center">
            <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center justify-center gap-1.5 w-full py-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Register New Trade Entity or Subsidiary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
