// ============================================================
// Shipments Schema — Transportation Management
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
import { users } from './users';

export const shipments = pgTable('shipments', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  // Identification
  trackingNumber: varchar('tracking_number', { length: 20 }).notNull().unique(),
  referenceNumber: varchar('reference_number', { length: 100 }),

  // Status & Classification
  status: varchar('status', { length: 30 }).notNull().default('draft'),
  priority: varchar('priority', { length: 20 }).notNull().default('standard'),
  mode: varchar('mode', { length: 20 }).notNull(),

  // Locations (stored as JSONB for flexible address schemas)
  origin: jsonb('origin').notNull(),
  destination: jsonb('destination').notNull(),

  // Parties
  sender: jsonb('sender').notNull(),
  receiver: jsonb('receiver').notNull(),

  // Cargo
  packages: jsonb('packages').notNull().default([]),
  totalWeightKg: real('total_weight_kg').notNull(),
  totalDeclaredValuePhp: real('total_declared_value_php'),

  // Financials
  shippingCostPhp: real('shipping_cost_php'),
  insuranceCostPhp: real('insurance_cost_php'),

  // Assignment
  assignedDriverId: uuid('assigned_driver_id'),
  assignedVehicleId: uuid('assigned_vehicle_id'),

  // Timing
  estimatedDelivery: timestamp('estimated_delivery', { withTimezone: true }),
  actualDelivery: timestamp('actual_delivery', { withTimezone: true }),

  // Additional
  specialInstructions: text('special_instructions'),
  customsDeclarationId: uuid('customs_declaration_id'),
  proofOfDeliveryUrl: text('proof_of_delivery_url'),
  metadata: jsonb('metadata').default({}),

  // Created by
  createdByUserId: uuid('created_by_user_id').references(() => users.id),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_shipments_tenant_id').on(table.tenantId),
  index('idx_shipments_tracking_number').on(table.trackingNumber),
  index('idx_shipments_status').on(table.tenantId, table.status),
  index('idx_shipments_created_at').on(table.tenantId, table.createdAt),
]);

export type ShipmentRow = typeof shipments.$inferSelect;
export type NewShipmentRow = typeof shipments.$inferInsert;

// ── Tracking Events ─────────────────────────────────────────

export const trackingEvents = pgTable('tracking_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  shipmentId: uuid('shipment_id').notNull().references(() => shipments.id, { onDelete: 'cascade' }),

  status: varchar('status', { length: 30 }).notNull(),
  description: text('description').notNull(),
  locationName: varchar('location_name', { length: 255 }),
  latitude: real('latitude'),
  longitude: real('longitude'),

  performedByUserId: uuid('performed_by_user_id').references(() => users.id),
  metadata: jsonb('metadata').default({}),

  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_tracking_events_shipment').on(table.shipmentId),
  index('idx_tracking_events_timestamp').on(table.shipmentId, table.timestamp),
]);

export type TrackingEventRow = typeof trackingEvents.$inferSelect;
export type NewTrackingEventRow = typeof trackingEvents.$inferInsert;
