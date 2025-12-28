"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Grid, ChevronRight, Star, MapPin, Users, BedDouble } from "lucide-react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageCarousel } from "@/components/ui/image-carousel";

interface PropertyHeroProps {
  property: Property;
  className?: string;
}

export function PropertyHero({ property, className = "" }: PropertyHeroProps) {
  const [showLightbox, setShowLightbox] = useState(false);
  const totalImages = property.images.length;

  return (
    <div className={className}>
      {/* Breadcrumb */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>
          <ChevronRight className="w-4 h-4" />
          <a
            href={`/search?location=${property.location.state}`}
            className="hover:text-foreground transition-colors"
          >
            {property.location.state}
          </a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{property.name}</span>
        </div>
      </div>

      {/* Title and Actions */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-display-sm md:text-display-md mb-2">
            {property.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {property.reviews.averageRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-medium">
                  {property.reviews.averageRating.toFixed(1)}
                </span>
                <span className="text-foreground-muted">
                  ({property.reviews.totalCount} reviews)
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 text-foreground-muted">
              <MapPin className="w-4 h-4" />
              {property.location.city}, {property.location.state}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Image Grid - Desktop */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[500px] mb-6">
        {/* Large Image */}
        <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setShowLightbox(true)}>
          <Image
            src={property.images[0].src}
            alt={property.images[0].alt}
            fill
            className="object-cover group-hover:opacity-95 transition-opacity"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Small Images */}
        {property.images.slice(1, 5).map((img, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => setShowLightbox(true)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:opacity-95 transition-opacity"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        ))}

        {/* View All Photos Button */}
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-4 right-4 bg-white hover:bg-white/90"
          onClick={() => setShowLightbox(true)}
        >
          <Grid className="w-4 h-4 mr-2" />
          View all {totalImages} photos
        </Button>
      </div>

      {/* Image Carousel - Mobile */}
      <div className="md:hidden aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
        <ImageCarousel images={property.images} />
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-foreground-muted" />
          <span className="text-foreground">
            {property.capacity.maxGuests} guests
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-foreground-muted" />
          <span className="text-foreground">
            {property.capacity.bedrooms} bedrooms
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-foreground-muted" />
          <span className="text-foreground">{property.capacity.beds} beds</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-foreground-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 2v4M15 2v4M9 22v-4M15 22v-4" />
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
          </svg>
          <span className="text-foreground">
            {property.capacity.bathrooms} baths
          </span>
        </div>
        {property.badges.map((badge, index) => (
          <Badge key={index} variant="outline">
            {badge.replace("_", " ")}
          </Badge>
        ))}
      </div>

      {/* Lightbox Modal - Placeholder */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setShowLightbox(false)}
          >
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-5xl w-full aspect-video relative">
            <Image
              src={property.images[0].src}
              alt={property.images[0].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
