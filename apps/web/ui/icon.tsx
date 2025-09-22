import { selectedTooltype } from "@draw/types";
import { cn } from "@repo/common/cn";
import React, { Dispatch, SetStateAction } from "react";
import { defaultClassName } from "./icons/types";

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
      "hover:cursor-pointer hover:bg-pixora-950/15 hover:text-pixora-900/75 transition-all duration-300 ease-in-out rounded-md p-1.5",
      {
        "bg-pixora-300/40": currentTool === LucideIconName
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