// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  HOST_PORT: z.string().min(4),
  NODE_ENV: z.enum(["development", "test", "production"]),
  CLERK_SECRET_KEY: z.string().min(1),
  EMAIL_USER_ADDRESS: z.string().email().min(1),
  EMAIL_CLIENT_ID: z.string().min(1),
  EMAIL_CLIENT_SECRET: z.string().min(1),
  EMAIL_REFRESH_TOKEN: z.string().min(1),
  EMAIL_ACCESS_TOKEN: z.string().min(1),

});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  HOST_PORT: process.env.HOST_PORT,
  NODE_ENV: process.env.NODE_ENV,

  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

  EMAIL_USER_ADDRESS: process.env.EMAIL_USER_ADDRESS,
  EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,
  EMAIL_ACCESS_TOKEN: process.env.EMAIL_ACCESS_TOKEN,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
};
