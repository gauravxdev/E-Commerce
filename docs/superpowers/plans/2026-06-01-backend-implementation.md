# Backend Implementation Plan - Snopex E-Commerce

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all mock data with a real Supabase backend, enabling persistent products, cart, user auth, and orders.

**Architecture:** Next.js App Router with Supabase as the backend. Server Components fetch data directly via Supabase client. Client Components use Supabase client for auth and real-time updates. API Routes handle complex mutations (checkout, admin CRUD).

**Tech Stack:** Next.js 16, Supabase (PostgreSQL + Auth + RLS), Zod for validation, @supabase/ssr for cookie-based auth.

---

## File Structure

```
src/
├── utils/
│   └── supabase/
│       ├── client.ts          (exists - browser client)
│       ├── server.ts          (exists - server component client)
│       └── middleware.ts      (exists - middleware client)
├── types/
│   └── database.ts            (NEW - TypeScript types for DB tables)
├── lib/
│   ├── mockData.ts            (exists - to be phased out)
│   └── utils.ts               (exists)
app/
├── api/
│   ├── products/
│   │   └── route.ts           (NEW - GET products, POST create)
│   ├── cart/
│   │   └── route.ts           (NEW - GET/POST/PUT/DELETE cart items)
│   ├── orders/
│   │   └── route.ts           (NEW - POST checkout)
│   └── webhooks/
│       └── stripe/route.ts    (NEW - Stripe webhook handler)
├── store/
│   ├── page.tsx               (MODIFY - fetch from Supabase)
│   └── [id]/page.tsx          (MODIFY - fetch from Supabase)
├── cart/
│   └── page.tsx               (MODIFY - use cart API)
├── dashboard/
│   └── page.tsx               (NEW - user orders dashboard)
└── auth/
    ├── login/page.tsx         (NEW)
    └── signup/page.tsx        (NEW)
components/
├── AuthProvider.tsx           (NEW - Supabase auth context)
├── StoreProductGrid.tsx       (MODIFY - fetch from API)
├── StoreFilterSidebar.tsx     (MODIFY - dynamic categories)
├── CartDrawer.tsx             (MODIFY - use cart state)
├── ProductHero.tsx            (MODIFY - add to cart action)
└── ...
```

---

## Task 1: Database Schema Design (Supabase Dashboard)

**Files:**
- Create: SQL migration in Supabase Dashboard

- [ ] **Step 1: Create tables in Supabase SQL Editor**

```sql
-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_src TEXT NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  bg_color TEXT DEFAULT 'bg-gray-50',
  badges TEXT[] DEFAULT '{}',
  features JSONB DEFAULT '[]',
  specs JSONB DEFAULT '{}',
  ratings_average DECIMAL(2,1) DEFAULT 0,
  ratings_count INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Cart items table (linked to auth user or session)
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id),
  UNIQUE(session_id, product_id)
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_cart_items_session ON cart_items(session_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
```

- [ ] **Step 2: Enable RLS and create policies**

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin write
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.raw_user_meta_data->>'role' = 'admin')
);

-- Categories: public read, admin write
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.raw_user_meta_data->>'role' = 'admin')
);

-- Cart items: users manage their own, session-based for guests
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart" ON cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON cart_items FOR DELETE USING (auth.uid() = user_id);

-- Orders: users view own, admins view all
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.raw_user_meta_data->>'role' = 'admin')
);

-- Order items: users view via parent order
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Reviews: public read, authenticated write
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);
```

- [ ] **Step 3: Seed initial data**

```sql
INSERT INTO categories (name, slug) VALUES
  ('Headphones', 'headphones'),
  ('Earbuds', 'earbuds'),
  ('Smartphones', 'smartphones'),
  ('Speakers', 'speakers'),
  ('Accessories', 'accessories');

