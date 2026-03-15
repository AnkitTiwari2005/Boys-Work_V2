'use client'

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Calendar, 
  Briefcase, 
  Users, 
  Activity, 
  TrendingUp,
  LogOut
} from "lucide-react"

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const items = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'Bookings', icon: '/admin/bookings' }, // Not implemented yet but for UI
    { label: 'Technicians', icon: Briefcase, href: '/admin/users' },
    { label: 'Customers', icon: Users, href: '/admin/users' },
    { label: 'Services', icon: Activity, href: '/admin/services' },
    { label: 'Reports', icon: TrendingUp, href: '/admin/dashboard' },
  ]

  return (
    <div className="w-64 bg-surfaceContainerLowest border-r border-outlineVariant/10 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <h1 className="text-xl font-bold font-display text-primary flex items-center gap-2">
          <Activity size={24} /> B@W Admin
        </h1>
      </div>
      
      <nav className="px-4 space-y-2 flex-1">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <button 
              key={item.label} 
              onClick={() => item.href && router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-onSurfaceVariant hover:bg-surfaceContainerLow'}`}
            >
              {typeof item.icon === 'string' ? <Calendar size={20} /> : <item.icon size={20} />}
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-error hover:bg-error/5 transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  )
}
