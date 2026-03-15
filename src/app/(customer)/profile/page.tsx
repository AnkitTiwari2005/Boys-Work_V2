'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  User, 
  Settings, 
  CreditCard, 
  MapPin, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Star,
  Share2,
  Sparkles
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { BottomNav } from "@/components/layout/BottomNav"
import { useUserStore } from "@/store/useUserStore"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useUserStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const MENU_ITEMS = [
    { label: "Account Settings", icon: Settings, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Payment Methods", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Saved Addresses", icon: MapPin, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Notifications", icon: Bell, color: "text-red-500", bg: "bg-red-50" },
    { label: "Invite Friends", icon: Share2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Help Center", icon: HelpCircle, color: "text-cyan-500", bg: "bg-cyan-50" },
  ]

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-16 pb-12 bg-surfaceContainerLowest rounded-b-[40px] shadow-xl shadow-surfaceContainerLow/50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12" />

        <div className="flex flex-col items-center relative z-10">
          <div className="relative mb-4">
            <Avatar size="xl" src={user?.avatar_url} fallback={user?.full_name?.[0] || "U"} className="ring-4 ring-primary/10" />
            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-4 border-surfaceContainerLowest shadow-lg">
               <Settings size={14} />
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-onSurface font-display mb-1">{user?.full_name || "Guest User"}</h1>
          <p className="text-sm text-onSurfaceVariant font-body mb-4">{user?.email || "Connect your email"}</p>
          
          <div className="flex gap-4">
             <div className="px-5 py-2 bg-surfaceContainerLow rounded-full flex items-center gap-2">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-onSurface">4.9 Rating</span>
             </div>
             <div className="px-5 py-2 bg-surfaceContainerLow rounded-full flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-xs font-bold text-onSurface">Verified</span>
             </div>
          </div>
        </div>
      </header>

      <main className="px-6 -mt-8 relative z-20 space-y-6">
        {/* Menu Items */}
        <Card className="p-2 border-none bg-surfaceContainerLowest rounded-3xl overflow-hidden shadow-xl shadow-surfaceContainerLow/50">
           <div className="divide-y divide-outlineVariant/5">
             {MENU_ITEMS.map((item) => (
               <button key={item.label} className="w-full flex items-center gap-4 p-4 hover:bg-surfaceContainerLow transition-colors group">
                 <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                    <item.icon size={20} />
                 </div>
                 <span className="flex-1 text-sm font-bold text-left text-onSurface group-hover:text-primary transition-colors">{item.label}</span>
                 <ChevronRight size={18} className="text-onSurfaceVariant" />
               </button>
             ))}
           </div>
        </Card>

        {/* Loyalty Program Card */}
        <Card className="p-6 border-none bg-gradient-to-br from-primary to-accent rounded-3xl text-white relative overflow-hidden">
           <Sparkles size={120} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
           <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1">Boys@Work Gold</h3>
              <p className="text-xs opacity-80 mb-6">Enjoy 15% discount on all your future bookings and priority support.</p>
              <Button variant="secondary" className="bg-white text-primary rounded-xl px-6 h-10 text-xs font-bold shadow-lg">
                 Upgrade Now
              </Button>
           </div>
        </Card>

        {/* Logout */}
        <Button 
          variant="ghost" 
          className="w-full h-14 rounded-2xl text-error font-bold flex items-center justify-center gap-2 hover:bg-error/5"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout
        </Button>

        <p className="text-[10px] text-center text-onSurfaceVariant font-bold uppercase tracking-[4px] mt-8 opacity-40">
           Version 1.0.0 (BETA)
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
