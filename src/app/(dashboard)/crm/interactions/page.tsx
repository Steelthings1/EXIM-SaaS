"use client";

import React, { useState } from 'react';
import { MessageSquare, Plus, UserCheck, Calendar, FileText } from 'lucide-react';

export default function CrmInteractionsPage() {
  const [logs, setLogs] = useState([
    {
      id: 'int-101',
      contactName: 'Gulf Trading Enterprise FZE (Dubai)',
      type: 'QUOTATION_INQUIRY',
      subject: 'Inquiry for 1 20ft FCL Organic Roasted Coffee Beans',
      notes: 'Customer requested CIF Jebel Ali pricing with 60 days LC payment terms.',
      loggedBy: 'Export Sales Director',
      createdAt: '2026-02-01'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <MessageSquare className="w-7 h-7 text-indigo-400" />
              CRM Trade Communication & Interaction Registry
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Log international buyer trade inquiries, proforma quotation requests, price negotiations, and payment follow-ups.
            </p>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">{log.subject}</h2>
                  <p className="text-xs text-indigo-300 font-mono mt-0.5">{log.contactName}</p>
                </div>

                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  {log.type}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans">{log.notes}</p>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-2">
                <span>Logged by: {log.loggedBy}</span>
                <span>Date: {log.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
