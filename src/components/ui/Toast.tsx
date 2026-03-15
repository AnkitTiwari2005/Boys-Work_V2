import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"

export type ToastType = "success" | "error" | "info"

export interface ToastProps {
  id: string
  title: string
  message?: string
  type?: ToastType
  onClose: (id: string) => void
  duration?: number
}

export function Toast({ id, title, message, type = "info", onClose, duration = 4000 }: ToastProps) {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  let Icon = Info;
  let bgClass = "bg-surfaceContainerLowest"
  let iconClass = "text-primary"
  
  if (type === "success") {
    Icon = CheckCircle2
    iconClass = "text-emerald-500"
  } else if (type === "error") {
    Icon = AlertCircle
    bgClass = "bg-errorContainer"
    iconClass = "text-error"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className={`w-full max-w-sm rounded-xl shadow-ambient border border-outlineVariant/15 p-4 flex gap-3 ${bgClass}`}
    >
      <Icon className={`shrink-0 ${iconClass}`} size={24} />
      <div className="flex-1">
        <h4 className="font-heading font-bold text-sm text-onSurface">{title}</h4>
        {message && <p className="text-xs font-body text-onSurfaceVariant mt-1">{message}</p>}
      </div>
      <button 
        onClick={() => onClose(id)}
        className="shrink-0 text-onSurfaceVariant hover:text-onSurface transition-colors"
      >
        <X size={20} />
      </button>
    </motion.div>
  )
}
