// ============================================================
// Notifications Schema
// ============================================================

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { users } from './users';

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  type: varchar('type', { length: 50 }).notNull(),
  channel: varchar('channel', { length: 20 }).notNull().default('in_app'),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),

  entityType: varchar('entity_type', { length: 50 }),
  entityId: uuid('entity_id'),

  isRead: boolean('is_read').notNull().default(false),
  readAt: timestamp('read_at', { withTimezone: true }),

  metadata: jsonb('metadata').default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_notifications_user').on(table.userId, table.isRead),
  index('idx_notifications_tenant').on(table.tenantId, table.createdAt),
]);

export type NotificationRow = typeof notifications.$inferSelect;
export type NewNotificationRow = typeof notifications.$inferInsert;
