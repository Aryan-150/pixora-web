import { cn } from "@repo/common/cn";
import { Circle } from "lucide-react";
import { defaultClassName, IconProps, IconSizes } from "./types";
import { selectedTooltype } from "@draw/types";

export default function CircleIcon({
  currentTool,
  setCurrentTool
}:IconProps) {
  return (
    <button className={cn(
      defaultClassName,
      {
        "bg-pixora-300/40": currentTool === selectedTooltype.Circle
      }
    )} 
    onClick={() => {
      setCurrentTool(selectedTooltype.Circle)
    }}
    >
      <Circle />
    </button>
  )
}