import { Minus } from "lucide-react";
import { defaultClassName, IconProps, IconSizes } from "./types";
import { cn } from "@repo/common/cn";

export default function LineIcon({
  size = "sm"
}: IconProps) {
  return (
    <Minus size={IconSizes[size]} className={cn(
      defaultClassName
    )} />
  )
}