// ============================================================
// Shipment Aggregate Root
// ============================================================

import { AggregateRoot } from '../common/entity.base';
import { Result } from '../common/result';
import type {
  ShipmentStatus,
  ShipmentPriority,
  TransportMode,
  CargoType,
  Address,
  ContactInfo,
} from '@logicore/shared';
import { isValidStatusTransition } from '@logicore/shared';
import { TrackingNumber, ShipmentWeight } from './shipment.value-objects';
import type {
  ShipmentCreatedEvent,
  ShipmentStatusChangedEvent,
  ShipmentDeliveredEvent,
} from '../common/domain-event';

// ── Shipment Properties ─────────────────────────────────────

interface ShipmentPackageProps {
  readonly id: string;
  readonly description: string;
  readonly weightKg: number;
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
  readonly quantity: number;
  readonly cargoType: CargoType;
  readonly declaredValuePhp?: number;
}

interface ShipmentProps {
  readonly tenantId: string;
  readonly trackingNumber: TrackingNumber;
  status: ShipmentStatus;
  readonly priority: ShipmentPriority;
  readonly mode: TransportMode;
  readonly origin: Address;
  readonly destination: Address;
  readonly sender: ContactInfo;
  readonly receiver: ContactInfo;
  readonly packages: ShipmentPackageProps[];
  readonly totalWeight: ShipmentWeight;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  specialInstructions?: string;
  assignedDriverId?: string;
  assignedVehicleId?: string;
  readonly createdAt: Date;
  updatedAt: Date;
}

// ── Shipment Aggregate ──────────────────────────────────────

/**
 * Shipment is the primary aggregate root for the TMS bounded context.
 * All mutations to shipment state must go through this entity, which
 * enforces business rules and emits domain events.
 */
export class ShipmentAggregate extends AggregateRoot<ShipmentProps> {
  private constructor(id: string, props: ShipmentProps) {
    super(id, props);
  }

  // ── Accessors ───────────────────────────────────────────

  get tenantId(): string {
    return this.props.tenantId;
  }

  get trackingNumber(): string {
    return this.props.trackingNumber.value;
  }

  get status(): ShipmentStatus {
    return this.props.status;
  }

  get priority(): ShipmentPriority {
    return this.props.priority;
  }

  get mode(): TransportMode {
    return this.props.mode;
  }

  get origin(): Address {
    return this.props.origin;
  }

  get destination(): Address {
    return this.props.destination;
  }

  get sender(): ContactInfo {
    return this.props.sender;
  }

  get receiver(): ContactInfo {
    return this.props.receiver;
  }

  get packages(): readonly ShipmentPackageProps[] {
    return this.props.packages;
  }

  get totalWeight(): ShipmentWeight {
    return this.props.totalWeight;
  }

  get estimatedDelivery(): Date | undefined {
    return this.props.estimatedDelivery;
  }

  get actualDelivery(): Date | undefined {
    return this.props.actualDelivery;
  }

  get assignedDriverId(): string | undefined {
    return this.props.assignedDriverId;
  }

  get assignedVehicleId(): string | undefined {
    return this.props.assignedVehicleId;
  }

  // ── Factory Method ──────────────────────────────────────

