import { z } from "zod";

const usernameSchema = z.string()
  .min(5, 'username must be at least 5 characters')
  .max(50, 'username must be less than 50 characters')
  .trim()

const emailSchema = z.email().toLowerCase().trim()

const passwordSchema = z.string()
  .min(8, 'password must be at least 8 characters')
  .max(200, 'password must be less than 200 characters')
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "Password must contain at least one number, one uppercase, and one lowercase letter",
  )
  .trim()

export const signupSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema
})

export const signinSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})