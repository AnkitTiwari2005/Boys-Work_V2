import * as React from "react"

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`bg-surfaceContainerHigh animate-pulse rounded-lg ${className}`}
      {...props}
    />
  )
}
