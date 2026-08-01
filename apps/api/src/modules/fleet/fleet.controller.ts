import { Controller, Get, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { TenantId } from '../../core/auth/decorators/public.decorator';
import { FleetService } from './fleet.service';

@ApiTags('fleet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('fleet')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  @Get('vehicles')
  @ApiOperation({ summary: 'List all vehicles for current tenant' })
  async getVehicles(@TenantId() tenantId: string) {
    const data = await this.fleetService.getVehicles(tenantId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get('vehicles/:id')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  async getVehicleById(@TenantId() tenantId: string, @Param('id', ParseUUIDPipe) id: string) {
    const data = await this.fleetService.getVehicleById(tenantId, id);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get('drivers')
  @ApiOperation({ summary: 'List drivers' })
  async getDrivers(@TenantId() tenantId: string) {
    const data = await this.fleetService.getDrivers(tenantId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }

  @Get('maintenance')
  @ApiOperation({ summary: 'Get maintenance logs' })
  async getMaintenance(@TenantId() tenantId: string, @Query('vehicleId') vehicleId?: string) {
    const data = await this.fleetService.getMaintenanceRecords(tenantId, vehicleId);
    return { success: true, data, timestamp: new Date().toISOString() };
  }
}
