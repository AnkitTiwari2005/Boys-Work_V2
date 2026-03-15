'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  IndianRupee, 
  TrendingUp, 
  ChevronRight, 
  ArrowUpRight,
  Clock,
  Target,
  AlertCircle
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BottomNav } from "@/components/layout/BottomNav"
import { motion } from "framer-motion"
import { useUserStore } from "@/store/useUserStore"
import { useUserBookings } from "@/hooks/useSupabase"
import { format } from "date-fns"

export default function TechnicianEarnings() {
  const router = useRouter()
  const { user } = useUserStore()
  const { data: bookings = [], isLoading } = useUserBookings(user?.id || "")

  const completedJobs = bookings.filter(b => b.status === 'completed')
  const totalEarnings = completedJobs.reduce((acc, b) => acc + Number(b.total_price), 0)
  
  const today = new Date().toDateString()
  const todayEarnings = completedJobs
    .filter(b => new Date(b.created_at).toDateString() === today)
    .reduce((acc, b) => acc + Number(b.total_price), 0)

  const weeklyGoal = 15000
  const progressPercent = Math.min(Math.round((totalEarnings / weeklyGoal) * 100), 100)

  const [isWithdrawing, setIsWithdrawing] = React.useState(false)

  const handleWithdraw = async () => {
    setIsWithdrawing(true)
    await new Promise(r => setTimeout(r, 2000))
    alert(`Payout of ₹${totalEarnings} initiated successfully! It will reflect in your account within 24 hours.`)
    setIsWithdrawing(false)
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-16 pb-12 bg-gradient-to-br from-primary to-accent rounded-b-[40px] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
           <p className="text-[10px] font-bold uppercase tracking-[4px] opacity-60 mb-2">Total Earnings</p>
           <h1 className="text-4xl font-bold font-display flex items-baseline gap-1 mb-6">
             <span className="text-2xl opacity-60">₹</span>{totalEarnings.toLocaleString()}
           </h1>
           
           <div className="w-full grid grid-cols-2 gap-4">
              <Card className="p-4 bg-white/10 border-none backdrop-blur-md rounded-2xl">
                 <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Today</p>
                 <p className="text-lg font-bold">₹{todayEarnings.toLocaleString()}</p>
                 <div className="flex items-center gap-1 text-[10px] text-success font-bold mt-1">
                    <ArrowUpRight size={10} /> Live
                 </div>
              </Card>
              <Card className="p-4 bg-white/10 border-none backdrop-blur-md rounded-2xl">
                 <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Jobs</p>
                 <p className="text-lg font-bold">{completedJobs.length}</p>
                 <div className="flex items-center gap-1 text-[10px] opacity-60 font-bold mt-1 text-white">
                    <Clock size={10} /> Completed
                 </div>
              </Card>
           </div>
        </div>
      </header>

      <main className="px-6 -mt-6 relative z-20 space-y-6">
        {/* Weekly Goal */}
        <Card className="p-6 border-none bg-surfaceContainerLowest rounded-3xl shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Target size={20} />
                 </div>
                 <h3 className="font-bold text-onSurface">Weekly Goal</h3>
              </div>
              <span className="text-xs font-bold text-onSurfaceVariant">₹{weeklyGoal.toLocaleString()}</span>
           </div>
           
           <div className="w-full bg-surfaceContainerLow h-3 rounded-full mb-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${progressPercent}%` || 0 }} 
                className="h-full bg-primary rounded-full"
              />
           </div>
           <p className="text-[10px] text-onSurfaceVariant font-bold">₹{totalEarnings.toLocaleString()} earned ({progressPercent}%)</p>
        </Card>

        {/* History */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-onSurface font-display text-lg">Payout History</h3>
           </div>
           
           <div className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                   {[1, 2].map(i => <div key={i} className="h-20 bg-white/50 animate-pulse rounded-2xl" />)}
                </div>
              ) : completedJobs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl opacity-50">
                   <AlertCircle size={24} className="mx-auto mb-2" />
                   <p className="text-xs font-bold">No completed jobs yet.</p>
                </div>
              ) : (
                completedJobs.map((item) => (
                  <Card key={item.id} className="p-4 border-none bg-surfaceContainerLowest rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-surfaceContainerLow rounded-xl flex flex-col items-center justify-center text-onSurfaceVariant">
                          <span className="text-[8px] font-bold uppercase">{format(new Date(item.created_at), 'MMM')}</span>
                          <span className="text-sm font-bold text-onSurface">{format(new Date(item.created_at), 'dd')}</span>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-onSurface">{item.service?.name}</p>
                          <p className="text-[10px] text-success font-bold flex items-center gap-1">
                             <TrendingUp size={10} /> Transferred
                          </p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold text-onSurface">₹{item.total_price}</p>
                       <ChevronRight size={14} className="text-onSurfaceVariant/30 ml-auto" />
                    </div>
                  </Card>
                ))
              )}
           </div>
        </section>

        <Button 
          className="w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm" 
          disabled={totalEarnings < 500 || isWithdrawing}
          onClick={handleWithdraw}
        >
           {isWithdrawing ? "Processing..." : <>Withdraw to Bank <TrendingUp size={20} /></>}
        </Button>

      </main>

      <BottomNav />
    </div>
  )
}
