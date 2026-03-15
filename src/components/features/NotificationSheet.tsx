'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, CheckCircle2, AlertCircle, Info, Calendar } from "lucide-react"
import { useNotifications, useMarkNotificationRead } from "@/hooks/useSupabase"
import { Button } from "@/components/ui/Button"
import { format } from "date-fns"

interface NotificationSheetProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function NotificationSheet({ isOpen, onClose, userId }: NotificationSheetProps) {
  const { data: notifications = [], isLoading } = useNotifications(userId)
  const clearMutation = useMarkNotificationRead()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-surfaceContainerLowest z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-outlineVariant/10 flex items-center justify-between pt-safe">
              <div className="flex items-center gap-2">
                <Bell className="text-primary" size={20} />
                <h2 className="text-lg font-bold font-display text-onSurface">Notifications</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surfaceContainerLow rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoading ? (
                [1, 2, 3].map(i => <div key={i} className="h-20 bg-surfaceContainerLow animate-pulse rounded-2xl" />)
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-20">
                  <Bell size={48} className="mb-4" />
                  <p className="text-sm font-bold">All caught up!</p>
                  <p className="text-[10px]">No new notifications for you.</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-4 rounded-2xl border transition-all ${n.is_read ? 'bg-surfaceContainerLowest border-outlineVariant/5 opacity-60' : 'bg-surfaceContainerLow border-primary/10 shadow-sm'}`}
                    onClick={() => !n.is_read && clearMutation.mutate({ id: n.id })}
                  >
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.title.toLowerCase().includes('success') ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                        {n.title.toLowerCase().includes('booking') ? <Calendar size={14} /> : <CheckCircle2 size={14} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-xs font-bold text-onSurface">{n.title}</h4>
                          <span className="text-[8px] text-onSurfaceVariant font-bold">
                            {format(new Date(n.created_at), "hh:mm a")}
                          </span>
                        </div>
                        <p className="text-[10px] text-onSurfaceVariant leading-relaxed">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-outlineVariant/10">
               <Button className="w-full h-12 rounded-xl text-xs font-bold" variant="outline" onClick={onClose}>
                 Close
               </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
