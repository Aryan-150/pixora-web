"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasManager } from "@draw/canvasManager";
import { useRouter } from "next/navigation";
import ToolBar from "./toolBar";
import { cn } from "@repo/common/cn";
import { selectedTooltype } from "@draw/types";
import { Ellipsis } from "lucide-react";
import Button from "@ui/button";

export default function Canvas({
  roomId,
  socket
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [game, setGame] = useState<CanvasManager | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const router = useRouter();

  const leaveRoom = async () => {
    try {
      if(!game) throw new Error("game not found");
      
      await game.leaveRoom();
      router.push("/canvas");
    } catch (error: any) {
      console.error(error.message);
    }
  }

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
          "cursor-crosshair": game?.selectedTool != selectedTooltype.Select
        }
      )}></canvas>

      <div className={cn(
        "fixed bottom-5 right-5 z-50",
        "flex flex-col items-end gap-3"
      )}>
        {isMenuClicked && (
          <div className={cn(
            "animate-in slide-in-from-bottom-2 fade-in duration-200",
            "mb-2"
          )}>
            <Button
              className={cn(
                "shadow-lg hover:shadow-xl transition-all duration-200"
              )}
              variant={"white"}
              size={"sm"}
              onClick={leaveRoom}
            >
              Leave Room
            </Button>
          </div>
        )}

        <Button
          className={cn(
            "rounded-full p-2",
            "bg-slate-800 border-2 border-white/50 hover:bg-slate-700 hover:border-white/70",
            "flex justify-center items-center text-white",
            "shadow-lg hover:shadow-xl",
            {
              "rotate-90": isMenuClicked
            }
          )}
          onClick={() => {
            setIsMenuClicked(c => !c);
          }}
          size={"xs"}
        >
          <Ellipsis />
        </Button>
      </div>
    </div>
  )
}
