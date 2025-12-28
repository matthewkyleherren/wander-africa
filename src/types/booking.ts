import { Property, GuestCount } from "./property";

/**
 * Booking request payload
 */
export interface BookingRequest {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  guests: GuestCount;
  specialRequests?: string;
  addOns?: BookingAddOn[];
}

/**
 * Guest count for bookings
 */
export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

/**
 * Optional add-on services
 */
export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Booking price quote
 */
export interface BookingQuote {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: GuestCount;
  breakdown: PriceBreakdown;
  availability: "available" | "unavailable" | "request_only";
  expiresAt: string;
}

/**
 * Detailed price breakdown
 */
export interface PriceBreakdown {
  nightlyRate: number;
  nightlyTotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  addOns: number;
  discount?: {
    type: "weekly" | "monthly" | "promo";
    amount: number;
    description: string;
  };
  total: number;
  currency: "USD";
}

/**
 * Complete booking record
 */
export interface Booking {
  id: string;
  confirmationCode: string;
  property: BookingProperty;
  guest: BookingGuest;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: GuestCount;
  pricing: PriceBreakdown;
  status: BookingStatus;
  payment: PaymentInfo;
  specialRequests?: string;
  addOns: BookingAddOn[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Simplified property info for booking
 */
export interface BookingProperty {
  id: string;
  slug: string;
  name: string;
  image: string;
  location: {
    city: string;
    state: string;
    address: string;
  };
  host: {
    name: string;
    avatar?: string;
  };
}

/**
 * Guest info for booking
 */
export interface BookingGuest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

/**
 * Booking status
 */
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded"
  | "no_show";

/**
 * Payment information
 */
export interface PaymentInfo {
  method: "card" | "bank" | "paypal";
  status: "pending" | "authorized" | "captured" | "failed" | "refunded";
  last4?: string;
  brand?: string;
  transactionId?: string;
}

/**
 * Booking calendar day
 */
export interface BookingCalendarDay {
  date: string;
  available: boolean;
  price?: number;
  minimumNights?: number;
  isCheckInOnly?: boolean;
  isCheckOutOnly?: boolean;
  isBlocked?: boolean;
  blockReason?: string;
}

/**
 * Booking form state
 */
export interface BookingFormState {
  step: "dates" | "guests" | "review" | "payment" | "confirmation";
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestCount;
  specialRequests: string;
  addOns: BookingAddOn[];
  quote: BookingQuote | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Trip listing for user dashboard
 */
export interface Trip {
  id: string;
  booking: Booking;
  type: "upcoming" | "current" | "past" | "cancelled";
  daysUntil?: number;
  canCancel: boolean;
  canModify: boolean;
  canReview: boolean;
}

/**
 * Cancellation request
 */
export interface CancellationRequest {
  bookingId: string;
  reason: string;
  refundAmount: number;
  refundPercentage: number;
}

/**
 * Modification request
 */
export interface ModificationRequest {
  bookingId: string;
  newCheckIn?: Date;
  newCheckOut?: Date;
  newGuests?: GuestCount;
  priceDifference: number;
}
