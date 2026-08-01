// ============================================================
// Common Types — Shared across all domains
// ============================================================

/** Branded type helper for nominal typing of IDs */
export type Brand<T, B extends string> = T & { readonly __brand: B };

/** UUID-based identifiers for each domain entity */
export type TenantId = Brand<string, 'TenantId'>;
export type UserId = Brand<string, 'UserId'>;
export type ShipmentId = Brand<string, 'ShipmentId'>;
export type VehicleId = Brand<string, 'VehicleId'>;
export type WarehouseId = Brand<string, 'WarehouseId'>;
export type InventoryItemId = Brand<string, 'InventoryItemId'>;
export type FreightBookingId = Brand<string, 'FreightBookingId'>;
export type DocumentId = Brand<string, 'DocumentId'>;
export type NotificationId = Brand<string, 'NotificationId'>;

/** Timestamp fields present on all entities */
export interface Timestamps {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}

/** Base entity shape shared by all domain entities */
export interface BaseEntity extends Timestamps {
  readonly id: string;
  readonly tenantId: TenantId;
}

/** Pagination request parameters */
export interface PaginationParams {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
}

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly meta: {
    readonly total: number;
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
    readonly hasNextPage: boolean;
    readonly hasPrevPage: boolean;
  };
}

/** Geographic coordinate pair */
export interface GeoCoordinate {
  readonly latitude: number;
  readonly longitude: number;
}

/** Address structure for Philippine logistics */
export interface Address {
  readonly line1: string;
  readonly line2?: string;
  readonly barangay?: string;
  readonly city: string;
  readonly province: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
  readonly coordinates?: GeoCoordinate;
}

/** Contact information */
export interface ContactInfo {
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly company?: string;
}

/** Weight with unit */
export interface Weight {
  readonly value: number;
  readonly unit: 'kg' | 'lbs' | 'mt';
}

/** Dimensions with unit */
export interface Dimensions {
  readonly length: number;
  readonly width: number;
  readonly height: number;
  readonly unit: 'cm' | 'in' | 'm';
}

/** Currency amount */
export interface Money {
  readonly amount: number;
  readonly currency: 'PHP' | 'USD' | 'EUR' | 'CNY' | 'JPY';
}

/** Date range filter */
export interface DateRange {
  readonly from: Date;
  readonly to: Date;
}
