import dotenv from "dotenv";
dotenv.config();

export { z } from "zod";
export const JWT_SECRET= Bun.env.JWT_SECRET || "fallback_secret_for_development_only";
console.log(JWT_SECRET);
