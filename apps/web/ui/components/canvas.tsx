"use client";
import { useEffect, useRef } from "react";
import { Point, Rect } from "../../draw/types";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<Point>({x: 0, y: 0});
  const existingShapes: Rect[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas === null) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.onresize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      clearCanvas(canvas, ctx, existingShapes);
    }

    let clicked = false;
    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      startRef.current.x = e.clientX;
      startRef.current.y = e.clientY;
    })

    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;

      const width = e.clientX - startRef.current.x;
      const height = e.clientY - startRef.current.y;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      clearCanvas(canvas, ctx, existingShapes);
      ctx.strokeRect(startRef.current.x, startRef.current.y, width, height);
    })

    canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      const width = e.clientX - startRef.current.x;
      const height = e.clientY - startRef.current.y;
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