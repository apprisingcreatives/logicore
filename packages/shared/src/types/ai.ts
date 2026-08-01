// ============================================================
// AI & Chat Types
// ============================================================

/** AI chat message */
export interface AiMessage {
  readonly id: string;
  readonly role: 'user' | 'assistant' | 'system';
  readonly content: string;
  readonly timestamp: Date;
  readonly metadata?: {
    readonly model?: string;
    readonly tokensUsed?: number;
    readonly latencyMs?: number;
    readonly sources?: AiSource[];
    readonly suggestedActions?: AiSuggestedAction[];
  };
}

/** Source reference from AI response */
export interface AiSource {
  readonly type: 'shipment' | 'vehicle' | 'warehouse' | 'document' | 'regulation';
  readonly id: string;
  readonly title: string;
  readonly relevanceScore: number;
}

/** Actionable suggestion from AI */
export interface AiSuggestedAction {
  readonly label: string;
  readonly action: string;
  readonly params?: Record<string, unknown>;
}

/** AI conversation session */
export interface AiConversation {
  readonly id: string;
  readonly tenantId: string;
  readonly userId: string;
  readonly title: string;
  readonly messages: AiMessage[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/** AI chat request */
export interface AiChatRequest {
  readonly message: string;
  readonly conversationId?: string;
  readonly context?: {
    readonly currentPage?: string;
    readonly selectedEntityId?: string;
    readonly selectedEntityType?: string;
  };
}

/** AI chat response */
export interface AiChatResponse {
  readonly message: AiMessage;
  readonly conversationId: string;
}
