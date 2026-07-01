"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RatingStars } from "@/components/RatingStars";
import { useApp } from "@/lib/store";
import type { ServiceCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default function HospitalServicesPage() {
  const router = useRouter();
  const { user, allServices, addService, hydrated } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "other" as ServiceCategory,
    description: "",
    price: "",
    discountPercent: "",
    admissionRequired: false,
    durationDays: "1",
  });

  useEffect(() => {
    if (hydrated && (!user || user.role !== "hospital")) {
      router.push("/login");
    }
  }, [user, hydrated, router]);

  if (!hydrated || !user?.hospitalId) return <div>Loading...</div>;

  const myServices = allServices.filter((s) => s.hospitalId === user.hospitalId);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    addService({
      hospitalId: user!.hospitalId!,
      name: form.name,
      category: form.category,
      description: form.description,
      price: Number(form.price),
      discountPercent: form.discountPercent ? Number(form.discountPercent) : undefined,
      admissionRequired: form.admissionRequired,
      durationDays: Number(form.durationDays),
    });
    setForm({
      name: "",
      category: "other",
      description: "",
      price: "",
      discountPercent: "",
      admissionRequired: false,
      durationDays: "1",
    });
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Your services</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          {showForm ? "Cancel" : "+ Add custom service"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mb-8 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <h3 className="font-semibold">New custom service</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Service name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
              required
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ServiceCategory })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
            >
              {(Object.keys(CATEGORY_LABELS) as ServiceCategory[]).map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price (INR)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
              required
            />
            <input
              type="number"
              placeholder="Discount % (optional)"
              value={form.discountPercent}
              onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
            />
            <input
              type="number"
              placeholder="Duration (days)"
              value={form.durationDays}
              onChange={(e) => setForm({ ...form, durationDays: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
              required
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.admissionRequired}
                onChange={(e) => setForm({ ...form, admissionRequired: e.target.checked })}
              />
              Admission required
            </label>
          </div>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
            required
          />
          <button type="submit" className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
            Add service
          </button>
        </form>
      )}

      <div className="space-y-3">
        {myServices.map((service) => (
          <div key={service.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900">{service.name}</span>
                {service.isCustom && (
                  <span className="rounded bg-teal-100 px-2 py-0.5 text-xs text-teal-800">Custom</span>
                )}
              </div>
              <div className="text-sm text-slate-500">{CATEGORY_LABELS[service.category]}</div>
              <RatingStars rating={service.rating || 0} count={service.reviewCount} />
            </div>
            <div className="text-right">
              <div className="font-semibold">{formatPrice(discountedPrice(service))}</div>
              <div className="text-xs text-slate-500">
                {service.admissionRequired ? "Admission" : "No admission"} · {service.durationDays}d
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
