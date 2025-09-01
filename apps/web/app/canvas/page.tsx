import { cn } from "@repo/common/cn";
import NavBar from "@ui/components/navBar";
import RoomForm from "@ui/components/roomForm";

export default function CanvasDashBoard() {
  return (
    <div className={cn(
      "w-full h-full bg-gradient-to-b from-pixora-950 from-30% to-pixora-800/90 via-85%"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto h-full flex flex-col gap-5 items-center"
      )}>
        <div className={cn(
          "w-full h-fit"
        )}>
          <NavBar isSignedIn={true} />
        </div>
        <div className={cn(
          "w-full h-10/12 mb-5 ",
          "flex flex-col items-center justify-start"
        )}>
          <RoomForm />
        </div>
      </div>
    </div>
  )
}