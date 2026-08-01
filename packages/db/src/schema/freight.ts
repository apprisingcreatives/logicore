// ============================================================
// Freight Forwarding & Customs Schema
// ============================================================

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  real,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenants';

export const freightBookings = pgTable('freight_bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  bookingNumber: varchar('booking_number', { length: 30 }).notNull().unique(),
  status: varchar('status', { length: 30 }).notNull().default('inquiry'),
  mode: varchar('mode', { length: 20 }).notNull(),
  incoterms: varchar('incoterms', { length: 10 }).notNull(),

  shipper: jsonb('shipper').notNull(),
  consignee: jsonb('consignee').notNull(),
  notifyParty: jsonb('notify_party'),

  origin: jsonb('origin').notNull(),
  destination: jsonb('destination').notNull(),
  portOfLoading: varchar('port_of_loading', { length: 255 }),
  portOfDischarge: varchar('port_of_discharge', { length: 255 }),

  vesselName: varchar('vessel_name', { length: 255 }),
  voyageNumber: varchar('voyage_number', { length: 50 }),
  etd: timestamp('etd', { withTimezone: true }),
  eta: timestamp('eta', { withTimezone: true }),

  containerCount: real('container_count'),
  containerType: varchar('container_type', { length: 30 }),
  grossWeightKg: real('gross_weight_kg').notNull(),
  volumeCbm: real('volume_cbm').notNull(),
  commodity: varchar('commodity', { length: 255 }).notNull(),
  hsCode: varchar('hs_code', { length: 20 }),

  freightChargesPhp: real('freight_charges_php'),
  customsBrokerId: uuid('customs_broker_id'),
  customsDeclarationId: uuid('customs_declaration_id'),

  metadata: jsonb('metadata').default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_freight_tenant').on(table.tenantId),
  index('idx_freight_status').on(table.tenantId, table.status),
  index('idx_freight_booking_number').on(table.bookingNumber),
]);

export type FreightBookingRow = typeof freightBookings.$inferSelect;
export type NewFreightBookingRow = typeof freightBookings.$inferInsert;

// ── Customs Declarations ────────────────────────────────────

export const customsDeclarations = pgTable('customs_declarations', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  bookingId: uuid('booking_id').references(() => freightBookings.id),

  declarationNumber: varchar('declaration_number', { length: 50 }).notNull(),
  status: varchar('status', { length: 30 }).notNull().default('draft'),
  entryType: varchar('entry_type', { length: 10 }).notNull(),

  declarantName: varchar('declarant_name', { length: 255 }).notNull(),
  importerTin: varchar('importer_tin', { length: 50 }),
  importerAccreditationNumber: varchar('importer_accreditation_number', { length: 100 }),

  hsCode: varchar('hs_code', { length: 20 }).notNull(),
  commodityDescription: text('commodity_description').notNull(),
  originCountry: varchar('origin_country', { length: 3 }).notNull(),
  grossWeightKg: real('gross_weight_kg').notNull(),

  declaredValuePhp: real('declared_value_php').notNull(),
  dutiableValuePhp: real('dutiable_value_php'),
  customsDutyPhp: real('customs_duty_php'),
  vatPhp: real('vat_php'),
  otherChargesPhp: real('other_charges_php'),
  totalAssessmentPhp: real('total_assessment_php'),

  bocReferenceNumber: varchar('boc_reference_number', { length: 100 }),
  e2mTransactionNumber: varchar('e2m_transaction_number', { length: 100 }),
  pezaImportPermitNumber: varchar('peza_import_permit_number', { length: 100 }),

  releaseDate: timestamp('release_date', { withTimezone: true }),
  examinerName: varchar('examiner_name', { length: 255 }),
  examinerRemarks: text('examiner_remarks'),

  metadata: jsonb('metadata').default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_customs_tenant').on(table.tenantId),
  index('idx_customs_booking').on(table.bookingId),
  index('idx_customs_declaration_number').on(table.declarationNumber),
]);

export type CustomsDeclarationRow = typeof customsDeclarations.$inferSelect;
export type NewCustomsDeclarationRow = typeof customsDeclarations.$inferInsert;
