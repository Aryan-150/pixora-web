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

roomRouter.get("/:roomName", userMiddleware, async(req, res) => {
  const { success, error } = RoomSchema.safeParse(req.params);
  if(!success){
    res.status(411).json({
      msg: error.message
    });
    return;
  }

  try {
    const roomName = req.params.roomName;
    // extract the roomId considering slug as roomName:
    const existRoom = await prisma.room.findUnique({
      where: {
        roomName: roomName
      }
    })
    if(!existRoom) throw new Error("room doesn't exists...!");
    const roomId = existRoom.id;
    res.json({
      roomId: roomId
    })
    
  } catch (error: any) {
    res.status(411).json({
      msg: error.message
    })
  }
})