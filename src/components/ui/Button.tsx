import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center rounded-lg font-heading font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] "
    
    if (variant === "primary") {
      baseStyles += "bg-primary text-onPrimary hover:bg-primaryDark shadow-[inset_0_2px_0_rgba(255,255,255,0.1)] "
    } else if (variant === "secondary") {
      baseStyles += "bg-secondaryContainer text-onSecondaryContainer hover:brightness-95 "
    } else if (variant === "outline") {
      baseStyles += "border border-outlineVariant text-onSurface hover:bg-surfaceContainer "
    } else if (variant === "ghost") {
      baseStyles += "text-primary hover:bg-surfaceContainerLow "
    }
    
    if (size === "sm") baseStyles += "h-9 px-4 text-sm "
    if (size === "md") baseStyles += "h-12 px-6 text-base "
    if (size === "lg") baseStyles += "h-14 px-8 text-lg "

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"
