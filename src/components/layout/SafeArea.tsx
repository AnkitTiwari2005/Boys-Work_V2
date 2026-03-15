import * as React from "react"

export interface SafeAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  edges?: ("top" | "bottom" | "left" | "right")[]
}

export function SafeArea({ className = "", edges = ["top", "bottom", "left", "right"], ...props }: SafeAreaProps) {
  let safeAreaClasses = ""
  if (edges.includes("top")) safeAreaClasses += "pt-safe "
  if (edges.includes("bottom")) safeAreaClasses += "pb-safe "
  if (edges.includes("left")) safeAreaClasses += "pl-safe "
  if (edges.includes("right")) safeAreaClasses += "pr-safe "

  return (
    <div className={`w-full ${safeAreaClasses} ${className}`} {...props} />
  )
}
