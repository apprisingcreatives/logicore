// ============================================================
// Users Schema — Authentication & RBAC
// ============================================================

import { pgTable, uuid, varchar, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { tenants } from './tenants';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  // Auth
  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: text('password_hash').notNull(),

  // Profile
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  avatarUrl: text('avatar_url'),

  // RBAC
  role: varchar('role', { length: 50 }).notNull().default('viewer'),

  // Status
  isActive: boolean('is_active').notNull().default(true),
  emailVerified: boolean('email_verified').notNull().default(false),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_users_tenant_id').on(table.tenantId),
  index('idx_users_email').on(table.email),
]);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
