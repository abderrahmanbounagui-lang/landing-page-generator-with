# Upseli Supabase Schema

## Tables

### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### `projects`
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_url TEXT NOT NULL,
  generated_html TEXT NOT NULL,
  strategy_notes TEXT,
  shopify_page_id TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX projects_user_id ON projects(user_id);
CREATE INDEX projects_created_at ON projects(created_at DESC);
```

### `shopify_stores`
```sql
CREATE TABLE shopify_stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_name TEXT NOT NULL,
  access_token TEXT NOT NULL ENCRYPTED,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX shopify_stores_user_id ON shopify_stores(user_id);
```

### `generation_history`
```sql
CREATE TABLE generation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  input JSONB,
  output JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX generation_history_user_id ON generation_history(user_id);
CREATE INDEX generation_history_project_id ON generation_history(project_id);
```

## Row Level Security (RLS)

Enable RLS on all tables and create policies:

```sql
-- Users can only see their own projects
CREATE POLICY projects_user_isolation ON projects
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can only see their own stores
CREATE POLICY stores_user_isolation ON shopify_stores
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can only see their own generation history
CREATE POLICY history_user_isolation ON generation_history
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
```

## Setup Instructions

1. Create Supabase project at https://supabase.com
2. Run the SQL above in the Supabase SQL Editor
3. Copy the URL and anon key to `.env.local`
4. Enable Supabase Auth with email/password provider
5. Enable RLS on all tables
