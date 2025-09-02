import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, '.env') });

export const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development_only";
export const HTTP_URL = process.env.HTTP_URL || "http://localhost:8080";
export const WS_URL = process.env.WS_URL || "http://localhost:8081";