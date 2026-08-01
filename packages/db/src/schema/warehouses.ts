// ============================================================
// Warehouses Schema — Warehouse Management
// ============================================================

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  real,
  integer,
  boolean,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenants';
import { users } from './users';

export const warehouses = pgTable('warehouses', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 20 }).notNull(),
  type: varchar('type', { length: 30 }).notNull().default('general'),
  address: jsonb('address').notNull(),

  totalAreaSqm: real('total_area_sqm').notNull(),
  usableAreaSqm: real('usable_area_sqm').notNull(),
  maxCapacityKg: real('max_capacity_kg').notNull(),
  currentOccupancyPercent: real('current_occupancy_percent').notNull().default(0),

  operatingHours: varchar('operating_hours', { length: 100 }),
  managerUserId: uuid('manager_user_id').references(() => users.id),

  isPezaZone: boolean('is_peza_zone').notNull().default(false),
  bondedWarehouseLicense: varchar('bonded_warehouse_license', { length: 100 }),
  isActive: boolean('is_active').notNull().default(true),

  metadata: jsonb('metadata').default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_warehouses_tenant').on(table.tenantId),
]);

export type WarehouseRow = typeof warehouses.$inferSelect;
export type NewWarehouseRow = typeof warehouses.$inferInsert;

// ── Warehouse Zones ─────────────────────────────────────────

export const warehouseZones = pgTable('warehouse_zones', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  warehouseId: uuid('warehouse_id').notNull().references(() => warehouses.id, { onDelete: 'cascade' }),

  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 20 }).notNull(),
  type: varchar('type', { length: 20 }).notNull(),

  areaSqm: real('area_sqm').notNull(),
  temperatureMin: real('temperature_min'),
  temperatureMax: real('temperature_max'),
  humidityMin: real('humidity_min'),
  humidityMax: real('humidity_max'),

  maxCapacity: integer('max_capacity').notNull(),
  currentOccupancy: integer('current_occupancy').notNull().default(0),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_zones_warehouse').on(table.warehouseId),
]);

export type WarehouseZoneRow = typeof warehouseZones.$inferSelect;

// ── Inventory Items ─────────────────────────────────────────

export const inventoryItems = pgTable('inventory_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  warehouseId: uuid('warehouse_id').notNull().references(() => warehouses.id, { onDelete: 'cascade' }),
  zoneId: uuid('zone_id').notNull().references(() => warehouseZones.id),

  sku: varchar('sku', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  locationCode: varchar('location_code', { length: 50 }).notNull(),

  quantity: integer('quantity').notNull().default(0),
  reservedQuantity: integer('reserved_quantity').notNull().default(0),
  unitOfMeasure: varchar('unit_of_measure', { length: 20 }).notNull().default('pcs'),

  batchNumber: varchar('batch_number', { length: 100 }),
  serialNumber: varchar('serial_number', { length: 100 }),
  expirationDate: timestamp('expiration_date', { withTimezone: true }),

  costPerUnit: real('cost_per_unit'),
  weightKg: real('weight_kg'),

  isHazardous: boolean('is_hazardous').notNull().default(false),
  requiresColdChain: boolean('requires_cold_chain').notNull().default(false),

  minStockLevel: integer('min_stock_level').notNull().default(0),
  maxStockLevel: integer('max_stock_level').notNull().default(0),
  reorderPoint: integer('reorder_point').notNull().default(0),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_inventory_tenant').on(table.tenantId),
  index('idx_inventory_sku').on(table.tenantId, table.sku),
  index('idx_inventory_warehouse').on(table.warehouseId),
]);

export type InventoryItemRow = typeof inventoryItems.$inferSelect;
export type NewInventoryItemRow = typeof inventoryItems.$inferInsert;

// ── Inventory Movements ─────────────────────────────────────

export const inventoryMovements = pgTable('inventory_movements', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  inventoryItemId: uuid('inventory_item_id').notNull().references(() => inventoryItems.id),
  warehouseId: uuid('warehouse_id').notNull().references(() => warehouses.id),

  type: varchar('type', { length: 20 }).notNull(),
  quantity: integer('quantity').notNull(),

  fromZoneId: uuid('from_zone_id').references(() => warehouseZones.id),
  toZoneId: uuid('to_zone_id').references(() => warehouseZones.id),

  referenceNumber: varchar('reference_number', { length: 100 }),
  shipmentId: uuid('shipment_id'),
  performedByUserId: uuid('performed_by_user_id').references(() => users.id),
  notes: text('notes'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_movements_item').on(table.inventoryItemId),
  index('idx_movements_warehouse').on(table.warehouseId, table.createdAt),
]);

export type InventoryMovementRow = typeof inventoryMovements.$inferSelect;
