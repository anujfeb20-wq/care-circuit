"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DEMO_USERS } from "@/lib/demo-users";
import { useApp } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, loginAsDemo } = useApp();
  const [email, setEmail] = useState("patient@demo.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setError("Invalid credentials. Use the demo accounts below.");
      return;
    }
    const user = DEMO_USERS.find((u) => u.email === email);
    router.push(user?.role === "hospital" ? "/hospital/dashboard" : "/search");
  }

  function quickLogin(userId: string) {
    loginAsDemo(userId);
    const user = DEMO_USERS.find((u) => u.id === userId);
    router.push(user?.role === "hospital" ? "/hospital/dashboard" : "/search");
  }

  function googleLogin(role: "public" | "hospital") {
    loginWithGoogle(role);
    router.push(role === "hospital" ? "/hospital/dashboard" : "/search");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Welcome to CareCircuit</h1>
      <p className="mb-8 text-slate-600">
        Sign in with a demo account to explore patient or hospital flows.
      </p>

      <form onSubmit={handleLogin} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-teal-600 py-2.5 font-medium text-white hover:bg-teal-700"
        >
          Sign in
        </button>

        <div className="relative py-2 text-center text-sm text-slate-400">
          <span className="bg-white px-2">or</span>
        </div>

        <button
          type="button"
          onClick={() => googleLogin("public")}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 hover:bg-slate-50"
        >
          <span className="text-lg">G</span>
          Continue with Google (as Patient)
        </button>
        <button
          type="button"
          onClick={() => googleLogin("hospital")}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 hover:bg-slate-50"
        >
          <span className="text-lg">G</span>
          Continue with Google (as Hospital)
        </button>
      </form>

      <div className="mt-8 rounded-xl border border-dashed border-teal-300 bg-teal-50 p-5">
        <h2 className="mb-3 font-semibold text-teal-900">Quick demo login</h2>
        <div className="space-y-2">
          {DEMO_USERS.map((u) => (
            <button
              key={u.id}
              onClick={() => quickLogin(u.id)}
              className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left text-sm hover:shadow-sm"
            >
              <div>
                <div className="font-medium text-slate-900">{u.name}</div>
                <div className="text-slate-500">{u.email}</div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
                {u.role === "public" ? "Patient" : "Hospital"}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-teal-800">Password for all: <strong>demo123</strong></p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link href="/" className="text-teal-700 hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
