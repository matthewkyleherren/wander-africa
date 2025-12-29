import { Attraction } from "@/types/property";
import { MapPin, Mountain, Landmark, PartyPopper, Trees } from "lucide-react";
import Image from "next/image";

interface ActivitiesSectionProps {
  activities: Attraction[];
  className?: string;
}

function getActivityIcon(type: Attraction["type"]) {
  switch (type) {
    case "nature":
      return <Trees className="h-5 w-5" />;
    case "activity":
      return <Mountain className="h-5 w-5" />;
    case "landmark":
      return <Landmark className="h-5 w-5" />;
    case "entertainment":
      return <PartyPopper className="h-5 w-5" />;
    default:
      return <MapPin className="h-5 w-5" />;
  }
}

export function ActivitiesSection({
  activities,
  className = "",
}: ActivitiesSectionProps) {
  if (!activities || activities.length === 0) return null;

  return (
    <section className={`${className}`}>
      <h2 className="heading-2 mb-2">Things to Do</h2>
      <p className="text-stone-600 mb-6">
        Popular attractions and activities near the property
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
          >
            {activity.image && (
              <div className="relative h-48 w-full bg-stone-100">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="text-stone-500 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900 flex-1">
                  {activity.name}
                </h3>
              </div>
              <p className="text-sm text-stone-600 mb-3 line-clamp-3">
                {activity.description}
              </p>
              <div className="flex items-center gap-1 text-sm text-stone-500">
                <MapPin className="h-3.5 w-3.5" />
                <span>{activity.distance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
