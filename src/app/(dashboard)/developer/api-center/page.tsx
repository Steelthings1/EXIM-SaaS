"use client";

import React, { useState } from 'react';
import { Code2, Key, Plus, Webhook, ShieldCheck, Copy, CheckCircle2 } from 'lucide-react';

export default function DeveloperApiCenterPage() {
  const [keys, setKeys] = useState([
    {
      id: 'key-101',
      name: 'Production ERP Webhook Integration',
      prefix: 'exim_live_9041...',
      rateLimit: 120,
      status: 'ACTIVE',
      createdAt: '2026-01-15'
    }
  ]);

  const [webhookUrl, setWebhookUrl] = useState('https://api.merchant.com/exim-webhooks');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Code2 className="w-7 h-7 text-indigo-400" />
              Developer API Center & HMAC SHA-256 Webhooks Portal
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Generate production API keys, manage rate limits, and configure webhook event subscriptions with HMAC SHA-256 signatures.
            </p>
          </div>
        </div>

        {/* API Keys List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            Active API Credentials
          </h2>

          <div className="space-y-3">
            {keys.map((k) => (
              <div key={k.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <h3 className="font-bold text-white">{k.name}</h3>
                  <p className="text-indigo-300 font-bold mt-0.5">{k.prefix}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">{k.rateLimit} req/min</span>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {k.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Webhook className="w-4 h-4 text-emerald-400" />
            Webhook Event Subscriptions (HMAC SHA-256)
          </h2>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Target Webhook Listener Endpoint URL</label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block uppercase font-sans text-[10px]">Subscribed Events</span>
              <div className="flex flex-wrap gap-2 pt-1 font-bold">
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">order.created</span>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">shipment.dispatched</span>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">ebrc.issued</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
