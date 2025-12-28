import { PropertyCard, PropertyBadge, AmenityCategory } from "./property";

/**
 * Search filters for property queries
 */
export interface SearchFilters {
  /** Location name or region */
  location?: string;
  /** Geographic coordinates with search radius */
  coordinates?: {
    lat: number;
    lng: number;
    radius: number; // in miles
  };
  /** Check-in and check-out dates */
  dateRange?: {
    checkIn: Date;
    checkOut: Date;
  };
  /** Guest breakdown */
  guests?: GuestCount;
  /** Price range filter */
  priceRange?: {
    min: number;
    max: number;
  };
  /** Required amenities */
  amenities?: string[];
  /** Amenity categories to include */
  amenityCategories?: AmenityCategory[];
  /** Property badges filter */
  badges?: PropertyBadge[];
  /** Bedroom count range */
  bedrooms?: {
    min: number;
    max?: number;
  };
  /** Bathroom count range */
  bathrooms?: {
    min: number;
    max?: number;
  };
  /** Instant booking available */
  instantBook?: boolean;
  /** Pet-friendly properties only */
  petsAllowed?: boolean;
  /** Accessibility features required */
  accessible?: boolean;
}

/**
 * Guest count breakdown
 */
export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

/**
 * Default guest count values
 */
export const DEFAULT_GUESTS: GuestCount = {
  adults: 1,
  children: 0,
  infants: 0,
  pets: 0,
};

/**
 * Search results response
 */
export interface SearchResult {
  properties: PropertyCard[];
  total: number;
  page: number;
  pageSize: number;
  facets: SearchFacets;
}

/**
 * Facets for filtering UI
 */
export interface SearchFacets {
  priceRange: {
    min: number;
    max: number;
  };
  amenities: FacetCount[];
  locations: FacetCount[];
  bedroomCounts: FacetCount[];
  propertyTypes: FacetCount[];
}

/**
 * Facet count for filter options
 */
export interface FacetCount {
  value: string;
  count: number;
  label?: string;
}

/**
 * Sort options for search results
 */
export type SearchSortOption =
  | "recommended"
  | "price_low"
  | "price_high"
  | "rating"
  | "reviews"
  | "newest";

/**
 * Search sort configuration
 */
export interface SearchSort {
  field: SearchSortOption;
  direction: "asc" | "desc";
}

/**
 * Location suggestion for autocomplete
 */
export interface LocationSuggestion {
  id: string;
  name: string;
  type: "city" | "region" | "state" | "country" | "property";
  fullName: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  propertyCount?: number;
}

/**
 * Recent search entry
 */
export interface RecentSearch {
  id: string;
  location: string;
  dateRange?: {
    checkIn: string;
    checkOut: string;
  };
  guests: GuestCount;
  timestamp: string;
}

/**
 * Search widget UI state
 */
export interface SearchWidgetState {
  isExpanded: boolean;
  activePanel: "location" | "dates" | "guests" | null;
  location: string;
  locationSuggestions: LocationSuggestion[];
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestCount;
  isLoading: boolean;
}

/**
 * Popular destination for homepage
 */
export interface PopularDestination {
  id: string;
  name: string;
  region: string;
  image: string;
  propertyCount: number;
  slug: string;
}

/**
 * Category for filtering properties
 */
export interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
}
