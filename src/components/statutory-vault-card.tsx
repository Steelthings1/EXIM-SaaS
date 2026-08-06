"use client";

import React from 'react';
import { ShieldCheck, Clock, AlertTriangle, FileText, ExternalLink, Download, Sparkles, Building } from 'lucide-react';

export interface StatutoryLicenseProps {
  licenseId: string;
  licenseType: 'GSTIN' | 'IEC' | 'EORI' | 'PAN' | 'FSSAI' | 'APEDA' | string;
  licenseNumber: string;
  issuingAuthority: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'VERIFIED' | 'PENDING_VERIFICATION' | 'EXPIRED' | 'REJECTED';
  documentUrl?: string;
  verifiedAt?: string;
  onVerifyClick?: () => void;
}

export function StatutoryVaultCard({
  licenseType,
  licenseNumber,
  issuingAuthority,
  issueDate,
  expiryDate,
  status,
  documentUrl,
  verifiedAt,
  onVerifyClick,
}: StatutoryLicenseProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
          label: 'Statutory Verified',
        };
      case 'PENDING_VERIFICATION':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: <Clock className="w-4 h-4 text-amber-400" />,
          label: 'AI Verification Pending',
        };
      case 'EXPIRED':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
          label: 'License Expired',
        };
      default:
        return {
          bg: 'bg-slate-700/50 text-slate-300 border-slate-600',
          icon: <FileText className="w-4 h-4" />,
          label: status,
        };
    }
  };

  const badge = getBadgeStyle();

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all duration-200 group relative overflow-hidden backdrop-blur-sm">
      {/* Top Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-900/60 to-slate-800 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-base shadow-inner">
            {licenseType.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-base tracking-wide">{licenseType} Certificate</h3>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.bg}`}>
                {badge.icon}
                {badge.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Building className="w-3 h-3 text-slate-500" />
              {issuingAuthority}
            </p>
          </div>
        </div>

        {documentUrl && (
          <a
            href={documentUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
            title="Download Statutory Document"
          >
            <Download className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="bg-slate-950/70 border border-slate-850 rounded-xl p-3.5 mb-4 font-mono">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">Registration Identifier</div>
        <div className="text-lg font-extrabold text-indigo-300 tracking-wider flex items-center justify-between">
          <span>{licenseNumber}</span>
          <span className="text-[10px] font-sans font-normal text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            RegEx Compliant
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-800/80 pt-3">
        <div>
          <span className="text-slate-500 block">Issue Date</span>
          <span className="text-slate-300 font-medium">{issueDate || 'N/A'}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Expiration Date</span>
          <span className={`font-medium ${status === 'EXPIRED' ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
            {expiryDate || 'Permanent / No Expiry'}
          </span>
        </div>
      </div>

      {verifiedAt && (
        <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-850">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Verified via Exim Vision AI engine on {new Date(verifiedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
