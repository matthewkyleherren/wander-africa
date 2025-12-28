import { Navbar, Footer, MobileNav } from "@/components/layout";
import { PropertyGrid } from "@/components/property";
import { mockPropertyCards, searchProperties } from "@/data/mock-properties";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { location?: string; checkIn?: string; checkOut?: string };
}) {
  const { location } = searchParams;

  // Filter properties based on search params
  const properties = location
    ? searchProperties(location)
    : mockPropertyCards;

  return (
    <div className="min-h-screen">
      <Navbar variant="solid" />

      <main className="container-wide pt-24 pb-16">
        <div className="mb-8">
          <h1 className="font-display text-display-md mb-2">
            {location ? `Properties in ${location}` : "All Properties"}
          </h1>
          <p className="text-foreground-muted">
            {properties.length} properties found
          </p>
        </div>

        <PropertyGrid properties={properties} />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
