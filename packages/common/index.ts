import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = Bun.env.JWT_SECRET || "fallback_secret_for_development_only";
console.log(JWT_SECRET);
