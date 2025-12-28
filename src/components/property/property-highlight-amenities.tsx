interface PropertyHighlightAmenitiesProps {
  amenities: string[];
  className?: string;
}

export function PropertyHighlightAmenities({
  amenities,
  className = "",
}: PropertyHighlightAmenitiesProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className={`text-stone-600 ${className}`}>
      <p className="text-base">
        {amenities.map((amenity, index) => (
          <span key={index}>
            {amenity}
            {index < amenities.length - 1 && <span className="mx-2">•</span>}
          </span>
        ))}
      </p>
    </div>
  );
}
