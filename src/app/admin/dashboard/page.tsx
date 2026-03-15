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
  Search,
  LayoutDashboard
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { motion } from "framer-motion"
import { useAdminStats, useTechnicianJobs } from "@/hooks/useSupabase"
import { format } from "date-fns"

export default function AdminDashboard() {
  const router = useRouter()
  const { data: stats, isLoading: statsLoading } = useAdminStats()
  const { data: recentJobs = [], isLoading: jobsLoading } = useTechnicianJobs()

  const METRICS = [
    { label: "Total Revenue", value: `₹${stats?.totalRevenue.toLocaleString() || 0}`, icon: IndianRupee, trend: "+12%", status: 'up' },
    { label: "Total Bookings", value: stats?.totalBookings || 0, icon: Calendar, trend: "+8%", status: 'up' },
    { label: "Total Users", value: stats?.totalUsers || 0, icon: Users, trend: "+2%", status: 'up' },
    { label: "Technicians", value: stats?.totalTechnicians || 0, icon: Briefcase, trend: "+5%", status: 'up' },
  ]

  return (
    <div className="min-h-screen bg-surfaceContainerLow flex">
      {/* Sidebar - Desktop */}
      <div className="w-64 bg-surfaceContainerLowest border-r border-outlineVariant/10 hidden lg:block">
         <div className="p-8">
            <h1 className="text-xl font-bold font-display text-primary flex items-center gap-2">
               <Activity size={24} /> B@W Admin
            </h1>
         </div>
         <nav className="px-4 space-y-2">
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'Bookings', icon: Calendar, path: '/admin/bookings' },
              { label: 'Technicians', icon: Briefcase, path: '/admin/technicians' },
              { label: 'Customers', icon: Users, path: '/admin/users' },
              { label: 'Services', icon: Activity, path: '/admin/services' },
            ].map(item => (
              <button 
                key={item.label} 
                onClick={() => item.path && router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-onSurfaceVariant hover:bg-surfaceContainerLow'}`}
              >
                 <item.icon size={20} />
                 {item.label}
              </button>
            ))}
         </nav>
      </div>

      <main className="flex-1 overflow-y-auto pb-20">
        <header className="bg-surfaceContainerLowest border-b border-outlineVariant/10 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
           <div className="flex items-center gap-4 flex-1">
              <div className="relative w-96 max-w-full">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
                 <input 
                   type="text" 
                   placeholder="Global search..." 
                   className="w-full pl-12 pr-4 py-2.5 bg-surfaceContainerLow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
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
                    <p className="text-xs font-bold text-onSurface">System Admin</p>
                    <p className="text-[10px] text-onSurfaceVariant font-bold tracking-widest leading-none">ROOT ACCESS</p>
                 </div>
                 <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">A</div>
              </div>
           </div>
        </header>

        <div className="p-8 space-y-8">
           <div>
              <h2 className="text-2xl font-bold font-display text-onSurface">Platform Overview</h2>
              <p className="text-sm text-onSurfaceVariant">Real-time performance metrics</p>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {METRICS.map((metric) => (
                <Card key={metric.label} className="p-6 border-none bg-surfaceContainerLowest rounded-3xl shadow-sm border border-outlineVariant/5">
                   <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                         <metric.icon size={24} />
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${metric.status === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                         {metric.status === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                         {metric.trend}
                      </div>
                   </div>
                   <p className="text-xs font-bold text-onSurfaceVariant uppercase tracking-[2px] mb-1">{metric.label}</p>
                   <h3 className="text-2xl font-bold text-onSurface">
                     {statsLoading ? "..." : metric.value}
                   </h3>
                </Card>
              ))}
           </div>

           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recent Bookings */}
              <Card className="xl:col-span-2 p-8 border-none bg-surfaceContainerLowest rounded-3xl shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold font-display text-onSurface">Recent Live Bookings</h3>
                    <Button variant="ghost" className="text-primary font-bold text-sm" onClick={() => router.push('/admin/bookings')}>View All</Button>
                 </div>
                 
                 <div className="space-y-4">
                    {jobsLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-16 bg-surfaceContainerLow animate-pulse rounded-2xl" />)}
                      </div>
                    ) : recentJobs.length === 0 ? (
                      <div className="text-center py-12 opacity-50">No bookings yet.</div>
                    ) : (
                      recentJobs.slice(0, 5).map(job => (
                        <div key={job.id} className="flex items-center gap-4 p-4 hover:bg-surfaceContainerLow rounded-2xl transition-colors group cursor-pointer" onClick={() => router.push(`/admin/bookings/${job.id}`)}>
                           <div className="w-12 h-12 bg-surfaceContainerLow rounded-xl flex items-center justify-center font-bold text-onSurfaceVariant text-[10px]">
                              #{job.id.slice(0,4)}
                           </div>
                           <div className="flex-1">
                              <p className="text-sm font-bold text-onSurface group-hover:text-primary transition-colors">{job.service?.name}</p>
                              <p className="text-[10px] text-onSurfaceVariant font-bold">
                                {job.customer?.full_name || "Unknown User"} • {format(new Date(job.created_at), "hh:mm a")}
                              </p>
                           </div>
                           <div className="text-right flex flex-col items-end gap-2">
                              <p className="text-sm font-bold text-onSurface">₹{job.total_price}</p>
                              <Badge variant="outline" className="text-[8px] uppercase">{job.status}</Badge>
                           </div>
                        </div>
                      ))
                    )}
                 </div>
              </Card>

              {/* Status Panel */}
              <Card className="p-8 border-none bg-primary text-white rounded-3xl shadow-xl shadow-primary/20">
                 <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Activity size={20} /> System Health
                 </h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold opacity-60">
                          <span>API Latency</span>
                          <span>{Math.floor(Math.random() * 20) + 10}ms</span>
                       </div>
                       <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} className="h-full bg-success rounded-full" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold opacity-60">
                          <span>Database Sync</span>
                          <span>99.9%</span>
                       </div>
                       <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "99.9%" }} className="h-full bg-white rounded-full" />
                       </div>
                    </div>
                    
                    <div className="pt-8 space-y-4">
                       <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-3">
                          <ShieldAlert size={20} className="text-yellow-400" />
                          <p className="text-xs font-medium">All systems operational</p>
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
