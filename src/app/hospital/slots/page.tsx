"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function HospitalSlotsPage() {
  const router = useRouter();
  const { user, allServices, allSlots, hydrated } = useApp();

  useEffect(() => {
    if (hydrated && (!user || user.role !== "hospital")) {
      router.push("/login");
    }
  }, [user, hydrated, router]);

  if (!hydrated || !user?.hospitalId) return <div>Loading...</div>;

  const mySlots = allSlots.filter((s) => s.hospitalId === user.hospitalId);

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Appointment slots</h2>
      <p className="mb-6 text-sm text-slate-600">
        Pre-configured demo slots for your services. Patients can book these from service pages.
      </p>

      {mySlots.length === 0 ? (
        <p className="text-slate-500">No slots configured for your hospital in this demo.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Available</th>
              </tr>
            </thead>
            <tbody>
              {mySlots.map((slot) => {
                const service = allServices.find((s) => s.id === slot.serviceId);
                return (
                  <tr key={slot.id} className="border-b border-slate-100">
                    <td className="p-3">{service?.name ?? slot.serviceId}</td>
                    <td className="p-3">{formatDate(slot.date)}</td>
                    <td className="p-3">{slot.time}</td>
                    <td className="p-3">{slot.doctorName}</td>
                    <td className="p-3">
                      <span className={slot.available > 0 ? "text-green-700" : "text-red-600"}>
                        {slot.available}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
