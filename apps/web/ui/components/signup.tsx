import AuthComponent from "../authComponent";
import Button from "../button";
import Input from "../input";

export default function SignUpcard() {
  return (
    <AuthComponent isSignIn={false}>
      <Input intent={"auth"} size={"sm"} type="text" placeholder="username" name="username" />
      <Input intent={"auth"} size={"sm"} type="email" placeholder="email" name="email" />
      <Input intent={"auth"} size={"sm"} type="password" placeholder="password" name="password" />
      <Button variant={"secondary"} size={"md"} text="Sign up" />
    </AuthComponent>
  )
}