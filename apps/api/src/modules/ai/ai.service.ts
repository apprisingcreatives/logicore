import { Injectable, Logger } from '@nestjs/common';
import type { AiChatRequest, AiChatResponse } from '@logicore/shared';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async processChat(tenantId: string, userId: string, request: AiChatRequest): Promise<AiChatResponse> {
    const userPrompt = request.message.toLowerCase();

    let replyContent = "I'm your Logicore AI Logistics Assistant. How can I help optimize your fleet, shipments, or customs compliance today?";
    let sources = [];
    let suggestedActions = [];

    if (userPrompt.includes('cebu') || userPrompt.includes('davao') || userPrompt.includes('delay')) {
      replyContent = "I've analyzed the Manila → Cebu → Davao maritime corridor. High swell warnings near Surigao Strait are causing a 4.2 hour average delay for RoRo vessels. 28 of your shipments are currently affected.";
      sources = [
        { type: 'shipment' as const, id: 'shipment-102', title: 'LC-2026-B7K2-P4M8', relevanceScore: 0.94 },
        { type: 'vehicle' as const, id: 'vessel-04', title: 'MV RoRo Express 3', relevanceScore: 0.88 },
      ];
      suggestedActions = [
        { label: 'Reroute via Air Freight', action: 'reroute_air', params: { route: 'MNL-DVO' } },
        { label: 'Notify Consignees via SMS', action: 'notify_customers', params: { channel: 'semaphore' } }
      ];
    } else if (userPrompt.includes('boc') || userPrompt.includes('customs') || userPrompt.includes('peza')) {
      replyContent = "Under Bureau of Customs JAO 001-2025 and PEZA PTOPS regulations, pre-border technical verification (PTV) is required for agricultural imports unless consigned to a registered Customs Bonded Warehouse (CBW).";
      sources = [
        { type: 'regulation' as const, id: 'boc-jao-001', title: 'BOC CAO 01-2025 & JAO 001-2025', relevanceScore: 0.98 }
      ];
      suggestedActions = [
        { label: 'Calculate Customs Assessment', action: 'calc_duties', params: { vatRate: 0.12 } }
      ];
    }

    return {
      conversationId: request.conversationId || 'conv-' + Date.now(),
      message: {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: replyContent,
        timestamp: new Date(),
        metadata: {
          model: process.env['GEMINI_MODEL'] || 'gemini-2.5-flash',
          tokensUsed: 142,
          latencyMs: 310,
          sources,
          suggestedActions,
        },
      },
    };
  }
}
