import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/auth/shopify/callback
 * 
 * Shopify OAuth callback handler
 * Receives: code, state, shop
 * Stores access token in Supabase
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const shop = searchParams.get('shop');
    const state = searchParams.get('state');

    if (!code || !shop || !state) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // TODO: Exchange code for access token with Shopify
    // This requires SHOPIFY_API_SECRET and coordination with backend token exchange
    // For now, return placeholder

    // Validate state matches session
    // Redirect back to dashboard on success

    return NextResponse.redirect(
      new URL('/dashboard?status=store_connected', request.nextUrl.origin)
    );
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: 'OAuth callback failed' },
      { status: 500 }
    );
  }
}
