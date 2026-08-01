// ============================================================
// Value Object Base — Immutable objects defined by their values
// ============================================================

/**
 * Value Objects are immutable and compared by their properties,
 * not by identity. Two Weights of 50kg are the same Weight.
 *
 * WHY: Value objects eliminate a huge class of bugs caused by
 * accidental mutation. A TrackingNumber should never change
 * after creation — if you need a different one, create a new one.
 */
export abstract class ValueObject<TProps> {
  protected readonly props: Readonly<TProps>;

  constructor(props: TProps) {
    this.props = Object.freeze(props);
  }

  /** Value objects are equal when all their properties are equal */
  equals(other: ValueObject<TProps>): boolean {
    if (other === null || other === undefined) return false;
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
