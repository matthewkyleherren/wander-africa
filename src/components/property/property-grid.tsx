"use client";

import { PropertyCard as PropertyCardType } from "@/types/property";
import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Home } from "lucide-react";

interface PropertyGridProps {
  properties: PropertyCardType[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function PropertyGrid({
  properties,
  loading = false,
  onLoadMore,
  hasMore = false,
  emptyMessage = "No properties found",
  className = "",
}: PropertyGridProps) {
  if (loading && properties.length === 0) {
    return <PropertyGridSkeleton />;
  }

  if (properties.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center mb-4">
          <Home className="w-8 h-8 text-foreground-muted" />
        </div>
        <h3 className="font-display text-heading-md text-foreground mb-2">
          {emptyMessage}
        </h3>
        <p className="text-body-md text-foreground-muted mb-6 text-center max-w-md">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <Button variant="outline" size="lg" onClick={() => window.location.href = "/"}>
          Explore all homes
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}

        {loading && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <PropertyCardSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Show more homes"}
            {!loading && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      )}
    </div>
  );
}

function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[4/3] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-5 w-1/3 mt-2" />
      </div>
    </div>
  );
}
