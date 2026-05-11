'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { isValidLandingPageUrl } from '@/lib/n8n';

export const CompetitorInput = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (url: string, description: string, tone: string) => void;
  isLoading: boolean;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    const description = formData.get('description') as string;
    const tone = formData.get('tone') as string;

    if (!isValidLandingPageUrl(url)) {
      alert('Please enter a valid URL');
      return;
    }

    onSubmit(url, description, tone);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="url"
            name="url"
            label="Competitor URL"
            placeholder="https://competitor-landing.com"
            required
            disabled={isLoading}
            helpText="We'll analyze this page's structure and design"
          />
        </div>

        <div>
          <Textarea
            name="description"
            label="Your product (brief description)"
            placeholder="What does your product do? Who is it for?"
            required
            disabled={isLoading}
            rows={3}
            helpText="This helps us generate copy tailored to your brand"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-fg mb-2 block">Tone</label>
          <select
            name="tone"
            disabled={isLoading}
            className="w-full px-3 py-2 text-base rounded-md border border-border bg-bg-alt text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50"
          >
            <option value="professional">Professional</option>
            <option value="bold">Bold & Energetic</option>
            <option value="casual">Casual & Friendly</option>
          </select>
          <p className="text-xs text-fg-muted mt-1">Choose the tone for the generated copy</p>
        </div>

        <Button type="submit" isLoading={isLoading} size="lg" className="w-full">
          {isLoading ? 'Generating...' : 'Generate page'}
        </Button>
      </form>
    </Card>
  );
};
