'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Search, 
  MapPin, 
  Bell, 
  Star, 
  Clock, 
  Wrench, 
  Droplet, 
  Zap, 
  ChevronRight,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { BottomNav } from "@/components/layout/BottomNav"
import { useUserStore } from "@/store/useUserStore"
import { useServices, useUserBookings } from "@/hooks/useSupabase"
import { useCartStore } from "@/store/useCartStore"
import { Badge } from "@/components/ui/Badge"
import { NotificationSheet } from "@/components/features/NotificationSheet"
import { BottomSheet } from "@/components/ui/BottomSheet"

const CATEGORIES = [
  { name: "Cleaning", icon: Sparkles, color: "bg-blue-100 text-blue-600", href: "/services/cleaning" },
  { name: "Plumbing", icon: Droplet, color: "bg-cyan-100 text-cyan-600", href: "/services/plumbing" },
  { name: "Electrical", icon: Zap, color: "bg-yellow-100 text-yellow-600", href: "/services/electrical" },
  { name: "Carpentry", icon: Wrench, color: "bg-orange-100 text-orange-600", href: "/services/carpentry" },
  { name: "Appliances", icon: Zap, color: "bg-purple-100 text-purple-600", href: "/services/appliances" },
  { name: "Painting", icon: Sparkles, color: "bg-pink-100 text-pink-600", href: "/services/painting" },
]

const CITIES = ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"]

export default function CustomerHome() {
  const router = useRouter()
  const { user } = useUserStore()
  const addItem = useCartStore((state) => state.addItem)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [isLocationOpen, setIsLocationOpen] = React.useState(false)
  const [selectedCity, setSelectedCity] = React.useState("Delhi NCR")
  const [hasHydrated, setHasHydrated] = React.useState(false)

  React.useEffect(() => {
    setHasHydrated(true)
  }, [])

  
  const { data: services = [], isLoading: servicesLoading } = useServices()
  const { data: bookings = [] } = useUserBookings(user?.id || "")

  const activeBookings = bookings.filter(b => ['pending', 'confirmed', 'arrived', 'started'].includes(b.status))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/services/all?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLowest pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest sticky top-0 z-50 border-b border-outlineVariant/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar size="md" src={user?.avatar_url} fallback={user?.full_name?.[0] || "U"} />
            <div>
              <p className="text-xs text-onSurfaceVariant font-body">Welcome back,</p>
              <h1 className="text-lg font-bold text-onSurface font-display">{user?.full_name || "Guest"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 rounded-full hover:bg-surfaceContainerLow transition-colors relative"
            >
              <Bell size={24} className="text-onSurface" />
              {activeBookings.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surfaceContainerLowest"></span>
              )}
            </button>
          </div>
        </div>

        <NotificationSheet 
          isOpen={isNotificationsOpen} 
          onClose={() => setIsNotificationsOpen(false)} 
          userId={user?.id || ""} 
        />


        {/* Location Selector */}
        <div 
          onClick={() => setIsLocationOpen(true)}
          className="flex items-center gap-2 mb-6 px-4 py-3 bg-surfaceContainerLow rounded-2xl cursor-pointer hover:bg-surfaceContainerHigh transition-colors"
        >
          <MapPin size={18} className="text-primary" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-onSurfaceVariant uppercase tracking-widest leading-none mb-1">Service Location</p>
            <p className="text-sm font-bold text-onSurface">{selectedCity}</p>
          </div>
          <ChevronRight size={18} className="text-onSurfaceVariant" />
        </div>

        <BottomSheet isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} title="Select your City">
           <div className="space-y-2">
              {CITIES.map(city => (
                <button 
                  key={city}
                  onClick={() => { setSelectedCity(city); setIsLocationOpen(false); }}
                  className={`w-full p-4 rounded-xl text-left text-sm font-bold flex items-center justify-between ${selectedCity === city ? 'bg-primary/5 text-primary border border-primary/10' : 'hover:bg-surfaceContainerLow'}`}
                >
                  {city}
                  {selectedCity === city && <CheckCircle2 size={16} />}
                </button>
              ))}
           </div>
        </BottomSheet>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
          <input 
            type="text" 
            placeholder="Search for 'AC Repair', 'Cleaning'..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-surfaceContainerHigh rounded-2xl text-onSurface font-body focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </form>
      </header>

      {/* Active Booking Tracker */}
      {activeBookings.length > 0 && (
        <section className="px-6 mt-6 mb-8">
           <Card className="p-4 border-none bg-primary text-white rounded-3xl shadow-lg shadow-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
                      <Clock size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Ongoing Service</p>
                      <h3 className="text-sm font-bold">{activeBookings[0].service?.name}</h3>
                   </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-white font-bold h-8"
                  onClick={() => router.push(`/bookings`)}
                >
                  Track <ChevronRight size={14} />
                </Button>
              </div>
           </Card>
        </section>
      )}

      {/* Categories */}
      <section className="px-6 mb-8 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-onSurface font-display">Categories</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs font-bold">View All</Button>
        </div>
        <div className="grid grid-cols-4 gap-y-6 gap-x-4">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.name} 
              onClick={() => router.push(cat.href)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm`}>
                <cat.icon size={28} />
              </div>
              <span className="text-[10px] font-bold text-onSurface font-body uppercase tracking-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Services (Live Data) */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-onSurface font-display">Popular Services</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs font-bold" onClick={() => router.push('/services/all')}>See More</Button>
        </div>
        
        <div className="space-y-4">
          {servicesLoading ? (
             [1, 2, 3].map(i => <div key={i} className="h-32 bg-surfaceContainerHigh animate-pulse rounded-3xl" />)
          ) : services.length === 0 ? (
            <div className="text-center py-12 opacity-50">
               <AlertCircle size={24} className="mx-auto mb-2" />
               <p className="text-xs font-bold">No services available right now.</p>
            </div>
          ) : (
            services.slice(0, 5).map((service) => (
              <Card key={service.id} className="p-0 overflow-hidden border-none bg-surfaceContainerLow rounded-3xl hover:bg-surfaceContainerHigh transition-colors group">
                <div className="flex h-32">
                  <div className="w-1/3 relative overflow-hidden">
                    <img src={service.image_url || "https://images.unsplash.com/photo-1581578731548-c64695ce6958"} alt={service.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    <div className="absolute top-2 left-2">
                       <Badge className="bg-white/90 text-primary text-[8px] font-bold backdrop-blur-md">BESTSELLER</Badge>
                    </div>
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-onSurface mb-1 group-hover:text-primary transition-colors">{service.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                         <div className="flex items-center text-yellow-500">
                           <Star size={12} fill="currentColor" />
                           <span className="text-[10px] font-bold ml-1 text-onSurface">4.8</span>
                         </div>
                         <span className="text-[10px] text-onSurfaceVariant">(124 reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-onSurfaceVariant flex items-center gap-1 font-bold">
                          <Clock size={12} /> {service.estimated_time}
                        </span>
                        <p className="text-sm font-bold text-primary">₹{service.price}</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="h-8 px-4 text-[10px] font-bold rounded-xl shadow-md"
                        disabled={!hasHydrated}
                        onClick={() => {
                          if (!hasHydrated) return
                          addItem({
                            id: service.id,
                            name: service.name,
                            price: service.price,
                            category: service.category,
                            estimated_time: service.estimated_time,
                            image_url: service.image_url
                          })
                        }}
                      >
                        {hasHydrated ? "Add" : "..."}
                      </Button>

                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      <BottomNav />
    </div>
  )
}
