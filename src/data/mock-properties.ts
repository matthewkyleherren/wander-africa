import { PropertyCard, Property, Amenity, AmenityCategory } from "@/types/property";

// Sample amenities
export const amenities: Amenity[] = [
  { id: "wifi", name: "High-speed WiFi", icon: "Wifi", category: "general" },
  { id: "pool", name: "Private pool", icon: "Waves", category: "outdoor" },
  { id: "hot-tub", name: "Hot tub", icon: "Bath", category: "wellness" },
  { id: "kitchen", name: "Full kitchen", icon: "ChefHat", category: "kitchen" },
  { id: "washer", name: "Washer & dryer", icon: "Shirt", category: "general" },
  { id: "parking", name: "Free parking", icon: "Car", category: "parking" },
  { id: "ac", name: "Air conditioning", icon: "Snowflake", category: "climate" },
  { id: "heating", name: "Heating", icon: "Flame", category: "climate" },
  { id: "workspace", name: "Dedicated workspace", icon: "Monitor", category: "workspace" },
  { id: "tv", name: "Smart TV", icon: "Tv", category: "entertainment" },
  { id: "fireplace", name: "Fireplace", icon: "Flame", category: "general" },
  { id: "grill", name: "BBQ grill", icon: "Flame", category: "outdoor" },
  { id: "gym", name: "Home gym", icon: "Dumbbell", category: "wellness" },
  { id: "sauna", name: "Sauna", icon: "Thermometer", category: "wellness" },
  { id: "game-room", name: "Game room", icon: "Gamepad2", category: "entertainment" },
  { id: "theater", name: "Home theater", icon: "Film", category: "entertainment" },
  { id: "mountain-view", name: "Mountain view", icon: "Mountain", category: "general" },
  { id: "ocean-view", name: "Ocean view", icon: "Waves", category: "general" },
  { id: "lake-view", name: "Lake view", icon: "Waves", category: "general" },
  { id: "pet-friendly", name: "Pet friendly", icon: "Dog", category: "general" },
];

// Mock property cards for grid display
export const mockPropertyCards: PropertyCard[] = [
  {
    id: "1",
    slug: "malibu-beach-house",
    name: "Malibu Beach House",
    location: {
      city: "Malibu",
      state: "California",
      region: "Southern California",
    },
    price: 1250,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    ],
    capacity: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
    },
    rating: 4.96,
    reviewCount: 124,
    amenityHighlights: ["Ocean view", "Private pool", "Hot tub"],
    badges: ["popular", "superhost"],
  },
  {
    id: "2",
    slug: "aspen-mountain-retreat",
    name: "Aspen Mountain Retreat",
    location: {
      city: "Aspen",
      state: "Colorado",
      region: "Rocky Mountains",
    },
    price: 1850,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    capacity: {
      guests: 12,
      bedrooms: 6,
      bathrooms: 5,
    },
    rating: 4.92,
    reviewCount: 89,
    amenityHighlights: ["Mountain view", "Hot tub", "Ski-in/Ski-out"],
    badges: ["instant_book"],
  },
  {
    id: "3",
    slug: "joshua-tree-desert-home",
    name: "Joshua Tree Desert Home",
    location: {
      city: "Joshua Tree",
      state: "California",
      region: "High Desert",
    },
    price: 495,
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
    },
    rating: 4.89,
    reviewCount: 156,
    amenityHighlights: ["Desert view", "Hot tub", "Stargazing deck"],
    badges: ["new", "rare_find"],
  },
  {
    id: "4",
    slug: "lake-tahoe-cabin",
    name: "Lake Tahoe Lakefront Cabin",
    location: {
      city: "Lake Tahoe",
      state: "California",
      region: "Sierra Nevada",
    },
    price: 975,
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    ],
    capacity: {
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
    },
    rating: 4.94,
    reviewCount: 203,
    amenityHighlights: ["Lake view", "Private dock", "Hot tub"],
    badges: ["guest_favorite", "superhost"],
  },
  {
    id: "5",
    slug: "park-city-ski-chalet",
    name: "Park City Ski Chalet",
    location: {
      city: "Park City",
      state: "Utah",
      region: "Wasatch Mountains",
    },
    price: 1650,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    ],
    capacity: {
      guests: 14,
      bedrooms: 7,
      bathrooms: 6,
    },
    rating: 4.88,
    reviewCount: 67,
    amenityHighlights: ["Ski-in/Ski-out", "Hot tub", "Game room"],
    badges: ["instant_book"],
  },
  {
    id: "6",
    slug: "maui-tropical-villa",
    name: "Maui Tropical Villa",
    location: {
      city: "Wailea",
      state: "Hawaii",
      region: "Maui",
    },
    price: 2200,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
    ],
    capacity: {
      guests: 10,
      bedrooms: 5,
      bathrooms: 5,
    },
    rating: 4.97,
    reviewCount: 182,
    amenityHighlights: ["Ocean view", "Infinity pool", "Outdoor kitchen"],
    badges: ["popular", "superhost", "guest_favorite"],
  },
  {
    id: "7",
    slug: "napa-valley-vineyard-estate",
    name: "Napa Valley Vineyard Estate",
    location: {
      city: "St. Helena",
      state: "California",
      region: "Wine Country",
    },
    price: 1475,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
    ],
    capacity: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 4,
    },
    rating: 4.91,
    reviewCount: 94,
    amenityHighlights: ["Vineyard view", "Wine cellar", "Pool"],
    badges: ["new"],
  },
  {
    id: "8",
    slug: "sedona-red-rock-retreat",
    name: "Sedona Red Rock Retreat",
    location: {
      city: "Sedona",
      state: "Arizona",
      region: "Red Rock Country",
    },
    price: 725,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80",
    ],
    capacity: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
    },
    rating: 4.93,
    reviewCount: 145,
    amenityHighlights: ["Red rock view", "Hot tub", "Meditation room"],
    badges: ["rare_find", "superhost"],
  },
];

