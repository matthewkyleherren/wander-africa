import { ReviewSummary, ReviewCategories } from "@/types/property";
import { Star } from "lucide-react";

interface ReviewsSummaryProps {
  summary: ReviewSummary;
  className?: string;
}

interface RatingBreakdownProps {
  categories: ReviewCategories;
  className?: string;
}

export function ReviewsSummarySection({ summary, className = "" }: ReviewsSummaryProps) {
  return (
    <section className={`${className}`}>
      <h2 className="heading-2 mb-6">Guest Reviews</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div>
          <div className="flex items-baseline gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 fill-stone-900 text-stone-900" />
              <span className="text-5xl font-serif font-medium text-stone-900">
                {summary.averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-stone-600">
              <p className="text-lg font-medium">Exceptional</p>
              <p className="text-sm">{summary.totalCount} reviews</p>
            </div>
          </div>

          {/* AI Summary if available */}
          {summary.aiSummary && (
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-sm text-stone-700 leading-relaxed">
                {summary.aiSummary}
              </p>
            </div>
          )}
        </div>

        {/* Rating Breakdown */}
        <RatingBreakdown categories={summary.categoryAverages} />
      </div>
    </section>
  );
}

export function RatingBreakdown({ categories, className = "" }: RatingBreakdownProps) {
  const categoryLabels: Record<keyof ReviewCategories, string> = {
    cleanliness: "Cleanliness",
    accuracy: "Accuracy",
    checkIn: "Check-in",
    communication: "Communication",
    location: "Location",
    value: "Value",
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {Object.entries(categories).map(([key, value]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-sm text-stone-600 w-28 flex-shrink-0">
            {categoryLabels[key as keyof ReviewCategories]}
          </span>
          <div className="flex-1 bg-stone-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-stone-900 h-full rounded-full transition-all duration-500"
              style={{ width: `${(value / 5) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-stone-900 w-8 text-right">
            {value.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
