// ============================================================
// Shipments Controller
// ============================================================

import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { TenantId, CurrentUser } from '../../core/auth/decorators/public.decorator';
import { ShipmentsService } from './shipments.service';
import type { AuthenticatedUser } from '@logicore/shared';

@ApiTags('shipments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shipment' })
  async create(
    @TenantId() tenantId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: Record<string, unknown>,
  ) {
    const shipment = await this.shipmentsService.createShipment(
      tenantId,
      user.id,
      body as any,
    );
    return {
      success: true,
      data: shipment,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @ApiOperation({ summary: 'List shipments with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(
    @TenantId() tenantId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.shipmentsService.getShipments(
      tenantId,
      { page, limit },
      {
        status: status ? status.split(',') as any[] : undefined,
        search,
      },
    );
    return {
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shipment details with tracking events' })
  async findOne(
    @TenantId() tenantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const shipment = await this.shipmentsService.getShipmentById(tenantId, id);
    return {
      success: true,
      data: shipment,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update shipment status' })
  async updateStatus(
    @TenantId() tenantId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { status: string; description: string; locationName?: string },
  ) {
    const shipment = await this.shipmentsService.updateStatus(
      tenantId,
      id,
      body.status,
      user.id,
      body.description,
      body.locationName,
    );
    return {
      success: true,
      data: shipment,
      timestamp: new Date().toISOString(),
    };
  }
}
