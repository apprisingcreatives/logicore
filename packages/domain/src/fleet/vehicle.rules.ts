// ============================================================
// Vehicle Business Rules
// ============================================================

import type { VehicleType, FuelType } from '@logicore/shared';

/** Maintenance interval by vehicle type (km) */
export const MAINTENANCE_INTERVALS_KM: Record<VehicleType, number> = {
  motorcycle: 3_000,
  van: 10_000,
  pickup_truck: 10_000,
  light_truck: 15_000,
  medium_truck: 20_000,
  heavy_truck: 25_000,
  trailer: 30_000,
  refrigerated_truck: 15_000,
  tanker: 20_000,
  flatbed: 20_000,
  container_truck: 25_000,
  roro_vessel: 50_000,
  cargo_vessel: 50_000,
  barge: 50_000,
};

/** Average fuel consumption (liters per 100km) */
export const AVG_FUEL_CONSUMPTION: Partial<Record<VehicleType, number>> = {
  motorcycle: 3,
  van: 10,
  pickup_truck: 12,
  light_truck: 15,
  medium_truck: 25,
  heavy_truck: 35,
  refrigerated_truck: 30,
  container_truck: 35,
};

/** Estimated fuel cost per liter (PHP, 2026 Philippine average) */
export const FUEL_COST_PER_LITER_PHP: Record<FuelType, number> = {
  diesel: 62,
  gasoline: 68,
  electric: 15,
  hybrid: 40,
  lng: 45,
};

/** Calculate estimated fuel cost for a trip */
export function estimateFuelCostPhp(
  distanceKm: number,
  vehicleType: VehicleType,
  fuelType: FuelType,
): number | null {
  const consumption = AVG_FUEL_CONSUMPTION[vehicleType];
  if (consumption === undefined) return null;

  const fuelCost = FUEL_COST_PER_LITER_PHP[fuelType];
  const litersNeeded = (distanceKm / 100) * consumption;
  return litersNeeded * fuelCost;
}

/** Calculate next maintenance date based on average daily km */
export function calculateNextMaintenanceDate(
  currentOdometerKm: number,
  lastMaintenanceOdometerKm: number,
  vehicleType: VehicleType,
  avgDailyKm: number,
): Date {
  const interval = MAINTENANCE_INTERVALS_KM[vehicleType] ?? 15_000;
  const kmSinceLast = currentOdometerKm - lastMaintenanceOdometerKm;
  const kmRemaining = Math.max(0, interval - kmSinceLast);
  const daysRemaining = avgDailyKm > 0 ? kmRemaining / avgDailyKm : 90;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + Math.round(daysRemaining));
  return nextDate;
}
