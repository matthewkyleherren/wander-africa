import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Property } from "@/types/property";

const contentDirectory = path.join(process.cwd(), "content/properties");

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Parse markdown content sections
    const sections = parseMarkdownSections(content);

    // Build the full property object
    const property: Property = {
      id: data.id || slug,
      slug: data.slug || slug,
      name: data.name || "",
      tagline: data.tagline || "",
      description: sections.Description || "",
      status: data.status || "active",
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),

      // Location
      location: {
        address: "3411 Pebble Stone Way",
        city: "Pigeon Forge",
        state: "TN",
        region: "Great Smoky Mountains",
        country: "USA",
        coordinates: {
          lat: 35.7881,
          lng: -83.5544,
        },
        timezone: "America/New_York",
        nearbyAttractions: parseAttractions(sections["Activities & Attractions"]),
        nearbyRestaurants: parseRestaurants(sections["Dining Recommendations"]),
        localServices: parseLocalServices(sections["Local Services"]),
        parkingSpaces: 6,
      },

      // Pricing
      pricing: {
        basePrice: 875,
        currency: "USD",
        cleaningFee: 350,
        serviceFee: 87.5,
        taxRate: 0.0975,
        minimumNights: 2,
      },

      // Capacity
      capacity: {
        maxGuests: 32,
        bedrooms: 6,
        beds: 18,
        bathrooms: 6.5,
        squareFeet: 5444,
      },

      // Amenities
      amenities: parseAmenities(sections.Amenities),
      highlightAmenities: ["Movie Theater", "Indoor Pool", "Arcade Machine"],

      // Images - Using Unsplash for luxury cabin interiors
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
          alt: "Luxurious Living Room with Mountain Views",
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

      // Bedrooms
      bedrooms: parseBedrooms(sections.Bedrooms),

      // Reviews
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
        ratingDistribution: {
          5: 38,
          4: 3,
          3: 1,
          2: 0,
          1: 0,
        },
      },

      // Policies
      policies: parsePolicies(sections.Policies),

      // Badges
      badges: ["guest_favorite", "instant_book"],
    };

    return property;
  } catch (error) {
    console.error(`Error loading property ${slug}:`, error);
    return null;
  }
}

export async function getAllPropertySlugs(): Promise<string[]> {
  try {
    const files = fs.readdirSync(contentDirectory);
    return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
}

export async function getRawMarkdown(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return null;
  }
}

// Helper functions

function parseMarkdownSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = content.split("\n");
  let currentSection = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentSection) {
        sections[currentSection] = currentContent.join("\n").trim();
      }
      currentSection = line.replace("## ", "").trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    sections[currentSection] = currentContent.join("\n").trim();
  }

  return sections;
}

function parseAmenities(content: string = "") {
  const amenities: any[] = [];
  const lines = content.split("\n").filter((line) => line.trim().startsWith("-"));

  lines.forEach((line, index) => {
    const name = line.replace(/^-\s*/, "").trim();
    amenities.push({
      id: `amenity-${index}`,
      name,
      icon: "check",
      category: "general",
    });
  });

  return amenities;
}

function parseBedrooms(content: string = "") {
  const bedrooms: any[] = [];
  const sections = content.split("###").filter((s) => s.trim());

  sections.forEach((section, index) => {
    const lines = section.trim().split("\n");
    const name = lines[0].trim();
    const features: string[] = [];
    let beds: any[] = [];
    let ensuite = false;

    lines.slice(1).forEach((line) => {
      line = line.trim();
      if (line.startsWith("-")) {
        const feature = line.replace(/^-\s*/, "").trim();
        if (feature.includes("King")) {
          beds.push({ type: "king", count: 1 });
        } else if (feature.includes("Queen")) {
          beds.push({ type: "queen", count: 1 });
        } else if (feature.includes("Twin bunk")) {
          beds.push({ type: "bunk", count: 2 });
        } else if (feature.includes("ensuite") || feature.includes("Private")) {
          ensuite = true;
        } else {
          features.push(feature);
        }
      }
    });

    bedrooms.push({
      id: `bedroom-${index}`,
      name,
      beds,
      ensuite,
      features,
    });
  });

  return bedrooms;
}

function parseRestaurants(content: string = "") {
  const restaurants: any[] = [];
  const sections = content.split("###").filter((s) => s.trim());

  sections.forEach((section, index) => {
    const lines = section.trim().split("\n");
    const name = lines[0].trim();
    const meta = lines[1]?.trim() || "";
    const description = lines.slice(2).join(" ").trim();

    const [cuisine, distance] = meta.split("•").map((s) => s.trim());

    restaurants.push({
      id: `restaurant-${index}`,
      name,
      cuisine: cuisine || "Restaurant",
      description,
      distance: distance || "Nearby",
      priceLevel: 2,
    });
  });

  return restaurants;
}

function parseAttractions(content: string = "") {
  const attractions: any[] = [];
  const sections = content.split("###").filter((s) => s.trim());

  sections.forEach((section, index) => {
    const lines = section.trim().split("\n");
    const name = lines[0].trim();
    const meta = lines[1]?.trim() || "";
    const description = lines.slice(2).join(" ").trim();

    const [type, distance] = meta.split("•").map((s) => s.trim());

    attractions.push({
      id: `attraction-${index}`,
      name,
      type: type?.toLowerCase() || "activity",
      description,
      distance: distance || "Nearby",
    });
  });

  return attractions;
}

function parseLocalServices(content: string = "") {
  const services: any[] = [];
  const sections = content.split("###").filter((s) => s.trim());

  sections.forEach((section, index) => {
    const lines = section.trim().split("\n");
    const name = lines[0].trim();
    const meta = lines[1]?.trim() || "";
    const description = lines.slice(2).join(" ").trim();

    const [type, distance] = meta.split("•").map((s) => s.trim());

    services.push({
      id: `service-${index}`,
      name,
      type: type?.toLowerCase().includes("grocery") ? "grocery" : "retail",
      description,
      distance: distance || "Nearby",
    });
  });

  return services;
}

function parsePolicies(content: string = "") {
  return {
    checkIn: {
      time: "4:00 PM",
      flexible: true,
    },
    checkOut: {
      time: "10:00 AM",
      flexible: true,
    },
    cancellation: {
      type: "moderate" as const,
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
        type: "info" as const,
      },
      {
        id: "no-smoking",
        icon: "ban",
        title: "No Smoking",
        description: "Smoking is not allowed anywhere on the property.",
        type: "not_allowed" as const,
      },
      {
        id: "no-pets",
        icon: "ban",
        title: "No Pets",
        description: "Pets are not allowed to maintain a hypoallergenic space.",
        type: "not_allowed" as const,
      },
      {
        id: "max-occupancy",
        icon: "users",
        title: "Maximum Occupancy",
        description: "Strictly limited to 32 guests.",
        type: "info" as const,
      },
    ],
    safetyInfo: [
      "Security system with cameras at entry points",
      "Fire extinguishers on all levels",
      "Carbon monoxide detectors throughout",
      "Swimming pool safety equipment",
    ],
  };
}
