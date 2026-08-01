// ============================================================
// Logicore API — Application Bootstrap
// ============================================================

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // ── Security ──────────────────────────────────────────────
  app.use(helmet());
  app.enableCors({
    origin: process.env['APP_URL'] ?? 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-Id'],
  });

  // ── Global Pipes ──────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ── API Prefix ────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ── Swagger / OpenAPI ─────────────────────────────────────
  if (process.env['NODE_ENV'] !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Logicore API')
      .setDescription(
        'AI-Powered Logistics Intelligence Platform — API Documentation',
      )
      .setVersion('1.0.0')
      .addBearerAuth()
      .addServer('http://localhost:4000', 'Local Development')
      .addTag('auth', 'Authentication & authorization')
      .addTag('dashboard', 'Command center KPIs & activity')
      .addTag('shipments', 'Transportation management')
      .addTag('fleet', 'Fleet & vehicle management')
      .addTag('warehouse', 'Warehouse & inventory management')
      .addTag('freight', 'Freight forwarding & customs')
      .addTag('ai', 'AI assistant & intelligence')
      .addTag('analytics', 'Reports & analytics')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, {
      customSiteTitle: 'Logicore API Docs',
      customfavIcon: '/favicon.ico',
    });
    logger.log('📚 Swagger docs available at /docs');
  }

  // ── Start Server ──────────────────────────────────────────
  const port = process.env['APP_PORT'] ?? 4000;
  await app.listen(port);
  logger.log(`🚀 Logicore API running on http://localhost:${port}`);
  logger.log(`📚 API docs at http://localhost:${port}/docs`);
}

bootstrap();
