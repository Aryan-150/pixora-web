import { cn } from "@repo/common/cn";
import Button from "@ui/button";
import LogOut from "./logout";

export default function NavBar({ isSignedIn }: {
  isSignedIn: boolean,
}) {
  return (
    <nav className={cn(
      "navbar",
      "w-full h-fit px-2.5 py-5 flex justify-between items-center",
    )}>
      <a href="/">
        <span className={cn(
          "font-semibold text-3xl font-monoton tracking-tight leading-5 text-pixora-50 hover:text-white"
        )}>Pixo<span className="text-pixora-100/80">ra</span></span>
      </a>
      {
        !isSignedIn
          ?
          <div className="flex px-2 justify-center items-center gap-6">
            <a href="/signin">
              <Button variant={"white"} text="Sign in" size={"xs"} />
            </a>
            <a href="/signup">
              <Button variant={"primary"} text="Sign up" size={"xs"} />
            </a>
          </div>
          :
          <div className="flex justify-center items-center">
            <LogOut />
          </div>
      }
    </nav>
  )
}