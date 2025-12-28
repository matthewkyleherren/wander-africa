import Image from "next/image";
import { SearchWidget } from "@/components/search/search-widget";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80"
          alt="Luxury beach house with ocean view"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1 className="font-display text-display-lg md:text-display-xl mb-4 text-balance animate-fade-in-up">
          Find your happy place
        </h1>
        <p className="text-body-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fade-in-up [animation-delay:200ms]">
          Luxury vacation homes with hotel-grade amenities, inspiring views, and
          24/7 concierge service.
        </p>

        {/* Search Widget */}
        <div className="animate-fade-in-up [animation-delay:400ms]">
          <SearchWidget variant="hero" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-sm">Explore</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
}
