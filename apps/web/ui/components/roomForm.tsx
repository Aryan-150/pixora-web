"use client";
import { cn } from "@repo/common/cn";
import Button from "../button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoomForm() {
  const [roomName, setRoomName] = useState<string>("");
  const [error, setError] = useState({
    roomName: ""
  })
  const router = useRouter();

  const joinRoom = () => {
    if(roomName.trim() === ""){
      setError({
        roomName: "roomName field is Empty..."
      })
    }else {
      router.push(`/room/${roomName}`);
      setError({
        roomName: ""
      })
    }
  }

  const createRoom = () => {

  }

  return (
    <div className={cn(
      "h-fit w-1/2 py-3 px-4 border-2 border-pixora-500 rounded-lg mt-5 flex flex-col items-start gap-5"
    )}>
      <input type="text" placeholder="room name..." autoFocus className={cn(
        "w-full outline-none border-2 border-pixora-100 hover:border-pixora-200 px-3 py-1 text-white cursor-text rounded-md"
      )} onChange={(e) => {
        setRoomName(e.target.value);
      }}/>
      {error ? <div className="text-red-500">{error.roomName}</div> : ""}
      <div className={cn(
        "w-full flex justify-center items-center gap-5"
      )}>
        <Button variant={"secondary"} size={"sm"} text="Join Room" className="w-1/2" onClick={joinRoom} />
        <Button variant={"primary"} size={"sm"} text="Create Room" className="w-1/2" onClick={createRoom} />
      </div>
    </div>
  )
}