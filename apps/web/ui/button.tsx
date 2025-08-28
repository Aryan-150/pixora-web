import { cn } from "@repo/common/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonDefaultStyles = "cursor-pointer transition-all duration-300 text-center";
const buttonStyles = cva(buttonDefaultStyles, {
  variants: {
    variant: {
      primary: "bg-pixora-500 text-white border border-pixora-100 hover:ring-2 hover:ring-pixora-500",
      secondary: "bg-pixora-50 text-pixora-600 border border-pixora-600 hover:ring-2 hover:ring-pixora-50"
    },
    size: {
      xs: "py-1 px-5 rounded-lg font-base",
      sm: "py-1.5 px-7.5 rounded-lg font-base",
      md: ""
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