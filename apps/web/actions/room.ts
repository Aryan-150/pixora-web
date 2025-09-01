"use server";

import { prisma } from "@repo/database/client";

export default async function RoomExits(roomId: string): Promise<boolean> {
  const existRoom = await prisma.room.findUnique({
    where: {
      id: roomId
    }
  })
  if(!existRoom) return false;
  return true;
}