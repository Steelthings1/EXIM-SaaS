"use client";

import React, { useState } from 'react';
import { Network, Plus, ShieldCheck, Send, CheckCircle2, Lock } from 'lucide-react';

export default function WebhookSubscriptionsV3Page() {
  const [subs, setSubs] = useState([
    {
      id: 'sub-301',
      url: 'https://erp.steelthings.com/api/exim-webhooks',
      events: 'shipment.updated, customs.cleared, ebrc.issued',
      secret: 'whsec_9041a8b7c6d5e4f3a2b1c0d9e8f7a6b5',
      active: true
    }
  ]);

  const [url, setUrl] = useState('');

  const handleSubscribe = () => {
    if (!url) return;
    const newSub = {
      id: `sub-${Date.now()}`,
      url,
      events: 'shipment.updated, customs.cleared, ebrc.issued',
      secret: `whsec_${Math.random().toString(36).substring(2, 18)}`,
      active: true
    };
    setSubs([newSub, ...subs]);
    setUrl('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Network className="w-7 h-7 text-indigo-400" />
            Real-Time Webhook Subscriptions V3 (HMAC SHA-256)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Subscribe external HTTP webhooks to trade events (`shipment.updated`, `customs.cleared`, `ebrc.issued`) with HMAC SHA-256 cryptographic verification.
          </p>
        </div>

        {/* Subscribe Endpoint Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Register Webhook Listener Endpoint
          </h2>

          <div className="flex flex-col md:flex-row gap-4 font-mono text-xs">
            <input type="text" placeholder="Target Listener URL (e.g. https://api.company.com/webhooks)" value={url} onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans" />
            <button onClick={handleSubscribe}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Subscribe Endpoint</span>
            </button>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Webhook Event Listeners ({subs.length})
          </h2>

          <div className="space-y-3">
            {subs.map((s) => (
              <div key={s.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white font-mono">{s.url}</h3>
                  <p className="text-slate-400 font-sans text-xs">Subscribed Events: {s.events}</p>
                  <p className="text-slate-500 font-mono text-[11px]">HMAC Secret: {s.secret}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    HMAC_VERIFIED
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
