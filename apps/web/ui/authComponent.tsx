import { cn } from "@repo/common/cn";
import React, { FormEvent } from "react";

interface AuthComponentProps {
  children: React.ReactNode;
  isSignIn: boolean;
  submitHandler: () => void;
}

export default function AuthComponent({
  children,
  isSignIn,
  submitHandler,
}: AuthComponentProps) {
  return (
    <form onSubmit={(e: FormEvent) => {
      e.preventDefault();
      submitHandler();
    }} className={cn(
      "w-full max-w-xl h-fit py-15 px-20 border border-pixora-50 rounded-2xl shadow-md shadow-pixora-100",
      "flex flex-col items-start justify-center gap-2",
    )}>
      {children}
      <span className="text-base font-medium">
        {!isSignIn ? "Already have an account?" : "A new User?"}
        <a href={!isSignIn ? "/signin" : "/signup"} className="ml-2 text-pixora-900 underline underline-offset-2">
          {!isSignIn ? "Sign in" : "Sign up"}</a>
      </span>
    </form>
  )
}