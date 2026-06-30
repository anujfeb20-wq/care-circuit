export type UserRole = "public" | "hospital";

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  city?: string;
  hospitalId?: string;
}

export type ServiceCategory =
  | "doctor"
  | "specialist"
  | "surgery"
  | "test"
  | "other";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  rating: number;
  reviewCount: number;
  accreditation: string;
  phone: string;
  description: string;
}

export interface Service {
  id: string;
  hospitalId: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  discountPercent?: number;
  admissionRequired: boolean;
  durationDays: number;
  rating: number;
  reviewCount: number;
  doctorId?: string;
  isCustom?: boolean;
}

export interface AppointmentSlot {
  id: string;
  hospitalId: string;
  serviceId: string;
  date: string;
  time: string;
  doctorName: string;
  available: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  targetType: "hospital" | "service" | "doctor";
  targetId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  hospitalId: string;
  serviceId: string;
  message: string;
  preferredDate: string;
  status: "pending" | "contacted" | "closed";
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  hospitalId: string;
  serviceId: string;
  slotId: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface CompareItem {
  hospitalId: string;
  serviceId: string;
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  doctor: "Doctor Consultation",
  specialist: "Specialist",
  surgery: "Surgery",
  test: "Diagnostic Test",
  other: "Other Service",
};
