import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DemoBanner } from "@/components/Header";
import { Header } from "@/components/Header";
import { AppProvider } from "@/lib/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareCircuit — Compare Healthcare Across India",
  description:
    "Interactive prototype: search hospitals, compare services, enquire and book appointments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <AppProvider>
          <DemoBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
            CareCircuit prototype · Pan-India healthcare comparison · Mock data
            only
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
