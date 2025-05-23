import { z } from "zod";

export const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})