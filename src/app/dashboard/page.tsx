'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getProjects, getShopifyStores } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const loadData = async () => {
      try {
        const [projectsData, storesData] = await Promise.all([
          getProjects(user.id),
          getShopifyStores(user.id),
        ]);
        setProjects(projectsData || []);
        setStores(storesData || []);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (!user) {
    return (
      <div className="container-tight py-12 flex items-center justify-center min-h-screen">
        <Card>
          <p className="text-fg-muted">Please sign in to view your dashboard.</p>
          <Button onClick={() => router.push('/auth')} className="mt-4">
            Sign in
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-tight py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold text-fg mb-4">Dashboard</h1>
        <p className="text-lg text-fg-muted">
          Manage your generated pages and connected Shopify stores.
        </p>
      </div>

      {/* Projects Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-fg">Your Projects</h2>
          <Button onClick={() => router.push('/generate')}>New generation</Button>
        </div>

        {loading ? (
          <Card>
            <p className="text-fg-muted text-center py-12">Loading projects...</p>
          </Card>
        ) : projects.length === 0 ? (
          <Card>
            <p className="text-fg-muted text-center py-12">
              No projects yet.{' '}
              <a href="/generate" className="text-brand-accent hover:underline">
                Generate your first page
              </a>
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {projects.map((project: any) => (
              <Card key={project.id} bordered>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-fg break-all">{project.source_url}</p>
                    <p className="text-sm text-fg-muted mt-1">
                      Created {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center ml-4 flex-shrink-0">
                    {project.shopify_page_id && (
                      <Badge variant="success">Published</Badge>
                    )}
                    {!project.shopify_page_id && (
                      <Badge>Draft</Badge>
                    )}
                    <Button variant="secondary" size="sm" onClick={() => router.push(`/generate?view=${project.id}`)}>
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Connected Stores */}
      <section>
        <h2 className="text-2xl font-bold text-fg mb-6">Connected Stores</h2>
        {stores.length === 0 ? (
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-fg">No stores connected yet</p>
                <p className="text-sm text-fg-muted">Connect a Shopify store to start publishing</p>
              </div>
              <Button variant="primary">Connect Store</Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {stores.map((store: any) => (
              <Card key={store.id} bordered>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-fg">{store.shop_name}</p>
                    <p className="text-sm text-fg-muted">Connected {new Date(store.created_at).toLocaleDateString()}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Disconnect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
