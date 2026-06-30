"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getHospital } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export default function HospitalDashboardPage() {
  const router = useRouter();
  const { user, allServices, enquiries, bookings, hydrated } = useApp();

  useEffect(() => {
    if (hydrated && (!user || user.role !== "hospital")) {
      router.push("/login");
    }
  }, [user, hydrated, router]);

  if (!hydrated || !user?.hospitalId) {
    return <div>Loading...</div>;
  }

  const hospital = getHospital(user.hospitalId);
  const myServices = allServices.filter((s) => s.hospitalId === user.hospitalId);
  const myEnquiries = enquiries.filter((e) => e.hospitalId === user.hospitalId);
  const myBookings = bookings.filter((b) => b.hospitalId === user.hospitalId);
  const pendingEnquiries = myEnquiries.filter((e) => e.status === "pending").length;
  const pendingBookings = myBookings.filter((b) => b.status === "pending").length;

  return (
    <div>
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">{hospital?.name}</h2>
        <p className="text-slate-600">{hospital?.city}, {hospital?.state}</p>
        <p className="mt-2 text-sm text-slate-500">Logged in as {user.name}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active services", value: myServices.length },
          { label: "Pending enquiries", value: pendingEnquiries },
          { label: "Pending bookings", value: pendingBookings },
          { label: "Hospital rating", value: hospital?.rating.toFixed(1) ?? "—" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-3xl font-bold text-teal-700">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Demo tip:</strong> Login as <em>patient@demo.com</em> in another tab to
        submit enquiries and bookings. They will appear in your Inbox here.
      </div>
    </div>
  );
}
