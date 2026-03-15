'use client'

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Search, ShoppingCart, CalendarDays, User, Wrench } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const isTechnician = pathname.startsWith('/(technician)') || pathname.includes('/jobs') || pathname.includes('/earnings')

  const customerTabs = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Services", href: "/services", icon: Search },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Bookings", href: "/bookings", icon: CalendarDays },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const technicianTabs = [
    { name: "Jobs", href: "/technician/jobs", icon: Wrench },
    { name: "Earnings", href: "/technician/earnings", icon: CalendarDays },
    { name: "Profile", href: "/technician/tech-profile", icon: User },
  ]

  const tabs = isTechnician ? technicianTabs : customerTabs

  // Only show bottom nav on main screens
  if (!tabs.some(tab => pathname.includes(tab.href))) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-surfaceContainerLowest border-t border-outlineVariant/15 pb-safe flex px-2 justify-around items-center">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href)
        const Icon = tab.icon
        return (
          <button
            key={tab.name}
            onClick={() => router.push(tab.href)}
            className="flex flex-col items-center justify-center w-16 h-14 relative focus:outline-none"
          >
            <Icon 
              size={24} 
              className={`mb-1 transition-colors ${isActive ? 'text-primary' : 'text-onSurfaceVariant'}`} 
            />
            <span className={`text-[10px] font-body transition-colors ${isActive ? 'text-primary font-bold' : 'text-onSurfaceVariant'}`}>
              {tab.name}
            </span>
            {isActive && (
              <motion.div
                layoutId="bottom-nav-indicator"
                className="absolute -top-3 w-10 h-1 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
