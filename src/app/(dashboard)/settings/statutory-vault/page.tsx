"use client";

import React, { useState } from 'react';
import { StatutoryVaultCard, StatutoryLicenseProps } from '@/components/statutory-vault-card';
import { ShieldCheck, Upload, Sparkles, Plus, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

const INITIAL_LICENSES: StatutoryLicenseProps[] = [
  {
    licenseId: '11111111-2222-3333-4444-555555555555',
    licenseType: 'GSTIN',
    licenseNumber: '27AAACA1234A1Z5',
    issuingAuthority: 'Goods and Services Tax Network (GSTN India)',
    issueDate: '2020-04-01',
    expiryDate: '2030-03-31',
    status: 'VERIFIED',
    documentUrl: 'https://vault.exim.im/docs/gstin_27AAACA1234A1Z5.pdf',
    verifiedAt: '2025-01-15T09:00:00Z',
  },
  {
    licenseId: '22222222-3333-4444-5555-666666666666',
    licenseType: 'IEC',
    licenseNumber: '0304005001',
    issuingAuthority: 'Directorate General of Foreign Trade (DGFT)',
    issueDate: '2015-08-15',
    expiryDate: '2035-12-31',
    status: 'VERIFIED',
    documentUrl: 'https://vault.exim.im/docs/iec_0304005001.pdf',
    verifiedAt: '2025-01-15T09:05:00Z',
  },
  {
    licenseId: '33333333-4444-5555-6666-777777777777',
    licenseType: 'EORI',
    licenseNumber: 'GB123456789000',
    issuingAuthority: 'HM Revenue & Customs (HMRC UK)',
    issueDate: '2021-01-01',
    expiryDate: '2028-12-31',
    status: 'VERIFIED',
    documentUrl: 'https://vault.exim.im/docs/eori_GB123456789000.pdf',
    verifiedAt: '2025-01-20T11:30:00Z',
  },
  {
    licenseId: '44444444-5555-6666-7777-888888888888',
    licenseType: 'PAN',
    licenseNumber: 'AAACA1234A',
    issuingAuthority: 'Income Tax Department of India',
    issueDate: '2010-05-12',
    expiryDate: undefined,
    status: 'VERIFIED',
    documentUrl: 'https://vault.exim.im/docs/pan_AAACA1234A.pdf',
    verifiedAt: '2025-01-15T09:10:00Z',
  }
];

export default function StatutoryVaultPage() {
  const [licenses, setLicenses] = useState<StatutoryLicenseProps[]>(INITIAL_LICENSES);
  const [isUploading, setIsUploading] = useState(false);
  const [parseSuccessMessage, setParseSuccessMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setParseSuccessMessage(null);

    // Simulate AI Vision OCR Document Parsing
    setTimeout(() => {
      setIsUploading(false);
      const newParsedLicense: StatutoryLicenseProps = {
        licenseId: `lic-${Date.now()}`,
        licenseType: file.name.toLowerCase().includes('rex') ? 'REX_EU' : 'FSSAI',
        licenseNumber: 'IN-FSSAI-2024-998124',
        issuingAuthority: 'Food Safety and Standards Authority of India (FSSAI)',
        issueDate: '2024-01-10',
        expiryDate: '2029-01-09',
        status: 'VERIFIED',
        documentUrl: 'https://vault.exim.im/docs/fssai_sample.pdf',
        verifiedAt: new Date().toISOString(),
      };

      setLicenses([newParsedLicense, ...licenses]);
      setParseSuccessMessage(`AI Vision successfully extracted and verified statutory certificate: ${newParsedLicense.licenseType} (${newParsedLicense.licenseNumber})`);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
              Statutory Identity Vault & AI License Vision Parser
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Centralized repository for verified GSTIN, IEC, EORI, and trade certificates with automated OCR parsing.
            </p>
          </div>

          <label className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer transition-all duration-200 shadow-lg shadow-indigo-600/30">
            <Upload className="w-4 h-4" />
            <span>Upload Certificate PDF</span>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* AI Parse Banner / Drag Drop Zone */}
        <div className="border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/60 rounded-2xl p-8 bg-slate-900/60 text-center relative overflow-hidden transition-all duration-200">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI License Vision Auto-Parsing Engine</h3>
              <p className="text-xs text-slate-400 mt-1">
                Drop your GST Registration, IEC Certificate, EORI PDF, or FSSAI License to automatically extract fields and validate statutory formats.
              </p>
            </div>
            {isUploading ? (
              <div className="flex items-center justify-center gap-2 text-indigo-400 font-semibold text-sm py-2">
                <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                <span>Running AI OCR Vision Extraction & RegEx Validation...</span>
              </div>
            ) : (
              <span className="inline-block text-xs font-semibold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full">
                Supported Formats: PDF, PNG, JPG (GSTIN, IEC, EORI, PAN, REX)
              </span>
            )}
          </div>
        </div>

        {parseSuccessMessage && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{parseSuccessMessage}</span>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {licenses.map((lic) => (
            <StatutoryVaultCard key={lic.licenseId} {...lic} />
          ))}
        </div>
      </div>
    </div>
  );
}
