"use client";

import { PropertyLocation } from "@/types/property";
import { MapPin, ExternalLink, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationSectionProps {
  location: PropertyLocation;
  className?: string;
}

export function LocationSection({ location, className = "" }: LocationSectionProps) {
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+000000(${location.coordinates.lng},${location.coordinates.lat})/${location.coordinates.lng},${location.coordinates.lat},12,0/800x400@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.example'}`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;

  return (
    <section className={`${className}`}>
      <h2 className="heading-2 mb-6">Location</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="relative rounded-lg overflow-hidden bg-stone-100 h-[400px]">
          {/* Static map - will show Mapbox map if token is configured */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${mapUrl})`,
              backgroundColor: '#e7e5e4'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(googleMapsUrl, '_blank')}
              className="bg-white hover:bg-stone-50 gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Google Maps
            </Button>
          </div>
        </div>

        {/* Location Details */}
        <div>
          <div className="space-y-4">
            <div>
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="h-5 w-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Address</h3>
                  <p className="text-stone-600">{location.address}</p>
                  <p className="text-stone-600">
                    {location.city}, {location.state} {location.country}
                  </p>
                </div>
              </div>
            </div>

            {location.parkingSpaces && (
              <div className="flex items-start gap-2">
                <Car className="h-5 w-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Parking</h3>
                  <p className="text-stone-600">
                    Free parking for up to {location.parkingSpaces} vehicles
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-stone-200">
              <p className="text-sm text-stone-600">
                <span className="font-medium">Region:</span> {location.region}
              </p>
              <p className="text-sm text-stone-600 mt-1">
                <span className="font-medium">Coordinates:</span>{" "}
                {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
              </p>
              <p className="text-sm text-stone-600 mt-1">
                <span className="font-medium">Timezone:</span> {location.timezone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
