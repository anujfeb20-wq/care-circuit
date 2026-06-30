"use client";

import Link from "next/link";
import { RatingStars } from "@/components/RatingStars";
import { getDoctor, getHospital } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/types";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, allServices } = useApp();

  const items = compareList
    .map((c) => {
      const service = allServices.find((s) => s.id === c.serviceId);
      const hospital = service ? getHospital(service.hospitalId) : undefined;
      const doctor = service?.doctorId ? getDoctor(service.doctorId) : undefined;
      return service && hospital ? { service, hospital, doctor } : null;
    })
    .filter(Boolean) as {
    service: (typeof allServices)[0];
    hospital: NonNullable<ReturnType<typeof getHospital>>;
    doctor?: ReturnType<typeof getDoctor>;
  }[];

  const bestPrice =
    items.length > 0
      ? Math.min(...items.map((i) => discountedPrice(i.service)))
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compare hospitals</h1>
          <p className="text-slate-600">Side-by-side comparison of up to 4 services</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-sm text-slate-500 hover:text-red-600"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="mb-4 text-slate-600">No services added yet.</p>
          <Link
            href="/search?q=knee+replacement&category=surgery"
            className="text-teal-700 hover:underline"
          >
            Search knee replacements to compare →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-4 text-left font-medium text-slate-600">Criteria</th>
                {items.map(({ service, hospital }) => (
                  <th key={service.id} className="p-4 text-left">
                    <div className="font-semibold text-slate-900">{hospital.name}</div>
                    <div className="font-normal text-slate-500">
                      {hospital.city}, {hospital.state}
                    </div>
                    <button
                      onClick={() => removeFromCompare(service.id)}
                      className="mt-1 text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Service",
                  render: (i: (typeof items)[0]) => (
                    <Link href={`/services/${i.service.id}`} className="text-teal-700 hover:underline">
                      {i.service.name}
                    </Link>
                  ),
                },
                {
                  label: "Category",
                  render: (i: (typeof items)[0]) => CATEGORY_LABELS[i.service.category],
                },
                {
                  label: "Price",
                  render: (i: (typeof items)[0]) => {
                    const price = discountedPrice(i.service);
                    const isBest = price === bestPrice && items.length > 1;
                    return (
                      <span className={isBest ? "font-bold text-green-700" : ""}>
                        {formatPrice(price)}
                        {isBest && " ✓ Best"}
                      </span>
                    );
                  },
                },
                {
                  label: "Discount",
                  render: (i: (typeof items)[0]) =>
                    i.service.discountPercent
                      ? `${i.service.discountPercent}% off`
                      : "—",
                },
                {
                  label: "Admission",
                  render: (i: (typeof items)[0]) =>
                    i.service.admissionRequired ? "Required" : "Not required",
                },
                {
                  label: "Duration",
                  render: (i: (typeof items)[0]) => `${i.service.durationDays} day(s)`,
                },
                {
                  label: "Service rating",
                  render: (i: (typeof items)[0]) => (
                    <RatingStars rating={i.service.rating} count={i.service.reviewCount} />
                  ),
                },
                {
                  label: "Hospital rating",
                  render: (i: (typeof items)[0]) => (
                    <RatingStars rating={i.hospital.rating} count={i.hospital.reviewCount} />
                  ),
                },
                {
                  label: "Doctor",
                  render: (i: (typeof items)[0]) =>
                    i.doctor ? (
                      <span>
                        {i.doctor.name}
                        <br />
                        <RatingStars rating={i.doctor.rating} size="sm" />
                      </span>
                    ) : (
                      "—"
                    ),
                },
                {
                  label: "Action",
                  render: (i: (typeof items)[0]) => (
                    <Link
                      href={`/services/${i.service.id}`}
                      className="inline-block rounded-lg bg-teal-600 px-3 py-1.5 text-white hover:bg-teal-700"
                    >
                      Book / Enquire
                    </Link>
                  ),
                },
              ].map((row) => (
                <tr key={row.label} className="border-b border-slate-100">
                  <td className="p-4 font-medium text-slate-600">{row.label}</td>
                  {items.map((item) => (
                    <td key={item.service.id} className="p-4 text-slate-800">
                      {row.render(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
