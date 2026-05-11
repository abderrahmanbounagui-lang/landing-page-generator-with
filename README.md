# Upseli Frontend

Professional landing page generator for Shopify. Generate competitor-inspired, original pages with one-click publishing.

## Tech Stack

- **Framework**: Next.js 14 App Router
- **Styling**: Tailwind CSS + custom design system
- **Animation**: Framer Motion
- **Database**: Supabase
- **API Integration**: n8n webhooks + Shopify REST API

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── generate/          # Generation workflow
│   ├── dashboard/         # Project history & store management
│   └── auth/              # Auth pages
├── components/
│   ├── ui/                # Design system components
│   └── layout/            # Header, Footer, Navigation
├── lib/                   # Utilities
└── styles/                # Global styles & design system
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
npm start
```

## Design System

Minimal, professional design following Stripe / Linear aesthetic:

- **Color**: Off-white background, deep charcoal text, one accent color (blue by default)
- **Typography**: IBM Plex Sans (body) + Geist (display)
- **Spacing**: 4px baseline grid
- **Motion**: 200-300ms transitions, restrained animations

Customize the accent color by editing `--accent-color` in [src/styles/globals.css](src/styles/globals.css).

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
SHOPIFY_API_KEY=your_shopify_key
SHOPIFY_API_SECRET=your_shopify_secret
```

## Phase 1 Complete ✓

- [x] Next.js 14 project setup
- [x] Design system (Tailwind + components)
- [x] Landing page with hero + 3-step flow
- [x] /generate page with input & preview UI
- [x] /dashboard page layout
- [x] /auth page layout

## Phase 2 Complete ✓ (Integrations)

- [x] Supabase auth (email/password + OAuth ready)
- [x] Supabase database (projects, stores, history)
- [x] N8N webhook integration (page generation)
- [x] Preview viewer (full-page iframe)
- [x] Shopify page creation API
- [x] Dashboard with real project history
- [x] Protected routes (auth redirects)

**See [PHASE_2_SETUP.md](PHASE_2_SETUP.md) for setup instructions**

## Phase 3 (Planned)

- [ ] Full Shopify OAuth token exchange
- [ ] Regeneration with tone adjustment
- [ ] Error recovery & retry logic
- [ ] Analytics & usage tracking
- [ ] Performance optimizations
- [ ] Accessibility audit
- [ ] Rate limiting
- [ ] Email notifications

## Deployment

This app is configured for Vercel:

```bash
vercel deploy
```

## License

Private. For Upseli use only.
