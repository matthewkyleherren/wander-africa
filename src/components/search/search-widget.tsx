"use client";

import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LocationInput } from "./location-input";
import { DatePicker } from "./date-picker";
import { GuestSelector } from "./guest-selector";
import { useSearchStore } from "@/lib/stores/search-store";
import { useIsMobile } from "@/lib/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchWidgetProps {
  variant?: "compact" | "hero";
  className?: string;
}

export function SearchWidget({
  variant = "compact",
  className = "",
}: SearchWidgetProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const {
    location,
    setLocation,
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    isExpanded,
    setExpanded,
    activePanel,
    setActivePanel,
    getGuestSummary,
    getDateSummary,
    saveRecentSearch,
    closeSearch,
  } = useSearchStore();

  const handleSearch = () => {
    saveRecentSearch();
    closeSearch();

    // Build search URL with params
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkIn) params.set("checkIn", checkIn.toISOString());
    if (checkOut) params.set("checkOut", checkOut.toISOString());

    router.push(`/search?${params.toString()}`);
  };

  const handlePanelClick = (panel: "location" | "dates" | "guests") => {
    if (isMobile) {
      setExpanded(true);
      setActivePanel(panel);
    } else {
      setActivePanel(activePanel === panel ? null : panel);
    }
  };

  const handleClose = () => {
    setExpanded(false);
    setActivePanel(null);
  };

  const isHeroVariant = variant === "hero";

  if (isMobile && isExpanded) {
    // Mobile: Full-screen modal
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-white"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-border px-4 py-4 flex items-center justify-between">
            <h2 className="font-display text-heading-lg">Search</h2>
            <Button variant="ghost" size="icon-sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="h-[calc(100vh-80px)] overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Where
                </label>
                <LocationInput
                  value={location}
                  onChange={setLocation}
                  onSelect={setLocation}
                />
              </div>

              {/* Dates */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  When
                </label>
                <DatePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onCheckInChange={setCheckIn}
                  onCheckOutChange={setCheckOut}
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Who
                </label>
                <GuestSelector />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-border px-4 py-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isHeroVariant) {
    // Hero variant: Large, prominent search bar
    return (
      <div className={`inline-flex items-center gap-2 p-2 rounded-full bg-white shadow-soft-xl ${className}`}>
        {/* Location */}
        <Popover open={activePanel === "location"} onOpenChange={(open) => !open && setActivePanel(null)}>
          <PopoverTrigger asChild>
            <button
              onClick={() => handlePanelClick("location")}
              className="px-6 py-3 rounded-full hover:bg-background-secondary transition-colors text-left min-w-[180px]"
            >
              <div className="text-xs text-foreground-muted font-medium">Where</div>
              <div className="text-sm text-foreground font-medium truncate">
                {location || "Search destinations"}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <div className="p-4">
              <LocationInput
                value={location}
                onChange={setLocation}
                onSelect={(loc) => {
                  setLocation(loc);
                  setActivePanel(null);
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-px h-8 bg-border" />

        {/* Dates */}
        <Popover open={activePanel === "dates"} onOpenChange={(open) => !open && setActivePanel(null)}>
          <PopoverTrigger asChild>
            <button
              onClick={() => handlePanelClick("dates")}
              className="px-6 py-3 rounded-full hover:bg-background-secondary transition-colors text-left min-w-[160px]"
            >
              <div className="text-xs text-foreground-muted font-medium">When</div>
              <div className={`text-sm font-medium ${checkIn || checkOut ? "text-foreground" : "text-foreground-muted"}`}>
                {getDateSummary()}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <div className="p-6">
              <DatePicker
                checkIn={checkIn}
                checkOut={checkOut}
                onCheckInChange={setCheckIn}
                onCheckOutChange={setCheckOut}
              />
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-px h-8 bg-border" />

        {/* Guests */}
        <Popover open={activePanel === "guests"} onOpenChange={(open) => !open && setActivePanel(null)}>
          <PopoverTrigger asChild>
            <button
              onClick={() => handlePanelClick("guests")}
              className="px-6 py-3 rounded-full hover:bg-background-secondary transition-colors text-left min-w-[140px]"
            >
              <div className="text-xs text-foreground-muted font-medium">Who</div>
              <div className="text-sm text-foreground-muted font-medium truncate">
                {getGuestSummary()}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <GuestSelector />
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          variant="primary"
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  // Compact variant: Navbar search bar
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setExpanded(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white shadow-soft-sm hover:shadow-soft-md transition-all w-full md:w-auto"
      >
        <span className="text-sm font-medium text-foreground">
          {location || "Anywhere"}
        </span>
        <span className="text-border">|</span>
        <span className="text-sm font-medium text-foreground">
          {checkIn ? getDateSummary() : "Any week"}
        </span>
        <span className="text-border">|</span>
        <span className="text-sm text-foreground-muted truncate">
          {getGuestSummary()}
        </span>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center ml-2">
          <Search className="w-4 h-4 text-white" />
        </div>
      </button>
    </div>
  );
}
