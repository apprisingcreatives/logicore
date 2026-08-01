// ============================================================
// API Response Types
// ============================================================

/** Standard API success response wrapper */
export interface ApiResponse<T = unknown> {
  readonly success: true;
  readonly data: T;
  readonly meta?: Record<string, unknown>;
  readonly timestamp: string;
}

/** Standard API error response */
export interface ApiErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
    readonly validationErrors?: ValidationError[];
  };
  readonly timestamp: string;
}

/** Validation error detail */
export interface ValidationError {
  readonly field: string;
  readonly message: string;
  readonly value?: unknown;
}

/** Common API error codes */
export enum ApiErrorCode {
  // Authentication
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Resource
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  ALREADY_EXISTS = 'ALREADY_EXISTS',

  // Business logic
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  INSUFFICIENT_CAPACITY = 'INSUFFICIENT_CAPACITY',
  INVALID_STATUS_TRANSITION = 'INVALID_STATUS_TRANSITION',

  // System
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMITED = 'RATE_LIMITED',
}
