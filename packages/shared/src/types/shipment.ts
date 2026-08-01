// ============================================================
// Shipment Types — Transportation Management System
// ============================================================

import type {
  Address,
  BaseEntity,
  ContactInfo,
  Dimensions,
  GeoCoordinate,
  Money,
  Weight,
} from './common';

/** Transport mode for Philippine archipelago logistics */
export enum TransportMode {
  /** Trucks, vans, motorcycles — land transport */
  ROAD = 'road',
  /** Inter-island shipping — RoRo, container vessels */
  SEA = 'sea',
  /** Domestic and international air freight */
  AIR = 'air',
  /** Combination of modes — typical for PH island logistics */
  MULTIMODAL = 'multimodal',
  /** Rail (limited, primarily in Luzon) */
  RAIL = 'rail',
}

/** Shipment lifecycle status */
export enum ShipmentStatus {
  /** Initial creation, not yet confirmed */
  DRAFT = 'draft',
  /** Confirmed and awaiting pickup */
  CONFIRMED = 'confirmed',
  /** Picked up from origin */
  PICKED_UP = 'picked_up',
  /** At origin hub/warehouse */
  AT_ORIGIN_HUB = 'at_origin_hub',
  /** In transit between locations */
  IN_TRANSIT = 'in_transit',
  /** At an intermediate transfer point */
  AT_TRANSFER_POINT = 'at_transfer_point',
  /** At destination hub/warehouse */
  AT_DESTINATION_HUB = 'at_destination_hub',
  /** Out for final delivery */
  OUT_FOR_DELIVERY = 'out_for_delivery',
  /** Successfully delivered */
  DELIVERED = 'delivered',
  /** Delivery attempted but failed */
  DELIVERY_FAILED = 'delivery_failed',
  /** Returned to sender */
  RETURNED = 'returned',
  /** Cancelled before delivery */
  CANCELLED = 'cancelled',
  /** Held for customs clearance */
  CUSTOMS_HOLD = 'customs_hold',
  /** Flagged for exception handling */
  EXCEPTION = 'exception',
}

/** Priority level for shipment handling */
export enum ShipmentPriority {
  STANDARD = 'standard',
  EXPRESS = 'express',
  PRIORITY = 'priority',
  SAME_DAY = 'same_day',
  OVERNIGHT = 'overnight',
}

/** Type of goods being shipped */
export enum CargoType {
  GENERAL = 'general',
  PERISHABLE = 'perishable',
  FRAGILE = 'fragile',
  HAZARDOUS = 'hazardous',
  LIQUID = 'liquid',
  OVERSIZED = 'oversized',
  LIVE_ANIMAL = 'live_animal',
  PHARMACEUTICAL = 'pharmaceutical',
  ELECTRONICS = 'electronics',
  DOCUMENTS = 'documents',
  COLD_CHAIN = 'cold_chain',
}

/** Individual package within a shipment */
export interface ShipmentPackage {
  readonly id: string;
  readonly description: string;
  readonly weight: Weight;
  readonly dimensions: Dimensions;
  readonly quantity: number;
  readonly cargoType: CargoType;
  readonly declaredValue?: Money;
  readonly specialInstructions?: string;
}

/** Shipment route leg — one segment of a multimodal journey */
export interface RouteLeg {
  readonly id: string;
  readonly sequence: number;
  readonly mode: TransportMode;
  readonly origin: Address;
  readonly destination: Address;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly estimatedDeparture: Date;
  readonly estimatedArrival: Date;
  readonly actualDeparture?: Date;
  readonly actualArrival?: Date;
  readonly distance?: number;
  readonly carrier?: string;
  readonly vesselName?: string;
  readonly voyageNumber?: string;
  readonly flightNumber?: string;
}

/** Tracking event for shipment timeline */
export interface TrackingEvent {
  readonly id: string;
  readonly shipmentId: string;
  readonly timestamp: Date;
  readonly status: ShipmentStatus;
  readonly location?: GeoCoordinate;
  readonly locationName?: string;
  readonly description: string;
  readonly performedBy?: string;
  readonly metadata?: Record<string, unknown>;
}

/** Full shipment entity */
export interface Shipment extends BaseEntity {
  readonly trackingNumber: string;
  readonly referenceNumber?: string;
  readonly status: ShipmentStatus;
  readonly priority: ShipmentPriority;
  readonly mode: TransportMode;
  readonly origin: Address;
  readonly destination: Address;
  readonly sender: ContactInfo;
  readonly receiver: ContactInfo;
  readonly packages: ShipmentPackage[];
  readonly routeLegs: RouteLeg[];
  readonly trackingEvents: TrackingEvent[];
  readonly totalWeight: Weight;
  readonly totalDeclaredValue?: Money;
  readonly shippingCost?: Money;
  readonly insuranceCost?: Money;
  readonly estimatedDelivery?: Date;
  readonly actualDelivery?: Date;
  readonly specialInstructions?: string;
  readonly customsDeclarationId?: string;
  readonly proofOfDeliveryUrl?: string;
  readonly assignedDriverId?: string;
  readonly assignedVehicleId?: string;
}

/** Shipment creation request */
export interface CreateShipmentRequest {
  readonly referenceNumber?: string;
  readonly priority: ShipmentPriority;
  readonly mode: TransportMode;
  readonly origin: Address;
  readonly destination: Address;
  readonly sender: ContactInfo;
  readonly receiver: ContactInfo;
  readonly packages: Omit<ShipmentPackage, 'id'>[];
  readonly specialInstructions?: string;
}

/** Shipment update request (partial) */
export type UpdateShipmentRequest = Partial<
  Pick<
    Shipment,
    | 'status'
    | 'priority'
    | 'specialInstructions'
    | 'assignedDriverId'
    | 'assignedVehicleId'
    | 'estimatedDelivery'
  >
>;

/** Shipment list filters */
export interface ShipmentFilters {
  readonly status?: ShipmentStatus[];
  readonly mode?: TransportMode[];
  readonly priority?: ShipmentPriority[];
  readonly originRegion?: string;
  readonly destinationRegion?: string;
  readonly dateFrom?: Date;
  readonly dateTo?: Date;
  readonly search?: string;
}
