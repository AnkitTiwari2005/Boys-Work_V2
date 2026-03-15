'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search, 
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  MapPin,
  ChevronRight
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useAllBookings } from "@/hooks/useSupabase"
import { format } from "date-fns"

export default function AdminBookingsPage() {
  const router = useRouter()
  const { data: bookings = [], isLoading } = useAllBookings()
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredBookings = bookings.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.service?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customer?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusVariant = (status: string): "success" | "warning" | "default" | "outline" | "destructive" => {
    switch (status) {
      case 'completed': return 'success'
      case 'pending': return 'warning'
      case 'confirmed': return 'default'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLow flex flex-col">
      <header className="bg-surfaceContainerLowest border-b border-outlineVariant/10 px-8 py-6 sticky top-0 z-50">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin/dashboard')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold font-display text-onSurface">Global Bookings</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
            <input 
              type="text" 
              placeholder="Search by ID, Service, or Customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surfaceContainerLow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="outline" className="gap-2 rounded-xl h-12">
            <Filter size={18} /> Filters
          </Button>
        </div>
      </header>

      <main className="p-8">
        {isLoading ? (
          <div className="space-y-4">
             {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-surfaceContainerLowest animate-pulse rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-0 border-none bg-surfaceContainerLowest rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                <div className="p-6 flex flex-wrap items-center justify-between gap-6">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                        #{booking.id.slice(0,4)}
                      </div>
                      <div>
                        <h3 className="font-bold text-onSurface group-hover:text-primary transition-colors">{booking.service?.name}</h3>
                        <p className="text-xs text-onSurfaceVariant font-bold">{booking.customer?.full_name}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-12">
                      <div className="hidden md:block">
                        <div className="flex items-center gap-2 text-xs text-onSurfaceVariant mb-1">
                          <Calendar size={14} /> {format(new Date(booking.scheduled_at), 'dd MMM, yyyy')}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-onSurfaceVariant font-bold">
                          <Clock size={14} /> {format(new Date(booking.scheduled_at), 'hh:mm a')}
                        </div>
                      </div>

                      <div className="hidden lg:block text-right">
                         <p className="text-xs text-onSurfaceVariant font-bold uppercase tracking-wider mb-1">Status</p>
                         <Badge variant={getStatusVariant(booking.status)} className="uppercase text-[10px]">
                           {booking.status}
                         </Badge>
                      </div>

                      <div className="text-right">
                         <p className="text-xs text-onSurfaceVariant font-bold uppercase tracking-wider mb-1">Total</p>
                         <p className="text-sm font-bold text-onSurface">₹{booking.total_price}</p>
                      </div>

                      <Button variant="ghost" size="icon" className="rounded-full">
                         <ChevronRight size={20} />
                      </Button>
                   </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
