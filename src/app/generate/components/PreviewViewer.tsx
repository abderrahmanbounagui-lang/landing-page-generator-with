'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface PreviewViewerProps {
  html: string;
  onRegenerate: () => void;
  onPublish: () => void;
  isLoading?: boolean;
}

export const PreviewViewer = ({ html, onRegenerate, onPublish, isLoading }: PreviewViewerProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Preview iframe */}
      <Card className="overflow-hidden p-0 border border-border">
        <iframe
          srcDoc={html}
          title="Generated page preview"
          className="w-full bg-white"
          style={{ minHeight: '600px' }}
          sandbox="allow-same-origin allow-popups allow-scripts"
        />
      </Card>

      {/* Action buttons */}
      <Card>
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onRegenerate} disabled={isLoading}>
              Regenerate
            </Button>
            <Button variant="secondary" onClick={() => {}} disabled={isLoading}>
              Adjust tone
            </Button>
          </div>
          <Button onClick={onPublish} isLoading={isLoading} size="lg">
            Publish to Shopify
          </Button>
        </div>
      </Card>
    </div>
  );
};
