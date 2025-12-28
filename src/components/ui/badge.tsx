import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background",
        secondary:
          "bg-background-secondary text-foreground border border-border",
        accent:
          "bg-accent text-white",
        success:
          "bg-success-light text-success",
        warning:
          "bg-warning-light text-warning",
        error:
          "bg-error-light text-error",
        outline:
          "border border-border text-foreground bg-transparent",
        // Property-specific badges
        new:
          "bg-accent text-white",
        popular:
          "bg-foreground text-background",
        instant:
          "bg-success text-white",
        superhost:
          "bg-accent-muted text-accent border border-accent/20",
        rare:
          "bg-gradient-accent text-white",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1 -ml-0.5">{icon}</span>}
      {children}
    </div>
  );
}

// Pre-configured property badges
export function NewBadge({ className }: { className?: string }) {
  return (
    <Badge variant="new" className={className}>
      New
    </Badge>
  );
}

export function PopularBadge({ className }: { className?: string }) {
  return (
    <Badge variant="popular" className={className}>
      Popular
    </Badge>
  );
}

export function InstantBookBadge({ className }: { className?: string }) {
  return (
    <Badge variant="instant" className={className}>
      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
      Instant Book
    </Badge>
  );
}

export function SuperhostBadge({ className }: { className?: string }) {
  return (
    <Badge variant="superhost" className={className}>
      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      Superhost
    </Badge>
  );
}

export function RareFindBadge({ className }: { className?: string }) {
  return (
    <Badge variant="rare" className={className}>
      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      Rare Find
    </Badge>
  );
}

export { Badge, badgeVariants };
