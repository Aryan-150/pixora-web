import { cn } from "@repo/common/cn";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const inputDefaultStyles = "outline-none transition-all duration-300 ease-in-out text-base font-normal"
const inputStyles = cva(inputDefaultStyles, {
  variants: {
    intent: {
      auth: "border-2 border-pixora-100 focus:border-pixora-300/80 w-full hover:ring-offset-1 hover:ring-offset-pixora-300/80",
      room: ""
    },
    size: {
      xs: "",
      sm: "py-2 px-3 rounded-lg shadow-xs shadow-pixora-900/15"
    }
  }
})

interface InputProps extends
  Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
  Required<VariantProps<typeof inputStyles>>
{
  type: "text" | "email" | "password";
  placeholder: string;
  name: string;
}

export default function Input({
  intent,
  size,
  type,
  placeholder,
  name,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn(
      "flex flex-col gap-1 items-start justify-center w-full"
    )}>
      <label className="font-medium text-lg text-shadow-xs text-pixora-950/75" htmlFor={name}>{name}</label>
      <input id={name} type={type} placeholder={placeholder} autoComplete="off"
        className={cn(
          inputStyles({intent, size}),
          className
        )}
        {...props}
      />
    </div>
  )
}