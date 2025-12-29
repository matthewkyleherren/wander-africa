import { PropertyCapacity } from "@/types/property";
import { Users, Bed, Bath } from "lucide-react";

interface PropertyQuickStatsProps {
  capacity: PropertyCapacity;
  className?: string;
}

export function PropertyQuickStats({ capacity, className = "" }: PropertyQuickStatsProps) {
  return (
    <div className={`flex items-center gap-4 text-stone-600 ${className}`}>
      <div className="flex items-center gap-1.5">
        <Users className="h-4 w-4" />
        <span className="text-sm">{capacity.maxGuests} guests</span>
      </div>
      <span className="text-stone-300">•</span>
      <div className="flex items-center gap-1.5">
        <Bed className="h-4 w-4" />
        <span className="text-sm">{capacity.beds} beds</span>
      </div>
      <span className="text-stone-300">•</span>
      <div className="flex items-center gap-1.5">
        <Bath className="h-4 w-4" />
        <span className="text-sm">{capacity.bathrooms} bathrooms</span>
      </div>
      {capacity.squareFeet && (
        <>
          <span className="text-stone-300">•</span>
          <span className="text-sm">{capacity.squareFeet.toLocaleString()} sq ft</span>
        </>
      )}
    </div>
  );
}
