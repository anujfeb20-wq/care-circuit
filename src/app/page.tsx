import Link from "next/link";
import { QuickLink, SearchBar } from "@/components/SearchBar";
import { hospitals } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-700 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Find the right care, at the right hospital
          </h1>
          <p className="mb-8 text-lg text-teal-100">
            Search, compare, and book healthcare services across India — doctors,
            surgeries, tests, and more.
          </p>
          <div className="rounded-2xl bg-white p-4 shadow-xl">
            <SearchBar large />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <QuickLink href="/search?q=knee+replacement&category=surgery">
              Knee replacement
            </QuickLink>
            <QuickLink href="/search?q=health+checkup&category=test">
              Health checkup
            </QuickLink>
            <QuickLink href="/search?category=specialist">
              Specialists
            </QuickLink>
            <QuickLink href="/compare">Compare hospitals</QuickLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Featured hospitals across India
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((h) => (
            <Link
              key={h.id}
              href={`/hospitals/${h.id}`}
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900">{h.name}</h3>
              <p className="text-sm text-slate-500">
                {h.city}, {h.state}
              </p>
              <p className="mt-2 text-sm text-amber-600">
                ★ {h.rating} · {h.reviewCount} reviews
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                {h.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
            How CareCircuit works
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "1", title: "Search", desc: "By city, service, or specialty across India" },
              { step: "2", title: "Compare", desc: "Price, ratings, admission, and duration side-by-side" },
              { step: "3", title: "Enquire or Book", desc: "Send a message or pick an available slot" },
              { step: "4", title: "Review", desc: "Share your experience after your visit" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/login"
              className="inline-block rounded-lg bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-700"
            >
              Try the demo — login as patient or hospital
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
