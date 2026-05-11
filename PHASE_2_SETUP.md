# Upseli Phase 2 Setup Guide

Phase 2 is complete. This guide walks you through setting up the integrations with real data.

## Quick Start (5 minutes)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New project"
3. Name it `upseli`, set a strong password
4. Wait for it to initialize (~2 min)
5. Copy the URL and anon key from Settings → API

### 2. Configure Database

1. Open the SQL Editor in Supabase
2. Copy the schema from [SUPABASE.md](SUPABASE.md)
3. Run each SQL block to create tables
4. Enable Row Level Security on all tables

### 3. Set Environment Variables

Create `.env.local` in the project root:

```bash
# Supabase (from Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# N8N Webhook
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/generate

# Shopify (optional for Phase 2, needed for Phase 3)
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_REDIRECT_URI=http://localhost:3000/api/auth/shopify/callback
```

### 4. Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and try:
- Sign up with email/password
- Go to /generate
- Paste a competitor URL
- Watch it call n8n webhook (will fail if not configured)

---

## Architecture (Phase 2)

### Auth Flow
```
User → /auth page → Supabase Auth → useAuth context → Protected routes
```

### Generation Flow
```
User → /generate → CompetitorInput
       ↓
       POST to N8N webhook
       ↓
       Receive GeneratedPage JSON
       ↓
       Save to Supabase projects table
       ↓
       Show in iframe preview
```

### Publish Flow
```
User → "Publish to Shopify" button
       ↓
       /generate/publish page
       ↓
       Select store from connected stores
       ↓
       POST /api/shopify/create-page
       ↓
       Backend calls Shopify REST API
       ↓
       Show success with page link
```

---

## Key Files

### Integration Libraries
- `src/lib/supabase.ts` — Database helpers
- `src/lib/auth-context.tsx` — Auth provider & useAuth hook
- `src/lib/n8n.ts` — N8N webhook client
- `src/lib/shopify.ts` — Shopify API helpers

### API Routes
- `src/app/api/shopify/create-page/route.ts` — Create Shopify page (backend)
- `src/app/api/auth/shopify/callback/route.ts` — OAuth callback handler

### Pages
- `src/app/auth/page.tsx` — Sign in/up with real Supabase
- `src/app/generate/page.tsx` — Full generation flow
- `src/app/generate/publish/page.tsx` — Shopify selection & publish
- `src/app/dashboard/page.tsx` — Project history from Supabase

---

## Testing Checklist

- [ ] Sign up with email/password
- [ ] See "Generate" and "Dashboard" in header when logged in
- [ ] Navigate to /generate
- [ ] Fill in URL and product description
- [ ] See status indicators (analyzing → generating → complete)
- [ ] See generated page preview in iframe
- [ ] See generation strategy below preview
- [ ] Click "Publish to Shopify"
- [ ] See store selector (empty if no stores connected)
- [ ] See "No stores connected" message
- [ ] Go to dashboard and see project in history

---

## Troubleshooting

### "N8N webhook failed: 404"
- Check `NEXT_PUBLIC_N8N_WEBHOOK_URL` in `.env.local`
- Make sure n8n instance is running and webhook exists
- Test with `curl -X POST https://your-n8n.com/webhook/generate -d '{}'`

### "Missing NEXT_PUBLIC_SUPABASE_URL"
- Make sure `.env.local` is in project root (not in src/)
- Verify file has correct Supabase URL
- Run `npm run dev` again (env changes need restart)

### "Auth error: Invalid credentials"
- Make sure Supabase auth is enabled (Auth → Providers → Email)
- Check that .env.local has correct anon key (not service_role key)

### Supabase connection refused
- Check URL doesn't have `https://` twice
- Verify project is running in Supabase dashboard

---

## What's Next (Phase 3)

1. **Shopify OAuth** — Full token exchange for secure multi-store access
2. **Regeneration** — Allow adjusting tone and re-generating
3. **Error recovery** — Better error messages and retry logic
4. **Analytics** — Track generation success rates, user behavior
5. **Performance** — Image optimization, lazy loading, caching
6. **Security** — Rate limiting, CORS, input validation

---

## Questions?

- Check [SUPABASE.md](SUPABASE.md) for database schema
- Check `.env.example` for all required env vars
- See [README.md](README.md) for project structure

Good luck! 🚀
