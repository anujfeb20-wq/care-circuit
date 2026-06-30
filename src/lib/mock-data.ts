import type {
  AppointmentSlot,
  Doctor,
  Hospital,
  Review,
  Service,
} from "./types";

export const INDIAN_CITIES = [
  "All India",
  "Bangalore",
  "Chennai",
  "Delhi",
  "Hyderabad",
  "Kolkata",
  "Mumbai",
  "Pune",
];

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "Manipal Hospital",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560017",
    address: "98, HAL Airport Road, Old Airport Road",
    rating: 4.6,
    reviewCount: 1240,
    accreditation: "NABH Accredited",
    phone: "+91 80 2502 4444",
    description:
      "Multi-specialty hospital offering advanced surgical and diagnostic care across South India.",
  },
  {
    id: "h2",
    name: "Apollo Hospitals",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600006",
    address: "21, Greams Lane, Off Greams Road",
    rating: 4.7,
    reviewCount: 2100,
    accreditation: "JCI & NABH",
    phone: "+91 44 2829 3333",
    description:
      "Leading tertiary care hospital with comprehensive oncology, cardiology, and orthopedics.",
  },
  {
    id: "h3",
    name: "Fortis Memorial",
    city: "Delhi",
    state: "Delhi",
    pincode: "122001",
    address: "Sector 44, Opposite HUDA City Centre",
    rating: 4.5,
    reviewCount: 980,
    accreditation: "NABH Accredited",
    phone: "+91 124 496 2200",
    description:
      "Premium healthcare destination in NCR with robotic surgery and advanced diagnostics.",
  },
  {
    id: "h4",
    name: "KIMS Hospitals",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500032",
    address: "1-112 / 86, Survey No 5, Kondapur",
    rating: 4.4,
    reviewCount: 760,
    accreditation: "NABH Accredited",
    phone: "+91 40 4488 5000",
    description:
      "Trusted multi-specialty hospital serving Telangana with affordable care packages.",
  },
  {
    id: "h5",
    name: "Lilavati Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    address: "A-791, Bandra Reclamation, Bandra West",
    rating: 4.8,
    reviewCount: 1560,
    accreditation: "NABH Accredited",
    phone: "+91 22 2675 1000",
    description:
      "Renowned Mumbai hospital known for cardiac care, neurosurgery, and patient experience.",
  },
];

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Ananya Iyer",
    specialty: "Orthopedic Surgeon",
    rating: 4.8,
    reviewCount: 312,
    experienceYears: 18,
  },
  {
    id: "d2",
    name: "Dr. Vikram Singh",
    specialty: "Cardiologist",
    rating: 4.7,
    reviewCount: 445,
    experienceYears: 22,
  },
  {
    id: "d3",
    name: "Dr. Kavitha Menon",
    specialty: "Oncologist",
    rating: 4.9,
    reviewCount: 198,
    experienceYears: 15,
  },
  {
    id: "d4",
    name: "Dr. Rohit Desai",
    specialty: "General Physician",
    rating: 4.5,
    reviewCount: 520,
    experienceYears: 12,
  },
  {
    id: "d5",
    name: "Dr. Sunita Reddy",
    specialty: "Radiologist",
    rating: 4.6,
    reviewCount: 167,
    experienceYears: 14,
  },
];

export const services: Service[] = [
  {
    id: "s1",
    hospitalId: "h1",
    category: "surgery",
    name: "Total Knee Replacement",
    description: "Minimally invasive knee replacement with 3-day recovery protocol.",
    price: 285000,
    discountPercent: 10,
    admissionRequired: true,
    durationDays: 5,
    rating: 4.7,
    reviewCount: 89,
    doctorId: "d1",
  },
  {
    id: "s2",
    hospitalId: "h1",
    category: "test",
    name: "Full Body Health Checkup",
    description: "60+ parameters including cardiac, liver, kidney, and diabetes screening.",
    price: 8999,
    discountPercent: 15,
    admissionRequired: false,
    durationDays: 1,
    rating: 4.5,
    reviewCount: 234,
    doctorId: "d4",
  },
  {
    id: "s3",
    hospitalId: "h1",
    category: "specialist",
    name: "Cardiology Consultation",
    description: "Comprehensive heart health evaluation with ECG review.",
    price: 1500,
    admissionRequired: false,
    durationDays: 1,
    rating: 4.6,
    reviewCount: 412,
    doctorId: "d2",
  },
  {
    id: "s4",
    hospitalId: "h2",
    category: "surgery",
    name: "Total Knee Replacement",
    description: "Computer-navigated knee replacement with physiotherapy package.",
    price: 310000,
    discountPercent: 5,
    admissionRequired: true,
    durationDays: 6,
    rating: 4.8,
    reviewCount: 124,
    doctorId: "d1",
  },
  {
    id: "s5",
    hospitalId: "h2",
    category: "specialist",
    name: "Oncology Second Opinion",
    description: "Tumor board review with personalized treatment roadmap.",
    price: 5000,
    admissionRequired: false,
    durationDays: 2,
    rating: 4.9,
    reviewCount: 67,
    doctorId: "d3",
  },
  {
    id: "s6",
    hospitalId: "h2",
    category: "test",
    name: "PET-CT Scan",
    description: "Whole body PET-CT for oncology and cardiac evaluation.",
    price: 24000,
    admissionRequired: false,
    durationDays: 1,
    rating: 4.7,
    reviewCount: 98,
    doctorId: "d5",
  },
  {
    id: "s7",
    hospitalId: "h3",
    category: "surgery",
    name: "Total Knee Replacement",
    description: "Robotic-assisted TKR with enhanced precision and faster rehab.",
    price: 350000,
    discountPercent: 8,
    admissionRequired: true,
    durationDays: 4,
    rating: 4.6,
    reviewCount: 76,
    doctorId: "d1",
  },
  {
    id: "s8",
    hospitalId: "h3",
    category: "doctor",
    name: "General Physician Visit",
    description: "In-person consultation for common illnesses and referrals.",
    price: 800,
    admissionRequired: false,
    durationDays: 1,
    rating: 4.4,
    reviewCount: 890,
    doctorId: "d4",
  },
  {
    id: "s9",
    hospitalId: "h4",
    category: "surgery",
    name: "Total Knee Replacement",
    description: "Affordable knee replacement package with post-op care.",
    price: 220000,
    discountPercent: 12,
    admissionRequired: true,
    durationDays: 5,
    rating: 4.3,
    reviewCount: 54,
    doctorId: "d1",
  },
  {
    id: "s10",
    hospitalId: "h4",
    category: "test",
    name: "MRI Brain",
    description: "High-resolution 3T MRI with radiologist report within 24 hours.",
    price: 8500,
    admissionRequired: false,
    durationDays: 1,
    rating: 4.5,
    reviewCount: 143,
    doctorId: "d5",
  },
  {
    id: "s11",
    hospitalId: "h5",
    category: "surgery",
    name: "Total Knee Replacement",
    description: "Premium TKR with dedicated recovery suite and nursing care.",
    price: 420000,
    admissionRequired: true,
    durationDays: 7,
    rating: 4.9,
    reviewCount: 201,
    doctorId: "d1",
  },
  {
    id: "s12",
    hospitalId: "h5",
    category: "specialist",
    name: "Cardiac Bypass Consultation",
    description: "Pre-surgical evaluation for CABG with angiography review.",
    price: 3500,
    admissionRequired: false,
    durationDays: 1,
    rating: 4.8,
    reviewCount: 156,
    doctorId: "d2",
  },
];

