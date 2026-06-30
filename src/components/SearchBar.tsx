"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { INDIAN_CITIES } from "@/lib/mock-data";
import type { ServiceCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface SearchBarProps {
  defaultQuery?: string;
  defaultCity?: string;
  defaultCategory?: ServiceCategory | "";
  large?: boolean;
}

export function SearchBar({
  defaultQuery = "",
  defaultCity = "",
  defaultCategory = "",
  large,
}: SearchBarProps) {
  const router = useRouter();
  const [category, setCategory] = useState(defaultCategory);
  const [city, setCity] = useState(defaultCity);
  const [query, setQuery] = useState(defaultQuery);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (city && city !== "All India") params.set("city", city);
    if (query) params.set("q", query);
    router.push(`/search?${params.toString()}`);
  }

  const fieldClass = large
    ? "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
    : "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

  const placeholderSelectClass = (empty: boolean) =>
    `${fieldClass} ${empty ? "text-slate-400" : "text-slate-900"}`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-3 ${large ? "md:grid-cols-4" : "md:grid-cols-4"}`}
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as ServiceCategory | "")}
        className={placeholderSelectClass(!category)}
        aria-label="Service category"
      >
        <option value="" disabled>
          Service category
        </option>
        {(Object.keys(CATEGORY_LABELS) as ServiceCategory[]).map((cat) => (
          <option key={cat} value={cat} className="text-slate-900">
            {CATEGORY_LABELS[cat]}
          </option>
        ))}
      </select>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={placeholderSelectClass(!city)}
        aria-label="City"
      >
        <option value="" disabled>
          City
        </option>
        {INDIAN_CITIES.map((c) => (
          <option key={c} value={c} className="text-slate-900">
            {c}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Service name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`${fieldClass} placeholder:text-slate-400`}
        aria-label="Service name"
      />

      <button
        type="submit"
        className={`rounded-lg bg-teal-600 font-medium text-white hover:bg-teal-700 ${
          large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
        }`}
      >
        Search
      </button>
    </form>
  );
}

export function QuickLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm text-teal-800 hover:bg-teal-100"
    >
      {children}
    </Link>
  );
}
