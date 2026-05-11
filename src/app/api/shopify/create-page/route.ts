import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createShopifyPage } from '@/lib/shopify';

/**
 * POST /api/shopify/create-page
 * 
 * Creates a page in Shopify store using the user's connected credentials
 * Request: { storeId, pageTitle, sourceUrl }
 * Response: { pageId, pageUrl }
 */
export async function POST(request: NextRequest) {
  try {
    const { storeId, pageTitle, sourceUrl } = await request.json();

    if (!storeId || !pageTitle || !sourceUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get store details from Supabase
    const { data: store, error: storeError } = await supabase
      .from('shopify_stores')
      .select('*')
      .eq('id', storeId)
      .single();

    if (storeError || !store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    // Get project to get the generated HTML
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('generated_html')
      .eq('source_url', sourceUrl)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Create page in Shopify
    const result = await createShopifyPage(
      store.shop_name,
      store.access_token,
      pageTitle,
      project.generated_html
    );

    // Update project with Shopify page ID
    await supabase
      .from('projects')
      .update({ shopify_page_id: result.pageId })
      .eq('source_url', sourceUrl);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Page creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
