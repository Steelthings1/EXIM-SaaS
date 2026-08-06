"use client";

import React, { useState } from 'react';
import { Bot, Mic, Send, FileText, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { processCopilotQuery, CopilotChatResult } from '@/lib/multimodal-copilot-engine';

export default function CopilotWorkspacePage() {
  const [query, setQuery] = useState('What are the UCP 600 presentation rules for Letter of Credit LC-DB-2026-9041?');
  const [isVoice, setIsVoice] = useState(false);
  const [result, setResult] = useState<CopilotChatResult | null>(null);

  const [chatHistory, setChatHistory] = useState([
    {
      id: 'msg-1',
      sender: 'USER',
      text: 'What are the UCP 600 presentation rules for Letter of Credit LC-DB-2026-9041?'
    },
    {
      id: 'msg-2',
      sender: 'BOT',
      text: 'AI Copilot RAG Analysis: UCP 600 Article 14(c) dictates presentation within 21 days after date of shipment. Commercial Invoice value ($49,000) is fully compliant with LC value limit ($50,000).'
    }
  ]);

  const handleSendQuery = () => {
    const res = processCopilotQuery({
      userQuery: query,
      isVoiceInput: isVoice
    });
    setResult(res);

    setChatHistory([
      ...chatHistory,
      { id: `msg-${Date.now()}-u`, sender: 'USER', text: query },
      { id: `msg-${Date.now()}-b`, sender: 'BOT', text: `${res.responseMessage} ${res.retrievedContextSnippets.join(' ')}` }
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bot className="w-7 h-7 text-indigo-400" />
            Multi-Modal AI Copilot Workspace (RAG & Voice Assistant)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Interact with your global trade database via Document RAG Chat, Voice Commands, and AI-suggested workflow actions.
          </p>
        </div>

        {/* Chat Thread */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Conversational RAG Chat Stream
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {chatHistory.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl p-4 rounded-2xl text-xs font-mono ${
                  m.sender === 'USER'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  <span className="text-[10px] block font-sans text-slate-400 mb-1">{m.sender === 'USER' ? 'You (Voice/Text)' : 'EXIM AI Copilot'}</span>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-800 font-mono text-xs">
            <button
              onClick={() => setIsVoice(!isVoice)}
              className={`p-3 rounded-xl border transition-colors ${
                isVoice ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Toggle Voice Mic Mode"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Copilot about HS codes, LC UCP rules, or vessel AIS positions..."
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs"
            />

            <button
              onClick={handleSendQuery}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Query</span>
            </button>
          </div>
        </div>

        {/* RAG Context Snippets & Suggested Actions */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="font-bold text-white uppercase border-b border-slate-800 pb-2">RAG Context Snippets</h3>
              {result.retrievedContextSnippets.map((snip, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300">
                  {snip}
                </div>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="font-bold text-white uppercase border-b border-slate-800 pb-2">AI Suggested Actions</h3>
              <div className="space-y-2">
                {result.suggestedActions.map((act, idx) => (
                  <button key={idx} className="w-full text-left p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-indigo-300 flex items-center justify-between">
                    <span>{act}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
