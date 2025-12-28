import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { PropertyCard as PropertyCardType } from "@/types/property";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: PropertyCardType;
  className?: string;
}

export function PropertyCard({ property, className = "" }: PropertyCardProps) {
  const badgeStyles = {
    new: "bg-accent text-white",
    popular: "bg-foreground text-background",
    instant_book: "bg-success text-white",
    superhost: "bg-accent-dark text-white",
    rare_find: "bg-accent-light text-white",
    guest_favorite: "bg-foreground text-background",
  };

  const primaryBadge = property.badges[0];

  // Map string array to ImageCarousel format
  const carouselImages = property.images.map((src, index) => ({
    src,
    alt: `${property.name} - Image ${index + 1}`,
  }));

  return (
    <Link
      href={`/property/${property.slug}`}
      className={`group block ${className}`}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-background-secondary mb-3">
        <ImageCarousel images={carouselImages} />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: Add to wishlist logic
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft-sm hover:bg-white hover:scale-110 transition-all z-10"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4 text-foreground" />
        </button>

        {/* Badge Overlay */}
        {primaryBadge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className={badgeStyles[primaryBadge]}>
              {primaryBadge === "new" && "New"}
              {primaryBadge === "popular" && "Popular"}
              {primaryBadge === "instant_book" && "Instant Book"}
              {primaryBadge === "superhost" && "Superhost"}
              {primaryBadge === "rare_find" && "Rare Find"}
              {primaryBadge === "guest_favorite" && "Guest Favorite"}
            </Badge>
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="space-y-1">
        {/* Name and Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {property.name}
          </h3>
          {property.rating && (
            <div className="flex items-center gap-1 text-sm flex-shrink-0">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-medium text-foreground">
                {property.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Location */}
        <p className="text-sm text-foreground-muted">
          {property.location.city}, {property.location.state}
        </p>

        {/* Capacity */}
        <p className="text-sm text-foreground-muted">
          {property.capacity.guests} guests · {property.capacity.bedrooms} beds
          · {property.capacity.bathrooms} baths
        </p>

        {/* Price */}
        <p className="text-foreground font-medium pt-1">
          ${property.price.toLocaleString()}{" "}
          <span className="font-normal text-foreground-muted">/ night</span>
        </p>
      </div>
    </Link>
  );
}
