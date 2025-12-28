"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import {
  PropertyImageGallery,
  ImageLightbox,
  PropertyQuickStats,
  PropertyHighlightAmenities,
  PropertyAmenities,
  BedroomDetailsSection,
  LocationSection,
  DiningRecommendations,
  ActivitiesSection,
  LocalServicesSection,
  ReviewsSummarySection,
  HouseRules,
  BookingSidebar,
} from "@/components/property";
import { Property } from "@/types/property";

// Temporary mock data - will be replaced with markdown parsing
function getMockProperty(slug: string): Property {
  return {
    id: "wander-pigeon-stone",
    slug: "wander-pigeon-stone",
    name: "Wander Pigeon Stone",
    tagline: "Luxury mountain retreat with indoor pool and theater",
    description:
      "Experience the ultimate luxury mountain getaway at Wander Pigeon Stone, a stunning 5,444 sq ft estate nestled in the breathtaking Smoky Mountains. This exceptional property combines sophisticated design with world-class amenities, including a private indoor pool, state-of-the-art movie theater, and arcade room. Perfect for large family gatherings or group retreats, this home offers an unforgettable escape where every detail has been carefully curated for your comfort.",
    status: "active",
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2025-12-28T00:00:00.000Z",
    location: {
      address: "3411 Pebble Stone Way",
      city: "Pigeon Forge",
      state: "TN",
      region: "Great Smoky Mountains",
      country: "USA",
      coordinates: { lat: 35.7881, lng: -83.5544 },
      timezone: "America/New_York",
      nearbyAttractions: [
        {
          id: "1",
          name: "Dollywood",
          description:
            "Experience world-class roller coasters, award-winning shows, and authentic Smoky Mountain crafts at Dolly Parton's flagship theme park.",
          distance: "5.2 miles",
          type: "entertainment",
        },
        {
          id: "2",
          name: "Great Smoky Mountains National Park",
          description:
            "Explore over 800 miles of hiking trails, stunning waterfalls, and abundant wildlife in America's most visited national park.",
          distance: "12 miles",
          type: "nature",
        },
      ],
      nearbyRestaurants: [
        {
          id: "1",
          name: "Mama's Farmhouse",
          cuisine: "Southern Comfort",
          description:
            "Experience authentic Southern family-style dining where heaping platters are served to your table.",
          distance: "3.2 miles",
          priceLevel: 2,
        },
        {
          id: "2",
          name: "Paula Deen's Family Kitchen",
          cuisine: "American Traditional",
          description:
            "Enjoy signature recipes of the beloved Food Network star in a warm, welcoming atmosphere.",
          distance: "4.1 miles",
          priceLevel: 2,
        },
      ],
      localServices: [
        {
          id: "1",
          name: "Kroger Marketplace",
          type: "grocery",
          description:
            "Full-service grocery store with pharmacy, deli, bakery, and extensive organic selection.",
          distance: "2.8 miles",
        },
      ],
      parkingSpaces: 6,
    },
    pricing: {
      basePrice: 875,
      currency: "USD",
      cleaningFee: 350,
      serviceFee: 87.5,
      taxRate: 0.0975,
      minimumNights: 2,
    },
    capacity: {
      maxGuests: 32,
      bedrooms: 6,
      beds: 18,
      bathrooms: 6.5,
      squareFeet: 5444,
    },
    amenities: [
      { id: "1", name: "High-speed WiFi", icon: "wifi", category: "general" },
      { id: "2", name: "Indoor Pool", icon: "pool", category: "wellness" },
      { id: "3", name: "Hot Tub", icon: "hot-tub", category: "wellness" },
      { id: "4", name: "Movie Theater", icon: "film", category: "entertainment" },
      { id: "5", name: "Game Room", icon: "gamepad", category: "entertainment" },
      { id: "6", name: "Fire Pit", icon: "fire", category: "outdoor" },
    ],
    highlightAmenities: ["Movie Theater", "Indoor Pool", "Arcade Machine"],
    images: [
      {
        id: "1",
        src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&h=800&fit=crop",
        alt: "Wander Pigeon Stone - Exterior View",
        width: 1200,
        height: 800,
        category: "exterior",
      },
      {
        id: "2",
        src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
        alt: "Luxurious Living Room",
        width: 1200,
        height: 800,
        category: "interior",
      },
      {
        id: "3",
        src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&h=800&fit=crop",
        alt: "Gourmet Kitchen",
        width: 1200,
        height: 800,
        category: "kitchen",
      },
      {
        id: "4",
        src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop",
        alt: "Primary Suite",
        width: 1200,
        height: 800,
        category: "bedroom",
      },
      {
        id: "5",
        src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop",
        alt: "Mountain View",
        width: 1200,
        height: 800,
        category: "view",
      },
    ],
    bedrooms: [
      {
        id: "1",
        name: "Primary Suite",
        beds: [{ type: "king", count: 1 }],
        ensuite: true,
        features: ["Mountain view balcony", "Walk-in closet", "Smart TV"],
      },
      {
        id: "2",
        name: "Mountain View Suite",
        beds: [{ type: "king", count: 1 }],
        ensuite: true,
        features: ["Sitting area with fireplace", "Smart TV"],
      },
    ],
    reviews: {
      averageRating: 4.9,
      totalCount: 42,
      aiSummary:
        "Guests consistently praise the stunning mountain views, exceptional amenities like the indoor pool and theater, and the attentive concierge service. The spacious layout and luxurious finishes make it perfect for large family gatherings.",
      categoryAverages: {
        cleanliness: 4.9,
        accuracy: 4.8,
        checkIn: 5.0,
        communication: 4.9,
        location: 5.0,
        value: 4.7,
      },
      ratingDistribution: { 5: 38, 4: 3, 3: 1, 2: 0, 1: 0 },
    },
    policies: {
      checkIn: { time: "4:00 PM", flexible: true },
      checkOut: { time: "10:00 AM", flexible: true },
      cancellation: {
        type: "moderate",
        description:
          "Flexible cancellation policy allows full refund if cancelled 30 days before check-in.",
        refundRules: [
          { daysBeforeCheckIn: 30, refundPercentage: 100 },
          { daysBeforeCheckIn: 7, refundPercentage: 50 },
        ],
      },
      houseRules: [
        {
          id: "quiet-hours",
          icon: "clock",
          title: "Quiet Hours",
          description: "11:00 PM - 7:00 AM. No amplified outdoor sound after 11 PM.",
          type: "info",
        },
        {
          id: "no-smoking",
          icon: "ban",
          title: "No Smoking",
          description: "Smoking is not allowed anywhere on the property.",
          type: "not_allowed",
        },
        {
          id: "no-pets",
          icon: "ban",
          title: "No Pets",
          description: "Pets are not allowed to maintain a hypoallergenic space.",
          type: "not_allowed",
        },
      ],
      safetyInfo: [
        "Security system with cameras at entry points",
        "Fire extinguishers on all levels",
        "Carbon monoxide detectors throughout",
      ],
    },
    badges: ["guest_favorite", "instant_book"],
  };
}

