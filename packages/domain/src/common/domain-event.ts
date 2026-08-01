// ============================================================
// Domain Events
// ============================================================

import type { DomainEvent } from './entity.base';
import type { ShipmentStatus, TransportMode } from '@logicore/shared';

/** Emitted when a new shipment is created */
export interface ShipmentCreatedEvent extends DomainEvent {
  readonly eventType: 'shipment.created';
  readonly payload: {
    readonly trackingNumber: string;
    readonly tenantId: string;
    readonly mode: TransportMode;
    readonly originCity: string;
    readonly destinationCity: string;
  };
}

/** Emitted when a shipment status changes */
export interface ShipmentStatusChangedEvent extends DomainEvent {
  readonly eventType: 'shipment.status_changed';
  readonly payload: {
    readonly trackingNumber: string;
    readonly previousStatus: ShipmentStatus;
    readonly newStatus: ShipmentStatus;
    readonly changedBy: string;
  };
}

/** Emitted when a shipment is delivered */
export interface ShipmentDeliveredEvent extends DomainEvent {
  readonly eventType: 'shipment.delivered';
  readonly payload: {
    readonly trackingNumber: string;
    readonly deliveredAt: Date;
    readonly receivedBy: string;
  };
}

/** Emitted when a vehicle telemetry update is received */
export interface VehicleTelemetryReceivedEvent extends DomainEvent {
  readonly eventType: 'vehicle.telemetry_received';
  readonly payload: {
    readonly vehicleId: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number;
  };
}

/** Emitted when inventory falls below reorder point */
export interface InventoryLowStockEvent extends DomainEvent {
  readonly eventType: 'inventory.low_stock';
  readonly payload: {
    readonly itemId: string;
    readonly sku: string;
    readonly currentQuantity: number;
    readonly reorderPoint: number;
    readonly warehouseId: string;
  };
}
