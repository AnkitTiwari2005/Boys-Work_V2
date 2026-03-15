'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  MapPin, 
  Clock, 
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  Navigation
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"
import { motion, AnimatePresence } from "framer-motion"
import { useUserStore } from "@/store/useUserStore"
import { useTechnicianJobs, useUpdateBookingStatus, useUserProfile } from "@/hooks/useSupabase"
import { format } from "date-fns"

export default function TechnicianJobs() {
  const router = useRouter()
  const { user } = useUserStore()
  const { data: profile } = useUserProfile(user?.id || "")
  const [activeTab, setActiveTab] = React.useState<'active' | 'requests'>('active')

  const techCategory = profile?.technician?.[0]?.service_category || 'cleaning'
  const { data: allJobs = [], isLoading } = useTechnicianJobs(techCategory, user?.id)
  const { mutate: updateStatus } = useUpdateBookingStatus()

  const activeStatuses = ['confirmed', 'arrived', 'started']
  
  const jobs = allJobs.filter(j => {
    const isActive = activeStatuses.includes(j.status)
    return activeTab === 'active' ? isActive : !isActive
  })

  const handleAction = (bookingId: string, status: string) => {
    updateStatus({ bookingId, status, technicianId: user?.id })
  }

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest border-b border-outlineVariant/10 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
           <h1 className="text-2xl font-bold text-onSurface font-display">Job Board</h1>
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${profile?.technician?.[0]?.is_available ? 'bg-success/10 border-success/20 text-success' : 'bg-onSurfaceVariant/10 border-onSurfaceVariant/20 text-onSurfaceVariant'}`}>
              <div className={`w-2 h-2 rounded-full ${profile?.technician?.[0]?.is_available ? 'bg-success animate-pulse' : 'bg-onSurfaceVariant'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {profile?.technician?.[0]?.is_available ? 'Online' : 'Offline'}
              </span>
           </div>
        </div>
        
        <div className="flex bg-surfaceContainerLow p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-surfaceContainerLowest text-primary shadow-sm' : 'text-onSurfaceVariant'}`}
          >
            Active Jobs
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'requests' ? 'bg-surfaceContainerLowest text-primary shadow-sm' : 'text-onSurfaceVariant'}`}
          >
            New Requests
          </button>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {isLoading ? (
          <div className="space-y-4">
             {[1, 2].map(i => <div key={i} className="h-48 bg-white/50 animate-pulse rounded-3xl" />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-surfaceContainerLowest rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} className="text-onSurfaceVariant/40" />
             </div>
             <h3 className="text-lg font-bold text-onSurface">No jobs found</h3>
             <p className="text-sm text-onSurfaceVariant mt-1">Check back later or change your availability.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <motion.div layout key={job.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="p-5 border-none bg-surfaceContainerLowest rounded-3xl space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-onSurface font-display text-lg mb-1">{job.service?.name}</h3>
                    <div className="flex items-center gap-2">
                       <p className="text-[10px] text-onSurfaceVariant font-bold uppercase tracking-wider">Order #{job.id.slice(0,8)}</p>
                       <Badge variant="secondary" className="text-[8px] uppercase tracking-tighter h-4">
                         {job.status}
                       </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success flex items-center justify-end">
                       <IndianRupee size={16} /> {job.total_price}
                    </p>
                    <p className="text-[10px] text-onSurfaceVariant font-bold uppercase tracking-wider">Earnings</p>
                  </div>
                </div>

                <div className="space-y-3 bg-surfaceContainerLow/50 p-4 rounded-2xl border border-outlineVariant/10">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary">
                         <MapPin size={16} />
                      </div>
                      <p className="text-xs font-medium text-onSurface">{job.address}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary">
                         <Clock size={16} />
                      </div>
                      <p className="text-xs font-medium text-onSurface">
                        {format(new Date(job.scheduled_at), 'dd MMM, hh:mm a')}
                      </p>
                   </div>
                </div>

                <div className="flex gap-3">
                  {job.status === 'pending' && (
                    <>
                      <Button variant="ghost" className="flex-1 h-12 rounded-xl text-error font-bold text-xs" onClick={() => handleAction(job.id, 'cancelled')}>
                        Reject
                      </Button>
                      <Button className="flex-1 h-12 rounded-xl font-bold text-xs bg-success hover:bg-success/90 border-none" onClick={() => handleAction(job.id, 'confirmed')}>
                        Accept Job
                      </Button>
                    </>
                  )}
                  {job.status === 'confirmed' && (
                    <Button className="w-full h-12 rounded-xl font-bold text-xs" onClick={() => handleAction(job.id, 'arrived')}>
                      I have Arrived
                    </Button>
                  )}
                  {job.status === 'arrived' && (
                    <Button className="w-full h-12 rounded-xl font-bold text-xs" onClick={() => handleAction(job.id, 'started')}>
                      Start Service
                    </Button>
                  )}
                  {job.status === 'started' && (
                    <Button className="w-full h-12 rounded-xl font-bold text-xs bg-success border-none" onClick={() => handleAction(job.id, 'completed')}>
                      Complete Job
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  )
}
