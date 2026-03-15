import * as React from "react"

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-surfaceContainerLowest rounded-3xl p-6 transition-all hover:ambient-shadow ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"
