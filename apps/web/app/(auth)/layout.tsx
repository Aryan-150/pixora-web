import { cn } from "@repo/common/cn";
import React from "react";

export default function ({
  children
}: {
  children: Readonly<React.ReactNode>
}) {
  return (
    <div className={cn(
      "w-screen h-screen"
    )}>
      <div className={cn(
        "w-full h-1/12 flex justify-center items-center text-4xl font-bold tracking-wide"
      )}>
        <a href="/"><span className="font-monoton">Pixora</span></a>
      </div>
      <div className={cn(
        "max-w-full mx-5 h-10/12 my-5 mt-5 px-10 py-1.5 shadow-md/60 rounded-3xl shadow-pixora-200",
        "bg-gradient-to-b from-pixora-50/50 from-45% to-pixora-100/75 to-90%",
        "flex justify-center items-center"
      )}>
        {children}
      </div>
    </div>
  )
}