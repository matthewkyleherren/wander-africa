/**
 * Complete property with all details for the detail page
 */
export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: PropertyLocation;
  pricing: PropertyPricing;
  capacity: PropertyCapacity;
  amenities: Amenity[];
  images: PropertyImage[];
  bedrooms: Bedroom[];
  reviews: ReviewSummary;
  policies: PropertyPolicies;
  badges: PropertyBadge[];
  status: "active" | "inactive" | "coming_soon";
  createdAt: string;
  updatedAt: string;
}

/**
 * Simplified property for grid/card display
 */
export interface PropertyCard {
  id: string;
  slug: string;
  name: string;
  location: {
    city: string;
    state: string;
    region?: string;
  };
  price: number;
  images: string[];
  capacity: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
  };
  rating?: number;
  reviewCount?: number;
  amenityHighlights: string[];
  badges: PropertyBadge[];
}

/**
 * Property location information
 */
export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  nearbyAttractions: Attraction[];
  nearbyRestaurants: Restaurant[];
}

/**
 * Property pricing structure
 */
export interface PropertyPricing {
  basePrice: number;
  currency: "USD";
  cleaningFee: number;
  serviceFee: number;
  taxRate: number;
  weekendMultiplier?: number;
  seasonalPricing?: SeasonalPrice[];
  minimumNights: number;
  maximumNights?: number;
}

/**
 * Seasonal pricing adjustment
 */
export interface SeasonalPrice {
  name: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number;
}

/**
 * Property capacity details
 */
export interface PropertyCapacity {
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  squareFeet?: number;
}

/**
 * Property amenity
 */
export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
  description?: string;
}

export type AmenityCategory =
  | "general"
  | "kitchen"
  | "entertainment"
  | "outdoor"
  | "wellness"
  | "workspace"
  | "safety"
  | "accessibility"
  | "climate"
  | "parking";

/**
 * Property image
 */
export interface PropertyImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  category?: "exterior" | "interior" | "bedroom" | "bathroom" | "kitchen" | "view" | "amenity";
}

/**
 * Bedroom configuration
 */
export interface Bedroom {
  id: string;
  name: string;
  beds: BedConfig[];
  image?: PropertyImage;
  ensuite: boolean;
  features?: string[];
}

/**
 * Bed configuration within a bedroom
 */
export interface BedConfig {
  type: "king" | "queen" | "double" | "single" | "sofa" | "bunk";
  count: number;
}

/**
 * Review from a guest
 */
export interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    location?: string;
  };
  rating: number;
  content: string;
  date: string;
  stayDate?: string;
  categories: ReviewCategories;
  response?: {
    content: string;
    date: string;
  };
}

/**
 * Rating categories for reviews
 */
export interface ReviewCategories {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

/**
 * Aggregated review summary
 */
export interface ReviewSummary {
  averageRating: number;
  totalCount: number;
  aiSummary?: string;
  categoryAverages: ReviewCategories;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

/**
 * Property policies
 */
export interface PropertyPolicies {
  checkIn: {
    time: string;
    instructions?: string;
    flexible: boolean;
  };
  checkOut: {
    time: string;
    instructions?: string;
    flexible: boolean;
  };
  cancellation: CancellationPolicy;
  houseRules: HouseRule[];
  safetyInfo: string[];
}

/**
 * Cancellation policy details
 */
export interface CancellationPolicy {
  type: "flexible" | "moderate" | "strict" | "super_strict";
  description: string;
  refundRules: {
    daysBeforeCheckIn: number;
    refundPercentage: number;
  }[];
}

/**
 * House rule
 */
export interface HouseRule {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: "allowed" | "not_allowed" | "info";
}

/**
 * Property badge for cards
 */
export type PropertyBadge =
  | "new"
  | "popular"
  | "instant_book"
  | "superhost"
  | "rare_find"
  | "guest_favorite";

/**
 * Nearby attraction
 */
export interface Attraction {
  id: string;
  name: string;
  description: string;
  distance: string;
  type: "nature" | "activity" | "landmark" | "entertainment";
  image?: string;
}

/**
 * Nearby restaurant
 */
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  distance: string;
  priceLevel: 1 | 2 | 3 | 4;
  rating?: number;
  image?: string;
}

/**
 * Date availability for calendar
 */
export interface DateAvailability {
  date: string;
  available: boolean;
  price?: number;
  minimumNights?: number;
}
