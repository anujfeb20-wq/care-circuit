import Link from "next/link";
import { getHospital } from "@/lib/mock-data";
import type { Service } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { discountedPrice, formatPrice } from "@/lib/utils";
import { RatingStars } from "./RatingStars";

interface ServiceCardProps {
  service: Service;
  showCompare?: boolean;
  onCompare?: () => void;
  inCompare?: boolean;
}

export function ServiceCard({
  service,
  showCompare,
  onCompare,
  inCompare,
}: ServiceCardProps) {
  const hospital = getHospital(service.hospitalId);
  const finalPrice = discountedPrice(service);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {CATEGORY_LABELS[service.category]}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            <Link href={`/services/${service.id}`} className="hover:text-teal-700">
              {service.name}
            </Link>
          </h3>
          {hospital && (
            <p className="text-sm text-slate-500">
              {hospital.name} · {hospital.city}, {hospital.state}
            </p>
          )}
        </div>
        <RatingStars rating={service.rating} count={service.reviewCount} />
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-slate-600">
        {service.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-3 text-sm">
        <span className="font-semibold text-slate-900">
          {formatPrice(finalPrice)}
          {service.discountPercent ? (
            <span className="ml-2 text-xs font-normal text-slate-400 line-through">
              {formatPrice(service.price)}
            </span>
          ) : null}
        </span>
        {service.discountPercent ? (
          <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            {service.discountPercent}% off
          </span>
        ) : null}
        <span className="text-slate-500">
          {service.admissionRequired ? "Admission required" : "No admission"}
        </span>
        <span className="text-slate-500">{service.durationDays} day(s)</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/services/${service.id}`}
          className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700"
        >
          View details
        </Link>
        {showCompare && onCompare && (
          <button
            onClick={onCompare}
            disabled={inCompare}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            {inCompare ? "Added" : "Compare"}
          </button>
        )}
      </div>
    </article>
  );
}
