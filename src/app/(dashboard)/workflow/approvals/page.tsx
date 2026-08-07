"use client";

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Plus, AlertCircle, DollarSign } from 'lucide-react';
import { evaluateOrderApproval, ApprovalCheckResult } from '@/lib/workflow-automation-engine';

export default function ApprovalsPage() {
  const [orderRef, setOrderRef] = useState('SO-2026-9041');
  const [amountUsd, setAmountUsd] = useState(125000);
  const [requester, setRequester] = useState('rahul.s@exim.im');
  const [approvalType, setApprovalType] = useState<'HIGH_VALUE_ORDER' | 'CREDIT_EXCEPTION' | 'LC_DISCREPANCY_WAIVER'>('HIGH_VALUE_ORDER');

  const [result, setResult] = useState<ApprovalCheckResult | null>(null);

  const [requests, setRequests] = useState([
    {
      id: 'req-101',
      orderRef: 'SO-2026-9041',
      amountUsd: 125000.00,
      type: 'HIGH_VALUE_ORDER',
      requester: 'rahul.s@exim.im',
      requiredRole: 'CHIEF_TRADE_OFFICER',
      status: 'PENDING'
    }
  ]);

  const handleCreateApproval = () => {
    const res = evaluateOrderApproval({
      orderReference: orderRef,
      orderAmountUsd: amountUsd,
      requestedBy: requester,
      approvalType
    });
    setResult(res);

    setRequests([
      {
        id: res.requestId,
        orderRef: res.orderReference,
        amountUsd: amountUsd,
        type: approvalType,
        requester: requester,
        requiredRole: res.requiredApproverRole,
        status: res.approvalStatus
      },
      ...requests
    ]);
  };

  const handleActionRequest = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-indigo-400" />
            Executive Approval Requests & Sign-Off Ledger
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Automated multi-stage approval triggers enforcing executive sign-off ceilings ($50,000+), credit exception waivers, and LC discrepancy authorizations.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            Trigger Executive Approval Evaluation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-sans mb-1">Order Reference</label>
              <input type="text" value={orderRef} onChange={(e) => setOrderRef(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Approval Type</label>
              <select value={approvalType} onChange={(e: any) => setApprovalType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono">
                <option value="HIGH_VALUE_ORDER">High-Value Export Order ($50,000+)</option>
                <option value="CREDIT_EXCEPTION">Custom Credit Term Exception</option>
                <option value="LC_DISCREPANCY_WAIVER">LC Discrepancy Waiver Authorization</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Order Amount ($ USD)</label>
              <input type="number" value={amountUsd} onChange={(e) => setAmountUsd(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>

            <div>
              <label className="block text-slate-400 font-sans mb-1">Requester Email</label>
              <input type="text" value={requester} onChange={(e) => setRequester(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
            </div>
          </div>

          <button onClick={handleCreateApproval}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Evaluate Executive Approval Workflow Rules</span>
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-300">
            <span>Approval Request {result.requestId} created! Required Approver Role: {result.requiredApproverRole} (Status: {result.approvalStatus})</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Pending & Actioned Executive Approval Requests
          </h2>

          <div className="space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white font-mono">{r.orderRef} &bull; ${r.amountUsd.toLocaleString()}</h3>
                  <p className="text-slate-400 font-sans mt-0.5">Type: {r.type} &bull; Requested by: {r.requester} &bull; Approver: {r.requiredRole}</p>
                </div>

                <div className="flex items-center gap-4">
                  {r.status === 'PENDING' ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleActionRequest(r.id, 'APPROVED')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>

                      <button onClick={() => handleActionRequest(r.id, 'REJECTED')}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`px-2.5 py-0.5 rounded font-bold ${
                      r.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {r.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
