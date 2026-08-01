import { describe, it, expect } from 'vitest';
import { ShipmentAggregate, TrackingNumber, ShipmentWeight } from '../src';
import { TransportMode, ShipmentPriority } from '@logicore/shared';

describe('ShipmentAggregate (Domain Unit Tests)', () => {
  it('should generate a valid tracking number starting with LC-', () => {
    const tracking = TrackingNumber.generate();
    expect(tracking.value).toMatch(/^LC-\d{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  });

  it('should reject invalid status transitions (delivered -> in_transit)', () => {
    const shipmentResult = ShipmentAggregate.create({
      id: 'shipment-101',
      tenantId: 'tenant-001',
      priority: ShipmentPriority.STANDARD,
      mode: TransportMode.ROAD,
      origin: { line1: 'Hub A', city: 'Manila', province: 'NCR', country: 'PH', postalCode: '1000' },
      destination: { line1: 'Hub B', city: 'Cebu', province: 'Cebu', country: 'PH', postalCode: '6000' },
      sender: { name: 'Sender Inc', phone: '+639170000000' },
      receiver: { name: 'Receiver Inc', phone: '+639180000000' },
      packages: [{ description: 'Box', weightKg: 10, lengthCm: 20, widthCm: 20, heightCm: 20, quantity: 1, cargoType: 'general' as any }],
    });

    expect(shipmentResult.isOk).toBe(true);
    const shipment = shipmentResult.value;

    // Transition to delivered
    shipment.changeStatus('confirmed' as any, 'user-1');
    shipment.changeStatus('picked_up' as any, 'user-1');
    shipment.changeStatus('in_transit' as any, 'user-1');
    shipment.changeStatus('out_for_delivery' as any, 'user-1');
    shipment.changeStatus('delivered' as any, 'user-1');

    // Attempt invalid transition back to in_transit
    const invalidResult = shipment.changeStatus('in_transit' as any, 'user-1');
    expect(invalidResult.isErr).toBe(true);
    expect(invalidResult.error).toContain('Cannot transition from delivered to in_transit');
  });
});
