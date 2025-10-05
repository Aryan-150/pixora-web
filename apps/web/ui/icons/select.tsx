import { MousePointer2 } from "lucide-react";
import { defaultClassName, IconProps } from "./types";
import { cn } from "@repo/common/cn";
import { selectedTooltype } from "@draw/types";

export default function SelectIcon({
  currentTool,
  setCurrentTool
}: IconProps){
  return (
    <button className={cn(
      defaultClassName,
      {
        "bg-pixora-300/40": currentTool === selectedTooltype.Select
      }
    )} onClick={() => {
      setCurrentTool(selectedTooltype.Select)
    }}>
      <MousePointer2 />
    </button>
  )
}

// selectedTool