"use client";

import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2, ChevronRight, Play, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { PIPELINE_STAGES_26, advancePipelineStage, PipelineInstanceState } from '@/lib/workflow-engine';

export default function PipelineTrackerPage() {
  const [pipelineState, setPipelineState] = useState<PipelineInstanceState>({
    orderNumber: 'EXIM-2026-9041',
    currentStepIndex: 12,
    currentStage: PIPELINE_STAGES_26[11],
    progressPct: 48.0,
    history: [
      { stepIndex: 1, stageCode: 'INQUIRY_LEAD', completedAt: '2026-01-10T08:00:00Z' },
      { stepIndex: 4, stageCode: 'CONTRACT_EXECUTED', completedAt: '2026-01-15T10:30:00Z' },
      { stepIndex: 10, stageCode: 'WAREHOUSE_STAGED', completedAt: '2026-02-01T14:00:00Z' }
    ]
  });

  const handleAdvance = () => {
    const nextState = advancePipelineStage(pipelineState);
    setPipelineState(nextState);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Layers className="w-7 h-7 text-indigo-400" />
              Visual 26-Step Trade Pipeline Tracker Engine
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Live state machine tracking trade order lifecycle from buyer RFQ to ICEGATE Shipping Bill, eBRC foreign exchange realization, and GST drawback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAdvance}
              disabled={pipelineState.currentStepIndex >= 26}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>Advance 1-Click to Next Stage</span>
            </button>
          </div>
        </div>

        {/* Current Order Summary Banner */}
        <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-indigo-400 font-mono uppercase font-bold block mb-1">Active Order Pipeline Instance</span>
              <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-3">
                <span>Order #{pipelineState.orderNumber}</span>
                <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-sans rounded-full font-bold">
                  Stage {pipelineState.currentStepIndex} of 26 ({pipelineState.progressPct}%)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Current Milestone Status</span>
              <span className="text-base font-bold text-emerald-400">{pipelineState.currentStage.stageName}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
              <div
                className="bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${pipelineState.progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>Stage 1: Lead RFQ</span>
              <span>Stage 13: Let Export Order</span>
              <span>Stage 26: Full Lifecycle Complete</span>
            </div>
          </div>
        </div>

        {/* Milestone Grid (26 Sequential Stages) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            26-Step Trade Milestone Pipeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PIPELINE_STAGES_26.map((stage) => {
              const isCompleted = stage.stepIndex < pipelineState.currentStepIndex;
              const isCurrent = stage.stepIndex === pipelineState.currentStepIndex;

              return (
                <div
                  key={stage.stepIndex}
                  className={`p-4 rounded-xl border transition-all text-xs space-y-1.5 ${
                    isCurrent
                      ? 'bg-indigo-950/80 border-indigo-500/60 shadow-lg ring-1 ring-indigo-500/30'
                      : isCompleted
                      ? 'bg-slate-950/80 border-emerald-500/30 text-slate-300'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono font-bold">
                    <span className={isCurrent ? 'text-indigo-300' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}>
                      {stage.stageName}
                    </span>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {isCurrent && <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse shrink-0" />}
                  </div>

                  <p className="text-[11px] font-sans text-slate-400 line-clamp-2">{stage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
