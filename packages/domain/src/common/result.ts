// ============================================================
// Result Monad — Functional Error Handling
// ============================================================
// Instead of throwing exceptions for business rule violations,
// we return Result<T, E>. This forces callers to handle both
// success and failure paths explicitly.
//
// WHY: Exceptions are for exceptional circumstances (network
// failures, OOM). Business rule violations are expected and
// should flow through the type system, not the exception system.
// ============================================================

export class Result<T, E = string> {
  private constructor(
    private readonly _isOk: boolean,
    private readonly _value?: T,
    private readonly _error?: E,
  ) {}

  /** Create a success result */
  static ok<T, E = string>(value: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  /** Create a failure result */
  static fail<T, E = string>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  /** Check if the result is a success */
  get isOk(): boolean {
    return this._isOk;
  }

  /** Check if the result is a failure */
  get isErr(): boolean {
    return !this._isOk;
  }

  /** Get the success value — throws if result is an error */
  get value(): T {
    if (!this._isOk) {
      throw new Error(
        `Cannot access value of an error Result. Error: ${String(this._error)}`,
      );
    }
    return this._value as T;
  }

  /** Get the error — throws if result is a success */
  get error(): E {
    if (this._isOk) {
      throw new Error('Cannot access error of a success Result.');
    }
    return this._error as E;
  }

  /** Transform the success value */
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this._isOk) {
      return Result.ok(fn(this._value as T));
    }
    return Result.fail(this._error as E);
  }

  /** Transform the error value */
  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    if (!this._isOk) {
      return Result.fail(fn(this._error as E));
    }
    return Result.ok(this._value as T);
  }

  /** Chain results (flatMap) */
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this._isOk) {
      return fn(this._value as T);
    }
    return Result.fail(this._error as E);
  }

  /** Get value or a default */
  unwrapOr(defaultValue: T): T {
    return this._isOk ? (this._value as T) : defaultValue;
  }

  /** Match on success or failure */
  match<U>(handlers: { ok: (value: T) => U; err: (error: E) => U }): U {
    return this._isOk
      ? handlers.ok(this._value as T)
      : handlers.err(this._error as E);
  }
}

/** Combine multiple Results — fails on first error */
export function combineResults<T, E = string>(
  results: Result<T, E>[],
): Result<T[], E> {
  const values: T[] = [];
  for (const result of results) {
    if (result.isErr) {
      return Result.fail(result.error);
    }
    values.push(result.value);
  }
  return Result.ok(values);
}
