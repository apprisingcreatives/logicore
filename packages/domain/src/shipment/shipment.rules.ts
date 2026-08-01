// ============================================================
// Shipment Business Rules
// ============================================================

import type { CargoType, TransportMode, ShipmentPriority } from '@logicore/shared';
import { Result } from '../common/result';

/**
 * Business rules for shipment validation.
 * These are pure functions — no side effects, no dependencies.
 * Both frontend (for immediate feedback) and backend (for enforcement)
 * consume these same rules.
 */

/** Maximum weight limits by transport mode (kg) */
const MAX_WEIGHT_BY_MODE: Record<TransportMode, number> = {
  road: 25_000,
  sea: 50_000,
  air: 5_000,
  multimodal: 50_000,
  rail: 40_000,
};

/** Restricted cargo types by transport mode */
const RESTRICTED_CARGO: Partial<Record<TransportMode, CargoType[]>> = {
  air: ['hazardous', 'liquid', 'live_animal'] as CargoType[],
};

/** SLA delivery windows by priority (in hours) */
export const DELIVERY_SLA_HOURS: Record<ShipmentPriority, number> = {
  same_day: 12,
  overnight: 24,
  express: 48,
  priority: 72,
  standard: 168,
};

/** Validate weight against transport mode limits */
export function validateWeightForMode(
  weightKg: number,
  mode: TransportMode,
): Result<void> {
  const maxWeight = MAX_WEIGHT_BY_MODE[mode];
  if (maxWeight === undefined) {
    return Result.fail(`Unknown transport mode: ${mode}`);
  }
  if (weightKg > maxWeight) {
    return Result.fail(
      `Weight ${weightKg}kg exceeds ${mode} mode maximum of ${maxWeight}kg.`,
    );
  }
  return Result.ok(undefined);
}

/** Validate cargo type is allowed for transport mode */
export function validateCargoForMode(
  cargoType: CargoType,
  mode: TransportMode,
): Result<void> {
  const restricted = RESTRICTED_CARGO[mode];
  if (restricted?.includes(cargoType)) {
    return Result.fail(
      `${cargoType} cargo is not permitted for ${mode} transport.`,
    );
  }
  return Result.ok(undefined);
}

/** Calculate billable weight (max of actual weight and volumetric weight) */
export function calculateBillableWeight(
  actualWeightKg: number,
  volumeCm3: number,
  mode: TransportMode,
): number {
  if (mode === ('air' as TransportMode)) {
    const volumetricWeight = volumeCm3 / 5000;
    return Math.max(actualWeightKg, volumetricWeight);
  }
  if (mode === ('sea' as TransportMode)) {
    const volumetricWeight = volumeCm3 / 1_000_000; // CBM
    return Math.max(actualWeightKg, volumetricWeight * 1000);
  }
  return actualWeightKg;
}

/** Estimate transit time between two Philippine regions (hours) */
export function estimateTransitHours(
  originIslandGroup: 'luzon' | 'visayas' | 'mindanao',
  destIslandGroup: 'luzon' | 'visayas' | 'mindanao',
  mode: TransportMode,
): number {
  const isSameIsland = originIslandGroup === destIslandGroup;

  if (mode === ('road' as TransportMode)) {
    return isSameIsland ? 12 : Infinity; // Can't drive between islands
  }

  if (mode === ('air' as TransportMode)) {
    return isSameIsland ? 4 : 6;
  }

  if (mode === ('sea' as TransportMode)) {
    if (isSameIsland) return 24;
    // Inter-island shipping typically takes 24-72 hours
    const isLuzonMindanao =
      (originIslandGroup === 'luzon' && destIslandGroup === 'mindanao') ||
      (originIslandGroup === 'mindanao' && destIslandGroup === 'luzon');
    return isLuzonMindanao ? 72 : 48;
  }

  // Multimodal — estimate based on sea + road
  return isSameIsland ? 18 : 60;
}