function futureDate(daysFromNow: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

export const appointmentSlots: AppointmentSlot[] = [
  { id: "slot1", hospitalId: "h1", serviceId: "s1", date: futureDate(2), time: "10:00 AM", doctorName: "Dr. Ananya Iyer", available: 3 },
  { id: "slot2", hospitalId: "h1", serviceId: "s1", date: futureDate(3), time: "2:30 PM", doctorName: "Dr. Ananya Iyer", available: 2 },
  { id: "slot3", hospitalId: "h1", serviceId: "s3", date: futureDate(1), time: "11:00 AM", doctorName: "Dr. Vikram Singh", available: 5 },
  { id: "slot4", hospitalId: "h2", serviceId: "s4", date: futureDate(4), time: "9:00 AM", doctorName: "Dr. Ananya Iyer", available: 1 },
  { id: "slot5", hospitalId: "h2", serviceId: "s5", date: futureDate(2), time: "3:00 PM", doctorName: "Dr. Kavitha Menon", available: 4 },
  { id: "slot6", hospitalId: "h3", serviceId: "s7", date: futureDate(5), time: "10:30 AM", doctorName: "Dr. Ananya Iyer", available: 2 },
  { id: "slot7", hospitalId: "h4", serviceId: "s9", date: futureDate(3), time: "1:00 PM", doctorName: "Dr. Ananya Iyer", available: 3 },
  { id: "slot8", hospitalId: "h5", serviceId: "s11", date: futureDate(6), time: "11:30 AM", doctorName: "Dr. Ananya Iyer", available: 1 },
  { id: "slot9", hospitalId: "h1", serviceId: "s2", date: futureDate(1), time: "8:00 AM", doctorName: "Dr. Rohit Desai", available: 10 },
  { id: "slot10", hospitalId: "h5", serviceId: "s12", date: futureDate(2), time: "4:00 PM", doctorName: "Dr. Vikram Singh", available: 6 },
];

export const seedReviews: Review[] = [
  {
    id: "r1",
    userId: "seed-u1",
    userName: "Amit K.",
    targetType: "service",
    targetId: "s1",
    rating: 5,
    comment: "Smooth surgery experience. Physiotherapy team was excellent.",
    createdAt: "2026-05-12",
  },
  {
    id: "r2",
    userId: "seed-u2",
    userName: "Lakshmi P.",
    targetType: "hospital",
    targetId: "h1",
    rating: 4,
    comment: "Clean facilities and helpful staff. Wait times could improve.",
    createdAt: "2026-05-08",
  },
  {
    id: "r3",
    userId: "seed-u3",
    userName: "Rahul M.",
    targetType: "doctor",
    targetId: "d2",
    rating: 5,
    comment: "Dr. Vikram explained everything clearly. Highly recommend.",
    createdAt: "2026-04-28",
  },
];

export function getHospital(id: string) {
  return hospitals.find((h) => h.id === id);
}

export function getService(id: string) {
  return services.find((s) => s.id === id);
}

export function getDoctor(id: string) {
  return doctors.find((d) => d.id === id);
}

export function getServicesByHospital(hospitalId: string) {
  return services.filter((s) => s.hospitalId === hospitalId);
}

export function getSlotsForService(serviceId: string) {
  return appointmentSlots.filter((s) => s.serviceId === serviceId);
}
