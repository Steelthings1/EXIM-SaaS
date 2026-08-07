"use client";

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Plus, ShieldAlert } from 'lucide-react';
import { createAutomatedReminder, ReminderRuleResult } from '@/lib/workflow-automation-engine';

export default function RemindersPage() {
  const [triggerRule, setTriggerRule] = useState<'EXPIRING_LC_7_DAYS' | 'UNREALIZED_EBRC_30_DAYS' | 'PORT_CUSTOMS_QUERY'>('EXPIRING_LC_7_DAYS');
  const [entityRef, setEntityRef] = useState('LC-DB-2026-9041');
  const [recipientRole, setRecipientRole] = useState('TRADE_FINANCE_MANAGER');
  const [scheduledAt, setScheduledAt] = useState('2026-02-08T00:00');

  const [result, setResult] = useState<ReminderRuleResult | null>(null);

  const [reminders, setReminders] = useState([
    {
      id: 'rem-101',
      rule: 'EXPIRING_LC_7_DAYS',
      entityRef: 'LC-DB-2026-9041',
      recipient: 'TRADE_FINANCE_MANAGER',
      scheduledAt: '2026-02-08 00:00 UTC',
      isDispatched: false
    }
  ]);

  const handleCreateReminder = () => {
    const res = createAutomatedReminder({
      triggerRule,
      entityReference: entityRef,
      recipientRole,
      scheduledAt
    });
    setResult(res);

    setReminders([
      {
        id: res.reminderId,
        rule: res.triggerRule,
        entityRef: res.entityReference,
        recipient: res.recipientRole,
        scheduledAt: res.scheduledAt,
        isDispatched: res.isDispatched
      },
      ...reminders
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Clock className="w-7 h-7 text-indigo-400" />
            Rule-Based Automated Reminders & Scheduled Alerts Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure automated trigger rules for expiring Letters of Credit, unrealized EDPMS eBRC inward remittances, and port customs queries.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Configure Automated Reminder Trigger Rule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Trigger Rule</label>
              <select value={triggerRule} onChange={(e: any) => setTriggerRule(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="EXPIRING_LC_7_DAYS">Expiring LC (7-Day Threshold)</option>
                <option value="UNREALIZED_EBRC_30_DAYS">Unrealized eBRC / EDPMS (30-Day Threshold)</option>
                <option value="PORT_CUSTOMS_QUERY">Port Customs Query Alert</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Entity Reference ID</label>
              <input type="text" value={entityRef} onChange={(e) => setEntityRef(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Target Recipient Role</label>
              <input type="text" value={recipientRole} onChange={(e) => setRecipientRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Scheduled Date & Time</label>
              <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCreateReminder}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Schedule Automated Alert Notification Rule</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>Reminder Rule {result.reminderId} scheduled for {result.entityReference} targeting {result.recipientRole}!</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Automated Reminder Rules & Alert Notifications
          </h2>

          <div className="space-y-3">
            {reminders.map((rem) => (
              <div key={rem.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{rem.rule} &bull; {rem.entityRef}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Target: {rem.recipient} &bull; Scheduled: {rem.scheduledAt}</p>
                </div>

                <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {rem.isDispatched ? 'DISPATCHED' : 'SCHEDULED'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
