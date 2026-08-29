# Mariem Sebai — Portfolio

A personal portfolio showcasing my projects, certificates, and skills as a full-stack developer. Built with React and Vite, backed by Supabase for public comments and Formspree for private contact messages.

**Live site:** [portfolio-d7pr.vercel.app](https://portfolio-d7pr.vercel.app)

---

## Projects featured

| # | Project | Type |
|---|---------|------|
| 01 | **SCOC** | Complaint management platform |
| 02 | **UrgentFlow** | Healthcare emergency interface |
| 03 | **ShopFlow** | E-commerce marketplace |
| 04 | **Pomodoro Timer** | Focus productivity tool |

---

## Tech stack

- **Framework:** React 18 + Vite
- **Styling:** Plain CSS (custom design system)
- **Backend / DB:** Supabase (public comments)
- **Contact form:** Formspree
- **Hosting:** Vercel

---

## Getting started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with a `comments` table
- A [Formspree](https://formspree.io) form endpoint

### Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

For Supabase, add these two variables as well (from your project settings → API):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Install and run

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
```

---

## Supabase setup

Create a `comments` table in your Supabase project with the following columns:

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `name` | `text` | Required |
| `text` | `text` | Required, max 280 chars |
| `created_at` | `timestamptz` | Default `now()` |

Enable Row Level Security and add a policy to allow anonymous inserts and reads.

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo
3. Vercel auto-detects Vite — no build config changes needed
4. Add your environment variables under **Settings → Environment Variables**
5. Deploy

Every push to `main` triggers an automatic redeploy.

---

## Contact

- **Email:** mariemsebai913@gmail.com
- **LinkedIn:** [mariem-sebai-009260342](https://www.linkedin.com/in/mariem-sebai-009260342/)
- **GitHub:** [Myrou913](https://github.com/Myrou913)

---

© 2025 Mariem Sebai — Made with care.
