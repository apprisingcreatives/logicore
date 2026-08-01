// ============================================================
// Warehouse Management Types
// ============================================================

import type { Address, BaseEntity } from './common';

export enum WarehouseType {
  GENERAL = 'general',
  COLD_STORAGE = 'cold_storage',
  BONDED = 'bonded',
  HAZMAT = 'hazmat',
  CROSS_DOCK = 'cross_dock',
  DISTRIBUTION_CENTER = 'distribution_center',
  FULFILLMENT_CENTER = 'fulfillment_center',
}

export enum ZoneType {
  RECEIVING = 'receiving',
  STORAGE = 'storage',
  PICKING = 'picking',
  PACKING = 'packing',
  SHIPPING = 'shipping',
  RETURNS = 'returns',
  QUARANTINE = 'quarantine',
  COLD_ZONE = 'cold_zone',
  STAGING = 'staging',
}

export enum InventoryMovementType {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
  TRANSFER = 'transfer',
  ADJUSTMENT = 'adjustment',
  RETURN = 'return',
  DAMAGED = 'damaged',
  CYCLE_COUNT = 'cycle_count',
}

export interface Warehouse extends BaseEntity {
  readonly name: string;
  readonly code: string;
  readonly type: WarehouseType;
  readonly address: Address;
  readonly totalAreaSqm: number;
  readonly usableAreaSqm: number;
  readonly maxCapacityKg: number;
  readonly currentOccupancyPercent: number;
  readonly operatingHours: string;
  readonly managerUserId?: string;
  readonly isPezaZone: boolean;
  readonly bondedWarehouseLicense?: string;
  readonly isActive: boolean;
}

export interface WarehouseZone extends BaseEntity {
  readonly warehouseId: string;
  readonly name: string;
  readonly code: string;
  readonly type: ZoneType;
  readonly areaSqm: number;
  readonly temperatureMin?: number;
  readonly temperatureMax?: number;
  readonly humidityMin?: number;
  readonly humidityMax?: number;
  readonly maxCapacity: number;
  readonly currentOccupancy: number;
}

export interface InventoryItem extends BaseEntity {
  readonly sku: string;
  readonly name: string;
  readonly description?: string;
  readonly warehouseId: string;
  readonly zoneId: string;
  readonly locationCode: string;
  readonly quantity: number;
  readonly reservedQuantity: number;
  readonly unitOfMeasure: string;
  readonly batchNumber?: string;
  readonly serialNumber?: string;
  readonly expirationDate?: Date;
  readonly costPerUnit?: number;
  readonly weight?: number;
  readonly isHazardous: boolean;
  readonly requiresColdChain: boolean;
  readonly minStockLevel: number;
  readonly maxStockLevel: number;
  readonly reorderPoint: number;
}

export interface InventoryMovement extends BaseEntity {
  readonly inventoryItemId: string;
  readonly warehouseId: string;
  readonly type: InventoryMovementType;
  readonly quantity: number;
  readonly fromZoneId?: string;
  readonly toZoneId?: string;
  readonly referenceNumber?: string;
  readonly shipmentId?: string;
  readonly performedByUserId: string;
  readonly notes?: string;
}
