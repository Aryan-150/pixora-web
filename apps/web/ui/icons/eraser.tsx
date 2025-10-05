import { Eraser } from "lucide-react";
import { defaultClassName, IconProps, IconSizes } from "./types";
import { cn } from "@repo/common/cn";

export default function EraserIcon({
  size = "sm"
}: IconProps) {
  return (
    <Eraser size={IconSizes[size]} className={cn(
      defaultClassName
    )} />
  )
}