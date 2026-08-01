import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { TenantId, CurrentUser } from '../../core/auth/decorators/public.decorator';
import { AiService } from './ai.service';
import type { AuthenticatedUser, AiChatRequest } from '@logicore/shared';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Interact with AI Logistics Intelligence Assistant' })
  async chat(
    @TenantId() tenantId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: AiChatRequest,
  ) {
    const response = await this.aiService.processChat(tenantId, user.id, body);
    return {
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    };
  }
}
