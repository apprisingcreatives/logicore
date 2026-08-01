// ============================================================
// Shipments Service — TMS Business Logic
// ============================================================

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and, desc, sql, count, like, inArray } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { DB_CLIENT } from '../../core/database/database.module';
import {
  type DbClient,
  shipments,
  trackingEvents,
  type NewShipmentRow,
  type NewTrackingEventRow,
} from '@logicore/db';
import { ShipmentAggregate } from '@logicore/domain';
import type {
  CreateShipmentRequest,
  PaginatedResponse,
  PaginationParams,
  ShipmentFilters,
  ShipmentRow,
} from '@logicore/shared';

@Injectable()
export class ShipmentsService {
  constructor(@Inject(DB_CLIENT) private readonly db: DbClient) {}

  /**
   * Create a new shipment using the domain aggregate for validation.
   */
  async createShipment(
    tenantId: string,
    userId: string,
    request: CreateShipmentRequest,
  ) {
    const id = uuidv4();

    // Use domain aggregate for business rule validation
    const result = ShipmentAggregate.create({
      id,
      tenantId,
      priority: request.priority,
      mode: request.mode,
      origin: request.origin,
      destination: request.destination,
      sender: request.sender,
      receiver: request.receiver,
      packages: request.packages.map((pkg) => ({
        ...pkg,
        weightKg: pkg.weight?.value ?? 0,
        lengthCm: pkg.dimensions?.length ?? 0,
        widthCm: pkg.dimensions?.width ?? 0,
        heightCm: pkg.dimensions?.height ?? 0,
        quantity: pkg.quantity,
        cargoType: pkg.cargoType,
        declaredValuePhp: pkg.declaredValue?.amount,
      })),
      specialInstructions: request.specialInstructions,
    });

    if (result.isErr) {
      throw new Error(result.error);
    }

    const aggregate = result.value;

    // Persist to database
    const [shipment] = await this.db
      .insert(shipments)
      .values({
        id,
        tenantId,
        trackingNumber: aggregate.trackingNumber,
        status: aggregate.status,
        priority: aggregate.priority,
        mode: aggregate.mode,
        origin: aggregate.origin,
        destination: aggregate.destination,
        sender: aggregate.sender,
        receiver: aggregate.receiver,
        packages: aggregate.packages,
        totalWeightKg: aggregate.totalWeight.valueKg,
        specialInstructions: request.specialInstructions,
        createdByUserId: userId,
      } satisfies NewShipmentRow)
      .returning();

    // Create initial tracking event
    await this.db.insert(trackingEvents).values({
      tenantId,
      shipmentId: id,
      status: 'draft',
      description: 'Shipment created',
      performedByUserId: userId,
    } satisfies NewTrackingEventRow);

    return shipment;
  }

  /**
   * Get paginated shipments for a tenant with filters.
   */
  async getShipments(
    tenantId: string,
    pagination: PaginationParams,
    filters?: ShipmentFilters,
  ): Promise<PaginatedResponse<ShipmentRow>> {
    const conditions = [eq(shipments.tenantId, tenantId)];

    // Apply filters
    if (filters?.status && filters.status.length > 0) {
      conditions.push(inArray(shipments.status, filters.status));
    }
    if (filters?.mode && filters.mode.length > 0) {
      conditions.push(inArray(shipments.mode, filters.mode));
    }
    if (filters?.search) {
      conditions.push(
        like(shipments.trackingNumber, `%${filters.search}%`),
      );
    }

    const whereClause = and(...conditions);

    // Get total count
    const [{ total }] = await this.db
      .select({ total: count() })
      .from(shipments)
      .where(whereClause);

    // Get paginated data
    const offset = (pagination.page - 1) * pagination.limit;
    const data = await this.db
      .select()
      .from(shipments)
      .where(whereClause)
      .orderBy(desc(shipments.createdAt))
      .limit(pagination.limit)
      .offset(offset);

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      data,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages,
        hasNextPage: pagination.page < totalPages,
        hasPrevPage: pagination.page > 1,
      },
    };
  }

  /**
   * Get a single shipment by ID with tracking events.
   */
  async getShipmentById(tenantId: string, shipmentId: string) {
    const [shipment] = await this.db
      .select()
      .from(shipments)
      .where(
        and(eq(shipments.id, shipmentId), eq(shipments.tenantId, tenantId)),
      )
      .limit(1);

    if (!shipment) {
      throw new NotFoundException(`Shipment ${shipmentId} not found`);
    }

    // Get tracking events
    const events = await this.db
      .select()
      .from(trackingEvents)
      .where(eq(trackingEvents.shipmentId, shipmentId))
      .orderBy(desc(trackingEvents.timestamp));

    return { ...shipment, trackingEvents: events };
  }

  /**
   * Update shipment status with tracking event.
   */
  async updateStatus(
    tenantId: string,
    shipmentId: string,
    newStatus: string,
    userId: string,
    description: string,
    locationName?: string,
  ) {
    const [shipment] = await this.db
      .select()
      .from(shipments)
      .where(
        and(eq(shipments.id, shipmentId), eq(shipments.tenantId, tenantId)),
      )
      .limit(1);

    if (!shipment) {
      throw new NotFoundException(`Shipment ${shipmentId} not found`);
    }

    // Update shipment status
    const updateData: Record<string, unknown> = {
      status: newStatus,
      updatedAt: new Date(),
    };

    if (newStatus === 'delivered') {
      updateData['actualDelivery'] = new Date();
    }

    await this.db
      .update(shipments)
      .set(updateData)
      .where(eq(shipments.id, shipmentId));

    // Create tracking event
    await this.db.insert(trackingEvents).values({
      tenantId,
      shipmentId,
      status: newStatus,
      description,
      locationName,
      performedByUserId: userId,
    });

    return { ...shipment, status: newStatus };
  }
}
