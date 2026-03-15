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
  Wrench,
  AlertCircle
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { useUserBookings } from "@/hooks/useSupabase"
import { useUserStore } from "@/store/useUserStore"
import { format } from "date-fns"

export default function BookingsPage() {
  const router = useRouter()
  const { user } = useUserStore()
  const { data: bookings = [], isLoading, error } = useUserBookings(user?.id || "")
  const [filter, setFilter] = React.useState<'active' | 'past'>('active')

  const activeStatuses = ['pending', 'confirmed', 'arrived', 'started']
  
  const filteredBookings = bookings.filter(b => {
    const isActive = activeStatuses.includes(b.status)
    return filter === 'active' ? isActive : !isActive
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'pending': return 'warning'
      case 'confirmed': return 'primary'
      case 'arrived': return 'primary'
      case 'started': return 'primary'
      case 'cancelled': return 'error'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest border-b border-outlineVariant/10 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-onSurface font-display">My Bookings</h1>
          <button className="p-2 bg-surfaceContainerLow rounded-full">
            <Search size={20} className="text-onSurfaceVariant" />
          </button>
        </div>

        <div className="flex bg-surfaceContainerLow p-1 rounded-xl">
          <button 
            onClick={() => setFilter('active')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${filter === 'active' ? 'bg-white text-primary shadow-sm' : 'text-onSurfaceVariant'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('past')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${filter === 'past' ? 'bg-white text-primary shadow-sm' : 'text-onSurfaceVariant'}`}
          >
            Past
          </button>
        </div>
      </header>

      <main className="px-6 py-6 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
             {[1, 2].map(i => <div key={i} className="h-40 bg-white/50 animate-pulse rounded-2xl" />)}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
             <div className="w-16 h-16 bg-surfaceContainerHigh rounded-full flex items-center justify-center mb-4">
               <Calendar size={32} className="text-onSurfaceVariant" />
             </div>
             <p className="text-sm font-bold text-onSurface">No {filter} bookings</p>
             <p className="text-xs text-onSurfaceVariant mt-1">Book a service to see it here.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="p-5 border-none bg-surfaceContainerLowest rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Wrench size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-onSurface">{booking.service?.name || "Service Request"}</h3>
                    <p className="text-[10px] text-onSurfaceVariant font-medium">#{booking.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(booking.status) as any} className="uppercase text-[8px] tracking-wider px-2 py-0.5">
                  {booking.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-outlineVariant/10 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  <span className="text-[11px] font-bold text-onSurface">
                    {format(new Date(booking.scheduled_at), 'dd MMM, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span className="text-[11px] font-bold text-onSurface">
                    {format(new Date(booking.scheduled_at), 'hh:mm a')}
                  </span>
                </div>
              </div>

              {booking.status === 'confirmed' || booking.status === 'arrived' ? (
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surfaceContainerLow border border-primary/20" />
                      <div>
                        <p className="text-[10px] font-bold text-onSurface">Technician Assigned</p>
                        <p className="text-[9px] text-onSurfaceVariant">Arriving in 15 mins</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-2 bg-white rounded-full text-primary shadow-sm"><Phone size={14} /></button>
                     <button className="p-2 bg-white rounded-full text-primary shadow-sm"><MessageSquare size={14} /></button>
                   </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-onSurfaceVariant text-xs">Total Paid</span>
                  <span className="text-onSurface font-bold">₹{booking.total_price}</span>
                </div>
              )}
            </Card>
          ))
        )}
      </main>
    </div>
  )
}
