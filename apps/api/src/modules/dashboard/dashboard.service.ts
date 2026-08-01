// ============================================================
// Dashboard Service — KPI Aggregation
// ============================================================

import { Injectable, Inject } from '@nestjs/common';
import { eq, and, gte, sql, count } from 'drizzle-orm';
import { DB_CLIENT } from '../../core/database/database.module';
import {
  type DbClient,
  shipments,
  vehicles,
  warehouses,
  trackingEvents,
} from '@logicore/db';
import type { DashboardKPIs, ActivityFeedItem, TimeSeriesDataPoint } from '@logicore/shared';

@Injectable()
export class DashboardService {
  constructor(@Inject(DB_CLIENT) private readonly db: DbClient) {}

  /**
   * Get KPIs for the command center dashboard.
   * Aggregates data across shipments, fleet, and warehouses for a tenant.
   */
  async getKPIs(tenantId: string): Promise<DashboardKPIs> {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Shipment stats
    const shipmentStats = await this.db
      .select({
        total: count(),
        inTransit: count(
          sql`CASE WHEN ${shipments.status} = 'in_transit' THEN 1 END`,
        ),
        delivered: count(
          sql`CASE WHEN ${shipments.status} = 'delivered' THEN 1 END`,
        ),
        delayed: count(
          sql`CASE WHEN ${shipments.estimatedDelivery} < NOW() AND ${shipments.status} NOT IN ('delivered', 'cancelled', 'returned') THEN 1 END`,
        ),
      })
      .from(shipments)
      .where(
        and(
          eq(shipments.tenantId, tenantId),
          gte(shipments.createdAt, thirtyDaysAgo),
        ),
      );

    const stats = shipmentStats[0] ?? {
      total: 0,
      inTransit: 0,
      delivered: 0,
      delayed: 0,
    };

    const onTimeRate =
      stats.total > 0
        ? ((stats.total - stats.delayed) / stats.total) * 100
        : 100;

    // Vehicle stats
    const vehicleStats = await this.db
      .select({
        total: count(),
        active: count(
          sql`CASE WHEN ${vehicles.status} IN ('in_transit', 'loading', 'unloading') THEN 1 END`,
        ),
        maintenanceDue: count(
          sql`CASE WHEN ${vehicles.nextMaintenanceDate} <= NOW() THEN 1 END`,
        ),
      })
      .from(vehicles)
      .where(
        and(eq(vehicles.tenantId, tenantId), eq(vehicles.isActive, true)),
      );

    const fleet = vehicleStats[0] ?? { total: 0, active: 0, maintenanceDue: 0 };
    const utilization =
      fleet.total > 0 ? (fleet.active / fleet.total) * 100 : 0;

    // Warehouse stats
    const warehouseStats = await this.db
      .select({
        total: count(),
        avgOccupancy: sql<number>`COALESCE(AVG(${warehouses.currentOccupancyPercent}), 0)`,
      })
      .from(warehouses)
      .where(
        and(
          eq(warehouses.tenantId, tenantId),
          eq(warehouses.isActive, true),
        ),
      );

    const wh = warehouseStats[0] ?? { total: 0, avgOccupancy: 0 };

    return {
      shipments: {
        total: stats.total,
        inTransit: stats.inTransit,
        delivered: stats.delivered,
        delayed: stats.delayed,
        onTimeRate: Math.round(onTimeRate * 10) / 10,
        trend: 5.2, // TODO: Calculate from historical comparison
      },
      fleet: {
        totalVehicles: fleet.total,
        activeVehicles: fleet.active,
        utilization: Math.round(utilization * 10) / 10,
        maintenanceDue: fleet.maintenanceDue,
        trend: 2.1,
      },
      warehouse: {
        totalWarehouses: wh.total,
        avgOccupancy: Math.round(wh.avgOccupancy * 10) / 10,
        itemsProcessedToday: 0, // TODO: Query inventory movements
        pendingInbound: 0,
        trend: -1.3,
      },
      revenue: {
        today: { amount: 0, currency: 'PHP' },
        thisWeek: { amount: 0, currency: 'PHP' },
        thisMonth: { amount: 0, currency: 'PHP' },
        trend: 8.5,
      },
    };
  }

  /**
   * Get recent activity feed for the dashboard.
   */
  async getActivityFeed(
    tenantId: string,
    limit = 20,
  ): Promise<ActivityFeedItem[]> {
    const events = await this.db
      .select({
        id: trackingEvents.id,
        status: trackingEvents.status,
        description: trackingEvents.description,
        locationName: trackingEvents.locationName,
        shipmentId: trackingEvents.shipmentId,
        timestamp: trackingEvents.timestamp,
      })
      .from(trackingEvents)
      .where(eq(trackingEvents.tenantId, tenantId))
      .orderBy(sql`${trackingEvents.timestamp} DESC`)
      .limit(limit);

    return events.map((event) => ({
      id: event.id,
      type: 'shipment' as const,
      action: event.status,
      description: event.description,
      entityId: event.shipmentId,
      entityType: 'shipment',
      timestamp: event.timestamp,
      severity: event.status === 'delivered'
        ? 'success' as const
        : event.status === 'exception'
          ? 'error' as const
          : 'info' as const,
    }));
  }

  /**
   * Get shipment volume trend data for charts.
   */
  async getShipmentTrend(
    tenantId: string,
    days = 30,
  ): Promise<TimeSeriesDataPoint[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const results = await this.db
      .select({
        date: sql<string>`DATE(${shipments.createdAt})`,
        value: count(),
      })
      .from(shipments)
      .where(
        and(
          eq(shipments.tenantId, tenantId),
          gte(shipments.createdAt, startDate),
        ),
      )
      .groupBy(sql`DATE(${shipments.createdAt})`)
      .orderBy(sql`DATE(${shipments.createdAt})`);

    return results.map((r) => ({
      date: r.date,
      value: r.value,
    }));
  }
}
