"use client";

import { cn } from "@repo/common/cn";
import Button from "../../../ui/button";
import { useState } from "react";

export default function Signup() {
  const [username, setUserName] = useState("");
  

  return (
    <div className={cn(
      "w-screen h-screen p-5"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto flex justify-center"
      )}>
        <div className={cn(
          "signupCard",
          "border-2 border-pixora-900 shadow-sm shadow-pixora-200 w-2/6 h-fit py-10 px-15 flex flex-col items-center justify-center gap-10 rounded-xl"
        )}>
          <div className={cn(
            "w-full flex flex-col items-start justify-center gap-2"
          )}>
            <label htmlFor="username" className="text-pixora-100">username</label>
            <input type="text" id="username" placeholder="username" autoComplete="off" autoFocus
              className={cn(
                "outline-none border-2 border-pixora-500 text-white text-base px-3 py-2 rounded-lg w-full"
              )}
              onChange={(e) => {
                
              }}
            />
          </div>
          <div className={cn(
            "w-full flex flex-col items-start justify-center gap-2"
          )}>
            <label htmlFor="email" className="text-pixora-100">email</label>
            <input type="email" id="email" placeholder="email" autoComplete="off"
              className={cn(
                "outline-none border-2 border-pixora-500 text-white text-base px-3 py-2 rounded-lg w-full"
              )}
              onChange={(e) => {
                
              }}
            />
          </div>
          <div className={cn(
            "w-full flex flex-col items-start justify-center gap-2"
          )}>
            <label htmlFor="password" className="text-pixora-100">password</label>
            <input type="password" id="password" placeholder="password" autoComplete="off"
              className={cn(
                "outline-none border-2 border-pixora-500 text-white text-base px-3 py-2 rounded-lg w-full"
              )}
              onChange={(e) => {
                
              }}
            />
          </div>

          <Button variant={"primary"} size={"sm"} text="signup" onClick={() => {

          }} />
        </div>
      </div>
    </div>
  )
}