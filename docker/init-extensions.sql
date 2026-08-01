-- ============================================================
-- Logicore — PostgreSQL Extension Initialization
-- ============================================================
-- This script runs once when the container is first created.
-- It enables extensions needed by the application.
-- ============================================================

-- Enable pgvector for AI embedding similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable uuid-ossp for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_trgm for fuzzy text search (tracking numbers, names)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Enable btree_gist for exclusion constraints (warehouse zone scheduling)
CREATE EXTENSION IF NOT EXISTS btree_gist;
