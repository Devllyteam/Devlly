import { z } from "zod"

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
})

export type UserSchema = z.infer<typeof userSchema>

