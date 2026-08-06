"use client";

import React, { useState } from 'react';
import { Network, Plus, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { generateHmacSha256Signature } from '@/lib/api-center-engine';

export default function WebhookSubscriptionsPage() {
  const [targetUrl, setTargetUrl] = useState('https://api.partnerlogistics.com/exim-events');
  const [webhooks, setWebhooks] = useState([
    {
      id: 'sub-101',
      targetUrl: 'https://api.partnerlogistics.com/exim-events',
      events: ['shipment.updated', 'customs.cleared', 'ebrc.issued'],
      hmacSecret: 'whsec_904128_secret_key',
      status: 'ACTIVE'
    }
  ]);

  const handleAddWebhook = () => {
    const newSub = {
      id: `sub-${Date.now()}`,
      targetUrl,
      events: ['shipment.updated', 'customs.cleared', 'ebrc.issued'],
      hmacSecret: `whsec_${Date.now()}_secret`,
      status: 'ACTIVE'
    };

    setWebhooks([newSub, ...webhooks]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Network className="w-7 h-7 text-indigo-400" />
            Real-Time Webhook Subscriptions & HMAC SHA-256 Security
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Subscribe external endpoints to trade events (`shipment.updated`, `customs.cleared`, `ebrc.issued`) with HMAC SHA-256 payload signatures.
          </p>
        </div>

        {/* Subscribe Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Subscribe External Target URL
          </h2>

          <div className="space-y-3 font-sans">
            <label className="block text-slate-400">Target Webhook Endpoint URL</label>
            <input type="url" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs" />
          </div>

          <button onClick={handleAddWebhook}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Subscribe Endpoint & Issue HMAC Secret</span>
          </button>
        </div>

        {/* Webhooks Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Webhook Subscriptions
          </h2>

          <div className="space-y-4">
            {webhooks.map((w) => (
              <div key={w.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white font-mono">{w.targetUrl}</h3>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {w.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-sans">
                  <span className="text-slate-500 text-xs font-mono">Events:</span>
                  {w.events.map((ev, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
                      {ev}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>HMAC Secret: <span className="text-slate-200">{w.hmacSecret}</span></span>
                  <span className="text-emerald-400 font-bold">HMAC SHA-256 Enabled</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
