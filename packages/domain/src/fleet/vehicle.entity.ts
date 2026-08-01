// ============================================================
// Vehicle Entity
// ============================================================

import { Entity } from '../common/entity.base';
import { Result } from '../common/result';
import type { VehicleStatus, VehicleType, FuelType } from '@logicore/shared';
import type { GeoCoordinate } from '@logicore/shared';

interface VehicleProps {
  readonly tenantId: string;
  readonly plateNumber: string;
  readonly type: VehicleType;
  status: VehicleStatus;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly fuelType: FuelType;
  readonly fuelCapacityLiters: number;
  readonly maxPayloadKg: number;
  currentLocation?: GeoCoordinate;
  odometerKm: number;
  assignedDriverId?: string;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  isActive: boolean;
}

export class VehicleEntity extends Entity<VehicleProps> {
  private constructor(id: string, props: VehicleProps) {
    super(id, props);
  }

  get tenantId(): string { return this.props.tenantId; }
  get plateNumber(): string { return this.props.plateNumber; }
  get type(): VehicleType { return this.props.type; }
  get status(): VehicleStatus { return this.props.status; }
  get make(): string { return this.props.make; }
  get model(): string { return this.props.model; }
  get maxPayloadKg(): number { return this.props.maxPayloadKg; }
  get currentLocation(): GeoCoordinate | undefined { return this.props.currentLocation; }
  get odometerKm(): number { return this.props.odometerKm; }
  get assignedDriverId(): string | undefined { return this.props.assignedDriverId; }
  get isActive(): boolean { return this.props.isActive; }
  get nextMaintenanceDate(): Date | undefined { return this.props.nextMaintenanceDate; }

  static create(params: {
    id: string;
    tenantId: string;
    plateNumber: string;
    type: VehicleType;
    make: string;
    model: string;
    year: number;
    fuelType: FuelType;
    fuelCapacityLiters: number;
    maxPayloadKg: number;
  }): Result<VehicleEntity> {
    if (params.year < 1990 || params.year > new Date().getFullYear() + 1) {
      return Result.fail(`Invalid vehicle year: ${params.year}`);
    }
    if (params.maxPayloadKg <= 0) {
      return Result.fail('Max payload must be positive.');
    }

    return Result.ok(
      new VehicleEntity(params.id, {
        ...params,
        status: 'available' as VehicleStatus,
        odometerKm: 0,
        isActive: true,
      }),
    );
  }

  /** Update vehicle location from telemetry */
  updateLocation(location: GeoCoordinate, odometerKm?: number): void {
    this.props.currentLocation = location;
    if (odometerKm !== undefined && odometerKm > this.props.odometerKm) {
      this.props.odometerKm = odometerKm;
    }
  }

  /** Check if vehicle needs maintenance */
  get needsMaintenance(): boolean {
    if (!this.props.nextMaintenanceDate) return false;
    return new Date() >= this.props.nextMaintenanceDate;
  }

  /** Check if vehicle can carry the given payload */
  canCarry(weightKg: number): boolean {
    return weightKg <= this.props.maxPayloadKg;
  }

  /** Assign a driver */
  assignDriver(driverId: string): Result<void> {
    if (!this.props.isActive) {
      return Result.fail('Cannot assign driver to inactive vehicle.');
    }
    if (this.props.status === ('maintenance' as VehicleStatus) ||
        this.props.status === ('out_of_service' as VehicleStatus)) {
      return Result.fail(`Cannot assign driver — vehicle is ${this.props.status}.`);
    }
    this.props.assignedDriverId = driverId;
    return Result.ok(undefined);
  }

  /** Change vehicle status */
  changeStatus(newStatus: VehicleStatus): void {
    this.props.status = newStatus;
  }

  /** Deactivate vehicle */
  deactivate(): void {
    this.props.isActive = false;
    this.props.status = 'out_of_service' as VehicleStatus;
  }
}
