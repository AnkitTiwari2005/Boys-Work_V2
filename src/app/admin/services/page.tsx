'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Activity, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  Sparkles, 
  Droplet, 
  Zap, 
  Wrench,
  MoreVertical,
  ArrowLeft,
  IndianRupee
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_SERVICES = [
  { id: "s1", name: "Deep House Cleaning", price: 1299, category: "Cleaning", active: true, icon: Sparkles, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "s2", name: "Bathroom Plumbing Fix", price: 499, category: "Plumbing", active: true, icon: Droplet, color: "text-cyan-500", bg: "bg-cyan-50" },
  { id: "s3", name: "AC Repair & Gas", price: 2100, category: "Appliances", active: false, icon: Zap, color: "text-purple-500", bg: "bg-purple-50" },
  { id: "s4", name: "Carpentry Repair", price: 350, category: "Carpentry", active: true, icon: Wrench, color: "text-orange-500", bg: "bg-orange-50" },
]

export default function ServiceManagement() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-surfaceContainerLow">
       <header className="bg-surfaceContainerLowest border-b border-outlineVariant/10 px-8 py-6 sticky top-0 z-50">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="lg:hidden p-2 -ml-2 rounded-full hover:bg-surfaceContainerLow transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold font-display text-onSurface">Services Catalog</h1>
            </div>
            <Button className="h-11 rounded-xl px-6 font-bold shadow-lg flex items-center gap-2">
               <Plus size={18} /> New Service
            </Button>
         </div>

         <div className="flex items-center gap-4">
            <div className="relative flex-1">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-onSurfaceVariant" />
               <input 
                 type="text" 
                 placeholder="Search services, categories..." 
                 className="w-full pl-12 pr-4 py-3 bg-surfaceContainerLow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent"
               />
            </div>
            <div className="flex gap-2">
               {['All', 'Cleaning', 'Plumbing', 'Appliances', 'Carpentry'].map(cat => (
                 <button key={cat} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${cat === 'All' ? 'bg-primary text-white shadow-md' : 'bg-surfaceContainerLowest text-onSurfaceVariant hover:bg-surfaceContainerLow'}`}>
                    {cat}
                 </button>
               ))}
            </div>
         </div>
      </header>

      <main className="p-8">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
               {MOCK_SERVICES.map((service) => (
                  <motion.div 
                    layout 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                     <Card className="p-0 border-none bg-surfaceContainerLowest rounded-[32px] overflow-hidden shadow-xl shadow-surfaceContainerLow/50 transition-all hover:shadow-2xl hover:-translate-y-1 group">
                        <div className="p-6">
                           <div className="flex justify-between items-start mb-6">
                              <div className={`w-14 h-14 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center shadow-inner`}>
                                 <service.icon size={28} />
                              </div>
                              <button className="p-2 text-onSurfaceVariant hover:text-primary transition-colors">
                                 <MoreVertical size={18} />
                              </button>
                           </div>

                           <div className="mb-6">
                              <h3 className="text-lg font-bold text-onSurface mb-1 group-hover:text-primary transition-colors">{service.name}</h3>
                              <p className="text-xs font-bold text-onSurfaceVariant uppercase tracking-widest">{service.category}</p>
                           </div>

                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-xs font-bold text-onSurfaceVariant uppercase tracking-tighter">Base Price</p>
                                 <p className="text-xl font-bold text-onSurface flex items-center">
                                    <IndianRupee size={16} /> {service.price}
                                 </p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                 <span className={`text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${service.active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                    {service.active ? 'Active' : 'Paused'}
                                 </span>
                              </div>
                           </div>
                        </div>
                        
                        <div className="flex border-t border-outlineVariant/5">
                           <button className="flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold text-onSurfaceVariant hover:bg-primary/5 hover:text-primary transition-all border-r border-outlineVariant/5">
                              <Edit3 size={14} /> Edit
                           </button>
                           <button className="flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold text-error hover:bg-error/5 transition-all">
                              <Trash2 size={14} /> Delete
                           </button>
                        </div>
                     </Card>
                  </motion.div>
               ))}
            </AnimatePresence>
            
            {/* Add New State */}
            <button className="border-2 border-dashed border-outlineVariant/30 rounded-[32px] h-full min-h-[250px] flex flex-col items-center justify-center gap-3 group hover:border-primary/50 transition-all hover:bg-primary/5 p-6">
               <div className="w-16 h-16 bg-surfaceContainerLow rounded-full flex items-center justify-center text-onSurfaceVariant group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                  <Plus size={32} />
               </div>
               <p className="text-sm font-bold text-onSurfaceVariant group-hover:text-primary transition-colors">Add New Service</p>
            </button>
         </div>
      </main>
    </div>
  )
}
