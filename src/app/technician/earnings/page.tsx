'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  IndianRupee, 
  TrendingUp, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight,
  PieChart,
  Target,
  Clock,
  ArrowLeft
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BottomNav } from "@/components/layout/BottomNav"
import { motion } from "framer-motion"

const EARNINGS_HISTORY = [
  { id: 1, date: "15 Mar", job: "Deep House Cleaning", amount: 980 },
  { id: 2, date: "14 Mar", job: "Full Home Sanitization", amount: 1540 },
  { id: 3, date: "12 Mar", job: "AC Repair & Gas", amount: 2100 },
  { id: 4, date: "11 Mar", job: "Plumbing Fix", amount: 450 },
]

export default function TechnicianEarnings() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-16 pb-12 bg-gradient-to-br from-accent to-onSurface rounded-b-[40px] text-white shadow-2xl relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full -ml-16 -mb-16 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center">
           <p className="text-[10px] font-bold uppercase tracking-[4px] opacity-60 mb-2">Total Balance</p>
           <h1 className="text-4xl font-bold font-display flex items-baseline gap-1 mb-6">
             <span className="text-2xl opacity-60">₹</span>12,450
           </h1>
           
           <div className="w-full grid grid-cols-2 gap-4">
              <Card className="p-4 bg-white/10 border-none backdrop-blur-md rounded-2xl">
                 <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Today</p>
                 <p className="text-lg font-bold">₹2,450</p>
                 <div className="flex items-center gap-1 text-[10px] text-success font-bold mt-1">
                    <ArrowUpRight size={10} /> +12%
                 </div>
              </Card>
              <Card className="p-4 bg-white/10 border-none backdrop-blur-md rounded-2xl">
                 <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Items</p>
                 <p className="text-lg font-bold">14 Jobs</p>
                 <div className="flex items-center gap-1 text-[10px] opacity-60 font-bold mt-1 text-white">
                    <Clock size={10} /> 42 hrs
                 </div>
              </Card>
           </div>
        </div>
      </header>

      <main className="px-6 -mt-6 relative z-20 space-y-6">
        {/* Weekly Goal */}
        <Card className="p-6 border-none bg-surfaceContainerLowest rounded-3xl shadow-xl shadow-surfaceContainerLow/50">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Target size={20} />
                 </div>
                 <h3 className="font-bold text-onSurface">Weekly Goal</h3>
              </div>
              <span className="text-xs font-bold text-onSurfaceVariant">₹15,000</span>
           </div>
           
           <div className="w-full bg-surfaceContainerLow h-3 rounded-full mb-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "83%" }} 
                className="h-full bg-primary rounded-full shadow-lg shadow-primary/20"
              />
           </div>
           <p className="text-[10px] text-onSurfaceVariant font-bold">₹12,450 / ₹15,000 (83%)</p>
        </Card>

        {/* Earnings History */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="font-bold text-onSurface font-display text-lg">Earnings History</h3>
              <Button variant="ghost" className="text-primary text-xs font-bold">View Reports</Button>
           </div>
           
           <div className="space-y-3">
              {EARNINGS_HISTORY.map((item) => (
                <Card key={item.id} className="p-4 border-none bg-surfaceContainerLowest rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-transform">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-surfaceContainerLow rounded-xl flex flex-col items-center justify-center text-onSurfaceVariant">
                         <span className="text-[8px] font-bold uppercase">{item.date.split(' ')[1]}</span>
                         <span className="text-sm font-bold text-onSurface">{item.date.split(' ')[0]}</span>
                      </div>
                      <div>
                         <p className="text-sm font-bold text-onSurface">{item.job}</p>
                         <p className="text-[10px] text-onSurfaceVariant font-bold flex items-center gap-1">
                            <span className="w-1 h-1 bg-success rounded-full" /> Completed
                         </p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-bold text-onSurface">₹{item.amount}</p>
                      <ChevronRight size={14} className="text-onSurfaceVariant/30 ml-auto" />
                   </div>
                </Card>
              ))}
           </div>
        </section>

        <Button className="w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/10">
           Withdraw to Bank <TrendingUp size={20} />
        </Button>
      </main>

      <BottomNav />
    </div>
  )
}
