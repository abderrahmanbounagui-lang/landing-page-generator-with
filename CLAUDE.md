# Upseli

Turns any competitor landing page into a brand-new, original landing page for your product.
Public SaaS. Monorepo. Next.js 14 App Router + Supabase + Vercel.

## Architecture (WAT)

This project follows the WAT framework (Workflows → Agent → Tools):
- **Workflows** (`workflows/`): SOPs for each pipeline stage
- **Tools** (`tools/`): Python scripts that do the actual execution
- **Agent (you)**: orchestrate stages, read workflows, call tools, recover from errors

Never skip to direct execution. Always read the relevant workflow first.

## Pipeline

1. **Scrape** — `workflows/scrape_competitor.md` → `tools/scrape_page.py`
   - Playwright renders the page, captures full HTML + full-page screenshot
   - Saves to `workspaces/<slug>/scrape/` — skip re-scrape if folder already exists

2. **Analyze** — `workflows/analyze_page.md` → `tools/analyze_structure.py`
   - Extracts: hero headline, section order, CTA copy, social proof, pricing framing, tone
   - Saves structured JSON to `workspaces/<slug>/analysis.json`

3. **Generate** — `workflows/generate_page.md` → `tools/generate_page.py`
   - Input: product description + `analysis.json`
   - Output: original copy (never paraphrase source) + `strategy.md` explaining structural decisions
   - Similarity check: if generated copy scores >70% similar to source, add a `⚠️ SIMILARITY WARNING` block to `strategy.md` but do not block output
   - Local dev output: single-file HTML with Tailwind CDN (fast iteration)
   - Production output: Next.js App Router component at `output/pages/<slug>/`

4. **Deploy** — `workflows/deploy_page.md`
   - Push to GitHub monorepo via GitHub MCP
   - Vercel auto-syncs on push (one Vercel project, pages routed by slug)
   - Record project in Supabase (slug, source URL, generated page path, timestamp)

## Stack

| Layer | Tech |
|-------|------|
| Scraping | Python + Playwright |
| Generation | Anthropic API (`claude-sonnet-4-6` default, `claude-opus-4-7` for complex pages) |
| Frontend | Next.js 14 App Router + Tailwind CSS |
| Database | Supabase (projects, scrape history, pages) |
| Deployment | GitHub MCP → Vercel (monorepo, auto-deploy on push) |

## Directory Layout

```
tools/                  # Python execution scripts
workflows/              # Markdown SOPs
workspaces/             # Per-project data (gitignored)
  <slug>/
    scrape/             # Raw HTML, screenshot
    analysis.json       # Structured extraction
    strategy.md         # Generation rationale
output/                 # Generated Next.js pages
  pages/
    <slug>/             # App Router page component
.tmp/                   # Ephemeral processing files (regenerable, gitignored)
.env                    # API keys: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_KEY
```

## Skills

- `frontend-design`: invoke for all Next.js component generation — ensures production-grade, non-generic output
- `landing-page-anatomy`: invoke during analyze + generate phases — encodes high-converting page patterns (hero → social proof → features → objections → pricing → CTA)

## Rules

- Always check `workspaces/<slug>/` before scraping — reuse if data exists
- Never paraphrase competitor copy — generate original language
- Supabase stores project metadata; `workspaces/` stores raw files locally
- `.env` is the only place for secrets — never hardcode or log keys
- Update workflow files when you discover rate limits, API quirks, or better methods
