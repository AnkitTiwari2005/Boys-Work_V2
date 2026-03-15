'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight,
  ShieldCheck,
  Clock,
  MapPin
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { SafeArea } from "@/components/layout/SafeArea"
import { useCartStore } from "@/store/useCartStore"
import { motion, AnimatePresence } from "framer-motion"

export default function CartPage() {
  const router = useRouter()
  const { items, addItem, removeItem, clearCart, totalAmount } = useCartStore()
  const [hasHydrated, setHasHydrated] = React.useState(false)

  React.useEffect(() => {
    setHasHydrated(true)
  }, [])


  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surfaceContainerLowest flex flex-col pt-12">
        <header className="px-6 mb-12">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-surfaceContainerLow transition-colors">
            <ArrowLeft size={24} className="text-onSurface" />
          </button>
          <h1 className="text-2xl font-bold text-onSurface font-display mt-4">Your Cart</h1>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-32 h-32 bg-surfaceContainerLow rounded-full flex items-center justify-center mb-6">
            <Trash2 size={48} className="text-onSurfaceVariant/20" />
          </div>
          <h2 className="text-xl font-bold text-onSurface mb-2">Your cart is empty</h2>
          <p className="text-sm text-onSurfaceVariant mb-8 max-w-xs">
            Look like you haven't added any services yet. Start browsing to find what you need!
          </p>
          <Button 
            className="w-full h-14 rounded-2xl font-bold"
            onClick={() => router.push('/home')}
          >
            Browse Services
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-surfaceContainerLow transition-colors">
            <ArrowLeft size={24} className="text-onSurface" />
          </button>
          <h1 className="text-xl font-bold text-onSurface font-display">Your Cart</h1>
          <button 
            disabled={!hasHydrated}
            onClick={() => {
              if (!hasHydrated) return
              clearCart()
            }}
            className="ml-auto text-xs font-bold text-error hover:bg-error/5 px-2 py-1 rounded disabled:opacity-50"
          >
            Clear All
          </button>

        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Adress Info */}
        <Card className="p-4 border-none ambient-shadow bg-surfaceContainerLowest rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <MapPin size={20} />
          </div>
          <div className="flex-1">
             <p className="text-[10px] text-onSurfaceVariant font-bold uppercase tracking-wider">Service Address</p>
             <p className="text-sm text-onSurface font-medium">9 Guru Nanak Market, Lajpat Nagar IV</p>
          </div>
          <ChevronRight size={18} className="text-onSurfaceVariant" />
        </Card>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div layout key={item.id}>
              <Card className="p-4 border-none ambient-shadow bg-surfaceContainerLowest rounded-2xl overflow-hidden">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-surfaceContainerLow rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`https://source.unsplash.com/random/200x200?${item.category},${item.name}`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-onSurface mb-1">{item.name}</h3>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-2">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-onSurfaceVariant hover:text-error transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-onSurface">₹{item.price}</p>
                      
                      <div className="flex items-center bg-surfaceContainerLow rounded-lg p-1 scale-90 origin-right">
                        <button 
                          disabled={!hasHydrated}
                          onClick={() => {
                            if (!hasHydrated) return
                            removeItem(item.id)
                          }}
                          className="p-1 text-onSurfaceVariant hover:bg-white rounded-md transition-colors disabled:opacity-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-onSurface">
                          {hasHydrated ? item.quantity : "..."}
                        </span>
                        <button 
                          disabled={!hasHydrated}
                          onClick={() => {
                            if (!hasHydrated) return
                            addItem(item)
                          }}
                          className="p-1 text-onSurfaceVariant hover:bg-white rounded-md transition-colors disabled:opacity-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bill Details */}
        <Card className="p-6 border-none ambient-shadow bg-surfaceContainerLowest rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-onSurface">Bill Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-onSurfaceVariant">
              <span>Item Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm text-onSurfaceVariant">
              <span>Service Fee</span>
              <span>₹49</span>
            </div>
            <div className="flex justify-between text-sm text-onSurfaceVariant">
              <span>Safety & Hygiene Tool Fee</span>
              <span>₹20</span>
            </div>
            <div className="border-t border-dashed border-outlineVariant my-2 pt-2 flex justify-between text-md font-bold text-onSurface">
              <span>To Pay</span>
              <span className="text-primary">₹{totalAmount + 49 + 20}</span>
            </div>
          </div>
        </Card>

        {/* Trust Badge */}
        <div className="bg-success/5 rounded-2xl p-4 flex items-center gap-3 border border-success/10">
          <ShieldCheck size={24} className="text-success" />
          <p className="text-[11px] text-onSurfaceVariant font-medium leading-relaxed">
            Your booking is covered by <span className="text-success font-bold">Boys@Work Protection</span>. 
            All technicians are verified and background checked.
          </p>
        </div>
      </main>

      {/* Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surfaceContainerLowest border-t border-outlineVariant/10 px-6 py-4 pb-safe flex items-center justify-between">
        <div>
          <p className="text-[10px] text-onSurfaceVariant font-bold uppercase">Total</p>
          <p className="text-lg font-bold text-onSurface">₹{totalAmount + 49 + 20}</p>
        </div>
        <Button 
          className="h-14 px-10 rounded-2xl font-bold flex items-center gap-2"
          onClick={() => router.push('/checkout')}
        >
          Checkout <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}
