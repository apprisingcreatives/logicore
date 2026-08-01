import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { FleetModule } from './modules/fleet/fleet.module';
import { TelemetryModule } from './modules/telemetry/telemetry.module';
import { AiModule } from './modules/ai/ai.module';
import { ComplianceModule } from './compliance/compliance.module';


@Module({
  imports: [
    CoreModule,
    AuthModule,
    DashboardModule,
    ShipmentsModule,
    FleetModule,
    TelemetryModule,
    AiModule,
    ComplianceModule,
  ],
})

export class AppModule {}
