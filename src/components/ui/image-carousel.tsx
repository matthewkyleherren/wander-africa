"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    blurDataURL?: string;
  }>;
  aspectRatio?: "square" | "video" | "property";
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  onImageClick?: (index: number) => void;
  className?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  property: "aspect-[4/3]",
};

export function ImageCarousel({
  images,
  aspectRatio = "property",
  showArrows = true,
  showDots = true,
  autoplay = false,
  autoplayInterval = 5000,
  onImageClick,
  className,
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay
  React.useEffect(() => {
    if (!autoplay || !emblaApi || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, emblaApi, isHovered]);

  if (!images.length) return null;

  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel viewport */}
      <div
        ref={emblaRef}
        className={cn(
          "overflow-hidden rounded-xl",
          aspectRatioClasses[aspectRatio]
        )}
      >
        <div className="flex h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 h-full cursor-pointer"
              onClick={() => onImageClick?.(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollPrev();
            }}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft-md transition-all duration-200",
              "opacity-0 group-hover:opacity-100",
              "hover:bg-white hover:scale-105",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              !canScrollPrev && "hidden"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollNext();
            }}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft-md transition-all duration-200",
              "opacity-0 group-hover:opacity-100",
              "hover:bg-white hover:scale-105",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              !canScrollNext && "hidden"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {images.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                scrollTo(index);
              }}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                index === selectedIndex
                  ? "bg-white w-2.5"
                  : "bg-white/60 hover:bg-white/80"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
          {images.length > 5 && (
            <span className="text-white/80 text-xs ml-1">
              +{images.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Image counter (alternative to dots) */}
      {!showDots && images.length > 1 && (
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs">
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

// Thumbnail carousel for lightbox
interface ThumbnailCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function ThumbnailCarousel({
  images,
  selectedIndex,
  onSelect,
  className,
}: ThumbnailCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  return (
    <div ref={emblaRef} className={cn("overflow-hidden", className)}>
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={cn(
              "relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden transition-all duration-200",
              index === selectedIndex
                ? "ring-2 ring-white ring-offset-2 ring-offset-black/80"
                : "opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
