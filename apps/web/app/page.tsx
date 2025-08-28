"use client";

import { cn } from "@repo/common/cn";
import Button from "../ui/button";
import RoomForm from "../ui/components/roomForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className={cn(
      ""
    )}>
      <div className={cn(
        "max-w-5xl mx-auto h-screen flex flex-col items-center gap-5 py-2"
      )}>
        <div className={cn(
          "navBar",
          "w-full px-3 py-2 flex justify-between items-center",
        )}>
          <span className={cn(
            "brand",
            "font-semibold text-2xl font-manrope tracking-tight leading-5 text-pixora-100"
          )}>Pixora</span>
          <div className={cn(
            "links&buttons",
            "flex px-2 justify-center items-center gap-2"
          )}>
            <Button variant={"secondary"} text="Log in" size={"xs"} />
            <Button variant={"primary"} text="Get Started" size={"xs"} onClick={() => {
              router.push(`signup`)
            }} />
          </div>
        </div>

        <RoomForm />

        {/* <div className={cn(
          "form",
          "mt-5 py-3 px-2 border-2 border-pixora-100 shadow-sm shadow-pixora-200 w-1/2",
          "flex flex-col items-center gap-2"
        )}>
          <input type="text" placeholder="room name..." autoFocus className={cn(
            "border-2 outline-none border-pixora-50 w-1/2 px-2 py-1 text-white rounded-lg"
          )} onChange={(e) => {
            setRoomName(e.target.value);
          }} />
          <div className={cn(
            "flex w-full h-fit justify-center items-center gap-3"
          )}>
            <Button variant={"secondary"} size={"sm"} text="Join Room" onClick={joinRoom} />
            <Button variant={"primary"} size={"sm"} text="Create Room" onClick={createRoom} />
          </div>
        </div> */}
      </div>
    </div>
  )
}