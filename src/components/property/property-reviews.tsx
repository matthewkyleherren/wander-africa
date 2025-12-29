"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { ReviewSummary, Review } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Rating, RatingBar } from "@/components/ui/rating";
import { Avatar } from "@/components/ui/avatar";

interface PropertyReviewsProps {
  reviews: ReviewSummary;
  recentReviews?: Review[];
  className?: string;
}

export function PropertyReviews({
  reviews,
  recentReviews = [],
  className = "",
}: PropertyReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayReviews = showAll ? recentReviews : recentReviews.slice(0, 6);

  const categoryLabels = {
    cleanliness: "Cleanliness",
    accuracy: "Accuracy",
    checkIn: "Check-in",
    communication: "Communication",
    location: "Location",
    value: "Value",
  };

  return (
    <div className={`py-8 border-b border-border ${className}`}>
      {/* Overall Rating */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-8 h-8 fill-accent text-accent" />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-display-sm font-display">
                {reviews.averageRating.toFixed(1)}
              </span>
              <span className="text-foreground-muted">
                · {reviews.totalCount} reviews
              </span>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        {reviews.aiSummary && (
          <p className="text-body-md text-foreground-muted max-w-3xl">
            {reviews.aiSummary}
          </p>
        )}
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
        {Object.entries(reviews.categoryAverages).map(([key, value]) => (
          <RatingBar
            key={key}
            label={categoryLabels[key as keyof typeof categoryLabels]}
            value={value}
            max={5}
          />
        ))}
      </div>

      {/* Recent Reviews */}
      {recentReviews.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {displayReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {recentReviews.length > 6 && !showAll && (
            <Button variant="outline" onClick={() => setShowAll(true)}>
              Show all {reviews.totalCount} reviews
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-3">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center text-foreground font-medium">
          {review.author.avatar ? (
            <img
              src={review.author.avatar}
              alt={review.author.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            review.author.name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <div className="font-medium text-foreground">
            {review.author.name}
          </div>
          {review.author.location && (
            <div className="text-sm text-foreground-muted">
              {review.author.location}
            </div>
          )}
        </div>
      </div>

      {/* Rating and Date */}
      <div className="flex items-center gap-2 text-sm">
        <Rating value={review.rating} size="sm" />
        <span className="text-foreground-muted">·</span>
        <span className="text-foreground-muted">
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Review Content */}
      <p className="text-foreground text-sm leading-relaxed line-clamp-4">
        {review.content}
      </p>

      {/* Host Response */}
      {review.response && (
        <div className="pl-4 border-l-2 border-border mt-3">
          <div className="text-sm font-medium text-foreground mb-1">
            Response from host
          </div>
          <p className="text-sm text-foreground-muted">
            {review.response.content}
          </p>
        </div>
      )}
    </div>
  );
}
