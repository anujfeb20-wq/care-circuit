import type { DemoUser } from "./types";

export const DEMO_USERS: DemoUser[] = [
  {
    id: "u-patient",
    email: "patient@demo.com",
    password: "demo123",
    role: "public",
    name: "Priya Sharma",
    city: "Bangalore",
  },
  {
    id: "u-hospital",
    email: "hospital@demo.com",
    password: "demo123",
    role: "hospital",
    name: "Dr. Meera Nair",
    hospitalId: "h1",
  },
  {
    id: "u-hospital-2",
    email: "apollo@demo.com",
    password: "demo123",
    role: "hospital",
    name: "Rajesh Kapoor",
    hospitalId: "h2",
  },
];

export function findDemoUser(email: string, password: string) {
  return DEMO_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
}
