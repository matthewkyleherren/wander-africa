import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GuestCount, DEFAULT_GUESTS, LocationSuggestion } from "@/types/search";

interface SearchState {
  // Location
  location: string;
  locationDisplay: string;
  coordinates: { lat: number; lng: number } | null;
  locationSuggestions: LocationSuggestion[];
  
  // Dates
  checkIn: Date | null;
  checkOut: Date | null;
  
  // Guests
  guests: GuestCount;
  
  // UI State
  isExpanded: boolean;
  activePanel: "location" | "dates" | "guests" | null;
  isSearching: boolean;
  
  // Recent searches
  recentSearches: Array<{
    id: string;
    location: string;
    checkIn?: string;
    checkOut?: string;
    guests: GuestCount;
    timestamp: string;
  }>;
}

interface SearchActions {
  // Location actions
  setLocation: (location: string, display?: string, coords?: { lat: number; lng: number }) => void;
  setLocationSuggestions: (suggestions: LocationSuggestion[]) => void;
  clearLocation: () => void;
  
  // Date actions
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setDateRange: (checkIn: Date | null, checkOut: Date | null) => void;
  clearDates: () => void;
  
  // Guest actions
  setGuests: (guests: Partial<GuestCount>) => void;
  incrementGuest: (type: keyof GuestCount) => void;
  decrementGuest: (type: keyof GuestCount) => void;
  resetGuests: () => void;
  
  // UI actions
  setExpanded: (expanded: boolean) => void;
  setActivePanel: (panel: SearchState["activePanel"]) => void;
  togglePanel: (panel: "location" | "dates" | "guests") => void;
  closeSearch: () => void;
  
  // Search actions
  setSearching: (searching: boolean) => void;
  saveRecentSearch: () => void;
  clearRecentSearches: () => void;
  
  // Reset
  reset: () => void;
  
  // Computed
  getTotalGuests: () => number;
  getGuestSummary: () => string;
  getDateSummary: () => string;
  hasSearchCriteria: () => boolean;
}

const initialState: SearchState = {
  location: "",
  locationDisplay: "",
  coordinates: null,
  locationSuggestions: [],
  checkIn: null,
  checkOut: null,
  guests: { ...DEFAULT_GUESTS },
  isExpanded: false,
  activePanel: null,
  isSearching: false,
  recentSearches: [],
};

export const useSearchStore = create<SearchState & SearchActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Location actions
      setLocation: (location, display, coords) =>
        set({
          location,
          locationDisplay: display || location,
          coordinates: coords || null,
        }),

      setLocationSuggestions: (suggestions) =>
        set({ locationSuggestions: suggestions }),

      clearLocation: () =>
        set({
          location: "",
          locationDisplay: "",
          coordinates: null,
          locationSuggestions: [],
        }),

      // Date actions
      setCheckIn: (checkIn) => set({ checkIn }),
      
      setCheckOut: (checkOut) => set({ checkOut }),
      
      setDateRange: (checkIn, checkOut) => set({ checkIn, checkOut }),
      
      clearDates: () => set({ checkIn: null, checkOut: null }),

      // Guest actions
      setGuests: (guests) =>
        set((state) => ({
          guests: { ...state.guests, ...guests },
        })),

      incrementGuest: (type) =>
        set((state) => {
          const maxGuests: Record<keyof GuestCount, number> = {
            adults: 16,
            children: 10,
            infants: 5,
            pets: 3,
          };
          const current = state.guests[type];
          if (current >= maxGuests[type]) return state;
          return {
            guests: { ...state.guests, [type]: current + 1 },
          };
        }),

      decrementGuest: (type) =>
        set((state) => {
          const minGuests: Record<keyof GuestCount, number> = {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0,
          };
          const current = state.guests[type];
          if (current <= minGuests[type]) return state;
          return {
            guests: { ...state.guests, [type]: current - 1 },
          };
        }),

      resetGuests: () => set({ guests: { ...DEFAULT_GUESTS } }),

      // UI actions
      setExpanded: (isExpanded) => set({ isExpanded }),
      
      setActivePanel: (activePanel) => set({ activePanel }),
      
      togglePanel: (panel) =>
        set((state) => ({
          activePanel: state.activePanel === panel ? null : panel,
          isExpanded: true,
        })),
      
      closeSearch: () =>
        set({
          isExpanded: false,
          activePanel: null,
        }),

      // Search actions
      setSearching: (isSearching) => set({ isSearching }),

      saveRecentSearch: () => {
        const state = get();
        if (!state.location) return;

        const newSearch = {
          id: Date.now().toString(),
          location: state.locationDisplay || state.location,
          checkIn: state.checkIn?.toISOString(),
          checkOut: state.checkOut?.toISOString(),
          guests: { ...state.guests },
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          recentSearches: [
            newSearch,
            ...state.recentSearches.filter((s) => s.location !== newSearch.location),
          ].slice(0, 5),
        }));
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      // Reset
      reset: () => set({ ...initialState, recentSearches: get().recentSearches }),

      // Computed
      getTotalGuests: () => {
        const { guests } = get();
        return guests.adults + guests.children;
      },

      getGuestSummary: () => {
        const { guests } = get();
        const total = guests.adults + guests.children;
        const parts: string[] = [];

        if (total > 0) {
          parts.push(`${total} guest${total !== 1 ? "s" : ""}`);
        }
        if (guests.infants > 0) {
          parts.push(`${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`);
        }
        if (guests.pets > 0) {
          parts.push(`${guests.pets} pet${guests.pets !== 1 ? "s" : ""}`);
        }

        return parts.length > 0 ? parts.join(", ") : "Add guests";
      },

      getDateSummary: () => {
        const { checkIn, checkOut } = get();
        if (!checkIn && !checkOut) return "Add dates";
        if (checkIn && !checkOut) {
          return checkIn.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
        if (checkIn && checkOut) {
          const formatDate = (d: Date) =>
            d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
        }
        return "Add dates";
      },

      hasSearchCriteria: () => {
        const state = get();
        return !!(state.location || state.checkIn || state.checkOut);
      },
    }),
    {
      name: "wander-search",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
    }
  )
);
