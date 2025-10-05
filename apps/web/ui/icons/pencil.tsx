import { cn } from "@repo/common/cn";
import { Pencil } from "lucide-react";
import { defaultClassName, IconProps, IconSizes } from "./types";

export default function PencilIcon({
  size = "sm"
}: IconProps) {
  return (
    <Pencil size={IconSizes[size]} className={cn(
      defaultClassName
    )} />
  )
}