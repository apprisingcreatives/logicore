import { Injectable, Logger } from '@nestjs/common';
import type { VehicleTelemetry } from '@logicore/shared';

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);

  processTelemetry(payload: VehicleTelemetry): { isAlert: boolean; alertReason?: string } {
    this.logger.log(`Received telemetry from device for vehicle ${payload.vehicleId}`);

    // Check cold chain breach alert
    if (payload.cargoTemp !== undefined && payload.cargoTemp > 8.0) {
      return {
        isAlert: true,
        alertReason: `Cold chain breach detected: Temperature ${payload.cargoTemp}°C exceeds threshold of 8°C`,
      };
    }

    // Check speeding alert
    if (payload.speed > 100.0) {
      return {
        isAlert: true,
        alertReason: `Speeding alert: Vehicle speed ${payload.speed} km/h exceeds 100 km/h limit`,
      };
    }

    return { isAlert: false };
  }
}
