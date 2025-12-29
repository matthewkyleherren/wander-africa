import { Suspense } from "react";
import { Navbar, Footer, MobileNav } from "@/components/layout";
import { Hero, CategoryTabs, ValueProposition } from "@/components/home";
import { PropertyGrid } from "@/components/property";
import { mockPropertyCards, propertyCategories } from "@/data/mock-properties";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar variant="transparent" />
      <Hero />
      <Suspense fallback={<div className="h-16" />}>
        <CategoryTabs categories={propertyCategories} />
      </Suspense>

      <section className="section">
        <div className="container-wide">
          <PropertyGrid properties={mockPropertyCards} />
        </div>
      </section>

      <ValueProposition />
      <Footer />
      <MobileNav />
    </div>
  );
}
