"use client";

import { selectedTooltype } from "@draw/types";
import { cn } from "@repo/common/cn";
import Icon from "@ui/icon";
import { Circle, Eraser, Minus, MousePointer2, MoveRight, Square } from "lucide-react";
import { useState } from "react";

export default function ToolBar() {
  const [currentTool, setCurrentTool] = useState<selectedTooltype>(selectedTooltype.Select);
  return (
    <div className={cn(
      "px-8 py-1.5 bg-pixora-50 rounded-md absolute bottom-5 right-10",
      "flex gap-3 justify-center items-center"
    )}>
      <Icon LucideIcon={<MousePointer2 />} LucideIconName={selectedTooltype.Select} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Circle />} LucideIconName={selectedTooltype.Circle} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Square />} LucideIconName={selectedTooltype.Rect} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<MoveRight />} LucideIconName={selectedTooltype.RightArrow} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Minus />} LucideIconName={selectedTooltype.Line} currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Icon LucideIcon={<Eraser />} LucideIconName={selectedTooltype.Eraser} currentTool={currentTool} setCurrentTool={setCurrentTool} />
    </div>
  )
}