// ============================================================
// Validation Utilities
// ============================================================

/** Validate a Philippine phone number (09XX or +639XX format) */
export function isValidPhilippinePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^(\+?63|0)9\d{9}$/.test(cleaned);
}

/** Normalize a Philippine phone number to +63 format */
export function normalizePhilippinePhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('0')) {
    return `+63${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith('63')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('+63')) {
    return cleaned;
  }
  return phone;
}

/** Validate a Philippine TIN (Tax Identification Number) */
export function isValidTin(tin: string): boolean {
  const cleaned = tin.replace(/[\s\-]/g, '');
  return /^\d{9,12}$/.test(cleaned);
}

/** Validate a Philippine postal code */
export function isValidPostalCode(code: string): boolean {
  return /^\d{4}$/.test(code);
}

/** Validate an email address */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate a plate number (Philippine format: XXX-1234 or various formats) */
export function isValidPlateNumber(plate: string): boolean {
  const cleaned = plate.replace(/[\s\-]/g, '').toUpperCase();
  // Philippine plate formats: 3 letters + 4 digits, or 3 letters + 2 digits + 2 digits
  return /^[A-Z]{2,3}\d{3,4}$/.test(cleaned) || /^[A-Z]{3}\d{2}\d{2}$/.test(cleaned);
}

/** Validate a container number (ISO 6346) */
export function isValidContainerNumber(container: string): boolean {
  const cleaned = container.replace(/[\s\-]/g, '').toUpperCase();
  return /^[A-Z]{4}\d{7}$/.test(cleaned);
}

/** Validate HS Code format (at least 6 digits) */
export function isValidHsCode(code: string): boolean {
  const cleaned = code.replace(/[\s.\-]/g, '');
  return /^\d{6,10}$/.test(cleaned);
}

/** Validate that a string is not empty after trimming */
export function isNotEmpty(value: string | undefined | null): value is string {
  return value !== undefined && value !== null && value.trim().length > 0;
}

/** Validate that a number is positive */
export function isPositive(value: number): boolean {
  return value > 0;
}

/** Validate coordinate ranges */
export function isValidLatitude(lat: number): boolean {
  return lat >= -90 && lat <= 90;
}

export function isValidLongitude(lng: number): boolean {
  return lng >= -180 && lng <= 180;
}

/** Check if coordinates are within the Philippine bounding box */
export function isWithinPhilippines(lat: number, lng: number): boolean {
  return lat >= 4.5 && lat <= 21.2 && lng >= 116.0 && lng <= 127.0;
}
