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
  Sparkles
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useCartStore } from "@/store/useCartStore"
import { motion, AnimatePresence } from "framer-motion"

export default function CheckoutPage() {
  const router = useRouter()
  const { totalAmount, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)
    clearCart()
    // In a real app, we would create the booking in Supabase here
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
          Your service has been scheduled. A technician will be assigned shortly and arrive at your location.
        </p>

        <Card className="w-full p-6 border-none bg-surfaceContainerLow rounded-3xl mb-12 space-y-4">
           <div className="flex items-center justify-between text-sm">
             <span className="text-onSurfaceVariant">Order Status</span>
             <span className="text-success font-bold uppercase tracking-wider text-[10px]">Processing</span>
           </div>
           <div className="flex items-center justify-between text-sm">
             <span className="text-onSurfaceVariant">Visit Time</span>
             <span className="text-onSurface font-bold">Today, 4:00 PM</span>
           </div>
           <div className="flex items-center justify-between text-sm">
             <span className="text-onSurfaceVariant">Payment Method</span>
             <span className="text-onSurface font-bold">Credit Card</span>
           </div>
        </Card>

        <div className="w-full space-y-4">
           <Button className="w-full h-14 rounded-2xl font-bold" onClick={() => router.push('/bookings')}>
             Track Booking
           </Button>
           <Button variant="ghost" className="w-full h-14 rounded-2xl font-bold text-primary" onClick={() => router.push('/home')}>
             Back to Home
           </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-12">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest border-b border-outlineVariant/10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-surfaceContainerLow transition-colors" disabled={isProcessing}>
            <ArrowLeft size={24} className="text-onSurface" />
          </button>
          <h1 className="text-xl font-bold text-onSurface font-display">Secure Checkout</h1>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Payment Summary */}
        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
           <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Total to pay</p>
           <h2 className="text-3xl font-bold text-onSurface">₹{totalAmount + 49 + 20}</h2>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-onSurface px-1">Payment Method</h3>
          
          <button className="w-full group">
            <Card className="p-4 border-2 border-primary bg-primary/2 rounded-2xl flex items-center gap-4 transition-all">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <CreditCard size={24} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-onSurface">Credit / Debit Card</p>
                <p className="text-xs text-onSurfaceVariant">Ending in 4242</p>
              </div>
              <CheckCircle2 size={24} className="text-primary" />
            </Card>
          </button>

          <button className="w-full group opacity-60">
            <Card className="p-4 border border-outlineVariant/30 bg-surfaceContainerLowest rounded-2xl flex items-center gap-4 transition-all">
              <div className="w-12 h-12 bg-surfaceContainerHigh rounded-xl flex items-center justify-center text-onSurfaceVariant">
                <Wallet size={24} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-onSurface">UPI / Google Pay</p>
                <p className="text-xs text-onSurfaceVariant">Coming Soon</p>
              </div>
            </Card>
          </button>
        </div>

        {/* Scheduling */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-onSurface px-1">Schedule Visit</h3>
          <div className="grid grid-cols-2 gap-4">
             <Card className="p-4 bg-surfaceContainerLowest border-none rounded-2xl items-center flex flex-col gap-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Calendar size={18} /></div>
                <p className="text-xs font-bold">Today, 15 Mar</p>
             </Card>
             <Card className="p-4 bg-surfaceContainerLowest border-none rounded-2xl items-center flex flex-col gap-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Clock size={18} /></div>
                <p className="text-xs font-bold">4:00 PM Slot</p>
             </Card>
          </div>
        </div>

        {/* Security Info */}
        <div className="flex items-center justify-center gap-2 py-4">
           <Lock size={14} className="text-onSurfaceVariant" />
           <p className="text-[10px] text-onSurfaceVariant font-medium">Secure SSL Encrypted Payment</p>
        </div>
      </main>

      {/* Pay Button */}
      <div className="px-6 fixed bottom-8 left-0 right-0">
        <Button 
          className="w-full h-16 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 relative overflow-hidden"
          disabled={isProcessing}
          onClick={handlePayment}
        >
          {isProcessing ? (
             <div className="flex items-center gap-2">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                 className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
               />
               Processing...
             </div>
          ) : (
            `Pay ₹${totalAmount + 49 + 20}`
          )}
          {isProcessing && (
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white/10"
            />
          )}
        </Button>
      </div>
    </div>
  )
}
