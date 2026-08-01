// ============================================================
// Vehicles Schema — Fleet Management
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

export const vehicles = pgTable('vehicles', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  plateNumber: varchar('plate_number', { length: 20 }).notNull(),
  type: varchar('type', { length: 30 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('available'),

  make: varchar('make', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  vin: varchar('vin', { length: 50 }),

  fuelType: varchar('fuel_type', { length: 20 }).notNull(),
  fuelCapacityLiters: real('fuel_capacity_liters').notNull(),
  maxPayloadKg: real('max_payload_kg').notNull(),

  currentLatitude: real('current_latitude'),
  currentLongitude: real('current_longitude'),
  odometerKm: real('odometer_km').notNull().default(0),

  assignedDriverId: uuid('assigned_driver_id'),
  iotDeviceId: varchar('iot_device_id', { length: 100 }),

  insuranceExpiry: timestamp('insurance_expiry', { withTimezone: true }),
  registrationExpiry: timestamp('registration_expiry', { withTimezone: true }),
  lastMaintenanceDate: timestamp('last_maintenance_date', { withTimezone: true }),
  nextMaintenanceDate: timestamp('next_maintenance_date', { withTimezone: true }),

  isActive: boolean('is_active').notNull().default(true),
  metadata: jsonb('metadata').default({}),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_vehicles_tenant_id').on(table.tenantId),
  index('idx_vehicles_status').on(table.tenantId, table.status),
  index('idx_vehicles_plate').on(table.tenantId, table.plateNumber),
]);

export type VehicleRow = typeof vehicles.$inferSelect;
export type NewVehicleRow = typeof vehicles.$inferInsert;

// ── Drivers ─────────────────────────────────────────────────

export const drivers = pgTable('drivers', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  licenseNumber: varchar('license_number', { length: 50 }).notNull(),
  licenseExpiry: timestamp('license_expiry', { withTimezone: true }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }),

  assignedVehicleId: uuid('assigned_vehicle_id').references(() => vehicles.id),
  status: varchar('status', { length: 20 }).notNull().default('active'),

  currentLatitude: real('current_latitude'),
  currentLongitude: real('current_longitude'),
  rating: real('rating'),
  totalTrips: integer('total_trips').notNull().default(0),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('idx_drivers_tenant_id').on(table.tenantId),
]);

export type DriverRow = typeof drivers.$inferSelect;
export type NewDriverRow = typeof drivers.$inferInsert;

// ── Vehicle Telemetry (Time-Series) ─────────────────────────

export const vehicleTelemetry = pgTable('vehicle_telemetry', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').notNull().references(() => vehicles.id, { onDelete: 'cascade' }),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),

  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  speed: real('speed').notNull().default(0),
  heading: real('heading'),

  fuelLevel: real('fuel_level'),
  engineTemp: real('engine_temp'),
  batteryVoltage: real('battery_voltage'),
  cargoTemp: real('cargo_temp'),
  humidity: real('humidity'),

  ignition: boolean('ignition').notNull().default(false),
  doorStatus: varchar('door_status', { length: 10 }),

  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_telemetry_vehicle_time').on(table.vehicleId, table.timestamp),
  index('idx_telemetry_tenant').on(table.tenantId, table.timestamp),
]);

export type VehicleTelemetryRow = typeof vehicleTelemetry.$inferSelect;
export type NewVehicleTelemetryRow = typeof vehicleTelemetry.$inferInsert;

// ── Maintenance Records ─────────────────────────────────────

export const maintenanceRecords = pgTable('maintenance_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  vehicleId: uuid('vehicle_id').notNull().references(() => vehicles.id, { onDelete: 'cascade' }),

  type: varchar('type', { length: 30 }).notNull(),
  description: text('description').notNull(),
  scheduledDate: timestamp('scheduled_date', { withTimezone: true }).notNull(),
  completedDate: timestamp('completed_date', { withTimezone: true }),
  costPhp: real('cost_php'),
  odometerAtService: real('odometer_at_service').notNull(),
  performedBy: varchar('performed_by', { length: 255 }),
  notes: text('notes'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_maintenance_vehicle').on(table.vehicleId),
]);

export type MaintenanceRecordRow = typeof maintenanceRecords.$inferSelect;
export type NewMaintenanceRecordRow = typeof maintenanceRecords.$inferInsert;
