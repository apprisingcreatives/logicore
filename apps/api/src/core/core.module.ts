// ============================================================
// Core Module — Cross-cutting Infrastructure
// ============================================================

import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

/**
 * Core module provides infrastructure services available globally.
 * Using @Global() means other modules don't need to explicitly import CoreModule.
 *
 * WHY Global:
 * - Database connections, cache, and logging are needed by every feature module
 * - Avoids repetitive import declarations across 10+ modules
 * - Only infrastructure services are global — business services are NOT
 */
@Global()
@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule],
})
export class CoreModule {}
