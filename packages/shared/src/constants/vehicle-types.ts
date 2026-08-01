// ============================================================
// Vehicle Type Constants
// ============================================================

import { VehicleType } from '../types/fleet';

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  [VehicleType.MOTORCYCLE]: 'Motorcycle',
  [VehicleType.VAN]: 'Van',
  [VehicleType.PICKUP_TRUCK]: 'Pickup Truck',
  [VehicleType.LIGHT_TRUCK]: 'Light Truck (4-6 wheeler)',
  [VehicleType.MEDIUM_TRUCK]: 'Medium Truck (6-10 wheeler)',
  [VehicleType.HEAVY_TRUCK]: 'Heavy Truck (10+ wheeler)',
  [VehicleType.TRAILER]: 'Trailer',
  [VehicleType.REFRIGERATED_TRUCK]: 'Refrigerated Truck',
  [VehicleType.TANKER]: 'Tanker',
  [VehicleType.FLATBED]: 'Flatbed',
  [VehicleType.CONTAINER_TRUCK]: 'Container Truck',
  [VehicleType.RORO_VESSEL]: 'RoRo Vessel',
  [VehicleType.CARGO_VESSEL]: 'Cargo Vessel',
  [VehicleType.BARGE]: 'Barge',
};

/** Maximum payload capacity in kg by vehicle type (typical for PH) */
export const VEHICLE_MAX_PAYLOAD_KG: Record<VehicleType, number> = {
  [VehicleType.MOTORCYCLE]: 50,
  [VehicleType.VAN]: 1500,
  [VehicleType.PICKUP_TRUCK]: 2000,
  [VehicleType.LIGHT_TRUCK]: 5000,
  [VehicleType.MEDIUM_TRUCK]: 10000,
  [VehicleType.HEAVY_TRUCK]: 25000,
  [VehicleType.TRAILER]: 30000,
  [VehicleType.REFRIGERATED_TRUCK]: 15000,
  [VehicleType.TANKER]: 20000,
  [VehicleType.FLATBED]: 20000,
  [VehicleType.CONTAINER_TRUCK]: 28000,
  [VehicleType.RORO_VESSEL]: 5000000,
  [VehicleType.CARGO_VESSEL]: 10000000,
  [VehicleType.BARGE]: 3000000,
};

export const VEHICLE_ICONS: Record<VehicleType, string> = {
  [VehicleType.MOTORCYCLE]: '🏍️',
  [VehicleType.VAN]: '🚐',
  [VehicleType.PICKUP_TRUCK]: '🛻',
  [VehicleType.LIGHT_TRUCK]: '🚚',
  [VehicleType.MEDIUM_TRUCK]: '🚛',
  [VehicleType.HEAVY_TRUCK]: '🚛',
  [VehicleType.TRAILER]: '🚛',
  [VehicleType.REFRIGERATED_TRUCK]: '🧊',
  [VehicleType.TANKER]: '🛢️',
  [VehicleType.FLATBED]: '🚛',
  [VehicleType.CONTAINER_TRUCK]: '📦',
  [VehicleType.RORO_VESSEL]: '🚢',
  [VehicleType.CARGO_VESSEL]: '🚢',
  [VehicleType.BARGE]: '🛳️',
};
