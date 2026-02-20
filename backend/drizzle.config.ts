import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/db/schemas',
  casing: 'snake_case',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_CONNECTION!,
  },
});