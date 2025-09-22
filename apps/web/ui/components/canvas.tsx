"use client";

import { useEffect, useRef } from "react";
import { CanvasManager } from "@draw/canvasManager";
import { useRouter } from "next/navigation";
import ToolBar from "./toolBar";

export default function Canvas({
  roomId,
  socket
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas || canvas === null) return;

      const canvasManager = new CanvasManager(canvas, roomId, socket, router);
      canvasManager.addEventListeners();
      // cleanup:
      return () => {
        canvasManager.cleanUp();
      }
      
    } catch (error: any) {
      console.error(error.message);
    }

  }, [canvasRef])

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <ToolBar />
      <canvas ref={canvasRef} className="bg-canvas-dark z-0"></canvas>
    </div>
  )
}
