'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/Button"

const SLIDES = [
  {
    title: "Expert Services at Your Doorstep",
    description: "From home cleaning to deep repairs, we bring verified professionals to you.",
    icon: Sparkles,
    color: "bg-blue-500"
  },
  {
    title: "Verified and Safe",
    description: "Every technician is background checked and trained for quality.",
    icon: ShieldCheck,
    color: "bg-success"
  },
  {
    title: "Convenient Scheduling",
    description: "Book services as per your time, even for the same day.",
    icon: Clock,
    color: "bg-accent"
  }
]

export default function OnboardingPage() {
  const [current, setCurrent] = React.useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1)
    } else {
      router.push('/login')
    }
  }

  const SlideIcon = SLIDES[current].icon

  return (
    <div className="h-screen w-full bg-surfaceContainerLowest flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -20 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center"
          >
            <div className={`w-32 h-32 ${SLIDES[current].color} rounded-[40px] flex items-center justify-center text-white mb-12 shadow-2xl shadow-current/30`}>
              <SlideIcon size={64} />
            </div>
            
            <h1 className="text-3xl font-extrabold text-onSurface font-display mb-4 tracking-tight leading-tight">
              {SLIDES[current].title}
            </h1>
            <p className="text-onSurfaceVariant font-body leading-relaxed max-w-xs">
              {SLIDES[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-10 pb-16 flex flex-col items-center gap-8">
        {/* Progress Indicators */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-outlineVariant'}`}
            />
          ))}
        </div>

        <Button 
          onClick={handleNext}
          className="w-full h-16 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 relative overflow-hidden group"
        >
          {current === SLIDES.length - 1 ? "Get Started" : "Next"}
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Button>

        <button 
          onClick={() => router.push('/login')}
          className="text-sm font-bold text-onSurfaceVariant uppercase tracking-widest hover:text-primary transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
