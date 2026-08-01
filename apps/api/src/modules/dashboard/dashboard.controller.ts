// ============================================================
// Dashboard Controller
// ============================================================

import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { TenantId } from '../../core/auth/decorators/public.decorator';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  @ApiOperation({ summary: 'Get command center KPIs' })
  async getKPIs(@TenantId() tenantId: string) {
    const kpis = await this.dashboardService.getKPIs(tenantId);
    return {
      success: true,
      data: kpis,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get recent activity feed' })
  async getActivityFeed(
    @TenantId() tenantId: string,
    @Query('limit') limit?: number,
  ) {
    const feed = await this.dashboardService.getActivityFeed(
      tenantId,
      limit ?? 20,
    );
    return {
      success: true,
      data: feed,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('shipment-trend')
  @ApiOperation({ summary: 'Get shipment volume trend data for charts' })
  async getShipmentTrend(
    @TenantId() tenantId: string,
    @Query('days') days?: number,
  ) {
    const trend = await this.dashboardService.getShipmentTrend(
      tenantId,
      days ?? 30,
    );
    return {
      success: true,
      data: trend,
      timestamp: new Date().toISOString(),
    };
  }
}
