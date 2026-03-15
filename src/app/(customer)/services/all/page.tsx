'use client'

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Star,
  Clock,
  Wrench,
  AlertCircle
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useServices } from "@/hooks/useSupabase"
import { useCartStore } from "@/store/useCartStore"

export default function ServicesPage({ params }: { params?: { category?: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const addItem = useCartStore((state) => state.addItem)
  
  const category = params?.category || 'all'
  const searchTerm = searchParams.get('search') || ""
  
  const { data: services = [], isLoading } = useServices(category, searchTerm)

  return (
    <div className="min-h-screen bg-surfaceContainerLow">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest border-b border-outlineVariant/10 sticky top-0 z-50">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" className="rounded-full -ml-2 p-2" onClick={() => router.back()}>
            <ArrowLeft size={24} />
          </Button>
          <div>

             <h1 className="text-xl font-bold font-display text-onSurface capitalize">
               {category === 'all' ? 'All Services' : `${category} Services`}
             </h1>
             {searchTerm && (
               <p className="text-xs text-onSurfaceVariant font-bold">Results for "{searchTerm}"</p>
             )}
          </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
              <input 
                type="text" 
                placeholder="Search within this category..." 
                className="w-full pl-11 pr-4 py-3 bg-surfaceContainerLow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
              />
           </div>
           <Button variant="outline" className="rounded-xl h-11 px-3">
              <Filter size={18} />
           </Button>
        </div>
      </header>

      <main className="px-6 py-6 space-y-4">
        {isLoading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-surfaceContainerLowest animate-pulse rounded-3xl" />)
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <div className="w-16 h-16 bg-surfaceContainerHigh rounded-full flex items-center justify-center mb-6 opacity-40">
                <Search size={32} />
             </div>
             <h2 className="text-lg font-bold text-onSurface">No results found</h2>
             <p className="text-xs text-onSurfaceVariant mt-2 max-w-[200px]">Try searching with a different keyword or category.</p>
             <Button variant="ghost" className="mt-8 text-primary font-bold" onClick={() => router.push('/services/all')}>Clear all filters</Button>
          </div>
        ) : (
          services.map((service) => (
            <Card key={service.id} className="p-4 border-none bg-surfaceContainerLowest rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={service.image_url || "https://images.unsplash.com/photo-1581578731548-c64695ce6958"} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-onSurface group-hover:text-primary transition-colors pr-2 leading-tight">{service.name}</h3>
                      <Badge variant="outline" className="text-[8px] uppercase font-bold tracking-widest">{service.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500 fill-yellow-500">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-bold text-onSurface">4.8 (120+)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-onSurfaceVariant font-bold flex items-center gap-1">
                        <Clock size={12} /> {service.estimated_time}
                      </p>
                      <p className="text-lg font-extrabold text-primary">₹{service.price}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="rounded-xl px-6 h-9 font-bold shadow-lg"
                      onClick={() => addItem({
                        id: service.id,
                        name: service.name,
                        price: service.price,
                        category: service.category,
                        estimated_time: service.estimated_time,
                        image_url: service.image_url
                      })}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </main>
    </div>
  )
}
