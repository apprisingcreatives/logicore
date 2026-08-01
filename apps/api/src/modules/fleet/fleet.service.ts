import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DB_CLIENT } from '../../core/database/database.module';
import { type DbClient, vehicles, drivers, maintenanceRecords } from '@logicore/db';

@Injectable()
export class FleetService {
  constructor(@Inject(DB_CLIENT) private readonly db: DbClient) {}

  async getVehicles(tenantId: string) {
    return this.db.select().from(vehicles).where(eq(vehicles.tenantId, tenantId));
  }

  async getVehicleById(tenantId: string, id: string) {
    const [row] = await this.db
      .select()
      .from(vehicles)
      .where(and(eq(vehicles.id, id), eq(vehicles.tenantId, tenantId)))
      .limit(1);

    if (!row) throw new NotFoundException(`Vehicle ${id} not found`);
    return row;
  }

  async getDrivers(tenantId: string) {
    return this.db.select().from(drivers).where(eq(drivers.tenantId, tenantId));
  }

  async getMaintenanceRecords(tenantId: string, vehicleId?: string) {
    const conditions = [eq(maintenanceRecords.tenantId, tenantId)];
    if (vehicleId) conditions.push(eq(maintenanceRecords.vehicleId, vehicleId));

    return this.db.select().from(maintenanceRecords).where(and(...conditions));
  }
}
