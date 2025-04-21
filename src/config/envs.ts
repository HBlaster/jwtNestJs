import { z } from 'zod';
import 'dotenv/config';

export const envSchema = z
  .object({ PORT: z.string().min(1, 'PORT is required').transform(Number)
   })
  .passthrough();

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error(' X Config validation error:', envParsed.error.errors);
  throw new Error('Invalid environment variables');
}

export const envs = {
  port: envParsed.data.PORT
};
