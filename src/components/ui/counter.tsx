import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  description?: string;
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    button: "w-7 h-7",
    icon: "w-3 h-3",
    value: "w-8 text-sm",
  },
  default: {
    button: "w-8 h-8",
    icon: "w-4 h-4",
    value: "w-10 text-base",
  },
  lg: {
    button: "w-10 h-10",
    icon: "w-5 h-5",
    value: "w-12 text-lg",
  },
};

export function Counter({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  label,
  description,
  size = "default",
  disabled = false,
  className,
}: CounterProps) {
  const canDecrement = value > min && !disabled;
  const canIncrement = value < max && !disabled;

  const handleDecrement = () => {
    if (canDecrement) {
      onChange(Math.max(min, value - step));
    }
  };

  const handleIncrement = () => {
    if (canIncrement) {
      onChange(Math.min(max, value + step));
    }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <div className="font-medium text-foreground">{label}</div>
          )}
          {description && (
            <div className="text-sm text-foreground-muted">{description}</div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          className={cn(
            "flex items-center justify-center rounded-full border border-border transition-all duration-200",
            sizes.button,
            canDecrement
              ? "text-foreground hover:border-foreground hover:bg-background-secondary"
              : "text-foreground-muted cursor-not-allowed opacity-40"
          )}
          aria-label="Decrease"
        >
          <Minus className={sizes.icon} />
        </button>

        <span
          className={cn(
            "text-center font-medium tabular-nums",
            sizes.value
          )}
        >
          {value}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          className={cn(
            "flex items-center justify-center rounded-full border border-border transition-all duration-200",
            sizes.button,
            canIncrement
              ? "text-foreground hover:border-foreground hover:bg-background-secondary"
              : "text-foreground-muted cursor-not-allowed opacity-40"
          )}
          aria-label="Increase"
        >
          <Plus className={sizes.icon} />
        </button>
      </div>
    </div>
  );
}

// Guest counter group for search widget
interface GuestCounterGroupProps {
  adults: number;
  children: number;
  infants: number;
  pets: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onInfantsChange: (value: number) => void;
  onPetsChange: (value: number) => void;
  maxGuests?: number;
  allowPets?: boolean;
  className?: string;
}

export function GuestCounterGroup({
  adults,
  children,
  infants,
  pets,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
  onPetsChange,
  maxGuests = 16,
  allowPets = true,
  className,
}: GuestCounterGroupProps) {
  const totalGuests = adults + children;

  return (
    <div className={cn("space-y-4", className)}>
      <Counter
        label="Adults"
        description="Age 13+"
        value={adults}
        onChange={onAdultsChange}
        min={1}
        max={maxGuests - children}
      />
      
      <Counter
        label="Children"
        description="Ages 2–12"
        value={children}
        onChange={onChildrenChange}
        min={0}
        max={maxGuests - adults}
      />
      
      <Counter
        label="Infants"
        description="Under 2"
        value={infants}
        onChange={onInfantsChange}
        min={0}
        max={5}
      />
      
      {allowPets && (
        <Counter
          label="Pets"
          description="Bringing a service animal?"
          value={pets}
          onChange={onPetsChange}
          min={0}
          max={3}
        />
      )}

      {totalGuests >= maxGuests && (
        <p className="text-sm text-foreground-muted">
          This place has a maximum of {maxGuests} guests, not including infants.
        </p>
      )}
    </div>
  );
}
