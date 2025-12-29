import { Restaurant } from "@/types/property";
import { MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

interface DiningRecommendationsProps {
  restaurants: Restaurant[];
  className?: string;
}

export function DiningRecommendations({
  restaurants,
  className = "",
}: DiningRecommendationsProps) {
  if (!restaurants || restaurants.length === 0) return null;

  return (
    <section className={`${className}`}>
      <h2 className="heading-2 mb-2">Dining Nearby</h2>
      <p className="text-stone-600 mb-6">
        Curated recommendations from our local concierge team
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
          >
            {restaurant.image && (
              <div className="relative h-48 w-full bg-stone-100">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  {restaurant.name}
                </h3>
                {restaurant.url && (
                  <a
                    href={restaurant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p className="text-sm text-stone-500 mb-2">{restaurant.cuisine}</p>
              <p className="text-sm text-stone-600 mb-3 line-clamp-2">
                {restaurant.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-stone-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{restaurant.distance}</span>
                </div>
                <span>{"$".repeat(restaurant.priceLevel)}</span>
                {restaurant.rating && (
                  <span>★ {restaurant.rating.toFixed(1)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
