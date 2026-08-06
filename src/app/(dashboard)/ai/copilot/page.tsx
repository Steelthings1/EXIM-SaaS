"use client";

import React, { useState } from 'react';
import { Bot, Mic, Eye, FileText, Send, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { processCopilotQuery, CopilotQueryType, CopilotResponseResult } from '@/lib/ai-copilot-engine';

export default function MultiModalAiCopilotPage() {
  const [activeTab, setActiveTab] = useState<CopilotQueryType>('DOCUMENT_RAG');
  const [promptInput, setPromptInput] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('Check shipment status for order EXIM-2026-9041');
  const [responses, setResponses] = useState<CopilotResponseResult[]>([]);

  const handleRunQuery = () => {
    const res = processCopilotQuery({
      queryType: activeTab,
      promptText: promptInput || 'What are the FTA duty savings under India-UAE CEPA?',
      voiceAudioTranscript: voiceTranscript,
      labelImageUrl: '/images/sample-label.png'
    });
    setResponses([res, ...responses]);
    setPromptInput('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bot className="w-7 h-7 text-indigo-400" />
              Multi-Modal AI Exim Copilot (RAG, Voice & Computer Vision)
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Ask trade compliance RAG questions, speak voice assistant commands, or upload export packaging labels for instant computer vision inspection.
            </p>
          </div>
        </div>

        {/* Query Type Tab Selector */}
        <div className="flex border-b border-slate-800 gap-4 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('DOCUMENT_RAG')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'DOCUMENT_RAG'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Document RAG Knowledge Base</span>
          </button>

          <button
            onClick={() => setActiveTab('VOICE_COMMAND')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'VOICE_COMMAND'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Voice Assistant Commands</span>
          </button>

          <button
            onClick={() => setActiveTab('LABEL_VISION_SCANNER')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'LABEL_VISION_SCANNER'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Packaging Label Vision Scanner</span>
          </button>
        </div>

        {/* Input Interface */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          {activeTab === 'DOCUMENT_RAG' && (
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-400">Ask any Trade Compliance or Regulations Question</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. What are the mandatory food labeling rules for exporting coffee to Dubai?"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
                <button
                  onClick={handleRunQuery}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'VOICE_COMMAND' && (
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-400">Voice Assistant Audio Speech Transcript</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={voiceTranscript}
                  onChange={(e) => setVoiceTranscript(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono"
                />
                <button
                  onClick={handleRunQuery}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2"
                >
                  <Mic className="w-4 h-4 text-emerald-400" />
                  <span>Process Voice</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'LABEL_VISION_SCANNER' && (
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-400">Upload Packaging Label Image for Computer Vision Compliance Inspection</label>
              <button
                onClick={handleRunQuery}
                className="w-full py-4 bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 rounded-xl text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-indigo-400" />
                <span>Run Packaging Label Computer Vision Scan</span>
              </button>
            </div>
          )}
        </div>

        {/* Responses Trail */}
        <div className="space-y-4">
          {responses.map((res, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  AI Copilot Output ({res.queryType})
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Confidence: {(res.confidenceScore * 100).toFixed(0)}%
                </span>
              </div>

              <p className="text-sm text-slate-200">{res.answerText}</p>

              {res.labelAnalysis && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between font-bold text-emerald-400">
                    <span>Verdict: {res.labelAnalysis.complianceVerdict}</span>
                    <span>Detected HS: {res.labelAnalysis.detectedHsCode}</span>
                  </div>
                  {res.labelAnalysis.warnings.map((w, wIdx) => (
                    <p key={wIdx} className="text-amber-300 font-sans font-medium">Warning: {w}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
