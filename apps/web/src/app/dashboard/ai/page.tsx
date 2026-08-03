'use client';

import { useState } from 'react';
import { Brain, Send, Sparkles, Bot, User, FileText } from 'lucide-react';
import type { AiMessage } from '@logicore/shared';

const initialMessages: AiMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Kumusta! I am your **Logicore AI Operations Assistant**. I am connected directly to your fleet telemetry, WMS inventory, and Philippine Bureau of Customs (BOC) compliance pipeline. How can I assist your logistics operations today?",
    timestamp: new Date(),
    metadata: {
      model: 'gemini-2.5-flash',
      suggestedActions: [
        { label: 'Check Cebu delay forecast', action: 'query_delay' },
        { label: 'Verify BOC E2M status', action: 'query_customs' },
        { label: 'Optimize Manila fleet allocation', action: 'query_fleet' },
      ],
    },
  },
];

export default function AiPage() {
  const [messages, setMessages] = useState<AiMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: AiMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    // Simulate AI Response
    setTimeout(() => {
      let aiReply = "I have analyzed your query across your active shipments and carrier networks.";
      let actions: Array<{ label: string; action: string }> = [];
      let sources: Array<{ type: 'shipment' | 'vehicle' | 'warehouse' | 'regulation'; id: string; title: string; relevanceScore: number }> = [];

      if (query.toLowerCase().includes('cebu') || query.toLowerCase().includes('delay')) {
        aiReply = "High sea swells near the Surigao Strait are causing a **4.2 hour average delay** for inter-island RoRo cargo traveling between Cebu and Davao. \n\n**Impacted assets:** 28 container packages on *MV RoRo Express 3*.\n**Recommended Action:** Notify end receivers or switch perishable items to domestic air freight via Mactan-Cebu International Airport.";
        sources = [
          { type: 'shipment' as const, id: '1', title: 'LC-2026-B7K2-P4M8', relevanceScore: 0.96 },
          { type: 'vehicle' as const, id: 'v1', title: 'MV RoRo Express 3', relevanceScore: 0.91 }
        ];
        actions = [
          { label: 'Trigger Automated SMS Alerts via Semaphore', action: 'send_sms' },
          { label: 'Generate Air Freight Swap Orders', action: 'air_swap' },
        ];
      } else if (query.toLowerCase().includes('boc') || query.toLowerCase().includes('customs')) {
        aiReply = "According to **BOC CAO 01-2025** and PEZA PTOPS regulations, all e-commerce shipments must undergo Pre-Border Technical Verification (PTV).\n\nYour current declaration **BOC-DEC-8819** has satisfied duties (₱142,500 VAT) and is awaiting Final Assessment release at Port of Manila (South Harbor).";
        sources = [
          { type: 'regulation' as const, id: 'r1', title: 'BOC CAO 01-2025 Circular', relevanceScore: 0.99 }
        ];
      }

      const botMsg: AiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiReply,
        timestamp: new Date(),
        metadata: {
          model: 'gemini-2.5-flash',
          latencyMs: 280,
          tokensUsed: 184,
          sources,
          suggestedActions: actions,
        },
      };

      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col glass-card border-surface-border overflow-hidden">
      {/* AI Assistant Header */}
      <div className="p-4 border-b border-surface-border bg-surface-card/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-glow-brand">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-text-primary">Logicore AI Operations Agent</h2>
              <span className="px-2 py-0.5 rounded-full text-2xs bg-brand-500/10 text-brand-400 font-semibold border border-brand-500/20">
                Gemini 2.5 Flash
              </span>
            </div>
            <p className="text-xs text-text-muted">Real-time predictive telemetry & Philippine regulatory engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          Active Context: 156 Vehicles | 8 Warehouses
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === 'user'
                  ? 'bg-brand-500 text-white'
                  : 'bg-surface-elevated border border-surface-border text-brand-400'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className="space-y-3 flex-1">
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-500 text-white rounded-tr-none'
                    : 'bg-surface-card border border-surface-border text-text-primary rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>

              {/* AI Metadata & Sources */}
              {msg.metadata?.sources && msg.metadata.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-text-muted text-2xs flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Reference Sources:
                  </span>
                  {msg.metadata.sources.map((src) => (
                    <span
                      key={src.id}
                      className="px-2 py-1 rounded bg-surface-elevated border border-surface-border text-brand-300 font-mono text-2xs"
                    >
                      {src.title} ({(src.relevanceScore * 100).toFixed(0)}%)
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {msg.metadata?.suggestedActions && msg.metadata.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.metadata.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(action.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-xs font-medium rounded-lg border border-brand-500/30 transition-all hover:shadow-glow-brand"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-4 max-w-3xl">
            <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center shrink-0 text-brand-400">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-surface-card border border-surface-border text-sm text-text-muted flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs ml-2">Synthesizing logistics telemetry...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 border-t border-surface-border bg-surface-card/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about delayed shipments, BOC regulations, fleet fuel efficiency, or warehouse stock..."
            className="flex-1 px-4 py-3 bg-surface-elevated border border-surface-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-3 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 hover:shadow-glow-brand flex items-center gap-2 disabled:opacity-50"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
