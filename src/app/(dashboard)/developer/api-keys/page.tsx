"use client";

import React, { useState } from 'react';
import { Key, Plus, Copy, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { generateDeveloperApiKey, DeveloperKeyCredentials } from '@/lib/api-center-engine';

export default function DeveloperApiKeysPage() {
  const [keyName, setKeyName] = useState('Logistics WMS Integration');
  const [rateLimit, setRateLimit] = useState(1000);
  const [newCreds, setNewCreds] = useState<DeveloperKeyCredentials | null>(null);

  const [keysList, setKeysList] = useState([
    {
      id: 'key-101',
      name: 'Production ERP Connector',
      prefix: 'exim_live_9a41',
      rateLimit: 1000,
      createdAt: '2026-01-10'
    }
  ]);

  const handleGenerateKey = () => {
    const creds = generateDeveloperApiKey(keyName, rateLimit);
    setNewCreds(creds);

    setKeysList([
      {
        id: creds.keyId,
        name: creds.keyName,
        prefix: creds.keyPrefix,
        rateLimit: creds.rateLimitPerMin,
        createdAt: new Date().toISOString().split('T')[0]
      },
      ...keysList
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Key className="w-7 h-7 text-indigo-400" />
            Developer API Keys & Credential Vault
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate and manage production API keys (`exim_live_...`), configure rate limit ceilings, and access REST API endpoints.
          </p>
        </div>

        {/* Generate Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Generate Developer API Key
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Key Name / Description</label>
              <input type="text" value={keyName} onChange={(e) => setKeyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Rate Limit Ceiling (Requests / Min)</label>
              <input type="number" value={rateLimit} onChange={(e) => setRateLimit(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleGenerateKey}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Generate Production API Key Credentials</span>
          </button>
        </div>

        {/* Newly Generated Credential Display Alert */}
        {newCreds && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-3 font-mono text-xs">
            <h3 className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              API Key Credentials Generated! (Save key immediately, it will not be shown again)
            </h3>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-white font-bold tracking-wider select-all">
              {newCreds.apiKey}
            </div>
          </div>
        )}

        {/* Keys Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Developer API Keys
          </h2>

          <div className="space-y-3">
            {keysList.map((k) => (
              <div key={k.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">{k.name}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Prefix: <span className="font-mono text-indigo-400">{k.prefix}...</span> &bull; Created: {k.createdAt}</p>
                </div>

                <div className="text-right font-sans">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Rate Limit</span>
                  <span className="text-emerald-400 font-bold font-mono">{k.rateLimit} req/min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
