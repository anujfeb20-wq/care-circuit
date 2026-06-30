"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { RatingStars } from "@/components/RatingStars";
import { getDoctor, getHospital } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/types";
import { discountedPrice, formatDate, formatPrice } from "@/lib/utils";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const {
    user,
    allServices,
    allSlots,
    addToCompare,
    compareList,
    submitEnquiry,
    submitBooking,
    submitReview,
    getReviewsFor,
    hasUserReviewed,
    canReview,
  } = useApp();

  const service = allServices.find((s) => s.id === id);
  if (!service) notFound();

  const serviceId = service.id;
  const hospitalId = service.hospitalId;

  const hospital = getHospital(service.hospitalId)!;
  const doctor = service.doctorId ? getDoctor(service.doctorId) : undefined;
  const slots = allSlots.filter(
    (s) => s.serviceId === id && s.available > 0,
  );
  const reviews = getReviewsFor("service", id);

  const [tab, setTab] = useState<"enquire" | "book">("book");
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [success, setSuccess] = useState("");

  function requireLogin(action: () => void) {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "public") {
      setSuccess("Please login as a patient to enquire or book.");
      return;
    }
    action();
  }

  function handleEnquiry(e: React.FormEvent) {
    e.preventDefault();
    requireLogin(() => {
      submitEnquiry({
        userId: user!.id,
        userName: user!.name,
        userEmail: user!.email,
        hospitalId,
        serviceId,
        message,
        preferredDate,
      });
      setSuccess("Enquiry submitted! Check My Activity for status.");
      setMessage("");
    });
  }

  function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    requireLogin(() => {
      if (!selectedSlot) return;
      submitBooking({
        userId: user!.id,
        userName: user!.name,
        userEmail: user!.email,
        hospitalId,
        serviceId,
        slotId: selectedSlot,
      });
      setSuccess("Booking request submitted! Hospital will confirm shortly.");
      setSelectedSlot("");
    });
  }

  function handleReview(e: React.FormEvent) {
    e.preventDefault();
    requireLogin(() => {
      submitReview({
        userId: user!.id,
        userName: user!.name,
        targetType: "service",
        targetId: serviceId,
        rating: reviewRating,
        comment: reviewComment,
      });
      setSuccess("Thank you! Your review has been submitted.");
      setReviewComment("");
    });
  }

  const finalPrice = discountedPrice(service);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href={`/hospitals/${hospital.id}`} className="text-sm text-teal-700 hover:underline">
        ← {hospital.name}
      </Link>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {CATEGORY_LABELS[service.category]}
        </span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{service.name}</h1>
        <p className="mt-2 text-slate-600">{service.description}</p>

        <div className="mt-4 flex flex-wrap gap-4">
          <RatingStars rating={service.rating} size="md" count={service.reviewCount} />
          <span className="text-2xl font-bold text-slate-900">{formatPrice(finalPrice)}</span>
          {service.discountPercent && (
            <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">
              {service.discountPercent}% discount
            </span>
          )}
        </div>

        <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
          <div>📍 {hospital.city}, {hospital.state}</div>
          <div>{service.admissionRequired ? "🏥 Admission required" : "✓ No admission"}</div>
          <div>⏱ {service.durationDays} day(s) typical</div>
        </div>

        {doctor && (
          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <div className="font-medium text-slate-900">{doctor.name}</div>
            <div className="text-sm text-slate-600">{doctor.specialty} · {doctor.experienceYears} yrs exp</div>
            <RatingStars rating={doctor.rating} count={doctor.reviewCount} />
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={() =>
              addToCompare({ hospitalId: service.hospitalId, serviceId: service.id })
            }
            disabled={compareList.some((c) => c.serviceId === service.id)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            {compareList.some((c) => c.serviceId === service.id) ? "In compare list" : "Add to compare"}
          </button>
          <Link href="/compare" className="rounded-lg border border-teal-200 px-4 py-2 text-sm text-teal-700 hover:bg-teal-50">
            View compare
          </Link>
        </div>
      </div>

      {success && (
        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
          {success}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Book or enquire</h2>
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setTab("book")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === "book" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            Pick a slot
          </button>
          <button
            onClick={() => setTab("enquire")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === "enquire" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            Send enquiry
          </button>
        </div>

        {tab === "book" ? (
          <form onSubmit={handleBooking} className="space-y-4">
            {slots.length === 0 ? (
              <p className="text-slate-500">No slots available. Try sending an enquiry instead.</p>
            ) : (
              <div className="space-y-2">
                {slots.map((slot) => (
                  <label
                    key={slot.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${
                      selectedSlot === slot.id ? "border-teal-500 bg-teal-50" : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot.id}
                      checked={selectedSlot === slot.id}
                      onChange={() => setSelectedSlot(slot.id)}
                    />
                    <div>
                      <div className="font-medium">{formatDate(slot.date)} at {slot.time}</div>
                      <div className="text-sm text-slate-500">
                        {slot.doctorName} · {slot.available} slot(s) left
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
            <button
              type="submit"
              disabled={!selectedSlot}
              className="rounded-lg bg-teal-600 px-6 py-2.5 font-medium text-white hover:bg-teal-700 disabled:opacity-50"
            >
              Request booking
            </button>
          </form>
        ) : (
          <form onSubmit={handleEnquiry} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Preferred date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Your message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Describe your needs, insurance, questions..."
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-teal-600 px-6 py-2.5 font-medium text-white hover:bg-teal-700"
            >
              Submit enquiry
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Patient reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-slate-500">No reviews yet.</p>
        ) : (
          <div className="mb-6 space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-lg bg-slate-50 p-4">
                <div className="flex justify-between">
                  <span className="font-medium">{r.userName}</span>
                  <RatingStars rating={r.rating} showValue={false} />
                </div>
                <p className="mt-1 text-sm text-slate-600">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {canReview(hospitalId, serviceId) && !hasUserReviewed("service", serviceId) ? (
          <form onSubmit={handleReview} className="border-t border-slate-200 pt-4 space-y-3">
            <h3 className="font-medium">Write a review</h3>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="rounded-lg border border-slate-200 px-3 py-2"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} stars</option>
              ))}
            </select>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="Share your experience..."
              required
            />
            <button type="submit" className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
              Submit review
            </button>
          </form>
        ) : user?.role === "public" ? (
          <p className="text-sm text-slate-500">
            Reviews are available after you enquire or book this service.
          </p>
        ) : null}
      </div>
    </div>
  );
}
