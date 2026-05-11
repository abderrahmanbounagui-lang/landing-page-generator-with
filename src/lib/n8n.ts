/**
 * N8N Webhook Integration
 * 
 * Calls the n8n /generate webhook with:
 * - url: competitor landing page URL
 * - productDescription: brief description of user's product
 * - tone: generation tone (professional, bold, casual)
 * 
 * Returns GeneratedPage JSON with:
 * - html: full page HTML
 * - css: page CSS
 * - strategy: explanation of design decisions
 * - headline: page headline
 * - sections: array of page sections with metadata
 */

interface GeneratedPage {
  html: string;
  css: string;
  strategy: string;
  headline: string;
  sections: Array<{ title: string; description: string }>;
}

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

if (!N8N_WEBHOOK_URL) {
  console.warn('NEXT_PUBLIC_N8N_WEBHOOK_URL not configured');
}

export const generatePage = async (
  url: string,
  productDescription: string,
  tone: 'professional' | 'bold' | 'casual' = 'professional'
): Promise<GeneratedPage> => {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N webhook URL not configured');
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        productDescription,
        tone,
      }),
    });

    if (!response.ok) {
      throw new Error(`N8N webhook failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as GeneratedPage;
  } catch (error) {
    console.error('Page generation error:', error);
    throw error;
  }
};

/**
 * Validate URL before sending to n8n
 */
export const isValidLandingPageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};
