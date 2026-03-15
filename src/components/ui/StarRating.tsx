import * as React from "react"
import { Star } from "lucide-react"

export interface StarRatingProps {
  rating: number; // 0 to 5
  maxStars?: number;
  size?: number;
  className?: string;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

export function StarRating({ 
  rating, 
  maxStars = 5, 
  size = 20, 
  className = "",
  onRatingChange,
  readOnly = true
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const value = i + 1;
        const isFilled = rating >= value;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => onRatingChange?.(value)}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'} focus:outline-none`}
          >
            <Star 
              size={size} 
              className={isFilled ? "fill-primaryContainer text-primaryContainer" : "text-outlineVariant/50 fill-surfaceContainerLow"}
            />
          </button>
        )
      })}
    </div>
  )
}
