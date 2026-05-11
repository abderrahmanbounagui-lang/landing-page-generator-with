'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="container-tight">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-fg mb-6 leading-tight">
            Turn competitors into conversions
          </h1>
          <p className="text-lg text-fg-muted mb-8 leading-relaxed">
            Paste a competitor's landing page. Generate an original, high-converting page for your Shopify store. No AI vibe, no copy-pasting, no manual work.
          </p>
          <div className="flex gap-4">
            <Link href="/generate">
              <Button size="lg">Start generating</Button>
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-md font-medium border border-border text-fg hover:bg-border-light transition-colors">
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* Three-Step Flow */}
      <section className="container-tight">
        <div className="grid grid-cols-3 gap-8">
          {/* Step 1: Paste */}
          <Card>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-accent flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-fg mb-2">Paste a competitor URL</h3>
                <p className="text-sm text-fg-muted">
                  Share the landing page you want to compete with. We analyze the structure, copy, and design.
                </p>
              </div>
            </div>
          </Card>

          {/* Step 2: Generate */}
          <Card>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-accent flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-fg mb-2">Generate original copy</h3>
                <p className="text-sm text-fg-muted">
                  Our AI writes brand-new copy tailored to your product. Preview the full page in seconds.
                </p>
              </div>
            </div>
          </Card>

          {/* Step 3: Publish */}
          <Card>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-accent flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-fg mb-2">One-click publish to Shopify</h3>
                <p className="text-sm text-fg-muted">
                  Connect your store. The page goes live instantly. No copy-pasting, no manual setup.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-tight border-t border-border pt-12">
        <h2 className="text-3xl font-bold text-fg mb-12">Why Upseli</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-800 text-xs font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-semibold text-fg mb-1">No AI vibe</h4>
              <p className="text-sm text-fg-muted">
                Original copy that reads human. Not a paraphrase. Not generic. Written for your brand.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-800 text-xs font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-semibold text-fg mb-1">Shopify native</h4>
              <p className="text-sm text-fg-muted">
                Publish directly to your store. Page goes live in seconds. No manual work.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-800 text-xs font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-semibold text-fg mb-1">Instant preview</h4>
              <p className="text-sm text-fg-muted">
                See the full page before publishing. Adjust tone and regenerate in seconds.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-800 text-xs font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-semibold text-fg mb-1">Structurally sound</h4>
              <p className="text-sm text-fg-muted">
                We analyze competitor patterns. Your page inherits high-converting layouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-tight border-t border-border pt-12">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-fg mb-4">Ready to compete smarter?</h2>
          <p className="text-lg text-fg-muted mb-8">
            Paste a competitor URL. Generate a page. Publish. No setup, no waiting.
          </p>
          <Link href="/generate">
            <Button size="lg">Start now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
