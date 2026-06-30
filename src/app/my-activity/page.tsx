"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RatingStars } from "@/components/RatingStars";
import { getHospital } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function MyActivityPage() {
  const router = useRouter();
  const { user, enquiries, bookings, reviews, allServices, allSlots, hydrated } = useApp();

  useEffect(() => {
    if (hydrated && (!user || user.role !== "public")) {
      router.push("/login");
    }
  }, [user, hydrated, router]);

  if (!hydrated || !user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const myEnquiries = enquiries.filter((e) => e.userId === user.id);
  const myBookings = bookings.filter((b) => b.userId === user.id);
  const myReviews = reviews.filter((r) => r.userId === user.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">My Activity</h1>
      <p className="mb-8 text-slate-600">Your enquiries, bookings, and reviews</p>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Bookings ({myBookings.length})</h2>
        {myBookings.length === 0 ? (
          <p className="text-slate-500">No bookings yet. <Link href="/search" className="text-teal-700">Search services</Link></p>
        ) : (
          <div className="space-y-3">
            {myBookings.map((b) => {
              const service = allServices.find((s) => s.id === b.serviceId);
              const hospital = getHospital(b.hospitalId);
              const slot = allSlots.find((s) => s.id === b.slotId);
              return (
                <div key={b.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{service?.name}</div>
                      <div className="text-sm text-slate-500">{hospital?.name}</div>
                      {slot && (
                        <div className="mt-1 text-sm text-slate-600">
                          {formatDate(slot.date)} at {slot.time}
                        </div>
                      )}
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                      b.status === "confirmed" ? "bg-green-100 text-green-800" :
                      b.status === "cancelled" ? "bg-red-100 text-red-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Enquiries ({myEnquiries.length})</h2>
        {myEnquiries.length === 0 ? (
          <p className="text-slate-500">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {myEnquiries.map((e) => {
              const service = allServices.find((s) => s.id === e.serviceId);
              const hospital = getHospital(e.hospitalId);
              return (
                <div key={e.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{service?.name}</div>
                      <div className="text-sm text-slate-500">{hospital?.name}</div>
                      <p className="mt-2 text-sm text-slate-600">{e.message}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium capitalize text-amber-800">
                      {e.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">My reviews ({myReviews.length})</h2>
        {myReviews.length === 0 ? (
          <p className="text-slate-500">No reviews submitted yet.</p>
        ) : (
          <div className="space-y-3">
            {myReviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <RatingStars rating={r.rating} />
                <p className="mt-2 text-sm text-slate-600">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
