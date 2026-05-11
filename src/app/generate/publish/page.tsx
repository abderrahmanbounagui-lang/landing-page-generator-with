'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getShopifyStores } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function PublishPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [stores, setStores] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [pageTitle, setPageTitle] = useState('Generated Landing Page');
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    const loadStores = async () => {
      if (!user?.id) return;
      try {
        const data = await getShopifyStores(user.id);
        setStores(data || []);
        if (data && data.length > 0) {
          setSelectedStore(data[0].id);
        }
      } catch (err) {
        setError('Failed to load stores');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, [user]);

  const handlePublish = async () => {
    if (!selectedStore || !user?.id) {
      setError('Please select a store');
      return;
    }

    setPublishing(true);
    setError('');

    try {
      // Call backend API to create page in Shopify
      const response = await fetch('/api/shopify/create-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: selectedStore,
          pageTitle,
          sourceUrl: searchParams.get('source'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish page');
      }

      const data = await response.json();
      setPageUrl(data.pageUrl);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish page');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="container-tight py-12 flex items-center justify-center min-h-screen">
        <Card>Loading stores...</Card>
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="container-tight py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Shopify stores connected</CardTitle>
            <CardDescription>Connect a Shopify store to publish pages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-fg-muted mb-6">
              You haven't connected any Shopify stores yet. Let's set that up.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container-tight py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Page Published
            </CardTitle>
            <CardDescription>Your page is now live in Shopify</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-fg-muted mb-1">Page title</p>
                <p className="font-medium text-fg">{pageTitle}</p>
              </div>
              <div>
                <p className="text-xs text-fg-muted mb-1">Shopify URL</p>
                <a
                  href={pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:underline break-all"
                >
                  {pageUrl}
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => window.open(pageUrl, '_blank')}
              className="w-full"
            >
              View Page
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-tight py-12 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Publish to Shopify</CardTitle>
          <CardDescription>Choose where to publish your new page</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-fg mb-2 block">Store</label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                disabled={publishing}
                className="w-full px-3 py-2 text-base rounded-md border border-border bg-bg-alt text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50"
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.shop_name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              type="text"
              label="Page title"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              disabled={publishing}
              helpText="This will be the page title in Shopify"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" onClick={() => router.back()} disabled={publishing}>
            Back
          </Button>
          <Button onClick={handlePublish} isLoading={publishing} className="flex-1">
            Publish Page
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
