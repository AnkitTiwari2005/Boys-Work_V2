import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
           <label className="text-sm font-body text-onSurfaceVariant">
             {label}
           </label>
        )}
        <input
          ref={ref}
          className={`h-12 w-full rounded-lg bg-surfaceContainerLowest border border-outlineVariant/15 px-4 font-body text-onSurface placeholder:text-onSurfaceVariant/50 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-colors disabled:opacity-50 disabled:bg-surfaceContainerLow ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-error font-body">{error}</span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"
