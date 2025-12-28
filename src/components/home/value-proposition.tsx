"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Star, Clock, Home, Heart, Headphones } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Verified Quality",
    description:
      "Every home is hand-selected and inspected to meet our rigorous quality standards for comfort and cleanliness.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Hotel-Grade Amenities",
    description:
      "Luxury linens, fully equipped kitchens, high-speed WiFi, and premium entertainment in every property.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "24/7 Concierge",
    description:
      "Expert local concierge service available around the clock to handle reservations, activities, and special requests.",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Inspiring Locations",
    description:
      "Carefully curated properties in the world's most beautiful destinations, from beaches to mountains.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Booking",
    description:
      "Easy cancellation policies and flexible check-in times to accommodate your travel plans.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Unforgettable Experiences",
    description:
      "Create lasting memories in spaces designed for celebration, relaxation, and connection.",
  },
];

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section bg-background-secondary"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`font-display text-display-sm mb-4 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            The Wander Difference
          </h2>
          <p
            className={`text-body-lg text-foreground-muted max-w-2xl mx-auto ${
              isVisible ? "animate-fade-in-up [animation-delay:100ms]" : "opacity-0"
            }`}
          >
            Every home is hand-selected for quality, comfort, and unforgettable
            experiences.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex gap-4 p-6 rounded-2xl bg-white shadow-soft-sm hover:shadow-soft-md transition-all hover:-translate-y-1 ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center text-accent">
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
