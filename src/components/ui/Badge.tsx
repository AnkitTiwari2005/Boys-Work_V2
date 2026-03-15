import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  let baseStyles = "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold font-body transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 "

  if (variant === "default") {
    baseStyles += "border-transparent bg-primary text-onPrimary shadow hover:bg-primary/80 "
  } else if (variant === "secondary") {
    baseStyles += "border-transparent bg-secondaryContainer text-onSecondaryContainer hover:bg-secondaryContainer/80 "
  } else if (variant === "destructive") {
    baseStyles += "border-transparent bg-error text-onError shadow hover:bg-error/80 "
  } else if (variant === "outline") {
    baseStyles += "text-onSurface border border-outlineVariant "
  } else if (variant === "success") {
    baseStyles += "border-transparent bg-emerald-500/20 text-emerald-800 "
  } else if (variant === "warning") {
    baseStyles += "border-transparent bg-amber-500/20 text-amber-800 "
  }

  return (
    <div className={`${baseStyles} ${className}`} {...props} />
  )
}
