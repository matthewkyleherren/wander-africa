"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategoryTabsProps {
  categories: Category[];
  className?: string;
}

export function CategoryTabs({ categories, className = "" }: CategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`sticky top-16 md:top-20 z-40 bg-white border-b border-border ${className}`}
    >
      <div className="container-wide relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-soft-md"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}

        {/* Categories */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 py-4 overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={checkScroll}
        >
          {categories.map((category) => (
            <Chip
              key={category.id}
              selected={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex-shrink-0"
            >
              {category.name}
            </Chip>
          ))}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-soft-md"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
