import { readFileSync, existsSync } from 'fs';
import { neon } from '@neondatabase/serverless';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvFile() {
  const envPath = join(root, '.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const schemaPath = join(root, 'server/src/database/schema.sql');
const url = process.env.DATABASE_URL;

if (!url) {
  console.error('DATABASE_URL is not set. Add it to .env in the project root.');
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(schemaPath, 'utf8');

console.log('Applying database schema to Neon...');

try {
  await sql(schema);
  console.log('Database schema is ready.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes('already exists')) {
    console.log('Schema already applied (some objects exist). You can continue.');
    process.exit(0);
  }
  console.error(message);
  process.exit(1);
}
