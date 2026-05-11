/**
 * Shopify API Integration
 * 
 * Handles OAuth flow and page creation via Shopify Admin API
 */

const SHOPIFY_API_VERSION = '2024-01';

interface ShopifyOAuthParams {
  client_id: string;
  scope: string;
  redirect_uri: string;
  state: string;
}

/**
 * Generate Shopify OAuth authorization URL
 */
export const getShopifyAuthUrl = ({
  shopDomain,
  clientId,
  scope,
  redirectUri,
}: {
  shopDomain: string;
  clientId: string;
  scope: string;
  redirectUri: string;
}): string => {
  const params = new URLSearchParams({
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state: Math.random().toString(36).substring(7),
  });

  return `https://${shopDomain}/admin/oauth/authorize?${params.toString()}`;
};

/**
 * Create a page in Shopify store
 * Called from backend API route to keep access token secure
 */
export const createShopifyPage = async (
  shopDomain: string,
  accessToken: string,
  pageTitle: string,
  bodyHtml: string
): Promise<{ pageId: string; pageUrl: string }> => {
  try {
    const response = await fetch(
      `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/pages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({
          page: {
            title: pageTitle,
            body_html: bodyHtml,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    const page = data.page;

    return {
      pageId: page.id.toString(),
      pageUrl: `https://${shopDomain}/pages/${page.handle}`,
    };
  } catch (error) {
    console.error('Shopify page creation error:', error);
    throw error;
  }
};

/**
 * Get shop info from Shopify API
 */
export const getShopInfo = async (
  shopDomain: string,
  accessToken: string
): Promise<{ shopName: string; shopUrl: string }> => {
  try {
    const response = await fetch(
      `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/shop.json`,
      {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    const shop = data.shop;

    return {
      shopName: shop.name,
      shopUrl: shop.myshopify_domain,
    };
  } catch (error) {
    console.error('Shopify shop info error:', error);
    throw error;
  }
};
