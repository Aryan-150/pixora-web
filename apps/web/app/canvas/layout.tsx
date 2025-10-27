import { cn } from "@repo/common/cn";
import React from "react";

export default function PreCanvasPageLayout({
  children
}: {
  children: Readonly<React.ReactNode>
}) {
  return (
    <main className={cn(
      "w-screen h-screen p-0 m-0"
    )}>
      {children}
    </main>
  )
}