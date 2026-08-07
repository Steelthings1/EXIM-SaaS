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
  FileCheck,
  Package,
  Boxes,
  Lock,
  Factory,
  ShoppingCart,
  FileText,
  Scale,
  DollarSign,
  Ship,
  Shield,
  Landmark,
  Award,
  Bell,
  Settings,
  FileBarChart,
  Code2,
  Store,
  Bot
} from 'lucide-react';

export default function HomePage() {
  const moduleCategories = [
    {
      title: "Core Infrastructure & System Governance (Modules 1, 25, 27, 28)",
      modules: [
        { href: "/settings/organization", title: "Organization Profile", desc: "Multi-tenant tax IDs (GSTIN, IEC, EORI, PAN) & billing currency.", icon: Building2 },
        { href: "/settings/statutory-vault", title: "Statutory Identity Vault", desc: "AI Certificate vision OCR auto-parser & verification badges.", icon: ShieldCheck },
        { href: "/settings/branches-warehouses", title: "Branch & Warehouse Registry", desc: "Operating offices, sea port codes (INNSA1), and bonded warehouses.", icon: Warehouse },
        { href: "/settings/members-roles", title: "Members & 19 RBAC Roles", desc: "Granular permissions for internal teams and Customs Brokers (CHA).", icon: Users },
        { href: "/settings/workspace-v2", title: "Workspace System Settings & Regional Tax V2", desc: "India GST, UAE VAT, US Sales Tax, UK/EU VAT regional selection.", icon: Settings },
        { href: "/security/activity-logs", title: "Security Audit Logs V2", desc: "Immutable activity ledger, diff tracking & IP anomaly alerts.", icon: Lock },
      ]
    },
    {
      title: "Compliance, Trade Finance & Banking (Modules 2, 10, 14, 15, 21)",
      modules: [
        { href: "/compliance/hs-classifier", title: "AI HS Code Classifier", desc: "Natural language 8-10 digit tariff prediction & WCO trees.", icon: Network },
        { href: "/compliance/country-rules", title: "Country Regulatory Rules", desc: "Statutory certificate checklists & packaging mandates.", icon: Globe },
        { href: "/compliance/tariff-calculator", title: "Landed Cost & Tariff Calculator", desc: "Basic Customs Duty (BCD), VAT/IGST & FTA savings engine.", icon: Calculator },
        { href: "/compliance/sanctions-screening", title: "Fuzzy Sanctions Screener", desc: "Levenshtein similarity search against OFAC SDN, UN, EU lists.", icon: ShieldAlert },
        { href: "/sales/contract-audit", title: "CISG 1980 Legal Contract Auditor", desc: "Automated legal clause verification & dispute risk rating.", icon: Scale },
        { href: "/banking/lc-auditor-v3", title: "Letter of Credit UCP 600 Auditor V3", desc: "SWIFT MT700 discrepancy detection & ISBP 745 compliance.", icon: Landmark },
        { href: "/banking/edpms-closures-v3", title: "eBRC & EDPMS Closures V3", desc: "RBI IRM matching & shipping bill EDPMS settlement ledger.", icon: DollarSign },
      ]
    },
    {
      title: "Single-Entry Operations, Logistics & Supply Chain (Modules 3, 5, 6, 11, 12, 13)",
      modules: [
        { href: "/products/catalog", title: "Product Catalog & Master Vault", desc: "Single-entry product definitions, BOM structures & HS codes.", icon: Package },
        { href: "/inventory/stock", title: "Multi-Warehouse Inventory", desc: "Bonded warehouse stock tracking & reorder alert rules.", icon: Boxes },
        { href: "/documents/single-entry-workbench", title: "Single-Entry Workbench & Cascading Engine", desc: "Auto-generate Shipping Bills, Invoices & Certificates.", icon: FileText },
        { href: "/logistics/freight-rates", title: "Ocean & Air Freight Rate Aggregator", desc: "Demurrage surcharge calculator & container rate comparison.", icon: Ship },
        { href: "/logistics/ais-telemetry", title: "Satellite AIS Telemetry Engine", desc: "Real-time vessel position tracking & ETA prediction.", icon: Globe },
        { href: "/insurance/marine-policies", title: "Marine Cargo Insurance Engine", desc: "Institute Cargo Clauses (A/B/C) certificate generator.", icon: Shield },
      ]
    },
    {
      title: "Incentives, Analytics & Ecosystem Developer Portal (Modules 22, 26, 29, 30)",
      modules: [
        { href: "/incentives/claims-v3", title: "Export Incentive Claims V3 (RoDTEP)", desc: "RoDTEP/RoSCTL incentive calculator & DGFT e-Scrip balance.", icon: Award },
        { href: "/reports/templates", title: "Scheduled Management Reports Engine", desc: "Daily/Weekly executive reports with SHA-256 integrity checksums.", icon: FileBarChart },
        { href: "/developer/api-keys-v3", title: "Developer API Center V3", desc: "Live API keys (exim_live_...), rate limits & HMAC webhooks.", icon: Code2 },
        { href: "/marketplace/ecosystem-directory", title: "Vetted Ecosystem Directory V3", desc: "Directory of CHAs, Freight Forwarders & NABL Testing Labs.", icon: Store },
      ]
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Full Platform Realization Complete — All 30 SaaS Modules Active
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            EXIM.IM — Enterprise Exim Trade SaaS Platform
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            End-to-end multi-tenant international trade OS combining statutory identity vaults, 19-role RBAC permissions, natural language AI HS classification, landed cost calculators, CISG 1980 contract audit, satellite AIS tracking, LC UCP 600 audit V3, DGFT e-Scrip incentives, developer API keys V3, and vetted partner ecosystem directory.
          </p>
        </div>
      </div>

      {/* Module Categories Grid */}
      {moduleCategories.map((category, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              {category.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.modules.map((mod, mIdx) => {
              const IconComp = mod.icon;
              return (
                <Link key={mIdx} href={mod.href} className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">{mod.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{mod.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