INSERT INTO products (title, slug, description, image_src, original_price, price, bg_color, badges, features, specs, category_id, stock) VALUES
  ('Light Gorsun Headphones', 'light-gorsun-headphones', 'Experience unparalleled sound quality...', 'https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=500&q=80', 248.00, 188.00, 'bg-gradient-to-br from-blue-100 to-indigo-100', ARRAY['Today''s Deal', '10% off'], '[{"title":"Active Noise Cancellation","description":"Block out the world"},{"title":"30-Hour Battery Life","description":"Listen all day"}]', '{"Weight":"250g","Driver Size":"40mm"}', (SELECT id FROM categories WHERE slug = 'headphones'), 50),
  ('Blue version airpods', 'blue-version-airpods', 'Compact, powerful, truly wireless...', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80', 248.00, 188.00, 'bg-gradient-to-br from-purple-100 to-pink-100', ARRAY['Best Seller'], '[{"title":"True Wireless","description":"No cables"}]', '{"Weight":"4g per earbud"}', (SELECT id FROM categories WHERE slug = 'earbuds'), 75);
```

---

## Task 2: TypeScript Types

**Files:**
- Create: `src/types/database.ts`

- [ ] **Step 1: Create database types**

```typescript
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image_src: string;
  original_price: number;
  price: number;
  bg_color: string;
  badges: string[];
  features: ProductFeature[];
  specs: Record<string, string>;
  ratings_average: number;
  ratings_count: number;
  category_id: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface CartItem {
  id: string;
  user_id: string | null;
  session_id: string | null;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shipping_address: ShippingAddress | null;
  payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  created_at: string;
  product?: Product;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'newest' | 'reviews';

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  sort?: SortOption;
  search?: string;
  page?: number;
  limit?: number;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/database.ts
git commit -m "feat: add TypeScript types for database schema"
```

---

## Task 3: Supabase Client Improvements

**Files:**
- Modify: `src/utils/supabase/client.ts`
- Modify: `src/utils/supabase/server.ts`

- [ ] **Step 1: Add browser client for client components**

```typescript
// src/utils/supabase/client-browser.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
```

- [ ] **Step 2: Fix existing client.ts naming**

```typescript
// Rename export to avoid confusion
export { createClient as createServerClient }
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/supabase/
git commit -m "feat: add browser Supabase client and fix naming"
```

---

## Task 4: Auth Provider & Middleware

**Files:**
- Create: `components/AuthProvider.tsx`
- Modify: `middleware.ts` (root)

- [ ] **Step 1: Create AuthProvider**

```typescript
// components/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client-browser';

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

- [ ] **Step 2: Wrap layout with AuthProvider**

```typescript
// app/layout.tsx - wrap children
import { AuthProvider } from '@/components/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create auth pages**

```typescript
// app/auth/login/page.tsx
"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/');
  };

  return (
    // ... login form UI
  );
}
```

- [ ] **Step 4: Add auth callback route**

```typescript
// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
```

- [ ] **Step 5: Commit**

```bash
git add components/AuthProvider.tsx app/auth/ app/layout.tsx
git commit -m "feat: add auth provider, login/signup pages, and callback"
```

---

## Task 5: Products API Route

**Files:**
- Create: `app/api/products/route.ts`

- [ ] **Step 1: Create GET products endpoint**

```typescript
// app/api/products/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ProductFilters } from '@/types/database';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { searchParams } = new URL(request.url);

  const filters: ProductFilters = {
    category: searchParams.get('category') || undefined,
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    sort: (searchParams.get('sort') as ProductFilters['sort']) || 'featured',
    search: searchParams.get('search') || undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 12,
  };

  let query = supabase
    .from('products')
    .select('*, categories(name, slug)', { count: 'exact' })
    .eq('is_active', true);

  if (filters.category) {
    query = query.eq('categories.slug', filters.category);
  }
  if (filters.priceMin) {
    query = query.gte('price', filters.priceMin);
  }
  if (filters.priceMax) {
    query = query.lte('price', filters.priceMax);
  }
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  // Sorting
  switch (filters.sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'reviews':
      query = query.order('ratings_count', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const offset = (filters.page! - 1) * filters.limit!;
  query = query.range(offset, offset + filters.limit! - 1);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    products: data,
    total: count,
    page: filters.page,
    limit: filters.limit,
    totalPages: Math.ceil((count || 0) / filters.limit!),
  });
}
```

- [ ] **Step 2: Create POST product endpoint (admin)**

```typescript
// app/api/products/route.ts - append POST handler
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image_src: z.string().url(),
  original_price: z.number().positive(),
  price: z.number().positive(),
  bg_color: z.string().optional(),
  badges: z.array(z.string()).optional(),
  features: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
  specs: z.record(z.string()).optional(),
  category_id: z.string().uuid(),
  stock: z.number().int().min(0),
});

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('products')
    .insert(parsed.data)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/products/route.ts
