import * as React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "default" | "lg";
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  className?: string;
  iconClassName?: string;
}

const sizeClasses = {
  sm: "w-3 h-3",
  default: "w-4 h-4",
  lg: "w-5 h-5",
};

const textSizeClasses = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-base",
};

export function Rating({
  value,
  max = 5,
  size = "default",
  showValue = true,
  showCount = false,
  count,
  className,
  iconClassName,
}: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {/* Stars */}
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(
              sizeClasses[size],
              "fill-accent text-accent",
              iconClassName
            )}
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star
              className={cn(
                sizeClasses[size],
                "text-accent/30",
                iconClassName
              )}
            />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={cn(
                  sizeClasses[size],
                  "fill-accent text-accent",
                  iconClassName
                )}
              />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(
              sizeClasses[size],
              "text-accent/30",
              iconClassName
            )}
          />
        ))}
      </div>

      {/* Value */}
      {showValue && (
        <span className={cn("font-medium text-foreground", textSizeClasses[size])}>
          {value.toFixed(1)}
        </span>
      )}

      {/* Count */}
      {showCount && count !== undefined && (
        <span className={cn("text-foreground-muted", textSizeClasses[size])}>
          ({count})
        </span>
      )}
    </div>
  );
}

// Compact rating for cards
interface CompactRatingProps {
  value: number;
  count?: number;
  className?: string;
}

export function CompactRating({ value, count, className }: CompactRatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
      <span className="text-sm font-medium">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-sm text-foreground-muted">({count})</span>
      )}
    </div>
  );
}

// Rating bar for review breakdowns
interface RatingBarProps {
  label: string;
  value: number;
  max?: number;
  className?: string;
}

export function RatingBar({ label, value, max = 5, className }: RatingBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-sm text-foreground-secondary w-28 flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-background-tertiary rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

// Interactive rating input
interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function RatingInput({
  value,
  onChange,
  max = 5,
  size = "default",
  className,
}: RatingInputProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const displayValue = hoverValue ?? value;

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => setHoverValue(null)}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = displayValue >= starValue;

        return (
          <button
            key={i}
            type="button"
            className="p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            onMouseEnter={() => setHoverValue(starValue)}
            onClick={() => onChange(starValue)}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "fill-accent text-accent" : "text-accent/30",
                "transition-colors"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
