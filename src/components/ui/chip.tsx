import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-background-secondary text-foreground hover:bg-background-tertiary border border-transparent",
        selected:
          "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-background-secondary",
        accent:
          "bg-accent-muted text-accent hover:bg-accent/20 border border-accent/20",
        ghost:
          "text-foreground-secondary hover:text-foreground hover:bg-background-secondary",
      },
      size: {
        sm: "px-2.5 py-1 text-xs",
        default: "px-3.5 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
  selected?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, icon, selected, onRemove, disabled, children, onClick, ...props }, ref) => {
    const computedVariant = selected ? "selected" : variant;

    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          chipVariants({ variant: computedVariant, size }),
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            className="flex-shrink-0 ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onRemove();
              }
            }}
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>
    );
  }
);

Chip.displayName = "Chip";

// Chip group for category tabs
interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

function ChipGroup({ children, className }: ChipGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1",
        className
      )}
    >
      {children}
    </div>
  );
}

// Amenity chip with icon
interface AmenityChipProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function AmenityChip({ icon, label, className }: AmenityChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-secondary text-foreground-secondary text-sm",
        className
      )}
    >
      <span className="text-foreground-muted">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export { Chip, chipVariants, ChipGroup, AmenityChip };
