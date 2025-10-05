"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasManager } from "@draw/canvasManager";
import { useRouter } from "next/navigation";
import ToolBar from "./toolBar";
import { cn } from "@repo/common/cn";
import { selectedTooltype } from "@draw/types";

export default function Canvas({
  roomId,
  socket
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [game, setGame] = useState<CanvasManager | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas || canvas === null) return;

      const canvasManager = new CanvasManager(canvas, roomId, socket, router);
      setGame(canvasManager);
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
      <ToolBar game={game} />
      <canvas ref={canvasRef} className={cn(
        "bg-canvas-dark z-0",
        {
          "cursor-crosshair" : game?.selectedTool != selectedTooltype.Select
        }
      )}></canvas>
    </div>
  )
}
