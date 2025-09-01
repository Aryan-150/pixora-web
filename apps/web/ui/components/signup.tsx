"use client";

import InputWithErrorMsg from "@ui/inputWithErrorMsg";
import AuthComponent from "../authComponent";
import Button from "../button";
import Input from "../input";
import { useState, useRef } from "react";

type ErrorType = {
  username?: boolean;
  email?: boolean;
  password?: boolean;
}

export default function SignUpcard() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<ErrorType>({
    username: true,
    email: false,
    password: false
  });

  const signUp = () => {
    if(!usernameRef.current || !emailRef.current || !passwordRef.current) {
      console.log("error");
      return;
    }




  }

  return (
    <AuthComponent isSignIn={false}>
      <InputWithErrorMsg>
        <Input reference={usernameRef} intent={"auth"} size={"sm"} type="text" placeholder="username" name="username" />
        {error.username && <ErrorMsg>{"username field is empty...!"}</ErrorMsg>}
      </InputWithErrorMsg>

      <InputWithErrorMsg>
        <Input reference={emailRef} intent={"auth"} size={"sm"} type="email" placeholder="email" name="email" />
        {false && <ErrorMsg>{"email field is empty...!"}</ErrorMsg>}
      </InputWithErrorMsg>
      
      <InputWithErrorMsg>
        <Input reference={passwordRef} intent={"auth"} size={"sm"} type="password" placeholder="password" name="password" />
        {false && <ErrorMsg>{"password field is empty...!"}</ErrorMsg>}
      </InputWithErrorMsg>
      <Button variant={"secondary"} size={"md"} text="Sign up" type="submit" onClick={signUp} />
    </AuthComponent>
  )
}

export function ErrorMsg({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <span className="text-red-600 font-medium">
      {children}
    </span>
  )
}