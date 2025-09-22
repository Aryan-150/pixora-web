import { cn } from "@repo/common/cn";
import { Square } from "lucide-react";
import { defaultClassName, IconProps, IconSizes } from "./types";
import { selectedTooltype } from "@draw/types";

export default function SquareIcon({
  currentTool,
  setCurrentTool
}: IconProps) {
  return (
    <button className={cn(
      defaultClassName,
      {
        "bg-pixora-300/40": currentTool === selectedTooltype.Rect
      }
    )}
    onClick={() => {
      setCurrentTool(selectedTooltype.Rect)
    }}
    >
      <Square />
    </button>
  )
}