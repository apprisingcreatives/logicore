// ============================================================
// AI Conversations Schema
// ============================================================

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { users } from './users';

export const aiConversations = pgTable('ai_conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  title: varchar('title', { length: 255 }).notNull().default('New Conversation'),
  context: jsonb('context').default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_ai_conversations_user').on(table.userId),
]);

export const aiMessages = pgTable('ai_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id').notNull().references(() => aiConversations.id, { onDelete: 'cascade' }),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  role: varchar('role', { length: 20 }).notNull(),
  content: text('content').notNull(),

  model: varchar('model', { length: 100 }),
  tokensUsed: jsonb('tokens_used'),
  latencyMs: jsonb('latency_ms'),
  sources: jsonb('sources'),
  suggestedActions: jsonb('suggested_actions'),

  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_ai_messages_conversation').on(table.conversationId, table.timestamp),
]);

export type AiConversationRow = typeof aiConversations.$inferSelect;
export type AiMessageRow = typeof aiMessages.$inferSelect;
