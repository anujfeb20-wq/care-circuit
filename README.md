# CareCircuit — Interactive Prototype

A **UI-only, clickable prototype** for a pan-India healthcare comparison platform. No backend or database — all data is mocked and session actions persist in your browser via `localStorage`.

## Quick start

```bash
cd care-circuit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Requires Node.js 20+**

## Demo accounts

| Role | Email | Password |
|------|-------|----------|
| Patient | `patient@demo.com` | `demo123` |
| Hospital (Manipal Bangalore) | `hospital@demo.com` | `demo123` |
| Hospital (Apollo Chennai) | `apollo@demo.com` | `demo123` |

You can also use **Quick demo login** or **Continue with Google** on the login page (simulated — no real OAuth).

## Flows to try

### As a patient
1. Search for "knee replacement" in Bangalore or All India
2. Add 2–3 services to **Compare**
3. Open a service → **Pick a slot** or **Send enquiry**
4. Check **My Activity** for bookings/enquiries
5. After booking/enquiring → submit a **review** on the service page

### As a hospital
1. Login as `hospital@demo.com`
2. View **Dashboard** stats
3. **Add custom service** under Services
4. Open **Inbox** — confirm bookings / mark enquiries contacted
5. (Optional) Login as patient in another browser tab to generate requests

## Sharing for feedback

### Option 1: Deploy to Vercel (recommended)
1. Push this folder to a GitHub repo
2. Import at [vercel.com](https://vercel.com) — zero config for Next.js
3. Share the live URL with stakeholders

### Option 2: Local network
```bash
npm run dev -- -H 0.0.0.0
```
Share your machine's IP + port `:3000` on the same network.

## What's included

- Pan-India search (city, category, keyword)
- Hospital profiles with services
- Side-by-side compare (up to 4)
- Enquiry + slot booking flows
- User-submitted reviews (gated on enquiry/booking)
- Hospital portal: services, slots, inbox
- Custom service creation (session-persisted)

## What's NOT included (future phases)

- Real authentication (Google/email)
- Database / API
- Payments
- Maps integration
- Production moderation

## Reset demo data

Clear browser `localStorage` key `carecircuit-demo-state-v1` or use incognito mode.
