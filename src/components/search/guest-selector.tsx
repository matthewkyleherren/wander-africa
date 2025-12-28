"use client";

import { GuestCounterGroup } from "@/components/ui/counter";
import { useSearchStore } from "@/lib/stores/search-store";

interface GuestSelectorProps {
  className?: string;
  maxGuests?: number;
  allowPets?: boolean;
}

export function GuestSelector({
  className = "",
  maxGuests = 16,
  allowPets = true,
}: GuestSelectorProps) {
  const { guests, setGuests } = useSearchStore();

  return (
    <div className={`p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="font-medium text-foreground">Who's coming?</h3>
      </div>

      <GuestCounterGroup
        adults={guests.adults}
        children={guests.children}
        infants={guests.infants}
        pets={guests.pets}
        onAdultsChange={(value) => setGuests({ adults: value })}
        onChildrenChange={(value) => setGuests({ children: value })}
        onInfantsChange={(value) => setGuests({ infants: value })}
        onPetsChange={(value) => setGuests({ pets: value })}
        maxGuests={maxGuests}
        allowPets={allowPets}
      />
    </div>
  );
}
