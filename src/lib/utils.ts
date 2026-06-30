import type { Service } from "./types";

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function discountedPrice(service: Service) {
  if (!service.discountPercent) return service.price;
  return Math.round(service.price * (1 - service.discountPercent / 100));
}

export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