git commit -m "feat: add products API with filtering, sorting, and pagination"
```

---

## Task 6: Cart API Route

**Files:**
- Create: `app/api/cart/route.ts`

- [ ] **Step 1: Create cart endpoints**

```typescript
// app/api/cart/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET cart items
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data });
}

// POST add to cart
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { product_id, quantity = 1 } = await request.json();

  // Upsert: if exists, increment quantity
  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', user.id)
    .eq('product_id', product_id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ user_id: user.id, product_id, quantity });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}

// PUT update quantity
export async function PUT(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { item_id, quantity } = await request.json();

  if (quantity <= 0) {
    // Remove item
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', item_id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', item_id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}

// DELETE clear cart
export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/cart/route.ts
git commit -m "feat: add cart API with CRUD operations"
```

---

## Task 7: Orders API Route

**Files:**
- Create: `app/api/orders/route.ts`

- [ ] **Step 1: Create orders endpoint**

```typescript
// app/api/orders/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

const checkoutSchema = z.object({
  shipping_address: z.object({
    fullName: z.string().min(1),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  payment_intent_id: z.string().optional(),
});

// GET user orders
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
}

// POST create order (checkout)
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Get cart items
  const { data: cartItems, error: cartError } = await supabase
    .from('cart_items')
    .select('*, products(price)')
    .eq('user_id', user.id);

  if (cartError || !cartItems?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 15;
  const total = subtotal + tax + shipping;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      subtotal,
      tax,
      shipping,
      total,
      shipping_address: parsed.data.shipping_address,
      payment_intent_id: parsed.data.payment_intent_id,
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: item.products.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  // Clear cart
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id);

  // Update stock
  for (const item of cartItems) {
    await supabase.rpc('decrement_stock', {
      product_id: item.product_id,
      quantity: item.quantity,
    });
  }

  return NextResponse.json({ order }, { status: 201 });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/orders/route.ts
git commit -m "feat: add orders API with checkout flow"
```

---

## Task 8: Update Store Pages to Use API

**Files:**
- Modify: `app/store/page.tsx`
- Modify: `app/store/[id]/page.tsx`
- Modify: `components/StoreProductGrid.tsx`
- Modify: `components/StoreFilterSidebar.tsx`

- [ ] **Step 1: Update store page to fetch from API**

```typescript
// app/store/page.tsx
import { fetchProducts } from '@/lib/api';
import StoreProductGrid from '@/components/StoreProductGrid';
import StoreFilterSidebar from '@/components/StoreFilterSidebar';

export default async function StorePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const params = await searchParams;
  const { products, total, totalPages } = await fetchProducts({
    category: params.category,
    sort: params.sort as any,
    page: Number(params.page) || 1,
  });

  return (
    // ... existing JSX, pass products as props
  );
}
```

- [ ] **Step 2: Create API helper functions**

```typescript
// lib/api.ts
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { ProductFilters } from '@/types/database';

export async function fetchProducts(filters: ProductFilters = {}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from('products')
    .select('*, categories(name, slug)', { count: 'exact' })
    .eq('is_active', true);

  if (filters.category) {
    query = query.eq('categories.slug', filters.category);
  }
  if (filters.priceMin) {
    query = query.gte('price', filters.priceMin);
  }
  if (filters.priceMax) {
    query = query.lte('price', filters.priceMax);
  }
  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  switch (filters.sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    products: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function fetchProductBySlug(slug: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/store/ lib/api.ts
git commit -m "feat: update store pages to fetch from Supabase"
```

---

## Task 9: Cart State Management

**Files:**
- Create: `hooks/useCart.ts`
- Modify: `components/CartDrawer.tsx`
- Modify: `components/ProductHero.tsx`

- [ ] **Step 1: Create cart hook**

```typescript
// hooks/useCart.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { CartItem } from '@/types/database';
import { useAuth } from '@/components/AuthProvider';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, quantity = 1) => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    await fetchCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: itemId, quantity }),
    });
    await fetchCart();
  };

  const removeItem = async (itemId: string) => {
    await updateQuantity(itemId, 0);
  };

  const clearCart = async () => {
    await fetch('/api/cart', { method: 'DELETE' });
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, loading, addToCart, updateQuantity, removeItem, clearCart, subtotal, itemCount, refetch: fetchCart };
}
```

- [ ] **Step 2: Update CartDrawer to use hook**

```typescript
// components/CartDrawer.tsx
"use client";
import { useCart } from '@/hooks/useCart';

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    // ... existing JSX, replace cartItems with items
  );
}
```

- [ ] **Step 3: Update ProductHero Add to Cart**

```typescript
// components/ProductHero.tsx
"use client";
import { useCart } from '@/hooks/useCart';

