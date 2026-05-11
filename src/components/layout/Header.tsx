'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-bg-alt sticky top-0 z-50">
      <div className="container-tight flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-brand-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="font-semibold text-fg hidden sm:inline">Upseli</span>
        </Link>

        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/generate" className="text-sm text-fg hover:text-brand-accent transition-colors">
                Generate
              </Link>
              <Link href="/dashboard" className="text-sm text-fg hover:text-brand-accent transition-colors">
                Dashboard
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <a href="#" className="text-sm text-fg hover:text-brand-accent transition-colors">
                Docs
              </a>
              <a href="#" className="text-sm text-fg hover:text-brand-accent transition-colors">
                Pricing
              </a>
              <Link
                href="/auth"
                className="text-sm font-medium text-brand-accent hover:opacity-80 transition-opacity"
              >
                Sign in
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
