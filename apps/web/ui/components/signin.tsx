import AuthComponent from "../authComponent";
import Button from "../button";
import Input from "../input";

export default function SignInCard() {
  return (
    <AuthComponent isSignIn={true}>
      <Input intent={"auth"} size={"sm"} type="email" placeholder="email" name="email" />
      <Input intent={"auth"} size={"sm"} type="password" placeholder="password" name="password" />
      <Button variant={"secondary"} size={"md"} text="Sign in" />
    </AuthComponent>
  )
}