// Categories for filtering
export const propertyCategories = [
  { id: "for-you", name: "For You", slug: "for-you", icon: "Sparkles" },
  { id: "beach", name: "Beach", slug: "beach", icon: "Umbrella" },
  { id: "mountain", name: "Mountain", slug: "mountain", icon: "Mountain" },
  { id: "lake", name: "Lake", slug: "lake", icon: "Waves" },
  { id: "ski", name: "Ski", slug: "ski", icon: "Snowflake" },
  { id: "desert", name: "Desert", slug: "desert", icon: "Sun" },
  { id: "tropical", name: "Tropical", slug: "tropical", icon: "Palmtree" },
  { id: "vineyard", name: "Vineyard", slug: "vineyard", icon: "Wine" },
  { id: "pet-friendly", name: "Pet-Friendly", slug: "pet-friendly", icon: "Dog" },
  { id: "groups", name: "Groups", slug: "groups", icon: "Users" },
  { id: "national-parks", name: "National Parks", slug: "national-parks", icon: "TreePine" },
  { id: "families", name: "Families", slug: "families", icon: "Baby" },
];

// Popular destinations
export const popularDestinations = [
  {
    id: "1",
    name: "Malibu",
    region: "California",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    propertyCount: 24,
    slug: "malibu",
  },
  {
    id: "2",
    name: "Aspen",
    region: "Colorado",
    image: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=600&q=80",
    propertyCount: 18,
    slug: "aspen",
  },
  {
    id: "3",
    name: "Lake Tahoe",
    region: "California",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    propertyCount: 32,
    slug: "lake-tahoe",
  },
  {
    id: "4",
    name: "Maui",
    region: "Hawaii",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=600&q=80",
    propertyCount: 15,
    slug: "maui",
  },
  {
    id: "5",
    name: "Park City",
    region: "Utah",
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&q=80",
    propertyCount: 21,
    slug: "park-city",
  },
  {
    id: "6",
    name: "Joshua Tree",
    region: "California",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    propertyCount: 12,
    slug: "joshua-tree",
  },
];

// Value proposition features
export const valuePropositionFeatures = [
  {
    icon: "Home",
    title: "Only the best homes",
    description: "Every home is vetted for quality, design, and comfort.",
  },
  {
    icon: "Star",
    title: "Hotel-grade amenities",
    description: "Premium linens, toiletries, and fully-stocked kitchens.",
  },
  {
    icon: "Headphones",
    title: "24/7 concierge",
    description: "Real humans ready to help with anything you need.",
  },
  {
    icon: "Mountain",
    title: "Inspiring views",
    description: "From oceanfront to mountainside, every view is spectacular.",
  },
  {
    icon: "Sparkles",
    title: "Meticulous cleaning",
    description: "Hospital-grade cleaning protocols for every stay.",
  },
  {
    icon: "Shield",
    title: "Safety & security",
    description: "Smart locks, security systems, and verified properties.",
  },
];

// Helper function to get property by slug
export function getPropertyBySlug(slug: string): PropertyCard | undefined {
  return mockPropertyCards.find((p) => p.slug === slug);
}

// Helper function to filter properties by category
export function getPropertiesByCategory(categorySlug: string): PropertyCard[] {
  // In a real app, this would filter based on actual category data
  return mockPropertyCards;
}

// Helper function to search properties
export function searchProperties(query: string): PropertyCard[] {
  const lowerQuery = query.toLowerCase();
  return mockPropertyCards.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.location.city.toLowerCase().includes(lowerQuery) ||
      p.location.state.toLowerCase().includes(lowerQuery) ||
      p.location.region?.toLowerCase().includes(lowerQuery)
  );
}
