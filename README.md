# Dayframe — Student Productivity & Life Manager

A full-stack productivity app for students to manage tasks, set goals with 
milestones, and track progress through an analytics dashboard.

🌐 **Live:** [https://dayframe-jade.vercel.app/](https://dayframe-jade.vercel.app/) ·
**GitHub:** [github.com/mahimagupta-droid/Dayframe](https://github.com/mahimagupta-droid/Dayframe)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Radix UI |
| Animation | Framer Motion |
| Auth | Clerk + Svix Webhooks |
| Database | MongoDB Atlas (Mongoose) |
| Deployment | Vercel |

---

## Features

- **Task Management** — Create and track tasks with priority, difficulty, 
  category, and deadline. Status flow: To Do → In Progress → Completed
- **Goal Tracking** — Long-term goals broken into milestones with visual 
  progress bars
- **Analytics Dashboard** — Stats overview, today's tasks, goal progress, 
  overdue counts
- **Authentication** — Clerk auth with middleware route protection and Svix 
  webhook sync to MongoDB

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas cluster
- Clerk application

### Setup

```bash
git clone https://github.com/mahimagupta-droid/Dayframe.git
cd Dayframe
npm install
```

Create a `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
WEBHOOK_SECRET=whsec_...
MONGODB_ATLAS_URL=mongodb+srv://...
```

```bash
npm run dev
```

```
src/
├── app/
│   ├── api/            # REST API routes (user, tasks, goals)
│   ├── dashboard/      # Analytics dashboard
│   ├── tasks/          # Task CRUD interface
│   ├── goals/          # Goal + milestone interface
│   └── middleware.ts   # Clerk route protection
├── components/         # Reusable UI components
└── lib/
    ├── models/         # Mongoose schemas (User, Task, Goal)
    └── dbConnect.ts    # MongoDB connection
```
## Data Models

**Task** — title, description, deadline, priority (high/medium/low), 
difficulty, category (school/personal/home/side-hustle), status

**Goal** — title, description, dueDate, category, progress (0–100), 
milestones array `{ title, completed, completedAt }`

**User** — clerkId, email, name, educationLevel, age
