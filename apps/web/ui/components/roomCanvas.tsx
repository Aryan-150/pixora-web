"use client";

import { getClientSideCookie } from "@lib/getCookie";
import { WS_URL } from "@repo/common/config";
import { useState, useEffect } from "react";
import Canvas from "./canvas";

export default function RoomCanvas({
  roomId
}: {
  roomId: string
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    try {
      const token = getClientSideCookie("token");
      if(!token) throw new Error("token not found...!");
      
      const ws = new WebSocket(WS_URL, token);
      console.log("connected to ws");
      
      setSocket(ws);
      
    } catch (error: any) {
      console.error(error.message);
    }

    return () => {}

  }, [])

  if(!socket){
    return <div>
      Connecting to room, pls wait...!
    </div>
  }

  return (
    <Canvas roomId={roomId} socket={socket} />
  )
}