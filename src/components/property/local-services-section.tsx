import { LocalService } from "@/types/property";
import { MapPin, ShoppingCart, Pill, Fuel, Store } from "lucide-react";

interface LocalServicesSectionProps {
  services: LocalService[];
  className?: string;
}

function getServiceIcon(type: LocalService["type"]) {
  switch (type) {
    case "grocery":
      return <ShoppingCart className="h-5 w-5" />;
    case "pharmacy":
      return <Pill className="h-5 w-5" />;
    case "gas":
      return <Fuel className="h-5 w-5" />;
    case "retail":
      return <Store className="h-5 w-5" />;
    default:
      return <Store className="h-5 w-5" />;
  }
}

export function LocalServicesSection({
  services,
  className = "",
}: LocalServicesSectionProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className={`${className}`}>
      <h2 className="heading-2 mb-2">Local Services</h2>
      <p className="text-stone-600 mb-6">Grocery stores and essential services nearby</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="text-stone-500 mt-1">
                {getServiceIcon(service.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-stone-900 mb-1 truncate">
                  {service.name}
                </h3>
                <p className="text-sm text-stone-600 mb-2 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <MapPin className="h-3 w-3" />
                  <span>{service.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
