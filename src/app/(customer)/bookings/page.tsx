'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight,
  CheckCircle2,
  Timer,
  Phone,
  MessageSquare,
  Wrench
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"
import { motion } from "framer-motion"

const RECENT_BOOKINGS = [
  {
    id: "B12345",
    service: "Deep House Cleaning",
    status: "processing",
    date: "15 Mar, 2026",
    time: "4:00 PM",
    price: 1368,
    technician: {
      name: "Rajesh Kumar",
      rating: 4.8,
      avatar: "https://i.pravatar.cc/150?u=rajesh"
    }
  },
  {
    id: "B12344",
    service: "Bathroom Plumbing",
    status: "completed",
    date: "12 Mar, 2026",
    time: "10:30 AM",
    price: 568,
    technician: {
      name: "Suresh Singh",
      rating: 4.9,
      avatar: "https://i.pravatar.cc/150?u=suresh"
    }
  }
]

export default function BookingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<'active' | 'past'>('active')

  const bookings = activeTab === 'active' 
    ? RECENT_BOOKINGS.filter(b => b.status === 'processing')
    : RECENT_BOOKINGS.filter(b => b.status === 'completed')

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest border-b border-outlineVariant/10">
        <h1 className="text-2xl font-bold text-onSurface font-display mb-6">Your Bookings</h1>
        
        {/* Tabs */}
        <div className="flex bg-surfaceContainerLow p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-surfaceContainerLowest text-primary shadow-sm' : 'text-onSurfaceVariant'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'past' ? 'bg-surfaceContainerLowest text-primary shadow-sm' : 'text-onSurfaceVariant'}`}
          >
            Past
          </button>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-surfaceContainerLowest rounded-full flex items-center justify-center mb-4 border border-outlineVariant/10">
                <Calendar size={32} className="text-onSurfaceVariant/40" />
             </div>
             <h3 className="text-lg font-bold text-onSurface">No {activeTab} bookings</h3>
             <p className="text-sm text-onSurfaceVariant mt-2">Book a service to see them here.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div layout key={booking.id}>
              <Card className="p-5 border-none bg-surfaceContainerLowest rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-onSurface font-display">{booking.service}</h3>
                    <p className="text-[10px] text-onSurfaceVariant font-bold uppercase tracking-wider">Order ID: {booking.id}</p>
                  </div>
                  <Badge 
                    variant={booking.status === 'completed' ? 'success' : 'warning'}
                    className="h-6 px-3 text-[10px] rounded-full font-bold uppercase tracking-tighter"
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 py-2 border-y border-outlineVariant/10">
                   <div className="flex items-center gap-2">
                     <Calendar size={14} className="text-primary" />
                     <span className="text-xs font-medium text-onSurface">{booking.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Clock size={14} className="text-primary" />
                     <span className="text-xs font-medium text-onSurface">{booking.time}</span>
                   </div>
                </div>

                {booking.status === 'processing' && (
                  <div className="bg-primary/5 rounded-2xl p-4 flex flex-col gap-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center relative">
                           <Wrench size={18} className="text-primary" />
                           <motion.div 
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ repeat: Infinity, duration: 2 }}
                             className="absolute inset-0 rounded-full border-2 border-primary/30"
                           />
                        </div>
                        <div>
                          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Technician Status</p>
                          <p className="text-xs font-bold text-onSurface">Searching for nearest pro...</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <Button className="flex-1 h-11 rounded-xl bg-white text-onSurface border border-outlineVariant/50 font-bold text-xs" variant="outline">
                           Cancel Job
                        </Button>
                        <Button className="flex-1 h-11 rounded-xl font-bold text-xs">
                           Help Center
                        </Button>
                     </div>
                  </div>
                )}

                {booking.status === 'completed' && (
                  <div className="flex items-center justify-between pt-2">
                     <div className="flex items-center gap-3">
                        <img src={booking.technician.avatar} className="w-10 h-10 rounded-full bg-surfaceContainerLow" />
                        <div>
                           <p className="text-xs font-bold text-onSurface">{booking.technician.name}</p>
                           <p className="text-[10px] text-onSurfaceVariant">Managed your task</p>
                        </div>
                     </div>
                     <Button variant="ghost" className="h-10 text-primary font-bold text-xs px-4">
                        Rate Service
                     </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  )
}
