"use client";

import { cn } from "@repo/common/cn";

interface RoomCardProps {
  index: number;
  roomName: string;
  adminId: string;
  createdAt: Date;
}

export default function RoomCard({
  index,
  roomName,
  createdAt
}: RoomCardProps) {
  return (
    <div key={index} className={cn(
      "w-96 h-52 rounded-lg bg-pixora-300 flex flex-col cursor-pointer",
      "hover:translate-y-1"
    )}
      onClick={() => {

      }}
    >
      <div className={cn(
        "flex flex-col space-y-2 w-full h-full px-3 py-3"
      )}>
        <div>{roomName}</div>
        <div>{createdAt.toLocaleDateString()}</div>
      </div>
    </div>
  )
}