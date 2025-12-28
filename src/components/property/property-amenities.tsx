"use client";

import { useState } from "react";
import { Wifi, Tv, Wind, Car, Waves, Dumbbell, Coffee, Flame, Check } from "lucide-react";
import { Amenity, AmenityCategory } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PropertyAmenitiesProps {
  amenities: Amenity[];
  className?: string;
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-5 h-5" />,
  tv: <Tv className="w-5 h-5" />,
  ac: <Wind className="w-5 h-5" />,
  parking: <Car className="w-5 h-5" />,
  pool: <Waves className="w-5 h-5" />,
  gym: <Dumbbell className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  fireplace: <Flame className="w-5 h-5" />,
};

const categoryLabels: Record<AmenityCategory, string> = {
  general: "General",
  kitchen: "Kitchen",
  entertainment: "Entertainment",
  outdoor: "Outdoor",
  wellness: "Wellness",
  workspace: "Workspace",
  safety: "Safety",
  accessibility: "Accessibility",
  climate: "Climate Control",
  parking: "Parking",
};

export function PropertyAmenities({
  amenities,
  className = "",
}: PropertyAmenitiesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayAmenities = amenities.slice(0, 8);

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<AmenityCategory, Amenity[]>);

  return (
    <div className={`py-8 border-b border-border ${className}`}>
      <h2 className="font-display text-heading-lg mb-6">
        What this place offers
      </h2>

      {/* Grid of Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {displayAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-3">
            <div className="text-foreground-muted">
              {amenityIcons[amenity.icon] || <Check className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-foreground">{amenity.name}</div>
              {amenity.description && (
                <div className="text-sm text-foreground-muted">
                  {amenity.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      {amenities.length > 8 && (
        <Button variant="outline" onClick={() => setShowAll(true)}>
          Show all {amenities.length} amenities
        </Button>
      )}

      {/* All Amenities Modal */}
      <Dialog open={showAll} onOpenChange={setShowAll}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-heading-lg">
              All amenities
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8 mt-6">
            {Object.entries(groupedAmenities).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-medium text-foreground mb-4">
                  {categoryLabels[category as AmenityCategory]}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((amenity) => (
                    <div key={amenity.id} className="flex items-start gap-3">
                      <div className="text-foreground-muted mt-0.5">
                        {amenityIcons[amenity.icon] || (
                          <Check className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="text-foreground">{amenity.name}</div>
                        {amenity.description && (
                          <div className="text-sm text-foreground-muted">
                            {amenity.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
