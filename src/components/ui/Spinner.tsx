import * as React from "react"
import { Loader2 } from "lucide-react"

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function Spinner({ size = 24, className = "", ...props }: SpinnerProps) {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin text-primary ${className}`} 
      {...props} 
    />
  )
}
