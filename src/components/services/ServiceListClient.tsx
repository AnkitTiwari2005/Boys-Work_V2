'use client'

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useCartStore } from "@/store/useCartStore"
import { motion } from "framer-motion"

interface ServiceListClientProps {
  category: string;
  initialServices: any[];
}

export default function ServiceListClient({ category, initialServices }: ServiceListClientProps) {
  const router = useRouter()
  const { addItem, items, removeItem } = useCartStore()

  const getItemQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLowest pb-32">
      <header className="px-6 pt-12 pb-4 bg-surfaceContainerLowest sticky top-0 z-10 border-b border-outlineVariant/10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-surfaceContainerLow transition-colors">
            <ArrowLeft size={24} className="text-onSurface" />
          </button>
          <h1 className="text-xl font-bold text-onSurface font-display capitalize">{category} Services</h1>
          <button className="p-2 rounded-full hover:bg-surfaceContainerLow transition-colors ml-auto relative" onClick={() => router.push('/cart')}>
            <ShoppingCart size={24} className="text-onSurface" />
            {items.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full border border-surfaceContainerLowest">
                {items.length}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
          <input 
            type="text" 
            placeholder={`Search for ${category}...`} 
            className="w-full pl-11 pr-10 py-3 bg-surfaceContainerLow rounded-xl text-sm text-onSurface font-body focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <Filter size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {initialServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-surfaceContainerLow rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-onSurfaceVariant/40" />
             </div>
             <h3 className="text-lg font-bold text-onSurface">No services found</h3>
          </div>
        ) : (
          initialServices.map((service) => (
            <Card key={service.id} className="p-4 border-none ambient-shadow flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-md font-bold text-onSurface">{service.name}</h3>
                    <Badge variant="success" className="h-4 px-1.5 text-[8px] uppercase">Verified</Badge>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center text-yellow-500 fill-yellow-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold ml-1 text-onSurface">{service.rating}</span>
                    </div>
                    <span className="text-xs text-onSurfaceVariant font-body">₹{service.price}</span>
                  </div>
                  <p className="text-xs text-onSurfaceVariant leading-relaxed line-clamp-2">{service.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                {getItemQuantity(service.id) > 0 ? (
                  <div className="flex items-center bg-primary/10 rounded-lg p-1">
                    <button onClick={() => removeItem(service.id)} className="p-1.5 text-primary hover:bg-white rounded-md transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-primary">{getItemQuantity(service.id)}</span>
                    <button onClick={() => addItem({...service, category})} className="p-1.5 text-primary hover:bg-white rounded-md transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="h-9 px-6 rounded-lg border-primary text-primary" onClick={() => addItem({...service, category})}>
                    Add
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </main>

      {items.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-50">
          <Button className="w-full h-14 rounded-2xl flex items-center justify-between px-6" onClick={() => router.push('/cart')}>
            <span className="font-bold">View Cart ({items.length})</span>
            <span className="font-bold">₹{items.reduce((acc, i) => acc + (i.price * i.quantity), 0)}</span>
          </Button>
        </div>
      )}
    </div>
  )
}
