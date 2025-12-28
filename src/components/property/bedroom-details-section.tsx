import { Bedroom, BedConfig } from "@/types/property";
import { Bed } from "lucide-react";
import Image from "next/image";

interface BedroomDetailsSectionProps {
  bedrooms: Bedroom[];
  className?: string;
}

function getBedIcon(type: BedConfig["type"]) {
  // Returns a bed icon - could be customized per type
  return <Bed className="h-5 w-5" />;
}

function formatBedConfig(beds: BedConfig[]): string {
  return beds
    .map((bed) => {
      const count = bed.count > 1 ? `${bed.count} ` : "";
      const bedType = bed.type.charAt(0).toUpperCase() + bed.type.slice(1);
      const plural = bed.count > 1 ? "s" : "";
      return `${count}${bedType}${plural}`;
    })
    .join(", ");
}

export function BedroomDetailsSection({
  bedrooms,
  className = "",
}: BedroomDetailsSectionProps) {
  if (!bedrooms || bedrooms.length === 0) return null;

  return (
    <section className={`${className}`}>
      <h2 className="heading-2 mb-6">Bedrooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bedrooms.map((bedroom) => (
          <div
            key={bedroom.id}
            className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {bedroom.image && (
              <div className="relative h-48 w-full bg-stone-100">
                <Image
                  src={bedroom.image.src}
                  alt={bedroom.image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                {bedroom.name}
              </h3>
              <div className="flex items-start gap-2 text-stone-600 mb-3">
                <Bed className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{formatBedConfig(bedroom.beds)}</span>
              </div>
              {bedroom.ensuite && (
                <p className="text-sm text-stone-500">Private bathroom</p>
              )}
              {bedroom.features && bedroom.features.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {bedroom.features.map((feature, index) => (
                    <li key={index} className="text-sm text-stone-500">
                      • {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
