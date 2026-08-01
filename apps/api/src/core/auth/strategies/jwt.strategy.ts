// ============================================================
// JWT Strategy — Passport.js JWT Validation
// ============================================================

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload } from '@logicore/shared';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'] ?? 'dev-secret-change-in-production',
    });
  }

  /**
   * Called by Passport after JWT signature verification.
   * The returned object is attached to request.user.
   */
  async validate(payload: JwtPayload) {
    try {
      return await this.authService.validateUser(payload);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