  /**
   * Create a new Shipment aggregate.
   * Validates all business rules before creation.
   */
  static create(params: {
    id: string;
    tenantId: string;
    priority: ShipmentPriority;
    mode: TransportMode;
    origin: Address;
    destination: Address;
    sender: ContactInfo;
    receiver: ContactInfo;
    packages: Omit<ShipmentPackageProps, 'id'>[];
    specialInstructions?: string;
  }): Result<ShipmentAggregate> {
    // Validate packages
    if (params.packages.length === 0) {
      return Result.fail('Shipment must have at least one package.');
    }

    // Calculate total weight
    const totalWeightKg = params.packages.reduce(
      (sum, pkg) => sum + pkg.weightKg * pkg.quantity,
      0,
    );
    const weightResult = ShipmentWeight.create(totalWeightKg);
    if (weightResult.isErr) {
      return Result.fail(weightResult.error);
    }

    // Generate tracking number
    const trackingNumber = TrackingNumber.generate();

    // Validate origin and destination are different
    if (
      params.origin.city === params.destination.city &&
      params.origin.province === params.destination.province &&
      params.origin.line1 === params.destination.line1
    ) {
      return Result.fail('Origin and destination cannot be the same address.');
    }

    // Add IDs to packages
    const packagesWithIds = params.packages.map((pkg, index) => ({
      ...pkg,
      id: `${params.id}-PKG-${String(index + 1).padStart(3, '0')}`,
    }));

    const now = new Date();
    const shipment = new ShipmentAggregate(params.id, {
      tenantId: params.tenantId,
      trackingNumber,
      status: 'draft' as ShipmentStatus,
      priority: params.priority,
      mode: params.mode,
      origin: params.origin,
      destination: params.destination,
      sender: params.sender,
      receiver: params.receiver,
      packages: packagesWithIds,
      totalWeight: weightResult.value,
      specialInstructions: params.specialInstructions,
      createdAt: now,
      updatedAt: now,
    });

    // Emit creation event
    shipment.addDomainEvent({
      eventType: 'shipment.created',
      aggregateId: params.id,
      occurredAt: now,
      payload: {
        trackingNumber: trackingNumber.value,
        tenantId: params.tenantId,
        mode: params.mode,
        originCity: params.origin.city,
        destinationCity: params.destination.city,
      },
    } satisfies ShipmentCreatedEvent);

    return Result.ok(shipment);
  }

  // ── Commands (State Mutations) ──────────────────────────

  /**
   * Transition the shipment to a new status.
   * Enforces the state machine — invalid transitions are rejected.
   */
  changeStatus(
    newStatus: ShipmentStatus,
    changedBy: string,
  ): Result<void> {
    if (this.props.status === newStatus) {
      return Result.fail(`Shipment is already in ${newStatus} status.`);
    }

    if (!isValidStatusTransition(this.props.status, newStatus)) {
      return Result.fail(
        `Cannot transition from ${this.props.status} to ${newStatus}.`,
      );
    }

    const previousStatus = this.props.status;
    this.props.status = newStatus;
    this.props.updatedAt = new Date();

    this.addDomainEvent({
      eventType: 'shipment.status_changed',
      aggregateId: this.id,
      occurredAt: new Date(),
      payload: {
        trackingNumber: this.trackingNumber,
        previousStatus,
        newStatus,
        changedBy,
      },
    } satisfies ShipmentStatusChangedEvent);

    // Handle delivered status
    if (newStatus === ('delivered' as ShipmentStatus)) {
      this.props.actualDelivery = new Date();
      this.addDomainEvent({
        eventType: 'shipment.delivered',
        aggregateId: this.id,
        occurredAt: new Date(),
        payload: {
          trackingNumber: this.trackingNumber,
          deliveredAt: this.props.actualDelivery,
          receivedBy: changedBy,
        },
      } satisfies ShipmentDeliveredEvent);
    }

    return Result.ok(undefined);
  }

  /** Assign a driver and vehicle to this shipment */
  assignDriver(driverId: string, vehicleId: string): Result<void> {
    if (this.props.status === ('delivered' as ShipmentStatus) ||
        this.props.status === ('cancelled' as ShipmentStatus)) {
      return Result.fail('Cannot assign driver to a completed shipment.');
    }

    this.props.assignedDriverId = driverId;
    this.props.assignedVehicleId = vehicleId;
    this.props.updatedAt = new Date();

    return Result.ok(undefined);
  }

  /** Update estimated delivery date */
  updateEstimatedDelivery(date: Date): Result<void> {
    if (date <= new Date()) {
      return Result.fail('Estimated delivery must be in the future.');
    }

    this.props.estimatedDelivery = date;
    this.props.updatedAt = new Date();

    return Result.ok(undefined);
  }

  /** Check if the shipment is delayed */
  get isDelayed(): boolean {
    if (!this.props.estimatedDelivery) return false;
    if (this.props.actualDelivery) {
      return this.props.actualDelivery > this.props.estimatedDelivery;
    }
    return (
      new Date() > this.props.estimatedDelivery &&
      this.props.status !== ('delivered' as ShipmentStatus)
    );
  }

  /** Check if the shipment requires customs clearance */
  get requiresCustoms(): boolean {
    // International or inter-island with bonded cargo
    return (
      this.props.origin.country !== this.props.destination.country ||
      this.props.mode === ('sea' as TransportMode) ||
      this.props.mode === ('air' as TransportMode)
    );
  }
}
