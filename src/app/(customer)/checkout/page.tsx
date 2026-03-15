'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Wallet, 
  CheckCircle2,
  Calendar,
  Clock,
  MapPin
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useCartStore } from "@/store/useCartStore"
import { useUserStore } from "@/store/useUserStore"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { useUserProfile } from "@/hooks/useSupabase"

export default function CheckoutPage() {
  const router = useRouter()
  const supabase = createClient()
  const { items, totalAmount, clearCart } = useCartStore()
  const { user } = useUserStore()
  const { data: profile } = useUserProfile(user?.id || "")
  
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [address, setAddress] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (profile?.address) {
      setAddress(profile.address)
    }
  }, [profile])


  const handlePayment = async () => {
    if (!address) {
      setError("Please enter your service address")
      return
    }
    if (!user) {
      setError("Please login to continue")
      router.push('/login')
      return
    }

    setIsProcessing(true)
    setError(null)
    
    try {
      // 1. Simulate Payment Delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 2. Create Bookings in Supabase
      const scheduledAt = new Date()
      scheduledAt.setHours(scheduledAt.getHours() + 2) // Default to 2 hours from now

      const bookings = items.map(item => ({
        customer_id: user.id,
        service_id: item.id,
        total_price: item.price * item.quantity,
        address: address,
        scheduled_at: scheduledAt.toISOString(),
        status: 'pending',
        payment_status: 'paid'
      }))

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert(bookings)

      if (bookingError) throw bookingError

      setIsProcessing(false)
      setIsSuccess(true)
      clearCart()
      
    } catch (err: any) {
      setIsProcessing(false)
      setError(err.message || "Something went wrong. Please try again.")
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-surfaceContainerLowest flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} className="text-success" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-onSurface mb-2 font-display">Booking Confirmed!</h1>
        <p className="text-sm text-onSurfaceVariant mb-12 max-w-xs font-body">
          Your service has been scheduled. A technician will be assigned shortly.
        </p>

        <Card className="w-full p-6 border-none bg-surfaceContainerLow rounded-3xl mb-12 space-y-4">
           <div className="flex items-center justify-between text-sm">
             <span className="text-onSurfaceVariant">Status</span>
             <span className="text-success font-bold uppercase tracking-wider text-[10px]">Paid & Processing</span>
           </div>
           <div className="flex items-center justify-between text-sm">
             <span className="text-onSurfaceVariant">Order ID</span>
             <span className="text-onSurface font-bold">#BW-{Math.floor(Math.random() * 900000) + 100000}</span>
           </div>
        </Card>

        <div className="w-full space-y-4">
           <Button className="w-full h-14 rounded-2xl font-bold" onClick={() => router.push('/bookings')}>
             Track My Bookings
           </Button>
           <Button variant="ghost" className="w-full h-14 rounded-2xl font-bold text-primary" onClick={() => router.push('/home')}>
             Back to Home
           </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest border-b border-outlineVariant/10 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-surfaceContainerLow transition-colors" disabled={isProcessing}>
            <ArrowLeft size={24} className="text-onSurface" />
          </button>
          <h1 className="text-xl font-bold text-onSurface font-display">Checkout</h1>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Summary */}
        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
           <div className="flex justify-between items-end">
             <div>
               <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Total to pay</p>
               <h2 className="text-3xl font-bold text-onSurface">₹{totalAmount + 69}</h2>
             </div>
             <p className="text-[10px] text-onSurfaceVariant font-medium">Incl. Taxes & Fees</p>
           </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-onSurface px-1 flex items-center gap-2">
            <MapPin size={16} className="text-primary" /> Service Address
          </h3>
          <Input 
            placeholder="House No, Building, Area, Pincode" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={isProcessing}
            error={error && address === "" ? error : undefined}
          />
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-onSurface px-1 flex items-center gap-2">
            <CreditCard size={16} className="text-primary" /> Payment Method
          </h3>
          <Card className="p-4 border-2 border-primary bg-primary/2 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <CreditCard size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-onSurface">Card ending in 4242</p>
              <p className="text-[10px] text-onSurfaceVariant">Visa • Secure</p>
            </div>
            <CheckCircle2 size={20} className="text-primary" />
          </Card>
        </div>

        {/* Scheduling Info */}
        <div className="p-4 bg-surfaceContainerLowest rounded-2xl flex items-center gap-4 border border-outlineVariant/10">
           <div className="w-10 h-10 bg-surfaceContainerLow rounded-full flex items-center justify-center text-primary">
              <Clock size={20} />
           </div>
           <div>
              <p className="text-xs font-bold text-onSurface">Fastest Available Visit</p>
              <p className="text-[10px] text-onSurfaceVariant">Professional will arrive within 2 hours</p>
           </div>
        </div>

        {error && address !== "" && (
          <p className="text-xs text-error font-bold text-center">{error}</p>
        )}

        <div className="flex items-center justify-center gap-2 py-2">
           <Lock size={12} className="text-onSurfaceVariant" />
           <p className="text-[10px] text-onSurfaceVariant font-medium">SSL Encrypted Payment</p>
        </div>
      </main>

      {/* Pay Button */}
      <div className="px-6 fixed bottom-8 left-0 right-0">
        <Button 
          className="w-full h-16 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20"
          disabled={isProcessing}
          onClick={handlePayment}
        >
          {isProcessing ? "Processing Booking..." : `Pay & Book Now`}
        </Button>
      </div>
    </div>
  )
}
