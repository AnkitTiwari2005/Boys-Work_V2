'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight,
  CheckCircle2,
  Timer,
  Phone,
  MessageSquare,
  Wrench,
  AlertCircle,
  IndianRupee
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_JOBS = [
  {
    id: "J-9981",
    service: "Deep House Cleaning",
    status: "active",
    customer: "Ankit Kumar",
    address: "B-22, Lajpat Nagar, Delhi",
    date: "Today",
    time: "4:00 PM",
    distance: "1.2 km",
    earnings: 980
  },
  {
    id: "J-9980",
    service: "Kitchen Tap Repair",
    status: "request",
    customer: "Rohan Sharma",
    address: "A-15, Greater Kailash, Delhi",
    date: "Today",
    time: "6:30 PM",
    distance: "3.5 km",
    earnings: 350
  }
]

export default function TechnicianJobs() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<'active' | 'requests'>('active')

  const jobs = activeTab === 'active' 
    ? MOCK_JOBS.filter(j => j.status === 'active')
    : MOCK_JOBS.filter(j => j.status === 'request')

  return (
    <div className="min-h-screen bg-surfaceContainerLow pb-32">
      <header className="px-6 pt-12 pb-6 bg-surfaceContainerLowest border-b border-outlineVariant/10">
        <div className="flex items-center justify-between mb-6">
           <h1 className="text-2xl font-bold text-onSurface font-display">Job Board</h1>
           <div className="flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-success uppercase tracking-widest">Online</span>
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
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-surfaceContainerLowest rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} className="text-onSurfaceVariant/40" />
             </div>
             <h3 className="text-lg font-bold text-onSurface">No jobs found</h3>
             <p className="text-sm text-onSurfaceVariant mt-2">Check back later or change your availability.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <motion.div layout key={job.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="p-5 border-none bg-surfaceContainerLowest rounded-3xl space-y-4 shadow-xl shadow-surfaceContainerLow/50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-onSurface font-display text-lg mb-1">{job.service}</h3>
                    <div className="flex items-center gap-2">
                       <p className="text-[10px] text-onSurfaceVariant font-bold uppercase tracking-wider">Order {job.id}</p>
                       <span className="text-[10px] text-primary font-bold">• {job.distance} away</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success flex items-center justify-end">
                       <IndianRupee size={16} /> {job.earnings}
                    </p>
                    <p className="text-[10px] text-onSurfaceVariant font-bold uppercase tracking-wider">Estimated Earn</p>
                  </div>
                </div>

                <div className="space-y-3 bg-surfaceContainerLow/50 p-4 rounded-2xl border border-outlineVariant/10">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary">
                         <MapPin size={16} />
                      </div>
                      <p className="text-xs font-medium text-onSurface truncate">{job.address}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary">
                         <Clock size={16} />
                      </div>
                      <p className="text-xs font-medium text-onSurface">{job.date}, {job.time}</p>
                   </div>
                </div>

                {job.status === 'active' ? (
                  <div className="flex gap-3">
                     <Button className="flex-1 h-12 rounded-xl bg-surfaceContainerLow text-onSurface hover:bg-surfaceContainerHigh font-bold text-xs" variant="outline">
                        Navigate
                     </Button>
                     <Button className="flex-1 h-12 rounded-xl font-bold text-xs">
                        Start Job
                     </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button variant="ghost" className="flex-1 h-12 rounded-xl text-error font-bold text-xs">
                       Reject
                    </Button>
                    <Button className="flex-1 h-12 rounded-xl font-bold text-xs bg-success hover:bg-success/90 border-none">
                       Accept Job
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  )
}
