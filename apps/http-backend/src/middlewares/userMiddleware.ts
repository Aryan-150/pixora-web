import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";
import { prisma } from "@repo/database/client";

export default async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  try {
    if(!token) throw new Error("token not found...!");
    
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    if(!decodedInfo || typeof(decodedInfo) === "string" || !decodedInfo.id) throw new Error("token verification failed ...!");

    const user = await prisma.user.findUnique({
      where: {
        id: decodedInfo.id
      }
    })

    if(!user) throw new Error("invalid token ...!");
    req.userId = user.id;
    next();

  } catch (error) {
    res.status(411).json({
      msg: error
    })
  }
  
}