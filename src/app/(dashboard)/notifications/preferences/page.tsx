"use client";

import React, { useState } from 'react';
import { Bell, CheckCircle2, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export default function NotificationPreferencesPage() {
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="w-7 h-7 text-indigo-400" />
            Channel Delivery Preference Controls
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure real-time notification dispatch channels (In-App Bell, Email Digest, SMS Webhooks) for critical export trade events.
          </p>
        </div>

        {/* Preferences Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Alert Delivery Channels
          </h2>

          <div className="space-y-4 font-sans text-xs">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-bold text-white text-sm">In-App Notification Bell</h3>
                  <p className="text-slate-400 mt-0.5">Real-time alerts displayed inside the EXIM platform top header navigation bar.</p>
                </div>
              </div>
              <input type="checkbox" checked={inApp} onChange={(e) => setInApp(e.target.checked)} className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-bold text-white text-sm">Email Digest Dispatch</h3>
                  <p className="text-slate-400 mt-0.5">Instant email alerts sent for high-value sign-off requests & LC expirations.</p>
                </div>
              </div>
              <input type="checkbox" checked={email} onChange={(e) => setEmail(e.target.checked)} className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-bold text-white text-sm">SMS Webhook Notifications</h3>
                  <p className="text-slate-400 mt-0.5">SMS text alerts for urgent port customs clearance queries.</p>
                </div>
              </div>
              <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
            </div>
          </div>

          <button onClick={handleSave}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Save Channel Preferences</span>
          </button>

          {saved && (
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
              Channel delivery preferences updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
