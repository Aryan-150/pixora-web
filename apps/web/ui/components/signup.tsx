"use client";

import InputWithErrorMsg from "@ui/inputWithErrorMsg";
import AuthComponent from "../authComponent";
import Button from "../button";
import Input from "../input";
import { useRef } from "react";
import axios from "axios";
import { HTTP_URL_V1 } from "@repo/common/config";
import { useRouter } from "next/navigation";

export default function SignUpcard() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const signUp = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current) {
      console.log("error");
      return;
    }
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if(username === ""){
      alert("username is empty");
      return;
    }

    if (email === "") {
      alert("email is empty");
      return;
    }
    if (password === "") {
      alert("password is empty");
      return;
    }

    try {
      const response = await axios.post(`${HTTP_URL_V1}/user/signup`, {
        username: username,
        email: email,
        password: password
      });
      const data = response.data;

      alert(data.msg);
      router.push("/signin");
      
    } catch (error: any) {
      alert(error.message);
      return;
    }

  }

  return (
    <AuthComponent submitHandler={signUp} isSignIn={false}>
      <InputWithErrorMsg>
        <Input reference={usernameRef} intent={"auth"} size={"sm"} type="text" placeholder="username" name="username" />
      </InputWithErrorMsg>

      <InputWithErrorMsg>
        <Input reference={emailRef} intent={"auth"} size={"sm"} type="email" placeholder="email" name="email" />
      </InputWithErrorMsg>

      <InputWithErrorMsg>
        <Input reference={passwordRef} intent={"auth"} size={"sm"} type="password" placeholder="password" name="password" />
      </InputWithErrorMsg>
      <Button variant={"secondary"} size={"md"} type="submit">Sign Up</Button>
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