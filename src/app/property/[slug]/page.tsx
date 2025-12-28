import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { getPropertyBySlug } from "@/data/mock-properties";

export default function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar variant="solid" />

      <main className="container-wide pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="font-display text-display-md mb-4">
            {property.name}
          </h1>
          <p className="text-body-lg text-foreground-muted mb-8">
            {property.location.city}, {property.location.state}
          </p>

          <div className="bg-background-secondary rounded-2xl p-8 mb-8">
            <p className="text-foreground-muted">
              Property detail page with full amenities, reviews, and booking
              would be displayed here. This requires full Property data which
              includes detailed amenities, reviews, and booking information.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-soft-sm">
              <div className="text-2xl font-bold text-accent mb-1">
                ${property.price}
              </div>
              <div className="text-sm text-foreground-muted">per night</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-soft-sm">
              <div className="text-2xl font-bold text-accent mb-1">
                {property.capacity.guests}
              </div>
              <div className="text-sm text-foreground-muted">guests</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
