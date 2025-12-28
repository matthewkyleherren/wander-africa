"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PropertyImage } from "@/types/property";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: PropertyImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-none">
        <div className="relative w-full h-[95vh] flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* Main image */}
          <div className="relative w-full h-full flex items-center justify-center p-12">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </div>

          {/* Next button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 overflow-x-auto">
            <div className="flex gap-2 justify-center min-w-max">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden transition-all ${
                    index === currentIndex
                      ? "ring-2 ring-white opacity-100"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
