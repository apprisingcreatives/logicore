// ============================================================
// Auth Service — Authentication Business Logic
// ============================================================

import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { eq, and } from 'drizzle-orm';
import { DB_CLIENT } from '../database/database.module';
import { type DbClient, users, tenants } from '@logicore/db';
import {
  type AuthTokens,
  type JwtPayload,
  ROLE_PERMISSIONS,
  type UserRole,
} from '@logicore/shared';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CLIENT) private readonly db: DbClient,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Authenticate a user with email and password.
   * Returns JWT access and refresh tokens.
   */
  async login(email: string, password: string): Promise<AuthTokens> {
    // Find user by email (across all tenants for login)
    const userRows = await this.db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.isActive, true)))
      .limit(1);

    const user = userRows[0];
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Get permissions for role
    const role = user.role as UserRole;
    const permissions = ROLE_PERMISSIONS[role] ?? [];

    // Generate tokens
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
      sub: user.id as JwtPayload['sub'],
      tenantId: user.tenantId as JwtPayload['tenantId'],
      email: user.email,
      role,
      permissions,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env['JWT_REFRESH_EXPIRATION'] ?? '7d',
    });

    // Update last login
    await this.db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    return {
      accessToken,
      refreshToken,
      expiresIn: 86400, // 24 hours in seconds
    };
  }

  /**
   * Register a new organization and its owner user.
   */
  async register(params: {
    orgName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    businessType: string;
  }): Promise<AuthTokens> {
    // Check if email already exists
    const existing = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, params.email))
      .limit(1);

    if (existing.length > 0) {
      throw new UnauthorizedException('Email already registered');
    }

    // Create tenant
    const slug = params.orgName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const [tenant] = await this.db
      .insert(tenants)
      .values({
        name: params.orgName,
        slug,
        email: params.email,
        businessType: params.businessType,
        plan: 'trial',
      })
      .returning();

    if (!tenant) {
      throw new Error('Failed to create tenant');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(params.password, 12);

    // Create owner user
    const [user] = await this.db
      .insert(users)
      .values({
        tenantId: tenant.id,
        email: params.email,
        passwordHash,
        firstName: params.firstName,
        lastName: params.lastName,
        role: 'owner',
        isActive: true,
        emailVerified: false,
      })
      .returning();

    if (!user) {
      throw new Error('Failed to create user');
    }

    // Auto-login after registration
    return this.login(params.email, params.password);
  }

  /**
   * Validate JWT payload and return user data.
   * Called by JwtStrategy on every authenticated request.
   */
  async validateUser(payload: JwtPayload) {
    const userRows = await this.db
      .select()
      .from(users)
      .where(
        and(
          eq(users.id, payload.sub),
          eq(users.tenantId, payload.tenantId),
          eq(users.isActive, true),
        ),
      )
      .limit(1);

    const user = userRows[0];
    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return {
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      permissions: payload.permissions,
    };
  }
}
