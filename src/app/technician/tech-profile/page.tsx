'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  User, 
  Settings, 
  IndianRupee, 
  Calendar, 
  Star, 
  ShieldCheck, 
  LogOut, 
  ChevronRight,
  Briefcase,
  Clock,
  Award,
  ToggleLeft as Toggle
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { BottomNav } from "@/components/layout/BottomNav"
import { useUserStore } from "@/store/useUserStore"
import { motion } from "framer-motion"

export default function TechnicianProfile() {
  const router = useRouter()
  const { user, logout } = useUserStore()
  const [isOnline, setIsOnline] = React.useState(true)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const STATS = [
    { label: "Jobs", value: "142", icon: Briefcase, color: "text-blue-500" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-yellow-500" },
    { label: "Exp", value: "3 yrs", icon: Award, color: "text-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-16 pb-24 bg-surfaceContainerLowest rounded-b-[40px] shadow-xl shadow-surfaceContainerLow/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24" />
        
        <div className="flex flex-col items-center relative z-10">
          <div className="relative mb-4">
            <Avatar size="xl" src={user?.avatar_url} fallback={user?.full_name?.[0] || "T"} className="ring-4 ring-primary/10 shadow-2xl" />
            <div className={`absolute bottom-2 right-2 w-5 h-5 border-4 border-surfaceContainerLowest rounded-full ${isOnline ? 'bg-success' : 'bg-onSurfaceVariant/40'}`} />
          </div>
          
          <h1 className="text-2xl font-bold text-onSurface font-display mb-1">{user?.full_name || "Professional Technician"}</h1>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Expert Plumber & Electrician</p>
          
          {/* Status Toggle */}
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all border-2 ${isOnline ? 'bg-success/5 border-success text-success' : 'bg-surfaceContainerLow border-outlineVariant/20 text-onSurfaceVariant'}`}
          >
             <span className="text-sm font-bold">{isOnline ? 'Online' : 'Offline'}</span>
             <div className={`w-10 h-6 rounded-full relative transition-colors ${isOnline ? 'bg-success' : 'bg-onSurfaceVariant/30'}`}>
                <motion.div 
                   animate={{ x: isOnline ? 18 : 2 }}
                   className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
             </div>
          </button>
        </div>
      </header>

      <main className="px-6 -mt-12 relative z-20 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
           {STATS.map((stat) => (
             <Card key={stat.label} className="p-4 border-none bg-surfaceContainerLowest rounded-3xl flex flex-col items-center gap-1 shadow-lg shadow-surfaceContainerLow/50">
                <stat.icon size={18} className={stat.color} />
                <span className="text-lg font-bold text-onSurface">{stat.value}</span>
                <span className="text-[10px] font-bold text-onSurfaceVariant uppercase">{stat.label}</span>
             </Card>
           ))}
        </div>

        {/* Menu Area */}
        <Card className="p-2 border-none bg-surfaceContainerLowest rounded-3xl overflow-hidden shadow-xl shadow-surfaceContainerLow/50">
           <div className="divide-y divide-outlineVariant/5">
             {[
               { label: "Workshop Settings", icon: Settings, color: "text-blue-500", bg: "bg-blue-50" },
               { label: "Payout Accounts", icon: IndianRupee, color: "text-success", bg: "bg-success/5" },
               { label: "Working Hours", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
               { label: "Certifications", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
               { label: "Service History", icon: Briefcase, color: "text-cyan-500", bg: "bg-cyan-50" },
               { label: "Support & Legal", icon: ShieldCheck, color: "text-onSurfaceVariant", bg: "bg-surfaceContainerLow" },
             ].map((item) => (
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

        {/* Logout */}
        <Button 
          variant="ghost" 
          className="w-full h-14 rounded-2xl text-error font-bold flex items-center justify-center gap-2 hover:bg-error/5"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout Technician
        </Button>
      </main>

      <BottomNav />
    </div>
  )
}
