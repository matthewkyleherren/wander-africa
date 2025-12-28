"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Search, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (location: string) => void;
  placeholder?: string;
  className?: string;
}

const POPULAR_DESTINATIONS = [
  "Malibu, California",
  "Big Sur, California",
  "Aspen, Colorado",
  "Park City, Utah",
  "Lake Tahoe, California",
  "Sedona, Arizona",
  "Jackson Hole, Wyoming",
  "Maui, Hawaii",
];

export function LocationInput({
  value,
  onChange,
  onSelect,
  placeholder = "Search destinations",
  className = "",
}: LocationInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSelect = (location: string) => {
    onChange(location);
    onSelect?.(location);
    setIsFocused(false);

    // Save to recent searches
    const updated = [
      location,
      ...recentSearches.filter((s) => s !== location),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const filteredDestinations = POPULAR_DESTINATIONS.filter((dest) =>
    dest.toLowerCase().includes(value.toLowerCase())
  );

  const showDropdown = isFocused && (value || recentSearches.length > 0);

  return (
    <div className={`relative ${className}`}>
      {/* Input Container */}
      <div
        className={`relative flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
          isFocused
            ? "border-accent ring-2 ring-accent/20"
            : "border-border hover:border-accent/50"
        }`}
      >
        <Search className="w-5 h-5 text-foreground-muted flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay to allow click on dropdown items
            setTimeout(() => setIsFocused(false), 200);
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground-muted"
        />
        {value && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-background-secondary rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-foreground-muted" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-border shadow-soft-lg overflow-hidden z-50"
          >
            <div className="max-h-[400px] overflow-y-auto py-2">
              {/* Recent Searches */}
              {!value && recentSearches.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-medium text-foreground-muted uppercase tracking-wider">
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => handleSelect(search)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-background-secondary transition-colors text-left"
                    >
                      <Clock className="w-5 h-5 text-foreground-muted flex-shrink-0" />
                      <span className="text-foreground">{search}</span>
                    </button>
                  ))}
                  <div className="h-px bg-border my-2" />
                </>
              )}

              {/* Popular Destinations */}
              <div className="px-4 py-2 text-xs font-medium text-foreground-muted uppercase tracking-wider">
                {value ? "Suggestions" : "Popular Destinations"}
              </div>
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination, index) => (
                  <button
                    key={`dest-${index}`}
                    onClick={() => handleSelect(destination)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-background-secondary transition-colors text-left"
                  >
                    <MapPin className="w-5 h-5 text-foreground-muted flex-shrink-0" />
                    <span className="text-foreground">{destination}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-foreground-muted">
                  No destinations found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
