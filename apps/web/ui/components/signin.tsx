"use client";

import { HTTP_URL } from "@repo/common/config";
import AuthComponent from "@ui/authComponent";
import Button from "@ui/button";
import Input from "@ui/input";
import InputWithErrorMsg from "@ui/inputWithErrorMsg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCookiesNext } from "cookies-next/client";

type ResponseDataType = {
  msg: string;
  token?: string;
}

export default function SignInCard() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [signInError, setSignInError] = useState("");

  const { setCookie } = useCookiesNext();
  const router = useRouter();

  const signIn = async () => {
    try {      
      if(!emailRef.current || !passwordRef.current){
        return;
      }
      if(emailRef.current.value.trim() === ""){
        alert("email is empty");
        return;
      }
      if(passwordRef.current.value.trim() === ""){
        alert("password is empty");
        return;
      }

      const response = await axios.post(`${HTTP_URL}/api/v1/user/signin`, {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      const data: ResponseDataType = response.data;
      if(!data.token){
        throw new Error("token not found");
      }
      setCookie("token", data.token);
      router.push("/canvas");

    } catch (error: any) {
      console.log(error);
      setSignInError(error.response.data.msg);
    }
  }

  return (
    <AuthComponent submitHandler={signIn} isSignIn={true}>
      <InputWithErrorMsg>
        <Input reference={emailRef} intent={"auth"} size={"sm"} type="email" placeholder="email"  name="email" />
      </InputWithErrorMsg>

      <InputWithErrorMsg>
        <Input reference={passwordRef} intent={"auth"} size={"sm"} type="password" placeholder="password" name="password" />
      </InputWithErrorMsg>

      <Button variant={"secondary"} size={"md"} text="Sign in" type="submit" />
      {signInError && <span>{signInError}</span>}
    </AuthComponent>
  )
}