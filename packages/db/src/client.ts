// ============================================================
// Drizzle Client Factory
// ============================================================

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Creates a Drizzle ORM client instance.
 *
 * WHY postgres.js over pg:
 * - 3-6x faster than node-pg in benchmarks
 * - Built-in connection pooling
 * - Tagged template literal queries (SQL injection safe by default)
 * - Native ESM support
 */
export function createDbClient(connectionString?: string) {
  const url =
    connectionString ??
    process.env['DATABASE_URL'] ??
    'postgresql://logicore:logicore_dev_2024@localhost:5432/logicore_dev';

  const queryClient = postgres(url, {
    max: Number(process.env['DATABASE_POOL_MAX'] ?? 10),
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false, // Required for connection poolers like PgBouncer
  });

  return drizzle(queryClient, { schema });
}

export type DbClient = ReturnType<typeof createDbClient>;
