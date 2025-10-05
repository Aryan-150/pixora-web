import { createClient } from "redis";
import { REDIS_ARG } from "@repo/common/redisArg";
import { prisma, StrokeType } from "@repo/database/client";
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

        switch (data.type) {
          case MessageCommand.joinRoom:
            try {
              const user = await prisma.usersOnRooms.findUnique({
                where: {
                  userId_roomId: {
                    userId: data.userId,
                    roomId: data.roomId
                  }
                }
              })

              if(user) throw new Error("user already in the room...!");
              
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
            if (!data.message) throw new Error("message not received correctly...!");
            const shape = JSON.parse(data.message);
            switch (shape.type) {
              case StrokeType.rect:
                await prisma.stroke.create({
                  data: {
                    type: StrokeType.rect,
                    rect: {
                      create: {
                        startX: shape.startX,
                        startY: shape.startY,
                        width: shape.width,
                        height: shape.height
                      }
                    },
                    userId: data.userId,
                    roomId: data.roomId
                  }
                })
                break;
              
              case StrokeType.line:
                await prisma.stroke.create({
                  data: {
                    type: StrokeType.line,
                    line: {
                      create: {
                        startX: shape.startX,
                        startY: shape.startY,
                        endX: shape.endX,
                        endY: shape.endY
                      }
                    },
                    userId: data.userId,
                    roomId: data.roomId
                  }
                })
                break;
              
              case StrokeType.ellipse:
                await prisma.stroke.create({
                  data: {
                    type: StrokeType.ellipse,
                    ellipse: {
                      create: {
                        centerX: shape.centerX,
                        centerY: shape.centerY,
                        radiusX: shape.radiusX,
                        radiusY: shape.radiusY
                      }
                    },
                    userId: data.userId,
                    roomId: data.roomId
                  }
                })
                break;
              
              case StrokeType.arrow:
                await prisma.stroke.create({
                  data: {
                    type: StrokeType.arrow,
                    arrow: {
                      create: {
                        startX: shape.startX,
                        startY: shape.startY,
                        endX: shape.endX,
                        endY: shape.endY,
                        dx: shape.dx,
                        dy: shape.dy,
                        headlen: shape.headlen,
                        angle: shape.angle
                      }
                    },
                    userId: data.userId,
                    roomId: data.roomId
                  }
                })
                break;

              default:
                break;
            }
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
