import { z } from "zod"
import dotenv from "dotenv"

dotenv.config({ path: '.env.local' });

const envSchema = z.object({
    DATABASE_URL: z.string().nonempty(),
    FOOTBALL_DATA_ORG_API_KEY: z.string().nonempty(),
    GOOGLE_CLIENT_SECRET: z.string().nonempty(),
    NEXTAUTH_URL: z.string().nonempty(),
    NEXTAUTH_SECRET: z.string().nonempty(),
})

export const env = envSchema.parse(process.env)
