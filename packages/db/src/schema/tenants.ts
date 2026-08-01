// ============================================================
// Tenants Schema — Multi-tenancy Core
// ============================================================

import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

/**
 * Tenants represent organizations (logistics companies) on the platform.
 * Every row in every business table references a tenant via tenant_id.
 * This is the foundation of our shared-database multi-tenancy model.
 */
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  domain: varchar('domain', { length: 255 }),
  logoUrl: text('logo_url'),

  // Business info
  businessType: varchar('business_type', { length: 50 }).notNull(),
  registrationNumber: varchar('registration_number', { length: 100 }),
  tinNumber: varchar('tin_number', { length: 50 }),

  // Contact
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  address: jsonb('address'),

  // Subscription
  plan: varchar('plan', { length: 50 }).notNull().default('trial'),
  maxUsers: varchar('max_users', { length: 10 }).notNull().default('5'),
  isActive: boolean('is_active').notNull().default(true),

  // Compliance
  bocAccreditationNumber: varchar('boc_accreditation_number', { length: 100 }),
  pezaRegistrationNumber: varchar('peza_registration_number', { length: 100 }),
  dtiFtebAccreditationNumber: varchar('dti_fteb_accreditation_number', { length: 100 }),

  // Settings
  settings: jsonb('settings').default({}),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
