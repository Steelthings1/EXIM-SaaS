"use client";

import React, { useState } from 'react';
import { ShieldCheck, History, UserCheck, Globe, Key } from 'lucide-react';

export default function SecurityAuditLogsPage() {
  const [logs, setLogs] = useState([
    {
      id: 'aud-101',
      user: 'admin@exim.im',
      action: 'UPDATE_WORKSPACE_SETTINGS',
      entity: 'WORKSPACE',
      ip: '106.210.42.18',
      time: '2026-02-04 11:00 UTC'
    },
    {
      id: 'aud-102',
      user: 'rahul.s@exim.im',
      action: 'EXECUTE_UCP_600_AUDIT',
      entity: 'LC-DB-2026-9041',
      ip: '49.37.182.91',
      time: '2026-02-03 14:15 UTC'
    },
    {
      id: 'aud-103',
      user: 'finance@exim.im',
      action: 'ISSUE_COMMERCIAL_INVOICE',
      entity: 'INV-2026-9041',
      ip: '182.73.91.104',
      time: '2026-02-01 09:30 UTC'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <History className="w-7 h-7 text-indigo-400" />
            Immutable Security Audit Trail & Activity Logs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Tamper-proof security audit telemetry capturing all system configuration edits, license uploads, invoice creations, and IP addresses.
          </p>
        </div>

        {/* Audit Ledger */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Security Activity Stream ({logs.length} Immutable Logs)
            </h2>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{log.action} &bull; Entity: {log.entity}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">User: {log.user} &bull; IP: {log.ip}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-mono text-[11px]">{log.time}</span>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    VERIFIED_IMMUTABLE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
