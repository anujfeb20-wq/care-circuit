"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { RatingStars } from "@/components/RatingStars";
import { ServiceCard } from "@/components/ServiceCard";
import { getHospital } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function HospitalPage() {
  const params = useParams();
  const id = params.id as string;
  const hospital = getHospital(id);
  const { allServices, getReviewsFor } = useApp();

  if (!hospital) notFound();

  const services = allServices.filter((s) => s.hospitalId === id);
  const hospitalReviews = getReviewsFor("hospital", id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{hospital.name}</h1>
            <p className="mt-1 text-slate-600">
              {hospital.address}, {hospital.city}, {hospital.state} — {hospital.pincode}
            </p>
            <p className="mt-2 text-sm text-teal-700">{hospital.accreditation}</p>
          </div>
          <RatingStars rating={hospital.rating} size="md" count={hospital.reviewCount} />
        </div>
        <p className="mt-4 text-slate-600">{hospital.description}</p>
        <p className="mt-2 text-sm text-slate-500">Phone: {hospital.phone}</p>
      </div>

      <h2 className="mb-4 text-xl font-bold text-slate-900">
        Services ({services.length})
      </h2>
      <div className="mb-10 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <h2 className="mb-4 text-xl font-bold text-slate-900">Patient reviews</h2>
      {hospitalReviews.length === 0 ? (
        <p className="text-slate-500">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {hospitalReviews.map((r) => (
            <div key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.userName}</span>
                <RatingStars rating={r.rating} showValue={false} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{r.comment}</p>
              <p className="mt-1 text-xs text-slate-400">{formatDate(r.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
