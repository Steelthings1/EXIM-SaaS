"use client";

import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';

export default function SecurityAlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-901',
      type: 'UNRECOGNIZED_IP_LOGIN',
      severity: 'HIGH',
      user: 'finance@exim.im',
      ip: '198.51.100.44',
      desc: 'Login attempt from unrecognized external IP block 198.51.100.44',
      resolved: false,
      time: '2026-02-04 12:15 UTC'
    },
    {
      id: 'alt-902',
      type: 'HIGH_VALUE_MODIFICATION',
      severity: 'MEDIUM',
      user: 'admin@exim.im',
      ip: '106.210.42.18',
      desc: 'Export Order ORD-2026-9041 modified ($65,000 sign-off ceiling exceeded)',
      resolved: true,
      time: '2026-02-04 11:30 UTC'
    }
  ]);

  const toggleResolve = (id: string) => {
    setAlerts(alerts.map((a) => a.id === id ? { ...a, resolved: !a.resolved } : a));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-rose-400" />
            Security Anomaly Detection & Threat Alerts Feed
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time security threat intelligence monitoring unrecognized IP address logins, suspicious API bursts, and high-value order modifications.
          </p>
        </div>

        {/* Alerts Feed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Security Telemetry Feed ({alerts.length} Detected Anomalies)
            </h2>
          </div>

          <div className="space-y-3">
            {alerts.map((alt) => (
              <div key={alt.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white font-mono flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${alt.severity === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`} />
                    {alt.type} &bull; User: {alt.user}
                  </h3>
                  <p className="text-slate-400 font-sans text-xs">{alt.desc} (IP: {alt.ip})</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono text-[11px]">{alt.time}</span>
                  <button onClick={() => toggleResolve(alt.id)}
                    className={`px-3 py-1 rounded font-bold transition-colors ${
                      alt.resolved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                    }`}>
                    {alt.resolved ? 'RESOLVED' : 'MARK_RESOLVED'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
