import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
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
        <div className="fixed inset-0 z-[100] flex justify-center items-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-surfaceContainerLowest rounded-t-3xl shadow-[0_-12px_24px_-12px_rgba(0,0,0,0.07)] flex flex-col max-h-[90vh] pb-safe"
          >
            {/* Handle */}
            <div className="w-full flex justify-center pt-3 pb-4">
              <div className="w-12 h-1.5 bg-outlineVariant/30 rounded-full" />
            </div>
            
            {title && (
              <div className="px-6 pb-4 border-b border-outlineVariant/15">
                <h2 className="text-xl font-heading font-bold text-onSurface">{title}</h2>
              </div>
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