export default function PropertyPage({ params }: { params: { slug: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    setProperty(getMockProperty(params.slug));
  }, [params.slug]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar variant="solid" />

      <main>
        {/* Image Gallery */}
        <PropertyImageGallery
          images={property.images}
          propertyName={property.name}
          onOpenLightbox={() => setIsLightboxOpen(true)}
        />

        {/* Main Content */}
        <div className="container-wide py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Property Title & Stats */}
              <div className="border-b border-stone-200 pb-8">
                <h1 className="heading-1 mb-2">{property.name}</h1>
                <p className="text-lg text-stone-600 mb-4">{property.tagline}</p>
                <PropertyQuickStats capacity={property.capacity} className="mb-4" />
                {property.highlightAmenities && (
                  <PropertyHighlightAmenities amenities={property.highlightAmenities} />
                )}
              </div>

              {/* Description */}
              <div className="border-b border-stone-200 pb-8">
                <p className="text-stone-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <PropertyAmenities
                  amenities={property.amenities}
                  className="border-b border-stone-200 pb-8"
                />
              )}

              {/* Bedrooms */}
              {property.bedrooms && property.bedrooms.length > 0 && (
                <BedroomDetailsSection
                  bedrooms={property.bedrooms}
                  className="border-b border-stone-200 pb-8"
                />
              )}
            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <BookingSidebar property={property} />
              </div>
            </div>
          </div>

          {/* Full-Width Sections */}
          <div className="space-y-16 mt-16">
            {/* Location */}
            <LocationSection location={property.location} />

            {/* Dining Recommendations */}
            {property.location.nearbyRestaurants &&
              property.location.nearbyRestaurants.length > 0 && (
                <DiningRecommendations restaurants={property.location.nearbyRestaurants} />
              )}

            {/* Activities */}
            {property.location.nearbyAttractions &&
              property.location.nearbyAttractions.length > 0 && (
                <ActivitiesSection activities={property.location.nearbyAttractions} />
              )}

            {/* Local Services */}
            {property.location.localServices && property.location.localServices.length > 0 && (
              <LocalServicesSection services={property.location.localServices} />
            )}

            {/* Reviews */}
            <ReviewsSummarySection summary={property.reviews} />

            {/* House Rules */}
            <HouseRules policies={property.policies} />
          </div>
        </div>
      </main>

      {/* Image Lightbox */}
      <ImageLightbox
        images={property.images}
        initialIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />

      <Footer />
    </div>
  );
}
