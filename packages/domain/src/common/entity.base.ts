// ============================================================
// Base Entity — All domain entities extend this
// ============================================================

/**
 * Base entity provides identity and equality semantics.
 * Two entities are equal if they have the same ID, regardless
 * of their other properties.
 *
 * WHY: In DDD, entities are defined by their identity, not
 * their attributes. A Shipment with id="S001" is the same
 * shipment even if its status changes.
 */
export abstract class Entity<TProps> {
  protected readonly _id: string;
  protected readonly props: TProps;

  constructor(id: string, props: TProps) {
    this._id = id;
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  /** Entities are equal by identity, not by value */
  equals(other: Entity<TProps>): boolean {
    if (other === null || other === undefined) return false;
    if (this === other) return true;
    return this._id === other._id;
  }
}

/**
 * Aggregate Root — an entity that is the entry point for a
 * cluster of related entities and value objects. All changes
 * to the aggregate must go through the root.
 *
 * WHY: Aggregates enforce consistency boundaries. You can't
 * modify a TrackingEvent directly — you must go through the
 * Shipment aggregate root, which validates business rules.
 */
export abstract class AggregateRoot<TProps> extends Entity<TProps> {
  private _domainEvents: DomainEvent[] = [];

  /** Record a domain event to be dispatched after persistence */
  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  /** Get all pending domain events */
  get domainEvents(): ReadonlyArray<DomainEvent> {
    return [...this._domainEvents];
  }

  /** Clear events after dispatch */
  clearEvents(): void {
    this._domainEvents = [];
  }
}

/** Domain event base interface */
export interface DomainEvent {
  readonly eventType: string;
  readonly aggregateId: string;
  readonly occurredAt: Date;
  readonly payload: Record<string, unknown>;
}
