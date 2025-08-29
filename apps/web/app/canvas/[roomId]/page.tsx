"use client";

import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
}

type Line = Point[];

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<Point>({ x: 0, y: 0 });
  const endRef = useRef<Point>({ x: 0, y: 0 });

  const drawLine = (point1: Point, point2: Point, ctx: CanvasRenderingContext2D) => {
    console.log(point1, point2);
    let path = new Path2D(`M ${point1.x},${point1.y} L ${point2.x} ${point2.y}`);
    ctx.stroke(path);
  }
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    let clicked = false;
    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      let startX = e.clientX;
      let startY = e.clientY;
      if(startRef.current){
        startRef.current.x = startX;
        startRef.current.y = startY;
      }
      console.log(startRef.current);
    })

    canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      let endX = e.clientX;
      let endY = e.clientY;
      if(endRef.current){
        endRef.current.x = endX;
        endRef.current.y = endY;
        
      }
      console.log(endRef.current);
      drawLine(startRef.current, endRef.current, ctx);
    })

    canvas.addEventListener("mousemove", (e) => {
      if(!clicked) return;
      console.log(e.clientX, e.clientY);
    })

  }, [canvasRef])

  return (
    <div className="w-screen h-screen">
      <canvas className="bg-background-black fixed" ref={canvasRef}></canvas>
    </div>
  )
}