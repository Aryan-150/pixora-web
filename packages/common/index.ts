import dotenv from "dotenv";
dotenv.config();

export { z } from "zod";
export const JWT_SECRET= process.env.JWT_SECRET!;