import * as React from "react"
import Image from "next/image"

export type AvatarProps = {
  src?: string | null
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Avatar({ src, alt = "Avatar", fallback, size = "md", className = "" }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)

  let sizeClass = "w-10 h-10 text-sm"
  if (size === "sm") sizeClass = "w-8 h-8 text-xs"
  if (size === "lg") sizeClass = "w-14 h-14 text-base"
  if (size === "xl") sizeClass = "w-24 h-24 text-2xl"

  return (
    <div className={`relative flex shrink-0 overflow-hidden rounded-full bg-surfaceContainerHigh ${sizeClass} ${className}`}>
      {!imageError && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="aspect-square h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surfaceContainerHigh text-onSurfaceVariant font-body font-medium uppercase">
          {fallback || alt.charAt(0)}
        </div>
      )}
    </div>
  )
}
