"use client";

import React, { useState } from 'react';
import { Download, ShieldCheck, FileText, FileSpreadsheet, Lock } from 'lucide-react';

export default function ReportsVaultPage() {
  const [reports, setReports] = useState([
    {
      id: 'RPT-2026-9041',
      name: 'Monthly Export FOB Realization Summary - Jan 2026',
      category: 'Export Performance',
      format: 'PDF',
      size: '2.4 MB',
      checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      date: '2026-02-01 06:00 UTC'
    },
    {
      id: 'RPT-2026-9042',
      name: 'Weekly RoDTEP & Duty Drawback Realization Audit - W5 2026',
      category: 'Incentive Realization',
      format: 'EXCEL',
      size: '1.8 MB',
      checksum: 'a4b1c55309fc2c250bfbf5c9007fc03538bf52f5750c045db506002c8963c966',
      date: '2026-02-02 06:00 UTC'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Lock className="w-7 h-7 text-indigo-400" />
            Generated Management Reports Vault & Cryptographic Ledger
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Immutable executive report repository with SHA-256 cryptographic signatures, export realization summaries, and instant file downloads.
          </p>
        </div>

        {/* Reports Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Generated Executive Reports Archive ({reports.length})
            </h2>
          </div>

          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    {r.name}
                  </h3>
                  <p className="text-slate-400 font-sans text-xs">Category: {r.category} &bull; Generated: {r.date}</p>
                  <p className="text-slate-500 font-mono text-[10px] truncate max-w-md">SHA-256: {r.checksum}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {r.format} ({r.size})
                  </span>
                  <a href={`/api/reports/download/${r.id}`} download className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
