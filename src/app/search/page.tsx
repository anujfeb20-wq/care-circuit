"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ServiceCard } from "@/components/ServiceCard";
import { getHospital } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import type { ServiceCategory } from "@/lib/types";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const city = searchParams.get("city") ?? "";
  const category = (searchParams.get("category") ?? "") as ServiceCategory | "";
  const { allServices, addToCompare, compareList } = useApp();

  const results = useMemo(() => {
    return allServices.filter((service) => {
      const hospital = getHospital(service.hospitalId);
      if (!hospital) return false;

      const matchesQuery =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        hospital.name.toLowerCase().includes(query);

      const matchesCity =
        !city || city === "All India" || hospital.city === city;

      const matchesCategory = !category || service.category === category;

      return matchesQuery && matchesCity && matchesCategory;
    });
  }, [allServices, query, city, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Find healthcare services</h1>
      <p className="mb-6 text-sm text-slate-600">
        Start with a service category, then city, then service name.
      </p>
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-4">
        <SearchBar
          defaultQuery={searchParams.get("q") ?? ""}
          defaultCity={city}
          defaultCategory={category}
        />
      </div>

      <p className="mb-4 text-sm text-slate-600">
        {results.length} service{results.length !== 1 ? "s" : ""} found
        {city && city !== "All India" ? ` in ${city}` : " across India"}
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
          No services match your search. Try a different city or category.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              showCompare
              inCompare={compareList.some((c) => c.serviceId === service.id)}
              onCompare={() =>
                addToCompare({
                  hospitalId: service.hospitalId,
                  serviceId: service.id,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