export default function ProductHero({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    // ... existing JSX, wire up Add to Cart button
    <button onClick={() => addToCart(product.id)} className="...">
      Add to Cart
    </button>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add hooks/useCart.ts components/CartDrawer.tsx components/ProductHero.tsx
git commit -m "feat: add cart state management with useCart hook"
```

---

## Task 10: Seed Script

**Files:**
- Create: `scripts/seed.ts`

- [ ] **Step 1: Create seed script**

```typescript
// scripts/seed.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  // Seed categories
  const { data: categories } = await supabase
    .from('categories')
    .upsert([
      { name: 'Headphones', slug: 'headphones' },
      { name: 'Earbuds', slug: 'earbuds' },
      { name: 'Smartphones', slug: 'smartphones' },
      { name: 'Speakers', slug: 'speakers' },
      { name: 'Accessories', slug: 'accessories' },
    ])
    .select();

  // Seed products
  const headphonesId = categories?.find(c => c.slug === 'headphones')?.id;
  const earbudsId = categories?.find(c => c.slug === 'earbuds')?.id;

  await supabase.from('products').upsert([
    {
      title: 'Light Gorsun Headphones',
      slug: 'light-gorsun-headphones',
      description: 'Experience unparalleled sound quality...',
      image_src: 'https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=500&q=80',
      original_price: 248.00,
      price: 188.00,
      bg_color: 'bg-gradient-to-br from-blue-100 to-indigo-100',
      badges: ["Today's Deal", '10% off'],
      features: [{ title: 'Active Noise Cancellation', description: 'Block out the world' }],
      specs: { Weight: '250g', 'Driver Size': '40mm' },
      category_id: headphonesId,
      stock: 50,
    },
    // ... more products
  ]);

  console.log('Seed complete!');
}

seed();
```

- [ ] **Step 2: Add seed script to package.json**

```json
"scripts": {
  "seed": "tsx scripts/seed.ts"
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/seed.ts package.json
git commit -m "feat: add seed script for initial data"
```

---

## Task 11: Environment Variables Setup

**Files:**
- Modify: `.env.local` (create from `.env`)

- [ ] **Step 1: Document required env vars**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Stripe for payments
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

- [ ] **Step 2: Commit**

```bash
git add .env.example
git commit -m "docs: add environment variables template"
```

---

## Summary of Features

| Feature | Status | Description |
|---------|--------|-------------|
| Product Catalog | New | Dynamic products from Supabase with filtering, sorting, pagination |
| Product Detail | Update | Fetch individual product by slug from database |
| Shopping Cart | New | Persistent cart per user with add/update/remove |
| User Auth | New | Email/password login with Supabase Auth |
| Checkout | New | Create orders from cart with shipping address |
| Order History | New | User dashboard showing past orders |
| Admin CRUD | New | API routes for product management |
| Search | Update | Server-side search via Supabase ilike |
| Categories | New | Dynamic categories from database |
| Reviews | New | User reviews with ratings |

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-01-backend-implementation.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
