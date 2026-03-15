'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export interface TopHeaderProps {
  title: string
  showBack?: boolean
  rightAction?: React.ReactNode
}

export function TopHeader({ title, showBack = true, rightAction }: TopHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 h-16 bg-surfaceContainerLowest border-b border-outlineVariant/15 flex items-center px-4 justify-between pt-safe">
      <div className="flex-1 flex justify-start">
        {showBack && (
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 text-onSurface focus:outline-none active:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>
      <h1 className="flex-2 text-center font-heading font-bold text-lg text-onSurface truncate px-4">
        {title}
      </h1>
      <div className="flex-1 flex justify-end">
        {rightAction}
      </div>
    </header>
  )
}
