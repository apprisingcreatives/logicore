// ============================================================
// Shipment Status Constants & Helpers
// ============================================================

import { ShipmentStatus } from '../types/shipment';

/** Human-readable labels for shipment statuses */
export const SHIPMENT_STATUS_LABELS: Record<ShipmentStatus, string> = {
  [ShipmentStatus.DRAFT]: 'Draft',
  [ShipmentStatus.CONFIRMED]: 'Confirmed',
  [ShipmentStatus.PICKED_UP]: 'Picked Up',
  [ShipmentStatus.AT_ORIGIN_HUB]: 'At Origin Hub',
  [ShipmentStatus.IN_TRANSIT]: 'In Transit',
  [ShipmentStatus.AT_TRANSFER_POINT]: 'At Transfer Point',
  [ShipmentStatus.AT_DESTINATION_HUB]: 'At Destination Hub',
  [ShipmentStatus.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ShipmentStatus.DELIVERED]: 'Delivered',
  [ShipmentStatus.DELIVERY_FAILED]: 'Delivery Failed',
  [ShipmentStatus.RETURNED]: 'Returned',
  [ShipmentStatus.CANCELLED]: 'Cancelled',
  [ShipmentStatus.CUSTOMS_HOLD]: 'Customs Hold',
  [ShipmentStatus.EXCEPTION]: 'Exception',
};

/** Color mappings for UI badges */
export const SHIPMENT_STATUS_COLORS: Record<ShipmentStatus, string> = {
  [ShipmentStatus.DRAFT]: 'slate',
  [ShipmentStatus.CONFIRMED]: 'blue',
  [ShipmentStatus.PICKED_UP]: 'indigo',
  [ShipmentStatus.AT_ORIGIN_HUB]: 'violet',
  [ShipmentStatus.IN_TRANSIT]: 'cyan',
  [ShipmentStatus.AT_TRANSFER_POINT]: 'teal',
  [ShipmentStatus.AT_DESTINATION_HUB]: 'emerald',
  [ShipmentStatus.OUT_FOR_DELIVERY]: 'amber',
  [ShipmentStatus.DELIVERED]: 'green',
  [ShipmentStatus.DELIVERY_FAILED]: 'red',
  [ShipmentStatus.RETURNED]: 'orange',
  [ShipmentStatus.CANCELLED]: 'gray',
  [ShipmentStatus.CUSTOMS_HOLD]: 'yellow',
  [ShipmentStatus.EXCEPTION]: 'rose',
};

/**
 * Valid status transitions — enforces the shipment lifecycle state machine.
 * A shipment can only move to statuses listed in its current status's array.
 */
export const VALID_STATUS_TRANSITIONS: Record<ShipmentStatus, ShipmentStatus[]> = {
  [ShipmentStatus.DRAFT]: [ShipmentStatus.CONFIRMED, ShipmentStatus.CANCELLED],
  [ShipmentStatus.CONFIRMED]: [
    ShipmentStatus.PICKED_UP,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.PICKED_UP]: [
    ShipmentStatus.AT_ORIGIN_HUB,
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.EXCEPTION,
  ],
  [ShipmentStatus.AT_ORIGIN_HUB]: [
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.EXCEPTION,
  ],
  [ShipmentStatus.IN_TRANSIT]: [
    ShipmentStatus.AT_TRANSFER_POINT,
    ShipmentStatus.AT_DESTINATION_HUB,
    ShipmentStatus.CUSTOMS_HOLD,
    ShipmentStatus.EXCEPTION,
  ],
  [ShipmentStatus.AT_TRANSFER_POINT]: [
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.EXCEPTION,
  ],
  [ShipmentStatus.AT_DESTINATION_HUB]: [
    ShipmentStatus.OUT_FOR_DELIVERY,
    ShipmentStatus.EXCEPTION,
  ],
  [ShipmentStatus.OUT_FOR_DELIVERY]: [
    ShipmentStatus.DELIVERED,
    ShipmentStatus.DELIVERY_FAILED,
    ShipmentStatus.EXCEPTION,
  ],
  [ShipmentStatus.DELIVERED]: [],
  [ShipmentStatus.DELIVERY_FAILED]: [
    ShipmentStatus.OUT_FOR_DELIVERY,
    ShipmentStatus.RETURNED,
    ShipmentStatus.AT_DESTINATION_HUB,
  ],
  [ShipmentStatus.RETURNED]: [],
  [ShipmentStatus.CANCELLED]: [],
  [ShipmentStatus.CUSTOMS_HOLD]: [
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.EXCEPTION,
  ],
  [ShipmentStatus.EXCEPTION]: [
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.AT_ORIGIN_HUB,
    ShipmentStatus.AT_DESTINATION_HUB,
    ShipmentStatus.CANCELLED,
    ShipmentStatus.RETURNED,
  ],
};

/** Check if a status transition is valid */
export function isValidStatusTransition(
  from: ShipmentStatus,
  to: ShipmentStatus,
): boolean {
  return VALID_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}
