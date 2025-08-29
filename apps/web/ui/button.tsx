import { cn } from "@repo/common/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonDefaultStyles = "cursor-pointer transition-all duration-300 ease-in-out text-center";
const buttonStyles = cva(buttonDefaultStyles, {
  variants: {
    variant: {
      primary: "bg-transparent hover:bg-pixora-200/15 text-white/80 border-1 border-white hover:text-white hover:ring-offset-1 hover:ring-offset-pixora-200/15 hover:ring-2 hover:ring-pixora-200/15",
      secondary: "bg-pixora-800/80 text-pixora-50 hover:text-white hover:bg-pixora-900/90 hover:ring-1 hover:ring-pixora-900/90",
      white: "bg-white text-pixora-950/80 hover:text-pixora-950 hover:ring-1 hover:ring-white duration-400"
    },
    size: {
      xs: "py-1.5 px-6 rounded-lg font-base font-semibold tracking-tight",
      sm: "py-2 px-8 rounded-lg font-base font-semibold tracking-tight",
      md: "py-2.5 px-10 rounded-lg font-lg font-semibold"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "sm"
  }
})

interface ButtonProps extends 
  ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonStyles>
{
  text: string;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant,
  size,
  text,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(
      buttonStyles({variant, size}),
      className
    )}
    {...props}
    >
      {text}
    </button>
  )
}