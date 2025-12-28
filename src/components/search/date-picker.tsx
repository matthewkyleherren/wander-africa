"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";

interface DatePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  className?: string;
}

export function DatePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  className = "",
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [flexibleDates, setFlexibleDates] = useState<
    "weekend" | "week" | "month" | null
  >(null);

  const nextMonth = addMonths(currentMonth, 1);

  const handleDateClick = (date: Date) => {
    if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return; // Don't allow past dates
    }

    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      onCheckInChange(date);
      onCheckOutChange(null);
    } else if (checkIn && !checkOut) {
      // Set check-out
      if (isAfter(date, checkIn)) {
        onCheckOutChange(date);
      } else {
        // If earlier than check-in, swap them
        onCheckOutChange(checkIn);
        onCheckInChange(date);
      }
    }
  };

  const handleClear = () => {
    onCheckInChange(null);
    onCheckOutChange(null);
    setFlexibleDates(null);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className={`${className}`}>
      {/* Flexible Dates Options */}
      <div className="mb-6">
        <div className="text-sm font-medium text-foreground mb-3">
          Choose dates
        </div>
        <div className="flex gap-2 flex-wrap">
          <Chip
            selected={flexibleDates === "weekend"}
            onClick={() =>
              setFlexibleDates(flexibleDates === "weekend" ? null : "weekend")
            }
          >
            Weekend
          </Chip>
          <Chip
            selected={flexibleDates === "week"}
            onClick={() =>
              setFlexibleDates(flexibleDates === "week" ? null : "week")
            }
          >
            Week
          </Chip>
          <Chip
            selected={flexibleDates === "month"}
            onClick={() =>
              setFlexibleDates(flexibleDates === "month" ? null : "month")
            }
          >
            Month
          </Chip>
          {(checkIn || checkOut) && (
            <button
              onClick={handleClear}
              className="text-sm text-accent hover:text-accent-dark transition-colors underline"
            >
              Clear dates
            </button>
          )}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handlePrevMonth}
          disabled={
            isSameMonth(currentMonth, new Date()) ||
            isBefore(currentMonth, new Date())
          }
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-8">
          <div className="text-center">
            <div className="font-medium text-foreground">
              {format(currentMonth, "MMMM yyyy")}
            </div>
          </div>
          <div className="text-center hidden md:block">
            <div className="font-medium text-foreground">
              {format(nextMonth, "MMMM yyyy")}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={handleNextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Calendars */}
      <div className="grid md:grid-cols-2 gap-8">
        <Calendar
          month={currentMonth}
          checkIn={checkIn}
          checkOut={checkOut}
          onDateClick={handleDateClick}
        />
        <div className="hidden md:block">
          <Calendar
            month={nextMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            onDateClick={handleDateClick}
          />
        </div>
      </div>
    </div>
  );
}

interface CalendarProps {
  month: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onDateClick: (date: Date) => void;
}

function Calendar({ month, checkIn, checkOut, onDateClick }: CalendarProps) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const isDateInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    return isWithinInterval(date, { start: checkIn, end: checkOut });
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, new Date()) && !isSameDay(date, new Date());
  };

  return (
    <div>
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center text-xs font-medium text-foreground-muted"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, month);
          const isCheckIn = checkIn && isSameDay(day, checkIn);
          const isCheckOut = checkOut && isSameDay(day, checkOut);
          const isInRange = isDateInRange(day);
          const isDisabled = isDateDisabled(day);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={index}
              onClick={() => !isDisabled && onDateClick(day)}
              disabled={isDisabled}
              className={`
                h-10 flex items-center justify-center text-sm rounded-lg transition-all
                ${!isCurrentMonth ? "text-foreground-muted/40" : ""}
                ${
                  isDisabled
                    ? "text-foreground-muted/30 cursor-not-allowed line-through"
                    : ""
                }
                ${
                  isCheckIn || isCheckOut
                    ? "bg-accent text-white font-medium"
                    : ""
                }
                ${
                  isInRange && !isCheckIn && !isCheckOut
                    ? "bg-accent-muted text-accent"
                    : ""
                }
                ${isToday && !isCheckIn && !isCheckOut ? "border border-accent" : ""}
                ${
                  !isDisabled &&
                  !isCheckIn &&
                  !isCheckOut &&
                  !isInRange &&
                  isCurrentMonth
                    ? "hover:bg-background-secondary"
                    : ""
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
