import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import type { VehicleTelemetry } from '@logicore/shared';
import { TelemetryService } from './telemetry.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/ws/telemetry',
})
export class TelemetryGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(TelemetryGateway.name);

  constructor(private readonly telemetryService: TelemetryService) {}

  handleConnection(client: Socket) {
    this.logger.log(`WebSocket client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`WebSocket client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe_vehicle')
  handleSubscribeVehicle(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { vehicleId: string },
  ) {
    client.join(`vehicle:${data.vehicleId}`);
    this.logger.log(`Client ${client.id} subscribed to vehicle ${data.vehicleId}`);
    return { event: 'subscribed', vehicleId: data.vehicleId };
  }

  @SubscribeMessage('telemetry_update')
  handleTelemetryUpdate(@MessageBody() payload: VehicleTelemetry) {
    const analysis = this.telemetryService.processTelemetry(payload);

    // Broadcast position update to vehicle channel room
    this.server.to(`vehicle:${payload.vehicleId}`).emit('position_update', {
      ...payload,
      isAlert: analysis.isAlert,
      alertReason: analysis.alertReason,
    });

    // If critical alert, broadcast to global tenant emergency channel
    if (analysis.isAlert) {
      this.server.emit('critical_alert', {
        vehicleId: payload.vehicleId,
        reason: analysis.alertReason,
        timestamp: new Date(),
      });
    }

    return { success: true };
  }
}
