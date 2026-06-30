"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";

export function DemoBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
      <strong>Interactive prototype</strong> — mock data only, no backend. Actions
      save in your browser for this demo session.
    </div>
  );
}

export function Header() {
  const { user, logout, compareList } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
            CC
          </span>
          <div>
            <div className="text-lg font-bold text-slate-900">CareCircuit</div>
            <div className="text-xs text-slate-500">Compare care across India</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/search" className="hover:text-teal-700">
            Find Care
          </Link>
          <Link href="/compare" className="hover:text-teal-700">
            Compare
            {compareList.length > 0 && (
              <span className="ml-1 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-800">
                {compareList.length}
              </span>
            )}
          </Link>
          {user?.role === "public" && (
            <Link href="/my-activity" className="hover:text-teal-700">
              My Activity
            </Link>
          )}
          {user?.role === "hospital" && (
            <Link href="/hospital/dashboard" className="hover:text-teal-700">
              Hospital Portal
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
