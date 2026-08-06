"use client";

import React, { useState } from 'react';
import { History, ShieldCheck, FileText, CheckCircle2, Lock } from 'lucide-react';

export default function DocumentVersionHistoryPage() {
  const [versions, setVersions] = useState([
    {
      id: 'ver-101',
      docName: 'Commercial Invoice #INV-EXIM-2026-0091',
      version: 2,
      modifiedFields: ['itemQuantity', 'unitPriceUsd', 'cifTotalUsd'],
      author: 'Documentation Officer (Rahul V.)',
      checksum: 'e719c3c881290412890412890412890412890412890412890412890412890412',
      date: '2026-02-06 11:00'
    },
    {
      id: 'ver-100',
      docName: 'Commercial Invoice #INV-EXIM-2026-0091',
      version: 1,
      modifiedFields: ['INITIAL_ORDER_CREATED'],
      author: 'System AI Importer',
      checksum: '4d37be0881290412890412890412890412890412890412890412890412890412',
      date: '2026-02-05 09:15'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <History className="w-7 h-7 text-indigo-400" />
              Document Version Control & Cryptographic SHA-256 Audit Trail
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Revision history log tracking document version numbers, modified field diffs, author signatures, and SHA-256 checksums.
            </p>
          </div>
        </div>

        {/* Versions Audit Trail Table */}
        <div className="space-y-4 font-mono">
          {versions.map((v) => (
            <div key={v.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">{v.docName}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Author Signature: {v.author}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  Version #{v.version}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <span className="text-slate-500 block uppercase font-sans text-[10px]">Modified Field Diffs</span>
                <div className="flex flex-wrap gap-2 pt-1 font-bold">
                  {v.modifiedFields.map((f, fIdx) => (
                    <span key={fIdx} className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span className="flex items-center gap-1 text-emerald-400 font-mono">
                  <Lock className="w-3.5 h-3.5" />
                  SHA-256: {v.checksum}
                </span>
                <span>Date: {v.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
