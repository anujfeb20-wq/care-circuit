"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEMO_USERS, findDemoUser } from "./demo-users";
import {
  appointmentSlots as seedSlots,
  seedReviews,
  services as seedServices,
} from "./mock-data";
import type {
  AppointmentSlot,
  Booking,
  CompareItem,
  DemoUser,
  Enquiry,
  Review,
  Service,
} from "./types";

interface AppState {
  user: DemoUser | null;
  compareList: CompareItem[];
  enquiries: Enquiry[];
  bookings: Booking[];
  reviews: Review[];
  extraServices: Service[];
  extraSlots: AppointmentSlot[];
  hydrated: boolean;
}

interface AppContextValue extends AppState {
  login: (email: string, password: string) => boolean;
  loginWithGoogle: (role: "public" | "hospital") => void;
  loginAsDemo: (userId: string) => void;
  logout: () => void;
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (serviceId: string) => void;
  clearCompare: () => void;
  submitEnquiry: (data: Omit<Enquiry, "id" | "createdAt" | "status">) => void;
  submitBooking: (data: Omit<Booking, "id" | "createdAt" | "status">) => void;
  submitReview: (data: Omit<Review, "id" | "createdAt">) => void;
  addService: (service: Omit<Service, "id" | "isCustom" | "rating" | "reviewCount">) => void;
  updateEnquiryStatus: (id: string, status: Enquiry["status"]) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  allServices: Service[];
  allSlots: AppointmentSlot[];
  getReviewsFor: (targetType: Review["targetType"], targetId: string) => Review[];
  hasUserReviewed: (targetType: Review["targetType"], targetId: string) => boolean;
  canReview: (hospitalId: string, serviceId: string) => boolean;
}

const STORAGE_KEY = "carecircuit-demo-state-v1";

const defaultState: AppState = {
  user: null,
  compareList: [],
  enquiries: [],
  bookings: [],
  reviews: seedReviews,
  extraServices: [],
  extraSlots: [],
  hydrated: false,
};

const AppContext = createContext<AppContextValue | null>(null);

function loadState(): Partial<AppState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<AppState>;
  } catch {
    return {};
  }
}

