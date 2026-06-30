"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function HospitalInboxPage() {
  const router = useRouter();
  const {
    user,
    enquiries,
    bookings,
    allServices,
    allSlots,
    updateEnquiryStatus,
    updateBookingStatus,
    hydrated,
  } = useApp();

  useEffect(() => {
    if (hydrated && (!user || user.role !== "hospital")) {
      router.push("/login");
    }
  }, [user, hydrated, router]);

  if (!hydrated || !user?.hospitalId) return <div>Loading...</div>;

  const myEnquiries = enquiries.filter((e) => e.hospitalId === user.hospitalId);
  const myBookings = bookings.filter((b) => b.hospitalId === user.hospitalId);

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">Patient requests</h2>

      <section className="mb-10">
        <h3 className="mb-4 font-semibold text-slate-800">Bookings ({myBookings.length})</h3>
        {myBookings.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
            No booking requests yet.
          </p>
        ) : (
          <div className="space-y-3">
            {myBookings.map((b) => {
              const service = allServices.find((s) => s.id === b.serviceId);
              const slot = allSlots.find((s) => s.id === b.slotId);
              return (
                <div key={b.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-medium">{service?.name}</div>
                      <div className="text-sm text-slate-500">{b.userName} · {b.userEmail}</div>
                      {slot && (
                        <div className="mt-1 text-sm">
                          Slot: {formatDate(slot.date)} at {slot.time}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {b.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(b.id, "confirmed")}
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, "cancelled")}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                        b.status === "confirmed" ? "bg-green-100 text-green-800" :
                        b.status === "cancelled" ? "bg-red-100 text-red-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-4 font-semibold text-slate-800">Enquiries ({myEnquiries.length})</h3>
        {myEnquiries.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
            No enquiries yet.
          </p>
        ) : (
          <div className="space-y-3">
            {myEnquiries.map((e) => {
              const service = allServices.find((s) => s.id === e.serviceId);
              return (
                <div key={e.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-medium">{service?.name}</div>
                      <div className="text-sm text-slate-500">{e.userName} · {e.userEmail}</div>
                      <div className="mt-1 text-sm text-slate-600">Preferred: {formatDate(e.preferredDate)}</div>
                      <p className="mt-2 text-sm">{e.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {e.status === "pending" && (
                        <button
                          onClick={() => updateEnquiryStatus(e.id, "contacted")}
                          className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs text-white hover:bg-teal-700"
                        >
                          Mark contacted
                        </button>
                      )}
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs capitalize text-amber-800">
                        {e.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
