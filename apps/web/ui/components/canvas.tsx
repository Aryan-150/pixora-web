"use client";

import { useEffect, useRef, useState } from "react";
import { Point, Rect } from "@draw/types";
import { HTTP_URL, WS_URL } from "@repo/common/config";
import { MessageCommand, ParsedMessageType } from "ws-backend/types";
import axios from "axios";
import { getClientSideCookie } from "@lib/getCookie";
import { useRouter } from "next/navigation";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<Point>({ x: 0, y: 0 });
  const [socket, setSocket] = useState<WebSocket>();
  const existingShapes: Rect[] = [];
  const router = useRouter();

  // connect to the ws:
  useEffect(() => {
    const token = getClientSideCookie("token");
    const ws = new WebSocket(WS_URL, token);

    ws.onopen = async () => {
      try {
        console.log('connection with ws established...!');
        setSocket(ws);

        const roomId = getClientSideCookie("roomId");
        if (!roomId) throw new Error("unautharized room access ...!");
        const resposne = await axios.get(`${HTTP_URL}/api/v1/room/chats/${roomId}`, {
          headers: {
            Authorization: token
          }
        });
        const messages = resposne.data.messages;
        console.log(messages, typeof (messages));

        const joinRoomMsgObj: ParsedMessageType = {
          type: MessageCommand.joinRoom,
          roomId: roomId
        }
        ws.send(JSON.stringify(joinRoomMsgObj));

        ws.onmessage = (ev: MessageEvent) => {
          const message = ev.data;
          console.log(message, typeof message);
        }

      } catch (error: any) {
        console.error(error.message);
        ws.close();
        router.push("/canvas");
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas === null) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.onresize = (e: UIEvent) => {
      e.preventDefault();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      clearCanvas(canvas, ctx, existingShapes);
    }

    let clicked = false;
    canvas.addEventListener("mousedown", (e: MouseEvent) => {
      e.preventDefault();
      clicked = true;
      startRef.current.x = e.clientX;
      startRef.current.y = e.clientY;
    })

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      e.preventDefault();
      if (!clicked) return;

      const width = e.clientX - startRef.current.x;
      const height = e.clientY - startRef.current.y;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      clearCanvas(canvas, ctx, existingShapes);
      ctx.strokeRect(startRef.current.x, startRef.current.y, width, height);
    })

    canvas.addEventListener("mouseup", (e: MouseEvent) => {
      e.preventDefault();
      clicked = false;
      const width = e.clientX - startRef.current.x;
      const height = e.clientY - startRef.current.y;
      // addShape call -> socket, roomId, shape
      existingShapes.push({
        x: startRef.current.x,
        y: startRef.current.y,
        w: width,
        h: height
      });
      console.log(existingShapes);
    })

    // cleanup:
    return () => { }

  }, [canvasRef])

  return (
    <div className="w-screen h-screen block overflow-hidden">
      <canvas ref={canvasRef} className="bg-canvas-dark"></canvas>
    </div>
  )
}

async function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, existingShapes: Rect[]) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
  })
}