function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  const { hydrated: _, ...toSave } = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    const saved = loadState();
    setState((prev) => ({
      ...prev,
      ...saved,
      reviews: saved.reviews?.length ? saved.reviews : seedReviews,
      hydrated: true,
    }));
  }, []);

  useEffect(() => {
    if (state.hydrated) saveState(state);
  }, [state]);

  const login = useCallback((email: string, password: string) => {
    const user = findDemoUser(email, password);
    if (!user) return false;
    setState((prev) => ({ ...prev, user }));
    return true;
  }, []);

  const loginWithGoogle = useCallback((role: "public" | "hospital") => {
    const user =
      role === "public"
        ? DEMO_USERS.find((u) => u.role === "public")!
        : DEMO_USERS.find((u) => u.role === "hospital")!;
    setState((prev) => ({ ...prev, user }));
  }, []);

  const loginAsDemo = useCallback((userId: string) => {
    const user = DEMO_USERS.find((u) => u.id === userId);
    if (user) setState((prev) => ({ ...prev, user }));
  }, []);

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, user: null }));
  }, []);

  const addToCompare = useCallback((item: CompareItem) => {
    setState((prev) => {
      if (prev.compareList.some((c) => c.serviceId === item.serviceId)) {
        return prev;
      }
      if (prev.compareList.length >= 4) return prev;
      return { ...prev, compareList: [...prev.compareList, item] };
    });
  }, []);

  const removeFromCompare = useCallback((serviceId: string) => {
    setState((prev) => ({
      ...prev,
      compareList: prev.compareList.filter((c) => c.serviceId !== serviceId),
    }));
  }, []);

  const clearCompare = useCallback(() => {
    setState((prev) => ({ ...prev, compareList: [] }));
  }, []);

  const submitEnquiry = useCallback(
    (data: Omit<Enquiry, "id" | "createdAt" | "status">) => {
      const enquiry: Enquiry = {
        ...data,
        id: `enq-${Date.now()}`,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        enquiries: [enquiry, ...prev.enquiries],
      }));
    },
    [],
  );

  const submitBooking = useCallback(
    (data: Omit<Booking, "id" | "createdAt" | "status">) => {
      const booking: Booking = {
        ...data,
        id: `book-${Date.now()}`,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => {
        const override = prev.extraSlots.find((s) => s.id === data.slotId);
        const seedSlot = seedSlots.find((s) => s.id === data.slotId);
        const current = override ?? seedSlot;
        let extraSlots = prev.extraSlots;

        if (current) {
          const updated = {
            ...current,
            available: Math.max(0, current.available - 1),
          };
          extraSlots = override
            ? prev.extraSlots.map((s) => (s.id === data.slotId ? updated : s))
            : [...prev.extraSlots, updated];
        }

        return {
          ...prev,
          bookings: [booking, ...prev.bookings],
          extraSlots,
        };
      });
    },
    [],
  );

  const submitReview = useCallback(
    (data: Omit<Review, "id" | "createdAt">) => {
      const review: Review = {
        ...data,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setState((prev) => ({
        ...prev,
        reviews: [review, ...prev.reviews],
      }));
    },
    [],
  );

  const addService = useCallback(
    (service: Omit<Service, "id" | "isCustom" | "rating" | "reviewCount">) => {
      const newService: Service = {
        ...service,
        id: `custom-${Date.now()}`,
        isCustom: true,
        rating: 0,
        reviewCount: 0,
      };
      setState((prev) => ({
        ...prev,
        extraServices: [...prev.extraServices, newService],
      }));
    },
    [],
  );

  const updateEnquiryStatus = useCallback(
    (id: string, status: Enquiry["status"]) => {
      setState((prev) => ({
        ...prev,
        enquiries: prev.enquiries.map((e) =>
          e.id === id ? { ...e, status } : e,
        ),
      }));
    },
    [],
  );

  const updateBookingStatus = useCallback(
    (id: string, status: Booking["status"]) => {
      setState((prev) => ({
        ...prev,
        bookings: prev.bookings.map((b) =>
          b.id === id ? { ...b, status } : b,
        ),
      }));
    },
    [],
  );

  const allServices = useMemo(
    () => [...seedServices, ...state.extraServices],
    [state.extraServices],
  );

  const allSlots = useMemo(() => {
    const merged = [...seedSlots];
    for (const slot of state.extraSlots) {
      const idx = merged.findIndex((s) => s.id === slot.id);
      if (idx >= 0) merged[idx] = slot;
      else merged.push(slot);
    }
    return merged;
  }, [state.extraSlots]);

  const getReviewsFor = useCallback(
    (targetType: Review["targetType"], targetId: string) => {
      return state.reviews.filter(
        (r) => r.targetType === targetType && r.targetId === targetId,
      );
    },
    [state.reviews],
  );

  const hasUserReviewed = useCallback(
    (targetType: Review["targetType"], targetId: string) => {
      if (!state.user) return false;
      return state.reviews.some(
        (r) =>
          r.userId === state.user!.id &&
          r.targetType === targetType &&
          r.targetId === targetId,
      );
    },
    [state.reviews, state.user],
  );

  const canReview = useCallback(
    (hospitalId: string, serviceId: string) => {
      if (!state.user || state.user.role !== "public") return false;
      const hasInteraction =
        state.enquiries.some(
          (e) =>
            e.userId === state.user!.id &&
            e.hospitalId === hospitalId &&
            e.serviceId === serviceId,
        ) ||
        state.bookings.some(
          (b) =>
            b.userId === state.user!.id &&
            b.hospitalId === hospitalId &&
            b.serviceId === serviceId &&
            b.status !== "cancelled",
        );
      return hasInteraction;
    },
    [state.user, state.enquiries, state.bookings],
  );

  const value: AppContextValue = {
    ...state,
    login,
    loginWithGoogle,
    loginAsDemo,
    logout,
    addToCompare,
    removeFromCompare,
    clearCompare,
    submitEnquiry,
    submitBooking,
    submitReview,
    addService,
    updateEnquiryStatus,
    updateBookingStatus,
    allServices,
    allSlots,
    getReviewsFor,
    hasUserReviewed,
    canReview,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
