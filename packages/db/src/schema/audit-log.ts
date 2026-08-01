// ============================================================
// Audit Log Schema — Compliance & Traceability
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

/**
 * Audit log captures every significant mutation for compliance.
 * BOC and PEZA require audit trails for customs processing.
 * This table is append-only — rows are never updated or deleted.
 */
export const auditLog = pgTable('audit_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  // Who
  userId: uuid('user_id').references(() => users.id),
  userEmail: varchar('user_email', { length: 255 }),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),

  // What
  action: varchar('action', { length: 50 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: uuid('entity_id'),
  description: text('description'),

  // Changes (before/after snapshots)
  previousValues: jsonb('previous_values'),
  newValues: jsonb('new_values'),

  // When
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_audit_tenant_time').on(table.tenantId, table.timestamp),
  index('idx_audit_entity').on(table.entityType, table.entityId),
  index('idx_audit_user').on(table.userId, table.timestamp),
]);

export type AuditLogRow = typeof auditLog.$inferSelect;
export type NewAuditLogRow = typeof auditLog.$inferInsert;
