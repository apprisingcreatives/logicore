// ============================================================
// Formatting Utilities
// ============================================================

import type { Money, Weight } from '../types/common';

/** Format a tracking number for display: LC-2024-XXXX-XXXX */
export function formatTrackingNumber(trackingNumber: string): string {
  return trackingNumber.toUpperCase();
}

/** Generate a tracking number with prefix */
export function generateTrackingNumber(prefix = 'LC'): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${year}-${random.slice(0, 4)}-${random.slice(4, 8)}`;
}

/** Format currency amount with Philippine Peso as default */
export function formatMoney(money: Money): string {
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: money.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(money.amount);
}

/** Format weight with unit */
export function formatWeight(weight: Weight): string {
  const formatter = new Intl.NumberFormat('en-PH', {
    maximumFractionDigits: 2,
  });
  return `${formatter.format(weight.value)} ${weight.unit}`;
}

/** Format a number as compact (1.2K, 3.5M, etc.) */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-PH', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/** Format a percentage */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format a date for display */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

/** Format a datetime for display */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Format relative time (e.g., "2 hours ago", "in 3 days") */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, 'second');
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, 'minute');
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
  if (Math.abs(diffDays) < 30) return rtf.format(diffDays, 'day');

  return formatDate(d);
}

/** Truncate a string with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}
