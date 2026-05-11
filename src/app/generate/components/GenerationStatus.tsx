'use client';

import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type StatusType = 'analyzing' | 'generating' | 'complete' | 'error';

const STATUS_MESSAGES: Record<StatusType, { icon: React.ReactNode; text: string; badge: string }> = {
  analyzing: {
    icon: <Spinner size="sm" />,
    text: 'Analyzing competitor page structure...',
    badge: 'analyzing',
  },
  generating: {
    icon: <Spinner size="sm" />,
    text: 'Generating original copy and layout...',
    badge: 'generating',
  },
  complete: {
    icon: <span className="text-green-600">✓</span>,
    text: 'Page ready! Preview below.',
    badge: 'success',
  },
  error: {
    icon: <span className="text-red-600">✕</span>,
    text: 'Something went wrong. Please try again.',
    badge: 'error',
  },
};

export const GenerationStatus = ({
  status,
  message,
}: {
  status: StatusType | null;
  message?: string;
}) => {
  if (!status) return null;

  const display = STATUS_MESSAGES[status];
  const variantMap: Record<StatusType, any> = {
    analyzing: 'info',
    generating: 'info',
    complete: 'success',
    error: 'error',
  };

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">{display.icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-fg">{message || display.text}</p>
        </div>
        <Badge variant={variantMap[status]}>{display.badge}</Badge>
      </div>
    </Card>
  );
};
