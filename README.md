# Guilherme Machado — Personal Linktree

A personal landing page built with Next.js 15, featuring a smart appointment scheduling system, an admin dashboard, and automated email notifications.

## Features

- **Personal landing page** — avatar, bio, and curated links (portfolio, CV, certificates, GitHub commits)
- **Appointment scheduling** — multi-step dialog with date picker, time slots, and visitor form
- **Admin dashboard** — table and calendar views with appointment details and cancellation
- **Email notifications** — three transactional email templates (notification, confirmation, cancellation) via Resend
- **GitHub commits feed** — real-time display of recent public commits
- **Dark / light theme** — persisted via `next-themes`
- **Protected admin area** — JWT authentication with httpOnly cookie

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Email | Resend + React Email |
| Auth | jose (JWT) |
| Forms | React Hook Form + Zod |
| Date handling | date-fns + react-day-picker |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Landing page
│   ├── admin/
│   │   ├── page.tsx                    # Admin dashboard (server component)
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── commits/page.tsx                # GitHub commits feed
│   └── api/
│       ├── schedule/
│       │   ├── route.ts                # POST — create appointment
│       │   ├── slots/route.ts          # GET  — booked slots for a date
│       │   └── [id]/route.ts           # DELETE — cancel appointment
│       └── admin/
│           ├── auth/route.ts           # POST — admin login
│           └── logout/route.ts         # GET  — admin logout
├── components/
│   ├── admin/
│   │   ├── admin-content.tsx           # Client shell (view toggle + state)
│   │   ├── admin-header.tsx            # Avatar dropdown with logout
│   │   ├── appointments-table.tsx      # Table view with clickable rows
│   │   ├── appointments-calendar.tsx   # Calendar view with appointment dots
│   │   └── appointment-detail-dialog.tsx # Detail modal + cancel flow
│   ├── scheduling/
│   │   ├── scheduling-dialog.tsx       # Multi-step dialog orchestrator
│   │   ├── step-date.tsx               # Step 1: date picker
│   │   ├── step-time.tsx               # Step 2: available time slots
│   │   ├── step-form.tsx               # Step 3: visitor form
│   │   └── step-confirmation.tsx       # Step 4: success screen
│   └── ui/                             # shadcn/ui primitives
├── emails/
│   ├── appointment-notification.tsx    # Email to owner on new booking
│   ├── appointment-confirmation.tsx    # Email to visitor on new booking
│   └── appointment-cancellation.tsx    # Email to visitor on cancellation
├── lib/
│   ├── auth.ts                         # JWT sign / verify
│   ├── scheduling-config.ts            # Centralised scheduling settings
│   ├── supabase.ts                     # Supabase client
│   └── utils.ts
└── middleware.ts                       # Admin route protection
```

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) account with a verified domain

### 1. Clone and install

```bash
git clone https://github.com/gui1416/linktree-personal.git
cd linktree-personal
npm install
```

### 2. Configure environment variables

Create a `.env` file at the root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Admin credentials
USER_ADMIN=admin
PASSWORD_ADMIN=your-secure-password

# JWT (generate a random 32+ character string)
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Set up the database

Run the following SQL in your Supabase SQL editor:

```sql
CREATE TABLE appointments (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date        date         NOT NULL,
  time        varchar(5)   NOT NULL,
  name        varchar(255) NOT NULL,
  email       varchar(255) NOT NULL,
  phone       varchar(20)  NOT NULL,
  subject     varchar(50)  NOT NULL,
  message     text         NOT NULL,
  created_at  timestamptz  NOT NULL DEFAULT now()
);

-- Prevent double-booking at the database level
CREATE UNIQUE INDEX appointments_date_time_unique ON appointments (date, time);
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scheduling Flow

The booking process is a 4-step dialog launched from the landing page:

```
Step 1 — Date     →  Calendar showing only available weekdays
Step 2 — Time     →  Time slots with already-booked slots greyed out
Step 3 — Details  →  Name, e-mail, phone (BR mask), subject, message
Step 4 — Done     →  Success screen
```

On submission the API:
1. Validates input with Zod
2. Checks for a race condition (slot taken between step 2 and submit)
3. Inserts the appointment into Supabase
4. Sends a **notification email** to the owner
5. Sends a **confirmation email** to the visitor

### Customising availability

All scheduling parameters live in `src/lib/scheduling-config.ts`:

```ts
export const SCHEDULING_CONFIG = {
  availableDays: [1, 2, 3, 4, 5],   // 1=Mon … 7=Sun
  timeSlots: [
    "09:00", "10:00", "11:00",
    "14:00", "15:00", "16:00", "17:00",
  ],
  sessionDurationMinutes: 30,
  minDaysAhead: 1,   // earliest bookable day (tomorrow)
  maxDaysAhead: 30,  // latest bookable day
  ownerEmail: "your@email.com",
  ownerName: "Your Name",
};
```

## Admin Dashboard

Access at `/admin` (redirects to `/admin/login` if unauthenticated).

Authentication uses a **JWT stored in an httpOnly cookie** (8-hour expiry). Credentials are set via `USER_ADMIN` and `PASSWORD_ADMIN` environment variables.

### Views

**Table view** — paginated list of appointments sorted by date/time. Click any row to open the detail dialog.

**Calendar view** — monthly calendar where days with appointments show a primary-coloured dot. Selecting a day reveals a list of bookings for that date. Grid layout adapts to screen size (`lg:grid-cols-[auto_1fr]`).

### Appointment detail dialog

Displays all appointment data (date, time, name, e-mail, phone, subject, message, created at) with a **Cancel Appointment** action.

Cancellation flow:
1. Admin clicks **Cancelar Agendamento**
2. An inline warning with confirmation appears (no second modal)
3. On confirm → `DELETE /api/schedule/:id` is called
4. The record is removed from Supabase
5. A **cancellation email** is sent to the visitor
6. The appointment disappears from the list immediately (optimistic local state)

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/schedule/slots?date=YYYY-MM-DD` | Returns booked time slots for a date |
| `POST` | `/api/schedule` | Creates a new appointment |
| `DELETE` | `/api/schedule/:id` | Cancels an appointment and notifies visitor |
| `POST` | `/api/admin/auth` | Authenticates admin, sets session cookie |
| `GET` | `/api/admin/logout` | Clears session cookie |

## Email Templates

All templates are built with [React Email](https://react.email) and share a consistent visual identity (logo, card layout, footer).

| Template | Recipient | Trigger |
|---|---|---|
| `appointment-notification` | Owner | New appointment booked |
| `appointment-confirmation` | Visitor | New appointment booked |
| `appointment-cancellation` | Visitor | Appointment cancelled by admin |

## Form Validation

Visitor form fields and their rules:

| Field | Rule |
|---|---|
| Nome | min 2 characters |
| E-mail | valid email format |
| Telefone | Brazilian format `(XX) XXXXX-XXXX` with auto-mask |
| Assunto | one of: Projeto, Freelance, Mentoria, Outro |
| Mensagem | min 20 · max 500 characters |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

Private project — all rights reserved.
