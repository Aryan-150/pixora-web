"use client";

import { HTTP_URL } from "@repo/common";
import { cn } from "@repo/common/cn";
import Button from "@ui/button";
import Input from "@ui/input";
import axios from "axios";
import { useRef } from "react";
import { useCookiesNext } from "cookies-next/client";
import { useRouter } from "next/navigation";

export default function RoomForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setCookie, getCookie } = useCookiesNext();
  const router = useRouter();

  const joinRoom = async () => {
    if(!inputRef.current) return;
    if(inputRef.current.value.trim() === ""){
      alert("room name field is empty...!");
      return;
    }
    
    try {
      const token = getCookie("token");
      const response = await axios.get(`${HTTP_URL}/api/v1/room/${inputRef.current.value}`, {
        headers: {
          Authorization: token
        }
      });
      const data = response.data;      
      setCookie("roomId", data.roomId);
      router.push(`/canvas/${getCookie("roomId")}`);
      
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className={cn(
      "flex flex-col gap-3 w-full max-w-md"
    )}>
      <Input reference={inputRef} type="text" placeholder="enter room name...!" name="roomName" intent={"room"} size={"sm"} autoFocus />
      <div className={cn(
        "w-full h-fit flex justify-center items-center gap-4"
      )}>
        <Button variant={"white"} size={"sm"} text="Join Room" onClick={joinRoom} />
        <Button variant={"secondary"} size={"sm"} text="Create Room" />
      </div>
    </div>
  )
}