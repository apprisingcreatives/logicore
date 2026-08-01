// ============================================================
// Fleet & Vehicle Types
// ============================================================

import type { BaseEntity, GeoCoordinate } from './common';

export enum VehicleType {
  MOTORCYCLE = 'motorcycle',
  VAN = 'van',
  PICKUP_TRUCK = 'pickup_truck',
  LIGHT_TRUCK = 'light_truck',
  MEDIUM_TRUCK = 'medium_truck',
  HEAVY_TRUCK = 'heavy_truck',
  TRAILER = 'trailer',
  REFRIGERATED_TRUCK = 'refrigerated_truck',
  TANKER = 'tanker',
  FLATBED = 'flatbed',
  CONTAINER_TRUCK = 'container_truck',
  RORO_VESSEL = 'roro_vessel',
  CARGO_VESSEL = 'cargo_vessel',
  BARGE = 'barge',
}

export enum VehicleStatus {
  AVAILABLE = 'available',
  IN_TRANSIT = 'in_transit',
  LOADING = 'loading',
  UNLOADING = 'unloading',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out_of_service',
  IDLE = 'idle',
}

export enum FuelType {
  DIESEL = 'diesel',
  GASOLINE = 'gasoline',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
  LNG = 'lng',
}

export enum MaintenanceType {
  PREVENTIVE = 'preventive',
  CORRECTIVE = 'corrective',
  EMERGENCY = 'emergency',
  INSPECTION = 'inspection',
  TIRE_CHANGE = 'tire_change',
  OIL_CHANGE = 'oil_change',
}

export interface Vehicle extends BaseEntity {
  readonly plateNumber: string;
  readonly type: VehicleType;
  readonly status: VehicleStatus;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly vin?: string;
  readonly fuelType: FuelType;
  readonly fuelCapacityLiters: number;
  readonly maxPayloadKg: number;
  readonly currentLocation?: GeoCoordinate;
  readonly odometerKm: number;
  readonly assignedDriverId?: string;
  readonly insuranceExpiry?: Date;
  readonly registrationExpiry?: Date;
  readonly lastMaintenanceDate?: Date;
  readonly nextMaintenanceDate?: Date;
  readonly iotDeviceId?: string;
  readonly isActive: boolean;
}

/** Real-time telemetry from IoT device */
export interface VehicleTelemetry {
  readonly vehicleId: string;
  readonly timestamp: Date;
  readonly location: GeoCoordinate;
  readonly speed: number;
  readonly heading: number;
  readonly fuelLevel?: number;
  readonly engineTemp?: number;
  readonly batteryVoltage?: number;
  readonly doorStatus?: 'open' | 'closed';
  readonly cargoTemp?: number;
  readonly humidity?: number;
  readonly ignition: boolean;
}

export interface MaintenanceRecord extends BaseEntity {
  readonly vehicleId: string;
  readonly type: MaintenanceType;
  readonly description: string;
  readonly scheduledDate: Date;
  readonly completedDate?: Date;
  readonly cost?: number;
  readonly odometerAtService: number;
  readonly performedBy?: string;
  readonly notes?: string;
}

export interface Driver extends BaseEntity {
  readonly firstName: string;
  readonly lastName: string;
  readonly licenseNumber: string;
  readonly licenseExpiry: Date;
  readonly phone: string;
  readonly email?: string;
  readonly assignedVehicleId?: string;
  readonly status: 'active' | 'on_leave' | 'suspended' | 'inactive';
  readonly currentLocation?: GeoCoordinate;
  readonly rating?: number;
  readonly totalTrips: number;
}
