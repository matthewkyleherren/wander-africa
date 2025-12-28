import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text" | "button";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  const variantClasses = {
    default: "rounded-lg",
    circular: "rounded-full",
    text: "rounded h-4",
    button: "rounded-xl h-11",
  };

  return (
    <div
      className={cn(
        "skeleton bg-background-tertiary",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

// Pre-built skeleton components for common use cases

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 && "w-3/4" // Last line shorter
          )}
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return <Skeleton variant="circular" className={sizeClasses[size]} />;
}

function SkeletonImage({ aspectRatio = "property" }: { aspectRatio?: "square" | "video" | "property" }) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    property: "aspect-[4/3]",
  };

  return <Skeleton className={cn("w-full rounded-xl", aspectClasses[aspectRatio])} />;
}

// Property card skeleton
function PropertyCardSkeleton() {
  return (
    <div className="space-y-3">
      <SkeletonImage aspectRatio="property" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-5 w-24 mt-2" />
      </div>
    </div>
  );
}

// Property grid skeleton
function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Review card skeleton
function ReviewCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

// Search widget skeleton
function SearchWidgetSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2 rounded-full bg-card border border-border shadow-soft-md">
      <Skeleton className="h-12 w-32 rounded-full" />
      <div className="w-px h-6 bg-border" />
      <Skeleton className="h-12 w-32 rounded-full" />
      <div className="w-px h-6 bg-border" />
      <Skeleton className="h-12 w-32 rounded-full" />
      <Skeleton variant="circular" className="h-12 w-12 ml-2" />
    </div>
  );
}

// Amenity list skeleton
function AmenityListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circular" className="w-6 h-6" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonImage,
  PropertyCardSkeleton,
  PropertyGridSkeleton,
  ReviewCardSkeleton,
  SearchWidgetSkeleton,
  AmenityListSkeleton,
};
