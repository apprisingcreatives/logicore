// ============================================================
// Shipment Value Objects
// ============================================================

import { ValueObject } from '../common/value-object.base';
import { Result } from '../common/result';

// ── Tracking Number ─────────────────────────────────────────

interface TrackingNumberProps {
  readonly value: string;
}

/**
 * A unique, immutable identifier for a shipment.
 * Format: LC-YYYY-XXXX-XXXX (e.g., LC-2026-A3F7-K9M2)
 */
export class TrackingNumber extends ValueObject<TrackingNumberProps> {
  private static readonly PATTERN = /^LC-\d{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

  private constructor(props: TrackingNumberProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  /** Create a validated TrackingNumber */
  static create(value: string): Result<TrackingNumber> {
    const normalized = value.toUpperCase().trim();
    if (!TrackingNumber.PATTERN.test(normalized)) {
      return Result.fail(
        `Invalid tracking number format: "${value}". Expected: LC-YYYY-XXXX-XXXX`,
      );
    }
    return Result.ok(new TrackingNumber({ value: normalized }));
  }

  /** Generate a new unique tracking number */
  static generate(): TrackingNumber {
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No O/0/1/I confusion
    const segment = (len: number): string =>
      Array.from({ length: len }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join('');

    return new TrackingNumber({
      value: `LC-${year}-${segment(4)}-${segment(4)}`,
    });
  }

  override toString(): string {
    return this.props.value;
  }
}

// ── Shipment Weight ─────────────────────────────────────────

interface ShipmentWeightProps {
  readonly valueKg: number;
}

/**
 * Shipment weight in kilograms.
 * Invariants: Must be positive, max 50,000 kg (for container shipments).
 */
export class ShipmentWeight extends ValueObject<ShipmentWeightProps> {
  private static readonly MAX_KG = 50_000;

  private constructor(props: ShipmentWeightProps) {
    super(props);
  }

  get valueKg(): number {
    return this.props.valueKg;
  }

  get valueLbs(): number {
    return this.props.valueKg * 2.20462;
  }

  get valueMt(): number {
    return this.props.valueKg / 1000;
  }

  static create(valueKg: number): Result<ShipmentWeight> {
    if (valueKg <= 0) {
      return Result.fail('Weight must be positive.');
    }
    if (valueKg > ShipmentWeight.MAX_KG) {
      return Result.fail(
        `Weight ${valueKg}kg exceeds maximum of ${ShipmentWeight.MAX_KG}kg.`,
      );
    }
    return Result.ok(new ShipmentWeight({ valueKg }));
  }

  /** Add two weights */
  add(other: ShipmentWeight): ShipmentWeight {
    return new ShipmentWeight({ valueKg: this.valueKg + other.valueKg });
  }

  override toString(): string {
    return `${this.valueKg.toFixed(2)} kg`;
  }
}

// ── Shipment Dimensions ─────────────────────────────────────

interface DimensionsProps {
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
}

/**
 * Package dimensions in centimeters.
 * Provides volumetric weight calculation for air freight.
 */
export class ShipmentDimensions extends ValueObject<DimensionsProps> {
  private constructor(props: DimensionsProps) {
    super(props);
  }

  get lengthCm(): number {
    return this.props.lengthCm;
  }

  get widthCm(): number {
    return this.props.widthCm;
  }

  get heightCm(): number {
    return this.props.heightCm;
  }

  /** Volume in cubic centimeters */
  get volumeCm3(): number {
    return this.props.lengthCm * this.props.widthCm * this.props.heightCm;
  }

  /** Volume in cubic meters */
  get volumeM3(): number {
    return this.volumeCm3 / 1_000_000;
  }

  /**
   * Volumetric weight for air freight billing.
   * Standard divisor: 5000 (IATA) or 6000 (some carriers).
   */
  volumetricWeightKg(divisor: 5000 | 6000 = 5000): number {
    return this.volumeCm3 / divisor;
  }

  static create(
    lengthCm: number,
    widthCm: number,
    heightCm: number,
  ): Result<ShipmentDimensions> {
    if (lengthCm <= 0 || widthCm <= 0 || heightCm <= 0) {
      return Result.fail('All dimensions must be positive.');
    }
    if (lengthCm > 1200 || widthCm > 240 || heightCm > 270) {
      return Result.fail(
        'Dimensions exceed maximum container size (1200 x 240 x 270 cm).',
      );
    }
    return Result.ok(new ShipmentDimensions({ lengthCm, widthCm, heightCm }));
  }

  override toString(): string {
    return `${this.lengthCm} x ${this.widthCm} x ${this.heightCm} cm`;
  }
}
