import Image from "next/image";
import Link from "next/link";
import { Search, Menu, Heart, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { mockPropertyCards, propertyCategories, valuePropositionFeatures } from "@/data/mock-properties";

// Temporary inline PropertyCard component (move to separate file later)
function PropertyCard({ property }: { property: typeof mockPropertyCards[0] }) {
  return (
    <Link href={`/property/${property.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-background-secondary mb-3">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Wishlist button */}
        <button 
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft-sm hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4" />
        </button>
        {/* Badges */}
        {property.badges.includes("popular") && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-foreground text-background text-xs font-medium">
            Popular
          </div>
        )}
        {property.badges.includes("new") && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-accent text-white text-xs font-medium">
            New
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
            {property.name}
          </h3>
          {property.rating && (
            <div className="flex items-center gap-1 text-sm">
              <svg className="w-4 h-4 fill-accent text-accent" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium">{property.rating}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-foreground-muted">
          {property.location.city}, {property.location.state}
        </p>
        <p className="text-sm text-foreground-muted">
          {property.capacity.guests} guests · {property.capacity.bedrooms} beds · {property.capacity.bathrooms} baths
        </p>
        <p className="text-foreground font-medium pt-1">
          ${property.price.toLocaleString()} <span className="font-normal text-foreground-muted">/ night</span>
        </p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="container-wide flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="font-display text-xl font-semibold">Wander</span>
          </Link>

          {/* Search bar (desktop) */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white shadow-soft-sm hover:shadow-soft-md transition-shadow cursor-pointer">
            <span className="text-sm font-medium">Anywhere</span>
            <span className="text-border">|</span>
            <span className="text-sm font-medium">Any week</span>
            <span className="text-border">|</span>
            <span className="text-sm text-foreground-muted">Add guests</span>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center ml-2">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Right nav */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Become a host
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Menu className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center pt-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80"
            alt="Luxury beach house"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-display text-display-lg md:text-display-xl mb-4 text-balance">
            Find your happy place
          </h1>
          <p className="text-body-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Luxury vacation homes with hotel-grade amenities, inspiring views, and 24/7 concierge.
          </p>
          {/* Search widget */}
          <div className="inline-flex items-center gap-2 p-2 rounded-full bg-white shadow-soft-xl">
            <button className="px-4 py-3 rounded-full hover:bg-background-secondary transition-colors text-left">
              <div className="text-xs text-foreground-muted">Where</div>
              <div className="text-sm text-foreground font-medium">Search destinations</div>
            </button>
            <div className="w-px h-8 bg-border" />
            <button className="px-4 py-3 rounded-full hover:bg-background-secondary transition-colors text-left">
              <div className="text-xs text-foreground-muted">When</div>
              <div className="text-sm text-foreground font-medium">Add dates</div>
            </button>
            <div className="w-px h-8 bg-border" />
            <button className="px-4 py-3 rounded-full hover:bg-background-secondary transition-colors text-left">
              <div className="text-xs text-foreground-muted">Who</div>
              <div className="text-sm text-foreground-muted">Add guests</div>
            </button>
            <Button variant="primary" size="icon" className="rounded-full w-12 h-12">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-40 bg-white border-b border-border">
        <div className="container-wide py-4">
          <ChipGroup>
            {propertyCategories.map((category, index) => (
              <Chip
                key={category.id}
                selected={index === 0}
                className="flex-shrink-0"
              >
                {category.name}
              </Chip>
            ))}
          </ChipGroup>
        </div>
      </section>

      {/* Property Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPropertyCards.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Show more homes
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section bg-background-secondary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-sm mb-4">The Wander Difference</h2>
            <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
              Every home is hand-selected for quality, comfort, and unforgettable experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuePropositionFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-2xl bg-white shadow-soft-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-foreground-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Hosting</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/host" className="hover:text-white transition-colors">Become a Host</Link></li>
                <li><Link href="/host/resources" className="hover:text-white transition-colors">Host Resources</Link></li>
                <li><Link href="/host/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">W</span>
              </div>
              <span className="font-display text-xl font-semibold">Wander</span>
            </div>
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Wander. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
