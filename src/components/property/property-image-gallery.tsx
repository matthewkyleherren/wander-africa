"use client";

import { useState } from "react";
import Image from "next/image";
import { PropertyImage } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  propertyName: string;
  onOpenLightbox?: () => void;
}

export function PropertyImageGallery({
  images,
  propertyName,
  onOpenLightbox
}: PropertyImageGalleryProps) {
  const displayImages = images.slice(0, 5);
  const totalImages = images.length;

  return (
    <section className="relative">
      {/* Desktop: Bento Grid Layout */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-2 h-[500px]">
        {/* Large image - takes up 2 columns and full height */}
        <div className="col-span-2 row-span-2 relative rounded-l-lg overflow-hidden group">
          <Image
            src={displayImages[0]?.src || ""}
            alt={displayImages[0]?.alt || propertyName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>

        {/* Grid of 4 smaller images */}
        {displayImages.slice(1, 5).map((image, index) => (
          <div
            key={image.id}
            className={`relative overflow-hidden group ${
              index === 1 || index === 3 ? "rounded-r-lg" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 768px) 25vw, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Mobile: Single large image */}
      <div className="md:hidden relative h-[400px] w-full">
        <Image
          src={displayImages[0]?.src || ""}
          alt={displayImages[0]?.alt || propertyName}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* "View all photos" button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={onOpenLightbox}
        className="absolute bottom-4 right-4 bg-white hover:bg-stone-50 text-stone-900 shadow-md border border-stone-200 gap-2"
      >
        <Grid className="h-4 w-4" />
        <span className="hidden sm:inline">View all {totalImages} photos</span>
        <span className="sm:hidden">{totalImages} photos</span>
      </Button>
    </section>
  );
}
