"use client";

import { useEffect, useRef } from "react";
import { Point, Shapes } from "@draw/types";
import { getClientSideCookie } from "@lib/getCookie";
import { CanvasManager } from "@draw/canvasManager";
import { useRouter } from "next/navigation";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<Point>({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas || canvas === null) return;
      const roomId = getClientSideCookie("roomId");
      const token = getClientSideCookie("token");
      if (!roomId) throw new Error("unautharized room access ...!");
      if (!token) throw new Error("Invalid cookie token...!");

      const canvasManager = new CanvasManager(canvas, roomId, token, router);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      let clicked = false;
      canvas.addEventListener("mousedown", (e: MouseEvent) => {
        e.preventDefault();
        clicked = true;
        startRef.current.x = e.clientX;
        startRef.current.y = e.clientY;
      })
  
      canvas.addEventListener("mousemove", async (e: MouseEvent) => {
        e.preventDefault();
        if (!clicked) return;
  
        const width = e.clientX - startRef.current.x;
        const height = e.clientY - startRef.current.y;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        canvasManager.clearCanvas();
        ctx.strokeRect(startRef.current.x, startRef.current.y, width, height);

      })
  
      canvas.addEventListener("mouseup", async (e: MouseEvent) => {
        e.preventDefault();
        clicked = false;
        const width = e.clientX - startRef.current.x;
        const height = e.clientY - startRef.current.y;
        const shape: Shapes = {
          x: startRef.current.x,
          y: startRef.current.y,
          w: width,
          h: height
        }
        canvasManager.addShape(shape);
      })
  
      // cleanup:
      return () => {

      }
      
    } catch (error: any) {
      console.error(error.message);
    }

  }, [canvasRef, router])

  return (
    <div className="w-screen h-screen block overflow-hidden">
      <canvas ref={canvasRef} className="bg-canvas-dark"></canvas>
    </div>
  )
}

// export async function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, existingShapes: Rect[]) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   existingShapes.map((shape) => {
//     ctx.strokeStyle = "#FFFFFF";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
//   })
// }