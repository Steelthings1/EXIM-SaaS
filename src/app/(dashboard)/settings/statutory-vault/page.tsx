"use client";

import React, { useState } from 'react';
import { ShieldCheck, FileCheck, AlertTriangle, Clock, Plus, CheckCircle2, RefreshCw } from 'lucide-react';
import { validateStatutoryLicense, evaluateLicenseExpiry, StatutoryLicense } from '@/lib/statutory-license-engine';

export default function StatutoryVaultPage() {
  const [licenses, setLicenses] = useState<StatutoryLicense[]>([
    {
      licenseId: 'lic-101',
      licenseType: 'IEC',
      licenseNumber: '0321049281',
      issuingAuthority: 'DGFT Ministry of Commerce',
      issueDate: '2020-01-15',
      expiryDate: '2030-12-31',
      status: 'ACTIVE',
      daysRemaining: 1790
    },
    {
      licenseId: 'lic-102',
      licenseType: 'RCMC',
      licenseNumber: 'RCMC-FIEO-2024-9041',
      issuingAuthority: 'FIEO (Federation of Indian Export Organisations)',
      issueDate: '2024-03-01',
      expiryDate: '2026-03-31',
      status: 'ACTIVE',
      daysRemaining: 56
    },
    {
      licenseId: 'lic-103',
      licenseType: 'FSSAI',
      licenseNumber: '10021022000491',
      issuingAuthority: 'FSSAI Export Division',
      issueDate: '2025-02-15',
      expiryDate: '2026-02-28',
      status: 'EXPIRING_SOON',
      daysRemaining: 22
    }
  ]);

  const [type, setType] = useState<'IEC' | 'RCMC' | 'AD_CODE' | 'APEDA' | 'FSSAI' | 'ICEGATE_PORT'>('APEDA');
  const [licNum, setLicNum] = useState('APEDA-REG-2026-9041');
  const [authority, setAuthority] = useState('APEDA Ministry of Commerce');
  const [expiryDate, setExpiryDate] = useState('2026-02-20');

  const handleAddLicense = () => {
    const { daysRemaining, status } = evaluateLicenseExpiry(expiryDate);

    const newLic: StatutoryLicense = {
      licenseId: `lic-${Date.now()}`,
      licenseType: type,
      licenseNumber: licNum,
      issuingAuthority: authority,
      issueDate: '2026-01-01',
      expiryDate,
      status,
      daysRemaining
    };

    setLicenses([newLic, ...licenses]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-indigo-400" />
            Regulatory & Statutory License Vault
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Store, track, and auto-renew statutory trade licenses (IEC, RCMC EPC Council, AD Code, APEDA, FSSAI, ICEGATE Port Registrations).
          </p>
        </div>

        {/* Add License Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Register New Statutory License
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">License Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              >
                <option value="IEC">IEC (Importer Exporter Code)</option>
                <option value="RCMC">RCMC (EPC Export Council)</option>
                <option value="AD_CODE">AD Code (Bank Port Reg)</option>
                <option value="APEDA">APEDA Export License</option>
                <option value="FSSAI">FSSAI Food Safety</option>
                <option value="ICEGATE_PORT">ICEGATE Custom Port Reg</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">License Number</label>
              <input type="text" value={licNum} onChange={(e) => setLicNum(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Issuing Authority</label>
              <input type="text" value={authority} onChange={(e) => setAuthority(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Expiry Date</label>
              <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleAddLicense}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Validate & Deposit License into Vault</span>
          </button>
        </div>

        {/* Licenses Registry Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Registered Statutory Licenses & Expiry Telemetry
          </h2>

          <div className="space-y-3">
            {licenses.map((l) => (
              <div key={l.licenseId} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px] border border-indigo-500/30">
                      {l.licenseType}
                    </span>
                    <h3 className="font-bold text-white font-mono">{l.licenseNumber}</h3>
                  </div>
                  <p className="text-slate-400 font-sans mt-1">Authority: {l.issuingAuthority} &bull; Valid until: {l.expiryDate}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 block uppercase font-sans text-[10px]">Countdown</span>
                    <span className="text-white font-bold">{l.daysRemaining} Days</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded font-bold ${
                    l.status === 'ACTIVE'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                  }`}>
                    {l.status}
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
