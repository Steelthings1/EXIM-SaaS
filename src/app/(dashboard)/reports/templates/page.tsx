"use client";

import React, { useState } from 'react';
import { FileBarChart, Clock, Mail, Plus, CheckCircle2, FileText, Send } from 'lucide-react';

export default function ReportTemplatesPage() {
  const [templates, setTemplates] = useState([
    {
      id: 'tmpl-101',
      name: 'Monthly Export FOB Realization Summary',
      category: 'Export Performance',
      frequency: 'Monthly',
      format: 'PDF',
      emails: 'cfo@exim.im, finance@exim.im',
      active: true
    },
    {
      id: 'tmpl-102',
      name: 'Weekly RoDTEP & Duty Drawback Realization Audit',
      category: 'Incentive Realization',
      frequency: 'Weekly',
      format: 'EXCEL',
      emails: 'tax@exim.im',
      active: true
    }
  ]);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Export Performance');
  const [frequency, setFrequency] = useState('Weekly');
  const [format, setFormat] = useState('PDF');
  const [emails, setEmails] = useState('');

  const handleAddTemplate = () => {
    if (!name) return;
    const newTmpl = {
      id: `tmpl-${Date.now()}`,
      name,
      category,
      frequency,
      format,
      emails,
      active: true
    };
    setTemplates([newTmpl, ...templates]);
    setName('');
    setEmails('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileBarChart className="w-7 h-7 text-indigo-400" />
            Scheduled Report Templates & Auto-Dispatch Config
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure rule-based scheduled executive reports, recurring export realization summaries, and automated email dispatch schedules.
          </p>
        </div>

        {/* Create Template Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Create Scheduled Report Rule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Report Template Name</label>
              <input type="text" placeholder="e.g. Quarterly Compliance Risk Assessment" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Report Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white">
                <option value="Export Performance">Export Performance</option>
                <option value="Incentive Realization">Incentive Realization</option>
                <option value="Compliance Risk">Compliance Risk</option>
                <option value="Logistics SLA">Logistics SLA</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Dispatch Schedule Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white">
                <option value="Daily">Daily (06:00 UTC)</option>
                <option value="Weekly">Weekly (Every Monday)</option>
                <option value="Monthly">Monthly (1st Day of Month)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">File Format Output</label>
              <select value={format} onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white">
                <option value="PDF">PDF (Executive Presentation)</option>
                <option value="EXCEL">EXCEL (Structured Ledger)</option>
                <option value="CSV">CSV (Raw Telemetry Data)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 font-sans mb-1">Recipient Email Addresses (Comma Separated)</label>
              <input type="text" placeholder="cfo@company.com, audit@company.com" value={emails} onChange={(e) => setEmails(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
            </div>
          </div>

          <button onClick={handleAddTemplate}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Save & Register Scheduled Report Template</span>
          </button>
        </div>

        {/* Existing Templates Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Active Scheduled Report Dispatch Rules ({templates.length})
          </h2>

          <div className="space-y-3">
            {templates.map((t) => (
              <div key={t.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{t.name} &bull; {t.category}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Recipients: {t.emails || 'cfo@exim.im'}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {t.frequency}
                  </span>
                  <span className="px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t.format}
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
