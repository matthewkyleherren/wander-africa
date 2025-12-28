"use client";

import { useState } from "react";
import { differenceInDays } from "date-fns";
import { Calendar, Users } from "lucide-react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/search/date-picker";
import { GuestSelector } from "@/components/search/guest-selector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSearchStore } from "@/lib/stores/search-store";

interface BookingSidebarProps {
  property: Property;
  className?: string;
}

export function BookingSidebar({
  property,
  className = "",
}: BookingSidebarProps) {
  const {
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    getGuestSummary,
    getDateSummary,
  } = useSearchStore();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  const basePrice = property.pricing.basePrice;
  const cleaningFee = property.pricing.cleaningFee;
  const serviceFeeRate = property.pricing.serviceFee;

  // Calculate totals
  const nights =
    checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * basePrice;
  const serviceFee = subtotal * serviceFeeRate;
  const total = subtotal + cleaningFee + serviceFee;

  const handleReserve = () => {
    // TODO: Navigate to checkout
    console.log("Reserve property", property.id);
  };

  return (
    <div className={`sticky top-24 ${className}`}>
      <div className="rounded-2xl border border-border shadow-soft-lg p-6 bg-white">
        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-heading-lg font-display">
              ${basePrice.toLocaleString()}
            </span>
            <span className="text-foreground-muted">/ night</span>
          </div>
          {property.reviews.averageRating > 0 && (
            <div className="flex items-center gap-1 text-sm text-foreground-muted mt-1">
              <span className="text-foreground font-medium">
                ★ {property.reviews.averageRating.toFixed(1)}
              </span>
              <span>·</span>
              <span>{property.reviews.totalCount} reviews</span>
            </div>
          )}
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-2 border border-border rounded-xl overflow-hidden mb-4">
          <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
            <PopoverTrigger asChild>
              <button className="p-3 text-left border-r border-border hover:bg-background-secondary transition-colors">
                <div className="text-xs font-medium text-foreground-muted mb-1">
                  CHECK-IN
                </div>
                <div className="text-sm text-foreground">
                  {checkIn
                    ? checkIn.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Add date"}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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

          <button
            onClick={() => setShowDatePicker(true)}
            className="p-3 text-left hover:bg-background-secondary transition-colors"
          >
            <div className="text-xs font-medium text-foreground-muted mb-1">
              CHECKOUT
            </div>
            <div className="text-sm text-foreground">
              {checkOut
                ? checkOut.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Add date"}
            </div>
          </button>
        </div>

        {/* Guest Selection */}
        <Popover open={showGuestSelector} onOpenChange={setShowGuestSelector}>
          <PopoverTrigger asChild>
            <button className="w-full p-3 text-left border border-border rounded-xl hover:bg-background-secondary transition-colors mb-6">
              <div className="text-xs font-medium text-foreground-muted mb-1">
                GUESTS
              </div>
              <div className="text-sm text-foreground">{getGuestSummary()}</div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <GuestSelector maxGuests={property.capacity.maxGuests} />
          </PopoverContent>
        </Popover>

        {/* Reserve Button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full mb-4"
          onClick={handleReserve}
          disabled={!checkIn || !checkOut}
        >
          {checkIn && checkOut ? "Reserve" : "Select dates"}
        </Button>

        {/* Price Breakdown */}
        {nights > 0 ? (
          <div className="space-y-3 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-foreground">
              <span className="underline">
                ${basePrice.toLocaleString()} x {nights} night
                {nights !== 1 ? "s" : ""}
              </span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-foreground">
              <span className="underline">Cleaning fee</span>
              <span>${cleaningFee.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-foreground">
              <span className="underline">Service fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-foreground font-medium pt-3 border-t border-border">
              <span>Total before taxes</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-center text-foreground-muted">
            You won't be charged yet
          </p>
        )}
      </div>

      {/* Additional Info */}
      <p className="text-xs text-center text-foreground-muted mt-4">
        Free cancellation before{" "}
        {checkIn &&
          new Date(checkIn.getTime() - 48 * 60 * 60 * 1000).toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric" }
          )}
      </p>
    </div>
  );
}
