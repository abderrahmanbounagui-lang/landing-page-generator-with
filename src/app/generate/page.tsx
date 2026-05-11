'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { generatePage } from '@/lib/n8n';
import { insertProject } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CompetitorInput } from './components/CompetitorInput';
import { GenerationStatus } from './components/GenerationStatus';
import { PreviewViewer } from './components/PreviewViewer';

type Status = 'idle' | 'analyzing' | 'generating' | 'complete' | 'error' | null;

export default function GeneratePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [status, setStatus] = useState<Status>('idle');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [strategy, setStrategy] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [publishLoading, setPublishLoading] = useState(false);

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="container-tight py-12 flex items-center justify-center min-h-screen">
        <Card className="text-center">
          <h2 className="text-2xl font-bold text-fg mb-4">Sign in to continue</h2>
          <p className="text-fg-muted mb-6">You need to be logged in to generate pages.</p>
          <Button onClick={() => router.push('/auth')}>Sign in</Button>
        </Card>
      </div>
    );
  }

  const handleGenerate = async (url: string, description: string, tone: string) => {
    setError('');
    setStatus('analyzing');
    setSourceUrl(url);

    try {
      // Call n8n webhook
      setStatus('generating');
      const result = await generatePage(url, description, tone as any);

      // Combine HTML with CSS
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${result.css}</style>
        </head>
        <body>
          ${result.html}
        </body>
        </html>
      `;

      setGeneratedHtml(fullHtml);
      setStrategy(result.strategy);
      setStatus('complete');

      // Save to Supabase
      if (user?.id) {
        await insertProject(user.id, url, fullHtml, result.strategy);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to generate page';
      setError(errorMsg);
      setStatus('error');
      console.error('Generation error:', err);
    }
  };

  const handleRegenerate = async () => {
    // TODO: Regenerate with same or different settings
    setStatus('analyzing');
    setTimeout(() => {
      setStatus('generating');
    }, 800);
  };

  const handlePublish = async () => {
    setPublishLoading(true);
    try {
      // TODO: Redirect to Shopify OAuth or publish directly if already connected
      router.push(`/generate/publish?source=${encodeURIComponent(sourceUrl)}`);
    } finally {
      setPublishLoading(false);
    }
  };

  return (
    <div className="container-tight py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold text-fg mb-4">Generate your page</h1>
        <p className="text-lg text-fg-muted">
          Paste a competitor's landing page. We'll create an original version for your store.
        </p>
      </div>

      {!generatedHtml ? (
        <div className="space-y-6">
          <CompetitorInput onSubmit={handleGenerate} isLoading={status !== 'idle'} />
          {status !== 'idle' && <GenerationStatus status={status as any} message={error} />}
        </div>
      ) : (
        <div className="space-y-6">
          <PreviewViewer
            html={generatedHtml}
            onRegenerate={handleRegenerate}
            onPublish={handlePublish}
            isLoading={publishLoading}
          />
          {strategy && (
            <Card>
              <div>
                <h3 className="font-semibold text-fg mb-2">Generation Strategy</h3>
                <p className="text-sm text-fg-muted whitespace-pre-wrap">{strategy}</p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
