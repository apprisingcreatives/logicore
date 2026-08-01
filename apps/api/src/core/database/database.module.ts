// ============================================================
// Database Module & Provider
// ============================================================

import { Module } from '@nestjs/common';
import { createDbClient, type DbClient } from '@logicore/db';

export const DB_CLIENT = Symbol('DB_CLIENT');

const databaseProvider = {
  provide: DB_CLIENT,
  useFactory: (): DbClient => {
    return createDbClient(process.env['DATABASE_URL']);
  },
};

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
