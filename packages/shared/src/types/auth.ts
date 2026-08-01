// ============================================================
// Authentication & Authorization Types
// ============================================================

import type { TenantId, UserId } from './common';

/** User roles within a tenant organization */
export enum UserRole {
  /** Full platform access, billing, org management */
  OWNER = 'owner',
  /** Full operational access, user management */
  ADMIN = 'admin',
  /** Day-to-day operations: shipments, fleet, warehouse */
  OPERATIONS_MANAGER = 'operations_manager',
  /** Dispatching, route assignment, tracking */
  DISPATCHER = 'dispatcher',
  /** Warehouse operations: inbound, outbound, inventory */
  WAREHOUSE_STAFF = 'warehouse_staff',
  /** Customs documentation, compliance, freight bookings */
  CUSTOMS_BROKER = 'customs_broker',
  /** Field driver with limited mobile access */
  DRIVER = 'driver',
  /** Read-only access to dashboards and reports */
  VIEWER = 'viewer',
  /** External client portal access */
  CLIENT = 'client',
}

/** Granular permissions for RBAC */
export enum Permission {
  // Shipments
  SHIPMENT_CREATE = 'shipment:create',
  SHIPMENT_READ = 'shipment:read',
  SHIPMENT_UPDATE = 'shipment:update',
  SHIPMENT_DELETE = 'shipment:delete',
  SHIPMENT_ASSIGN = 'shipment:assign',

  // Fleet
  FLEET_CREATE = 'fleet:create',
  FLEET_READ = 'fleet:read',
  FLEET_UPDATE = 'fleet:update',
  FLEET_DELETE = 'fleet:delete',
  FLEET_TRACK = 'fleet:track',

  // Warehouse
  WAREHOUSE_CREATE = 'warehouse:create',
  WAREHOUSE_READ = 'warehouse:read',
  WAREHOUSE_UPDATE = 'warehouse:update',
  WAREHOUSE_MANAGE_INVENTORY = 'warehouse:manage_inventory',

  // Freight
  FREIGHT_CREATE = 'freight:create',
  FREIGHT_READ = 'freight:read',
  FREIGHT_UPDATE = 'freight:update',
  FREIGHT_CUSTOMS = 'freight:customs',

  // Analytics
  ANALYTICS_READ = 'analytics:read',
  ANALYTICS_EXPORT = 'analytics:export',

  // AI
  AI_CHAT = 'ai:chat',
  AI_FORECAST = 'ai:forecast',

  // Admin
  ADMIN_USERS = 'admin:users',
  ADMIN_SETTINGS = 'admin:settings',
  ADMIN_BILLING = 'admin:billing',
  ADMIN_AUDIT = 'admin:audit',
}

/** Maps roles to their default permissions */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.OWNER]: Object.values(Permission),
  [UserRole.ADMIN]: Object.values(Permission).filter(
    (p) => p !== Permission.ADMIN_BILLING,
  ),
  [UserRole.OPERATIONS_MANAGER]: [
    Permission.SHIPMENT_CREATE,
    Permission.SHIPMENT_READ,
    Permission.SHIPMENT_UPDATE,
    Permission.SHIPMENT_ASSIGN,
    Permission.FLEET_READ,
    Permission.FLEET_UPDATE,
    Permission.FLEET_TRACK,
    Permission.WAREHOUSE_READ,
    Permission.WAREHOUSE_UPDATE,
    Permission.WAREHOUSE_MANAGE_INVENTORY,
    Permission.FREIGHT_READ,
    Permission.FREIGHT_UPDATE,
    Permission.ANALYTICS_READ,
    Permission.ANALYTICS_EXPORT,
    Permission.AI_CHAT,
    Permission.AI_FORECAST,
  ],
  [UserRole.DISPATCHER]: [
    Permission.SHIPMENT_READ,
    Permission.SHIPMENT_UPDATE,
    Permission.SHIPMENT_ASSIGN,
    Permission.FLEET_READ,
    Permission.FLEET_TRACK,
    Permission.AI_CHAT,
  ],
  [UserRole.WAREHOUSE_STAFF]: [
    Permission.WAREHOUSE_READ,
    Permission.WAREHOUSE_UPDATE,
    Permission.WAREHOUSE_MANAGE_INVENTORY,
    Permission.SHIPMENT_READ,
  ],
  [UserRole.CUSTOMS_BROKER]: [
    Permission.FREIGHT_CREATE,
    Permission.FREIGHT_READ,
    Permission.FREIGHT_UPDATE,
    Permission.FREIGHT_CUSTOMS,
    Permission.SHIPMENT_READ,
    Permission.AI_CHAT,
  ],
  [UserRole.DRIVER]: [
    Permission.SHIPMENT_READ,
    Permission.SHIPMENT_UPDATE,
    Permission.FLEET_READ,
  ],
  [UserRole.VIEWER]: [
    Permission.SHIPMENT_READ,
    Permission.FLEET_READ,
    Permission.WAREHOUSE_READ,
    Permission.FREIGHT_READ,
    Permission.ANALYTICS_READ,
  ],
  [UserRole.CLIENT]: [
    Permission.SHIPMENT_READ,
    Permission.FREIGHT_READ,
  ],
};

/** JWT token payload */
export interface JwtPayload {
  readonly sub: UserId;
  readonly tenantId: TenantId;
  readonly email: string;
  readonly role: UserRole;
  readonly permissions: Permission[];
  readonly iat: number;
  readonly exp: number;
}

/** Login request */
export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

/** Login response */
export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
}

/** Authenticated user context — available throughout the request */
export interface AuthenticatedUser {
  readonly id: UserId;
  readonly tenantId: TenantId;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: UserRole;
  readonly permissions: Permission[];
}
