import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent scrolling when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-safe pb-safe">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-surfaceContainerLowest rounded-3xl shadow-ambient overflow-hidden flex flex-col max-h-[90vh]"
          >
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-outlineVariant/15">
                <h2 className="text-lg font-heading font-bold text-onSurface">{title}</h2>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full text-onSurfaceVariant hover:bg-surfaceContainer transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            {!title && (
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-1 rounded-full text-onSurfaceVariant hover:bg-surfaceContainer bg-surfaceContainerLowest/80 backdrop-blur transition-colors"
              >
                <X size={20} />
              </button>
            )}
            <div className="p-6 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
