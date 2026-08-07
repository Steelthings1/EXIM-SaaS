"use client";

import React, { useState } from 'react';
import { History, ShieldCheck, Download, Filter, Search, ShieldAlert, FileText } from 'lucide-react';

export default function SecurityActivityLogsPage() {
  const [logs, setLogs] = useState([
    {
      id: 'log-v2-101',
      user: 'admin@exim.im',
      action: 'MODIFY_EXPORT_ORDER_REALIZATION',
      entity: 'EXPORT_ORDER (ORD-2026-9041)',
      diff: 'fob_value_usd: 45,000 → 65,000',
      ip: '106.210.42.18',
      risk: 'LOW',
      time: '2026-02-04 11:30 UTC'
    },
    {
      id: 'log-v2-102',
      user: 'finance@exim.im',
      action: 'UNRECOGNIZED_IP_LOGIN_ATTEMPT',
      entity: 'USER_SESSION (sess-8812)',
      diff: 'ip_address: unrecognized block',
      ip: '198.51.100.44',
      risk: 'HIGH',
      time: '2026-02-04 12:15 UTC'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <History className="w-7 h-7 text-indigo-400" />
              Security Activity Logs & Tamper-Proof Audit Trail
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Immutable telemetry log recording all user sessions, entity payload diffs, IP addresses, and security risk ratings.
            </p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Audit Trail (CSV)</span>
          </button>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Immutable Activity Stream ({logs.length} Logged Events)
            </h2>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white font-mono">{log.action} &bull; {log.entity}</h3>
                  <p className="text-slate-400 font-sans text-xs">User: {log.user} &bull; IP: {log.ip}</p>
                  <p className="text-slate-400 font-mono text-[11px] bg-slate-900 px-2 py-1 rounded inline-block">Diff: {log.diff}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono text-[11px]">{log.time}</span>
                  <span className={`px-2.5 py-0.5 rounded font-bold border ${
                    log.risk === 'HIGH'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    RISK_{log.risk}
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
