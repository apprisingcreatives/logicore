import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] ?? 'postgresql://logicore:logicore_dev_2024@localhost:5432/logicore_dev',
  },
  verbose: true,
  strict: true,
});
