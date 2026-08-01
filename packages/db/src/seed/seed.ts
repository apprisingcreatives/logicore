// ============================================================
// Logicore Multi-Tenant Seeder
// Generates realistic Philippine Logistics Enterprise Demo Data
// ============================================================

import 'dotenv/config';
import { createDbClient } from '../client';

import { tenants } from '../schema/tenants';
import { users } from '../schema/users';
import { shipments, trackingEvents } from '../schema/shipments';
import { vehicles, drivers } from '../schema/vehicles';
import { warehouses } from '../schema/warehouses';
import * as bcrypt from 'bcryptjs';


async function seed() {
  console.log('🌱 Starting Logicore Philippine Logistics Database Seeding...');
  const db = createDbClient();

  // 1. Seed Enterprise Tenant
  const [tenant] = await db
    .insert(tenants)
    .values({
      name: '2GO Group Express Logistics',
      slug: '2go-express',
      businessType: 'logistics_provider',
      tin_number: '102-495-881-000',
      bocAccreditationNumber: 'BOC-ACC-2026-9921',
      pezaRegistrationNumber: 'PEZA-RBE-08129',
      dtiFtebAccreditationNumber: 'DTI-NVOCC-5501',
      email: 'admin@logicore.com',
      phone: '+63285287000',
      address: { line1: '2GO Complex, Pascor Drive', city: 'Parañaque', province: 'NCR', country: 'PH', postalCode: '1704' },
      plan: 'enterprise',
    })
    .returning();

  if (!tenant) throw new Error('Failed to create tenant seed');

  console.log(`✅ Created Tenant: ${tenant.name} (${tenant.id})`);

  // 2. Seed Admin User
  const passwordHash = await bcrypt.hash('Password123!', 12);
  const [user] = await db
    .insert(users)
    .values({
      tenantId: tenant.id,
      email: 'admin@2go.ph',
      passwordHash,
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      role: 'owner',
      isActive: true,
      emailVerified: true,
    })
    .returning();

  console.log(`✅ Created Owner User: ${user?.email}`);

  // 3. Seed Vehicles
  const [vehicle] = await db
    .insert(vehicles)
    .values({
      tenantId: tenant.id,
      plateNumber: 'NCB-8812',
      type: 'heavy_truck',
      status: 'in_transit',
      make: 'Isuzu',
      model: 'Giga 10-Wheeler',
      year: 2024,
      fuelType: 'diesel',
      fuelCapacityLiters: 300,
      maxPayloadKg: 25000,
      currentLatitude: 14.5995,
      currentLongitude: 120.9842,
      odometerKm: 42150,
      isActive: true,
    })
    .returning();

  console.log(`✅ Created Vehicle: ${vehicle?.plateNumber}`);

  // 4. Seed Driver
  await db.insert(drivers).values({
    tenantId: tenant.id,
    assignedVehicleId: vehicle?.id,
    firstName: 'Arnel',
    lastName: 'Mendoza',
    licenseNumber: 'N01-14-998120',
    licenseExpiry: new Date('2028-12-31'),
    phone: '+639171234567',
    status: 'active',
  });

  console.log(`✅ Created Driver: Arnel Mendoza`);

  // 5. Seed Warehouses & Inventory
  const [warehouse] = await db
    .insert(warehouses)
    .values({
      tenantId: tenant.id,
      name: 'Manila North Harbor Logistics Hub',
      code: 'NCR-WH-01',
      type: 'bonded',
      address: { line1: 'Pier 4, North Harbor', city: 'Tondo, Manila', province: 'NCR', country: 'PH', postalCode: '1012' },
      totalAreaSqm: 12500,
      usableAreaSqm: 10000,
      maxCapacityKg: 500000,
      currentOccupancyPercent: 82,
      isPezaZone: true,
      bondedWarehouseLicense: 'CBW-LICENSE-881',
      isActive: true,
    })
    .returning();

  console.log(`✅ Created Warehouse: ${warehouse?.name}`);

  // 6. Seed Shipments & Tracking
  const [shipment] = await db
    .insert(shipments)
    .values({
      tenantId: tenant.id,
      trackingNumber: 'LC-2026-A3F7-K9M2',
      referenceNumber: 'PO-99120',
      status: 'in_transit',
      priority: 'express',
      mode: 'multimodal',
      origin: { line1: 'North Harbor', city: 'Manila', province: 'NCR', country: 'PH', postalCode: '1012' },
      destination: { line1: 'Mandaue Hub', city: 'Mandaue City', province: 'Cebu', country: 'PH', postalCode: '6014' },
      sender: { name: 'San Miguel Corp', phone: '+63286322000' },
      receiver: { name: 'Visayas Retail Depot', phone: '+63322308800' },
      packages: [{ description: 'Beverage Cases', weightKg: 1420, lengthCm: 120, widthCm: 100, heightCm: 160, quantity: 2, cargoType: 'general' }],
      totalWeightKg: 1420,
      createdByUserId: user?.id,
    })
    .returning();

  if (shipment) {
    await db.insert(trackingEvents).values({
      tenantId: tenant.id,
      shipmentId: shipment.id,
      status: 'in_transit',
      description: 'Vessel departed Manila North Harbor — En route to Port of Cebu',
      locationName: 'Manila Bay Departure Channel',
      latitude: 14.5800,
      longitude: 120.9500,
      performedByUserId: user?.id,
    });
  }

  console.log(`✅ Created Shipment: ${shipment?.trackingNumber}`);
  console.log('🎉 Database seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
