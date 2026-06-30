interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md";
  showValue?: boolean;
  count?: number;
}

export function RatingStars({
  rating,
  size = "sm",
  showValue = true,
  count,
}: RatingStarsProps) {
  const starSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={`flex items-center gap-1 ${starSize}`}>
      <span className="text-amber-500">
        {"★".repeat(Math.round(rating))}
        <span className="text-slate-300">
          {"★".repeat(5 - Math.round(rating))}
        </span>
      </span>
      {showValue && (
        <span className="font-medium text-slate-700">{rating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-slate-500">({count})</span>
      )}
    </div>
  );
}
