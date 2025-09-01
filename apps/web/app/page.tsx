import { cn } from "@repo/common/cn";
import NavBar from "../ui/components/navBar";

export default function Home() {

  return (
    <div className={cn(
      "w-screen h-screen bg-gradient-to-b from-pixora-950 from-30% to-pixora-800/90 via-85%"
    )}>
      <div className={cn(
        "max-w-6xl mx-auto h-screen flex flex-col items-center gap-5"
      )}>
        <NavBar isSignedIn={false} />
      </div>
    </div>
  )
}