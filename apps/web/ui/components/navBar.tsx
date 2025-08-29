import { cn } from "@repo/common/cn";
import { cva } from "class-variance-authority";
import Button from "../button";

const navBarStyles = cva("", {
  variants: {
    intent: {
      auth: "",
      hero: ""
    }
  }
})

export default function NavBar() {
  return (
    <nav className={cn(
      "navbar",
      "w-full px-3 py-2 flex justify-between items-center"
    )}>
      <a href="/">
        <span className={cn(
          "font-semibold text-3xl font-monoton tracking-tight leading-5 text-pixora-50 hover:text-white"
        )}>Pixo<span className="text-pixora-100/80">ra</span></span>
      </a>
      <div className={cn(
        "flex px-2 justify-center items-center gap-6"
      )}>
        <a href="/signin">
          <Button variant={"white"} text="Sign in" size={"xs"} />
        </a>
        <a href="/signup">
          <Button variant={"primary"} text="Sign up" size={"xs"} />
        </a>
      </div>
    </nav>
  )
}