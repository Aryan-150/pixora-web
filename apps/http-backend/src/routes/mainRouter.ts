import { Router } from "express";
import { userRouter } from "./userRouter";
import { roomRouter } from "./roomRouter";

export const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/room", roomRouter);