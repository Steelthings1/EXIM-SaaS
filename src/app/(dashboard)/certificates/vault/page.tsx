"use client";

import React, { useState } from 'react';
import { ShieldCheck, Sparkles, FileText, Download, CheckCircle2, Award } from 'lucide-react';
import { draftStatutoryCertificate, DraftedCertificateResult, CertificateType } from '@/lib/ai/certificate-generator';

export default function ExportCertificatesVaultPage() {
  const [certs, setCerts] = useState([
    {
      id: 'cert-101',
      type: 'PHYTOSANITARY' as CertificateType,
      number: 'PHYTO-INDIA-2026-9901',
      issuingBody: 'Directorate of Plant Protection, Quarantine & Storage (India)',
      batchNumber: 'LOT-2026-RIC-441',
      productName: 'Traditional Organic Indian Basmati Rice',
      issueDate: '2026-02-01',
      isActive: true
    },
    {
      id: 'cert-102',
      type: 'CERTIFICATE_OF_ANALYSIS' as CertificateType,
      number: 'COA-SGS-2026-4412',
      issuingBody: 'SGS India NABL ISO 17025 Accredited Laboratory',
      batchNumber: 'BATCH-2026-COF-091',
      productName: 'Premium Roasted Arabica Coffee Beans',
      issueDate: '2026-01-20',
      isActive: true
    }
  ]);

  const [draftedCert, setDraftedCert] = useState<DraftedCertificateResult | null>(null);

  const handleDraftWithAi = (type: CertificateType, batchNumber: string, productName: string) => {
    const drafted = draftStatutoryCertificate(
      type,
      {
        batchNumber,
        productName,
        labName: 'SGS NABL Laboratory',
        moisturePct: 4.8,
        activeIngredientPct: 99.0,
        heavyMetalsPpm: 0.1,
        microbialStatus: 'PASS_CLEAR'
      }
    );
    setDraftedCert(drafted);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
              Statutory Export Certificates Vault & AI Generator Agent
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Repository for Phytosanitary Certificates, Certificates of Analysis (CoA), Health Certificates, and Fumigation records.
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((c) => (
            <div key={c.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white font-mono">{c.number}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{c.issuingBody}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  {c.type}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Batch Number:</span>
                  <span className="text-indigo-300 font-bold">{c.batchNumber}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Product Name:</span>
                  <span className="text-slate-200">{c.productName}</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Issue Date:</span>
                  <span className="text-slate-200">{c.issueDate}</span>
                </div>
              </div>

              <button
                onClick={() => handleDraftWithAi(c.type, c.batchNumber, c.productName)}
                className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 rounded-xl text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Auto-Draft Official Document with AI Agent</span>
              </button>
            </div>
          ))}
        </div>

        {/* Drafted Cert Result Modal / Display */}
        {draftedCert && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                AI Drafted Certificate: {draftedCert.certificateNumber}
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Customs Valid: {draftedCert.isValidForCustoms ? 'YES' : 'NO'}
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Issuing Authority</span>
                <span className="text-indigo-300 font-bold">{draftedCert.issuingAuthority}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Legal Exporter & Consignee</span>
                <span className="text-slate-200">{draftedCert.legalExporter} &rarr; {draftedCert.consignee}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-sans text-slate-300">
                <span className="text-slate-500 block uppercase font-sans text-[10px] mb-1">Official Declaration Statement</span>
                <p>{draftedCert.declarationText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
