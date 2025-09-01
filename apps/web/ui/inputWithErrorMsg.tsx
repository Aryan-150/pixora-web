import { cn } from "@repo/common/cn";
import React from "react";

export default function InputWithErrorMsg({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn(
      "w-full flex flex-col gap-2"
    )}>
      {children}
    </div>
  )
}