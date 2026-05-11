import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// Database helpers
export const insertProject = async (
  userId: string,
  sourceUrl: string,
  generatedHtml: string,
  strategy: string
) => {
  const { data, error } = await supabase.from('projects').insert([
    {
      user_id: userId,
      source_url: sourceUrl,
      generated_html: generatedHtml,
      strategy_notes: strategy,
    },
  ]);
  if (error) throw error;
  return data;
};

export const getProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getShopifyStores = async (userId: string) => {
  const { data, error } = await supabase
    .from('shopify_stores')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const insertShopifyStore = async (
  userId: string,
  shopName: string,
  accessToken: string
) => {
  const { data, error } = await supabase.from('shopify_stores').insert([
    {
      user_id: userId,
      shop_name: shopName,
      access_token: accessToken,
    },
  ]);
  if (error) throw error;
  return data;
};

export const getGenerationHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('generation_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const insertGenerationHistory = async (
  userId: string,
  projectId: string,
  input: object,
  output: object
) => {
  const { data, error } = await supabase.from('generation_history').insert([
    {
      user_id: userId,
      project_id: projectId,
      input: input,
      output: output,
    },
  ]);
  if (error) throw error;
  return data;
};
