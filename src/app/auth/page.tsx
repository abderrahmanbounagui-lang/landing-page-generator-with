'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signUp } = useAuth();

  const isSignUp = searchParams.get('mode') === 'signup';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.push('/generate');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    const newMode = isSignUp ? '' : 'signup';
    router.push(`/auth${newMode ? `?mode=${newMode}` : ''}`);
    setError('');
  };

  return (
    <div className="container-tight py-12 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-fg mb-2">
              {isSignUp ? 'Create account' : 'Sign in'}
            </h1>
            <p className="text-sm text-fg-muted">
              {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
              <button
                onClick={toggleMode}
                className="text-brand-accent hover:underline font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              helpText={isSignUp ? 'At least 6 characters' : ''}
            />
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <Button type="submit" isLoading={loading} className="w-full">
              {isSignUp ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-bg-alt text-fg-muted">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" disabled={loading}>
              GitHub
            </Button>
            <Button variant="secondary" disabled={loading}>
              Google
            </Button>
          </div>

          <p className="text-xs text-fg-muted text-center">
            By signing in, you agree to our{' '}
            <a href="#" className="text-brand-accent hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-brand-accent hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
