# Dhar Nao - Premium Car & Apartment Rental Marketplace

## Description

Dhar Nao is a high-performance, dual-category rental platform designed to connect travelers with premium cars and apartments. It features a user friendly booking system and a secure payment system with stripe.

The platform is developed for a global audience, featuring full multilangual with support for English, French, and Arabic (RTL), automated branded PDF invoice generation, and a complete admin dashboard system for handling customer inquiries and listings.

## Project Links

### Live Demo

- **Frontend:** [https://dhar-nao-rental-app.vercel.app](https://dhar-nao-rental-app.vercel.app)
- **Backend API:** [https://dhar-nao-rental-server.vercel.app](https://dhar-nao-rental-server.vercel.app/)

### GitHub

- **Frontend Repository:** [https://github.com/nabilsiddik/Dhar-nao-rental-app](https://github.com/nabilsiddik/Dhar-nao-rental-app)
- **Backend Repository:** [https://github.com/nabilsiddik/Dhar-nao-rental-server](https://github.com/nabilsiddik/Dhar-nao-rental-server)

## Key Features

- **Rental Management:** Built separate booking flows for cars and apartments, each with category-specific fields and business logic.
- **Availability Checking:** Prevents double bookings by validating overlapping dates before confirming a reservation.
- **Stripe Payments:** Integrated secure Stripe Checkout and only creates bookings after successful payment.
- **PDF Receipt Generation:** Generates branded booking receipts and reports using Puppeteer, then uploads them to Cloudinary.
- **Multi-language Support:** Implemented English, French, and Arabic with full RTL support using `next-intl`.
- **Inquiry Management:** Built an admin dashboard to manage customer inquiries and reply directly via email.
- **Notification System:** Implemented role-based in-app notifications for bookings, payments, and other important events.
- **Admin Dashboard:** Created analytics to monitor revenue, bookings, and business performance with interactive charts.

## Tools & Technologies

- **Runtime:** Node.js (v20+)
- **Language:** TypeScript
- **Framework:** Express.js, Next.js 15 (App Router)
- **Database:** MongoDB (Prisma ORM)
- **State Management:** Redux Toolkit & RTK Query
- **Payments:** Stripe
- **Multilangual:** Next-intl (Translation & Routing)
- **Storage:** Cloudinary (Document & Image Hosting)
- **PDF Engine:** Puppeteer-core (Vercel Optimized)
- **Email Delivery:** Nodemailer (SMTP/Gmail)

## API Endpoints

### User & Authentication

| Method   | Endpoint                     | Description                                |
| :------- | :--------------------------- | :----------------------------------------- |
| `POST`   | `/user/register`             | Register a new user account                |
| `POST`   | `/auth/login`                | Login with JWT token issuance              |
| `GET`    | `/user/profile`              | Get authenticated user's profile           |
| `PATCH`  | `/user/:id`                  | Update profile details and photo           |
| `GET`    | `/admin/users`               | Get all users with SSFP (Admin)            |
| `PATCH`  | `/admin/users/status/:id`    | Toggle user status (Active/Suspended)      |
| `PATCH`  | `/admin/users/soft-delete/:id`| Soft delete/Suspend a user account        |

### Listings Management

| Method   | Endpoint                     | Description                                |
| :------- | :--------------------------- | :----------------------------------------- |
| `GET`    | `/listings`                  | Browse listings with SSFP & availability   |
| `GET`    | `/listings/:id`              | Get single listing detailed view           |
| `GET`    | `/listings/cities`           | Get unique cities for search filters       |
| `POST`   | `/admin/listings`            | Create polymorphic listing (Car/Apt)       |
| `PATCH`  | `/admin/listings/:id`        | Update listing specs and extra charges     |
| `DELETE` | `/admin/listings/bulk-delete`| Bulk delete listings                       |
| `PATCH`  | `/admin/listings/bulk-status`| Bulk Publish/Archive listings              |

### Bookings & Payments

| Method   | Endpoint                     | Description                                |
| :------- | :--------------------------- | :----------------------------------------- |
| `POST`   | `/bookings/reserve-pay`      | Synchronous Stripe pay & Booking creation  |
| `POST`   | `/bookings/manual`           | Create manual booking via Admin dashboard  |
| `POST`   | `/bookings/manual/preview`   | Get pricing preview for manual booking     |
| `GET`    | `/bookings/booked-dates/:id` | Get disabled dates for calendar UI         |
| `GET`    | `/bookings/:id/receipt`      | Generate and download branded PDF receipt  |
| `PATCH`  | `/bookings/cancel/:id`       | User-side cancel with 48h refund logic     |
| `POST`   | `/admin/:id/process-refund`  | Admin-triggered manual Stripe refund       |

### Admin Dashboard & CRM

| Method   | Endpoint                     | Description                                |
| :------- | :--------------------------- | :----------------------------------------- |
| `GET`    | `/admin/dashboard-stats`     | Main dashboard overview (Revenue/Users)    |
| `GET`    | `/admin/revenue-overview`    | Detailed 6-month financial performance     |
| `GET`    | `/admin/export-report`       | Export full analytics dashboard to PDF     |
| `GET`    | `/inquiries`                 | Get all CRM messages with stats            |
| `POST`   | `/inquiries/:id/reply`       | Reply to inquiry via automated email       |
| `PATCH`  | `/settings/commission`       | Update dynamic marketplace commission rates|


## Frontend Folder Structure
```text
src/
├── app/
│   └── [locale]/               # i18n Route Root (en, fr, ar)
│       ├── (authLayout)/       # Auth pages (Login, Register)
│       ├── (commonLayout)/     # Public (Home, Search, Details)
│       ├── (dashboardLayout)/  # Admin/User Management Panels
│       └── layout.tsx          # Root: next-intl & Redux Providers
├── components/
│   ├── dashboard/              # Stats cards, Charts, Admin Forms
│   ├── listing/                # Calendar, RangePicker, SpecGrids
│   ├── shared/                 # Modal, Pagination, Reusable Table
│   └── ui/                     # Shadcn components
├── messages/                   # Translation JSON files (en/fr/ar)
├── redux/
│   ├── api/                    # RTK Query (Split API slices)
│   └── features/               # Slices (Auth, BookingDraft)
├── middleware.ts               # Path protection & i18n routing logic
└── proxy.ts                    # API proxy configurations


## Backend Folder Structure

```text
src/
├── app/
│   ├── config/                 # Environment & global constants
│   ├── errorHelpers/           # AppError & CatchAsync wrappers
│   ├── middlewares/            # Auth, Validation, Proxy, Language
│   ├── modules/
│   │   ├── admin/              # Dashboard, Analytics, Settings
│   │   ├── booking/            # Logic, Stripe flow, PDF triggers
│   │   ├── listing/            # Polymorphic CRUD & Search filters
│   │   ├── inquiry/            # CRM messages & email replies
│   │   ├── notification/       # In-app event-based system
│   │   └── user/               # Profile & Account management
│   ├── shared/                 # Prisma instance & Email templates
│   └── utils/                  # File uploader, Pagination, PDF gen
├── generated/                  # Prisma custom output (Type-safe client)
├── prisma/
│   └── schema.prisma           # MongoDB models, Enums & Types
├── app.ts                      # Express app & Middleware setup
└── server.ts                   # Entry point & Server listener



## Frontend Installation Guide

```bash
# Clone the repository
git clone https://github.com/your-username/repo-name.git

# Navigate to project folder
cd renthub-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Environment variables

NEXT_PUBLIC_PORT=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_DEV_BASE_URL=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```