import dotenv from "dotenv"
import { z } from "zod";


dotenv.config()

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().default("4000"),
  JWT_SECRET: z.string().min(8),
  PGHOST: z.string(),
  PGPORT: z.string().default("5432"),
  PGUSER: z.string(),
  PGPASSWORD: z.string(),
  PGDATABASE: z.string(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().optional()
});


const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid env", parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;