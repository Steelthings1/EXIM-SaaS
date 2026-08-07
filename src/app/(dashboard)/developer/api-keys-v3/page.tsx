"use client";

import React, { useState } from 'react';
import { Key, Plus, Copy, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function ApiKeysV3Page() {
  const [keys, setKeys] = useState([
    {
      id: 'key-101',
      name: 'Production ERP Integration Key',
      prefix: 'exim_live_9041...',
      limit: '1,000 req/min',
      created: '2026-01-15'
    }
  ]);

  const [keyName, setKeyName] = useState('');
  const [newKey, setNewKey] = useState<string | null>(null);

  const handleGenerateKey = () => {
    if (!keyName) return;
    const generated = `exim_live_${Math.random().toString(36).substring(2, 18)}`;
    const record = {
      id: `key-${Date.now()}`,
      name: keyName,
      prefix: `${generated.substring(0, 14)}...`,
      limit: '1,000 req/min',
      created: new Date().toISOString().split('T')[0]
    };
    setKeys([record, ...keys]);
    setNewKey(generated);
    setKeyName('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Key className="w-7 h-7 text-indigo-400" />
            Developer API Keys V3 & Access Tokens
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate live production API keys (`exim_live_...`), manage rate limit quotas, and authenticate external ERP/TMS integrations.
          </p>
        </div>

        {/* Generate Key Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Generate New Live API Key
          </h2>

          <div className="flex flex-col md:flex-row gap-4 font-mono text-xs">
            <input type="text" placeholder="Key Description (e.g. SAP S/4HANA Connector)" value={keyName} onChange={(e) => setKeyName(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans" />
            <button onClick={handleGenerateKey}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Generate API Key</span>
            </button>
          </div>

          {newKey && (
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2">
              <p className="text-emerald-300 font-bold text-xs">Copy your new API key now (it won't be shown again):</p>
              <code className="block bg-slate-900 p-2 rounded text-emerald-400 font-mono text-xs break-all">{newKey}</code>
            </div>
          )}
        </div>

        {/* API Keys Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Developer API Keys ({keys.length})
          </h2>

          <div className="space-y-3">
            {keys.map((k) => (
              <div key={k.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{k.name}</h3>
                  <p className="text-slate-400 font-mono text-xs">Prefix: {k.prefix} &bull; Created: {k.created}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Quota: {k.limit}
                  </span>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ACTIVE
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
