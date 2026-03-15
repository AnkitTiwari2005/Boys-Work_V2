import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, LogOut, Settings, Users, Briefcase, Calendar, CreditCard, PieChart } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role?: "customer" | "technician" | "admin";
}

export function Drawer({ isOpen, onClose, role = "customer" }: DrawerProps) {
  const router = useRouter()
  const pathname = usePathname()

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: PieChart },
    { name: "Technicians", href: "/admin/technicians", icon: Users },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
  ]

  const links = role === "admin" ? adminLinks : []

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-4/5 max-w-sm h-full bg-surfaceContainerLowest shadow-[12px_0_24px_-12px_rgba(0,0,0,0.07)] flex flex-col pt-safe pb-safe"
          >
            <div className="p-6 border-b border-outlineVariant/15 flex items-center justify-between">
              <h2 className="text-xl font-heading font-extrabold text-primary">Boys@Work</h2>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-onSurfaceVariant hover:bg-surfaceContainer rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              {links.map((link) => {
                const isActive = pathname.startsWith(link.href)
                const Icon = link.icon
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      router.push(link.href)
                      onClose()
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${
                      isActive 
                      ? 'bg-primaryContainer/10 text-primary border-r-4 border-primary' 
                      : 'text-onSurface hover:bg-surfaceContainerLow'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-primary' : 'text-onSurfaceVariant'} />
                    <span className={`font-body font-medium ${isActive ? 'font-bold' : ''}`}>{link.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="p-6 border-t border-outlineVariant/15">
              <button className="flex items-center gap-4 w-full text-error hover:bg-errorContainer/20 p-2 rounded-lg transition-colors">
                <LogOut size={20} />
                <span className="font-body font-bold">Sign Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
