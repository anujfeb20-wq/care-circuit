"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/hospital/dashboard", label: "Dashboard" },
  { href: "/hospital/services", label: "Services" },
  { href: "/hospital/slots", label: "Slots" },
  { href: "/hospital/inbox", label: "Inbox" },
];

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Hospital Portal</h1>
        <p className="text-slate-600">Manage your listings, slots, and patient requests</p>
      </div>
      <nav className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              pathname === item.href
                ? "bg-teal-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
