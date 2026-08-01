import { postgres } from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// Supabase PostgreSQL Connection String
const SUPABASE_DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-PROJECT].supabase.co:5432/postgres';

export const createSupabaseClient = () => {
  const client = postgres(SUPABASE_DATABASE_URL, {
    ssl: 'require',
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  return drizzle(client);
};
