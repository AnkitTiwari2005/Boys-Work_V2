'use client'

import * as React from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { SafeArea } from "@/components/layout/SafeArea"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-surface">
      <div className="pb-[calc(80px+env(safe-area-inset-bottom))]">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
