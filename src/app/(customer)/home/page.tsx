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
  Home as HomeIcon, 
  ChevronRight,
  Sparkles
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"
import { TopHeader } from "@/components/layout/TopHeader"
import { useUserStore } from "@/store/useUserStore"

const CATEGORIES = [
  { name: "Cleaning", icon: Sparkles, color: "bg-blue-100 text-blue-600", href: "/services/cleaning" },
  { name: "Plumbing", icon: Droplet, color: "bg-cyan-100 text-cyan-600", href: "/services/plumbing" },
  { name: "Electrical", icon: Zap, color: "bg-yellow-100 text-yellow-600", href: "/services/electrical" },
  { name: "Carpentry", icon: Wrench, color: "bg-orange-100 text-orange-600", href: "/services/carpentry" },
  { name: "Appliances", icon: Zap, color: "bg-purple-100 text-purple-600", href: "/services/appliances" },
  { name: "Painting", icon: Sparkles, color: "bg-pink-100 text-pink-600", href: "/services/painting" },
]

const FEATURED_SERVICES = [
  { 
    id: "1", 
    name: "Deep House Cleaning", 
    price: 1299, 
    rating: 4.8, 
    reviews: 124, 
    time: "3-4 hrs",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "2", 
    name: "Bathroom Plumbing Fix", 
    price: 499, 
    rating: 4.9, 
    reviews: 89, 
    time: "1-2 hrs",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400"
  }
]

export default function CustomerHome() {
  const router = useRouter()
  const { user } = useUserStore()

  return (
    <div className="min-h-screen bg-surfaceContainerLowest pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar size="md" src={user?.avatar_url} fallback={user?.full_name?.[0] || "U"} />
            <div>
              <p className="text-xs text-onSurfaceVariant font-body">Good Morning,</p>
              <h1 className="text-lg font-bold text-onSurface font-display">{user?.full_name || "Guest"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-surfaceContainerLow transition-colors relative">
              <Bell size={24} className="text-onSurface" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surfaceContainerLowest"></span>
            </button>
          </div>
        </div>

        {/* Location Selector */}
        <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-surfaceContainerLow rounded-2xl">
          <MapPin size={18} className="text-primary" />
          <span className="text-sm font-medium text-onSurface font-body">Lajpat Nagar IV, New Delhi</span>
          <ChevronRight size={16} className="text-onSurfaceVariant ml-auto" />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
          <input 
            type="text" 
            placeholder="Search for services..." 
            className="w-full pl-12 pr-4 py-4 bg-surfaceContainerHigh rounded-2xl text-onSurface font-body focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </header>

      {/* Categories */}
      <section className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-onSurface font-display">Categories</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs">View All</Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.name} 
              onClick={() => router.push(cat.href)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center transition-transform hover:scale-105 active:scale-95`}>
                <cat.icon size={28} />
              </div>
              <span className="text-xs font-medium text-onSurface font-body">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-onSurface font-display">Featured Services</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs">See More</Button>
        </div>
        <div className="space-y-4">
          {FEATURED_SERVICES.map((service) => (
            <Card key={service.id} className="p-0 overflow-hidden border-none ambient-shadow">
              <div className="flex h-32">
                <div className="w-1/3 relative">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-onSurface mb-1">{service.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                       <div className="flex items-center text-yellow-500 fill-yellow-500">
                         <Star size={12} fill="currentColor" />
                         <span className="text-[10px] font-bold ml-1 text-onSurface">{service.rating}</span>
                       </div>
                       <span className="text-[10px] text-onSurfaceVariant">({service.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-onSurfaceVariant flex items-center gap-1 font-body">
                        <Clock size={12} /> {service.time}
                      </span>
                      <p className="text-sm font-bold text-primary">₹{service.price}</p>
                    </div>
                    <Button size="sm" className="h-8 px-4 text-xs rounded-lg">Add</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  )
}
