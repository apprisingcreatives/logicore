// ============================================================
// Documents Schema
// ============================================================

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  real,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { users } from './users';

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  // Polymorphic association — can belong to shipment, booking, or vehicle
  shipmentId: uuid('shipment_id'),
  bookingId: uuid('booking_id'),
  vehicleId: uuid('vehicle_id'),

  type: varchar('type', { length: 50 }).notNull(),
  documentNumber: varchar('document_number', { length: 100 }),

  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileSizeBytes: integer('file_size_bytes').notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),

  isVerified: boolean('is_verified').notNull().default(false),
  verifiedByUserId: uuid('verified_by_user_id').references(() => users.id),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),

  expirationDate: timestamp('expiration_date', { withTimezone: true }),

  // AI document extraction results
  extractedData: jsonb('extracted_data'),
  aiConfidenceScore: real('ai_confidence_score'),

  uploadedByUserId: uuid('uploaded_by_user_id').references(() => users.id),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_documents_tenant').on(table.tenantId),
  index('idx_documents_shipment').on(table.shipmentId),
  index('idx_documents_booking').on(table.bookingId),
]);

export type DocumentRow = typeof documents.$inferSelect;
export type NewDocumentRow = typeof documents.$inferInsert;
