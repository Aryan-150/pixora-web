"use client";

import { CanvasManager } from "@draw/canvasManager";
import { selectedTooltype } from "@draw/types";
import { cn } from "@repo/common/cn";
import Icon from "@ui/icon";
import { Circle, Eraser, Minus, MousePointer2, MoveRight, Square } from "lucide-react";
import { useState, useEffect } from "react";

export default function ToolBar({
  game
}: {
  game: CanvasManager | null
}) {
  const [currentTool, setCurrentTool] = useState<selectedTooltype>(selectedTooltype.Select);

  useEffect(() => {
    if (game) {
      game.selectedTool = currentTool;
      console.log(game.selectedTool, currentTool);
    }
  }, [currentTool])
  
  return (
    <div className={cn(
      "w-fit h-fit fixed top-5 left-1/3 px-8 py-1.5 bg-[#262626] border-2 border-[#262626] rounded-lg",
      "flex justify-center items-center gap-1"
    )}>
      <Icon LucideIcon={<MousePointer2 />} LucideIconName={selectedTooltype.Select} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Circle />} LucideIconName={selectedTooltype.Ellipse} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Square />} LucideIconName={selectedTooltype.Rect} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<MoveRight />} LucideIconName={selectedTooltype.Arrow} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Minus />} LucideIconName={selectedTooltype.Line} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Eraser />} LucideIconName={selectedTooltype.Eraser} currentTool={currentTool} setCurrentTool={setCurrentTool} />
    </div>
  )
}