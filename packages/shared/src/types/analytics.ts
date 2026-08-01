// ============================================================
// Analytics & Dashboard Types
// ============================================================

import type { Money } from './common';

/** Key performance indicators for the command center dashboard */
export interface DashboardKPIs {
  readonly shipments: {
    readonly total: number;
    readonly inTransit: number;
    readonly delivered: number;
    readonly delayed: number;
    readonly onTimeRate: number;
    readonly trend: number;
  };
  readonly fleet: {
    readonly totalVehicles: number;
    readonly activeVehicles: number;
    readonly utilization: number;
    readonly maintenanceDue: number;
    readonly trend: number;
  };
  readonly warehouse: {
    readonly totalWarehouses: number;
    readonly avgOccupancy: number;
    readonly itemsProcessedToday: number;
    readonly pendingInbound: number;
    readonly trend: number;
  };
  readonly revenue: {
    readonly today: Money;
    readonly thisWeek: Money;
    readonly thisMonth: Money;
    readonly trend: number;
  };
}

/** Data point for time-series charts */
export interface TimeSeriesDataPoint {
  readonly date: string;
  readonly value: number;
  readonly label?: string;
}

/** Shipment volume by region */
export interface RegionalVolume {
  readonly region: string;
  readonly regionCode: string;
  readonly volume: number;
  readonly percentage: number;
}

/** Activity feed item for dashboard */
export interface ActivityFeedItem {
  readonly id: string;
  readonly type: 'shipment' | 'fleet' | 'warehouse' | 'freight' | 'system' | 'ai';
  readonly action: string;
  readonly description: string;
  readonly entityId?: string;
  readonly entityType?: string;
  readonly performedBy?: string;
  readonly timestamp: Date;
  readonly severity?: 'info' | 'warning' | 'error' | 'success';
  readonly metadata?: Record<string, unknown>;
}

/** AI-generated insight */
export interface AiInsight {
  readonly id: string;
  readonly type: 'anomaly' | 'recommendation' | 'forecast' | 'alert';
  readonly title: string;
  readonly description: string;
  readonly confidence: number;
  readonly impact: 'low' | 'medium' | 'high' | 'critical';
  readonly actionable: boolean;
  readonly suggestedAction?: string;
  readonly relatedEntityIds?: string[];
  readonly createdAt: Date;
  readonly expiresAt?: Date;
  readonly acknowledged: boolean;
}
