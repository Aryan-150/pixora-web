import { selectedTooltype } from "@draw/types";
import { cn } from "@repo/common/cn";
import React, { Dispatch, SetStateAction } from "react";

interface IconProps {
  LucideIcon: React.ReactElement;
  LucideIconName: selectedTooltype;
  currentTool: selectedTooltype;
  setCurrentTool: Dispatch<SetStateAction<selectedTooltype>>;
}

export default function Icon({
  LucideIcon,
  LucideIconName,
  currentTool,
  setCurrentTool
}: IconProps) {
  return (
    <button className={cn(
      "hover:cursor-pointer hover:bg-pixora-100/25 transition-all duration-300 ease-in-out rounded-md p-1.5 text-white",
      {
        "bg-pixora-300/25 hover:bg-pixora-300/25": currentTool === LucideIconName
      }
    )}
    onClick={() => {
      setCurrentTool(LucideIconName)
    }}
    >
      {LucideIcon}
    </button>
  )
}