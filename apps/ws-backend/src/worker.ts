import { createClient } from "redis";
import { REDIS_ARG } from "@repo/common/redisArg";
import { prisma } from "@repo/database/client";
import { MessageCommand, type RedisInput } from "./types";

export async function main() {
  const client = createClient()
    .on("error", () => console.error("error while creating the redis-client...!"));

  try {
    await client.connect();
    console.log("Worker connected to Redis.");
    while (true) {
      try {
        const response = await client.brPop(REDIS_ARG, 0);
        if (!response) throw new Error("brpop await failed...!");

        const data: RedisInput = JSON.parse(response.element);
        console.log(data);

        switch (data.type) {
          case MessageCommand.joinRoom:
            try {
              await prisma.usersOnRooms.create({
                data: {
                  userId: data.userId,
                  roomId: data.roomId
                }
              })
              console.log("user gets placed in db...!");
              
            } catch (error: any) {
              console.error(error.message);
            }
            break;

          case MessageCommand.chat:
            if (!data.message) throw new Error("message not reaceived correctly...!");
            await prisma.stroke.create({
              data: {
                message: data.message,
                userId: data.userId,
                roomId: data.roomId
              }
            })
            console.log("msg propagated to db...!");
            break;

          case MessageCommand.leaveRoom:
            await prisma.usersOnRooms.delete({
              where: {
                userId_roomId: {
                  userId: data.userId,
                  roomId: data.roomId
                }
              }
            })
            console.log("user removed form the room in the db...!")
            break;

          default:
            console.log("default case")
            break;
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
}
