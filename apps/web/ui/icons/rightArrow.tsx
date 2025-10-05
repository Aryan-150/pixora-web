import { MoveRight } from "lucide-react";
import { defaultClassName, IconProps, IconSizes } from "./types";
import { cn } from "@repo/common/cn";

export default function RightArrow({
  size = "sm"
}: IconProps) {
  return (
    <MoveRight size={IconSizes[size]} className={cn(
      defaultClassName
    )} />
  )
}