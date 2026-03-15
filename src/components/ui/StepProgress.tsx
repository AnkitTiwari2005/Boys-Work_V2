import * as React from "react"
import { motion } from "framer-motion"

export interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="w-full flex items-center justify-between relative px-2">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-surfaceContainer border-y border-outlineVariant/10 -z-10" />
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-10"
        initial={{ width: "0%" }}
        animate={{ width: `${(currentStep / (Math.max(1, steps.length - 1))) * 100}%` }}
        transition={{ type: "spring", damping: 20 }}
      />
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        
        return (
          <div key={step} className="flex flex-col items-center gap-2">
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isCompleted ? "bg-primary text-onPrimary shadow-ambient" : 
                isActive ? "bg-primaryContainer text-onPrimaryContainer shadow-ambient ring-2 ring-primary ring-offset-2 ring-offset-surface" : 
                "bg-surfaceContainer text-onSurfaceVariant"
              }`}
            >
              {isCompleted ? "✓" : idx + 1}
            </div>
            <span className={`text-[10px] font-body absolute -bottom-5 w-16 text-center ${isActive || isCompleted ? 'text-primary font-bold' : 'text-onSurfaceVariant'}`}>
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}
