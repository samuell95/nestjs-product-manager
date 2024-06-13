import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_URL_TEST: z.string().url().optional(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_EXPIRE: z.coerce.string(),
})

export type Env = z.infer<typeof envSchema>
