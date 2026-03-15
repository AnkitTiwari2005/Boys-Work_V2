'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Briefcase, 
  IndianRupee, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ShieldAlert,
  ChevronRight,
  MoreVertical,
  Search,
  LayoutDashboard
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { motion } from "framer-motion"

const METRICS = [
  { label: "Total Revenue", value: "₹4,24,500", icon: IndianRupee, trend: "+12.4%", status: 'up' },
  { label: "Active Bookings", value: "1,240", icon: Calendar, trend: "+8.1%", status: 'up' },
  { label: "Total Users", value: "8,540", icon: Users, trend: "+2.5%", status: 'up' },
  { label: "Technicians", value: "480", icon: Briefcase, trend: "-1.2%", status: 'down' },
]

export default function AdminDashboard() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-surfaceContainerLow flex">
      {/* Sidebar - Desktop Only in this mock */}
      <div className="w-64 bg-surfaceContainerLowest border-r border-outlineVariant/10 hidden lg:block">
         <div className="p-8">
            <h1 className="text-xl font-bold font-display text-primary flex items-center gap-2">
               <Activity size={24} /> B@W Admin
            </h1>
         </div>
         <nav className="px-4 space-y-2">
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'Bookings', icon: Calendar },
              { label: 'Technicians', icon: Briefcase },
              { label: 'Customers', icon: Users },
              { label: 'Services', icon: Activity },
              { label: 'Reports', icon: TrendingUp },
            ].map(item => (
              <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-onSurfaceVariant hover:bg-surfaceContainerLow'}`}>
                 <item.icon size={20} />
                 {item.label}
              </button>
            ))}
         </nav>
      </div>

      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-surfaceContainerLowest border-b border-outlineVariant/10 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
           <div className="flex items-center gap-4 flex-1">
              <div className="relative w-96 max-w-full">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
                 <input 
                   type="text" 
                   placeholder="Global search..." 
                   className="w-full pl-12 pr-4 py-2.5 bg-surfaceContainerLow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                 />
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-2.5 bg-surfaceContainerLow rounded-xl text-onSurfaceVariant relative">
                 <ShieldAlert size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-outlineVariant/10 text-right">
                 <div>
                    <p className="text-xs font-bold text-onSurface">Admin User</p>
                    <p className="text-[10px] text-onSurfaceVariant uppercase font-bold tracking-widest leading-none">Superuser</p>
                 </div>
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">A</div>
              </div>
           </div>
        </header>

        <div className="p-8 space-y-8">
           <div className="flex items-center justify-between">
              <div>
                 <h2 className="text-2xl font-bold font-display text-onSurface">Platform Overview</h2>
                 <p className="text-sm text-onSurfaceVariant">Real-time stats across Delhi NCR</p>
              </div>
              <Button className="h-11 rounded-xl px-6 font-bold shadow-lg">Download Report</Button>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {METRICS.map((metric) => (
                <Card key={metric.label} className="p-6 border-none bg-surfaceContainerLowest rounded-3xl shadow-xl shadow-surfaceContainerLow/50 transition-transform hover:scale-[1.02]">
                   <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-surfaceContainerLow rounded-2xl flex items-center justify-center text-primary">
                         <metric.icon size={24} />
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${metric.status === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                         {metric.status === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                         {metric.trend}
                      </div>
                   </div>
                   <p className="text-xs font-bold text-onSurfaceVariant uppercase tracking-[2px] mb-1">{metric.label}</p>
                   <h3 className="text-2xl font-bold text-onSurface">{metric.value}</h3>
                </Card>
              ))}
           </div>

           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recent Bookings List */}
              <Card className="xl:col-span-2 p-8 border-none bg-surfaceContainerLowest rounded-3xl shadow-xl shadow-surfaceContainerLow/50">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold font-display text-onSurface">Recent Bookings</h3>
                    <Button variant="ghost" className="text-primary font-bold text-sm">View All</Button>
                 </div>
                 
                 <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex items-center gap-4 p-4 hover:bg-surfaceContainerLow rounded-2xl transition-colors group">
                         <div className="w-12 h-12 bg-surfaceContainerLow rounded-xl flex items-center justify-center font-bold text-onSurfaceVariant">
                            #{1000 + i}
                         </div>
                         <div className="flex-1">
                            <p className="text-sm font-bold text-onSurface group-hover:text-primary transition-colors">Deep Cleaning - 3BHK</p>
                            <p className="text-[10px] text-onSurfaceVariant font-bold">By Ankit K. • 2 mins ago</p>
                         </div>
                         <div className="text-right flex flex-col items-end gap-2">
                            <p className="text-sm font-bold text-onSurface">₹2,450</p>
                            <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-bold uppercase tracking-wider">Pending</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>

              {/* System Health / Alert Panel */}
              <Card className="p-8 border-none bg-accent rounded-3xl text-white shadow-xl shadow-accent/20">
                 <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Activity size={20} /> System Health
                 </h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold opacity-60">
                          <span>API Latency</span>
                          <span>24ms</span>
                       </div>
                       <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <motion.div animate={{ width: "95%" }} className="h-full bg-success" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold opacity-60">
                          <span>Technician Match Rate</span>
                          <span>88%</span>
                       </div>
                       <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <motion.div animate={{ width: "88%" }} className="h-full bg-white" />
                       </div>
                    </div>
                    
                    <div className="pt-8 space-y-4">
                       <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-3">
                          <ShieldAlert size={20} className="text-yellow-400" />
                          <p className="text-xs font-medium">3 Pending technician verifications</p>
                       </div>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </main>
    </div>
  )
}
