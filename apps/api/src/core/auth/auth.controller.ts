// ============================================================
// Auth Controller — Login & Registration Endpoints
// ============================================================

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { AuthService } from './auth.service';

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  orgName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  businessType!: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and return JWT tokens' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto) {
    const tokens = await this.authService.login(dto.email, dto.password);
    return {
      success: true,
      data: tokens,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new organization and owner user' })
  @ApiResponse({ status: 201, description: 'Registration successful' })
  @ApiResponse({ status: 401, description: 'Email already registered' })
  async register(@Body() dto: RegisterDto) {
    const tokens = await this.authService.register({
      orgName: dto.orgName,
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      businessType: dto.businessType,
    });
    return {
      success: true,
      data: tokens,
      timestamp: new Date().toISOString(),
    };
  }
}
