import { Router } from "express";
import userMiddleware from "../middlewares/userMiddleware";
import { RoomSchema } from "@repo/common/roomschema";
import { prisma } from "@repo/database/client";

export const roomRouter: Router = Router();

roomRouter.get("/chats/:roomId", userMiddleware, async(req,res) => {
  try {
    const roomId = req.params.roomId;
    // extract the old messages:
    const messages = await prisma.stroke.findMany({
      where: {
        roomId: roomId
      },
      orderBy: {
        sequenceNo: "desc"
      },
      take: 50
    })

    res.json({
      messages: messages
    })

  } catch (error: any) {
    res.status(411).json({
      msg: error.toString(),
      messages: []
    });
  }
})

roomRouter.get("/:slug", userMiddleware, async(req, res) => {
  const { success, error } = RoomSchema.safeParse(req.params.slug);
  if(!success){
    res.status(411).json({
      msg: error.message
    });
    return;
  }

  try {
    const slug = req.params.slug;
    // extract the roomId considering slug as roomName:
    const roomId = await prisma.room.findUnique({
      where: {
        roomName: slug
      },
      select: {
        id: true
      }
    })

    res.json({
      roomId: roomId
    })
    
  } catch (error: any) {
    res.status(411).json({
      msg: error.toString()
    })
  }
})