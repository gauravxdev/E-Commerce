# Backend Plan — Snopex E-commerce

## Current State

- **Framework:** Next.js 16 + React 19
- **Database:** Supabase (already in dependencies + `.env` configured)
- **Auth:** None — all pages are public
- **Data:** 100% hardcoded — `lib/mockData.ts` (4 products, 2 cart items) and `app/admin/data.json` (placeholder admin table)
- **Cart:** Static array, no persistence
- **Search:** No real search, just navigates to `/search`
- **Admin:** Dashboard with fake data, no CRUD

---

## Database Schema (Supabase/Postgres)

### Tables

**`categories`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | default gen_random_uuid() |
| name | text | unique |
| slug | text | unique, indexed |
| image_url | text | nullable |
| created_at | timestamptz | now() |

**`products`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| title | text | |
| slug | text | unique, indexed |
| description | text | |
| price | numeric(10,2) | |
| original_price | numeric(10,2) | for strikethrough |
| image_url | text | |
| bg_color | text | gradient class string |
| badges | text[] | e.g. `{"Today's Deal","10% off"}` |
| category_id | uuid (FK → categories) | |
| stock | integer | default 0 |
| specs | jsonb | key-value pairs |
| features | jsonb | array of {title, description} |
| ratings_avg | numeric(2,1) | default 0 |
| ratings_count | integer | default 0 |
| is_active | boolean | default true |
| created_at | timestamptz | |

**`users`** (extends Supabase Auth)

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | references auth.users |
| full_name | text | |
| email | text | |
| phone | text | nullable |
| role | enum | 'customer' | 'admin' |
| avatar_url | text | nullable |
| created_at | timestamptz | |

**`addresses`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK → users) | |
| label | text | 'Home', 'Office' |
| line1 | text | |
| line2 | text | nullable |
| city | text | |
| state | text | |
| pincode | text | |
| is_default | boolean | default false |

**`cart_items`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK → users) | |
| product_id | uuid (FK → products) | |
| quantity | integer | default 1 |
| added_at | timestamptz | |
| UNIQUE(user_id, product_id) | | |

**`wishlist`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK → users) | |
| product_id | uuid (FK → products) | |
| added_at | timestamptz | |
| UNIQUE(user_id, product_id) | | one review per user per product |

**`orders`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK → users) | |
| status | enum | 'pending','confirmed','shipped','delivered','cancelled' |
| subtotal | numeric(10,2) | |
| tax | numeric(10,2) | |
| shipping | numeric(10,2) | |
| total | numeric(10,2) | |
| address_id | uuid (FK → addresses) | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**`order_items`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| order_id | uuid (FK → orders) | |
| product_id | uuid (FK → products) | |
| quantity | integer | |
| price_at_purchase | numeric(10,2) | snapshot of price |

**`reviews`**

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK → users) | |
| product_id | uuid (FK → products) | |
| rating | integer | 1-5 |
| comment | text | nullable |
| created_at | timestamptz | |
| UNIQUE(user_id, product_id) | | one review per user per product |

### Row Level Security (RLS)

- **Customers:** read own cart/orders/wishlist/addresses, read all products/categories
- **Admin:** full CRUD on all tables
- **Public:** read products/categories (for storefront)

---

## Features Breakdown

### 1. Auth (Supabase Auth)

- Email + password sign up / sign in
- Google OAuth (optional, easy with Supabase)
- Session management via `@supabase/ssr` (already installed)
- `auth/login`, `auth/signup`, `auth/callback` routes
- Protected routes middleware (cart, checkout, account, admin)
- Auto-create `users` row on signup via database trigger

### 2. Storefront — Products

- Product listing (`/store`) — fetch from Supabase with pagination, sort, filter by category/price/badge
- Product detail (`/store/[id]`) — fetch single product with specs, features, reviews
- Search (`/search?q=...`) — full-text search on title + description using Postgres `textSearch` or `ilike`
- Category filtering via sidebar (real data instead of hardcoded)

### 3. Cart (Authenticated)

- Add to cart → `cart_items` table
- Update quantity
- Remove item
- Cart drawer + cart page read from DB
- Guest cart: use localStorage, merge on login

### 4. Wishlist (Authenticated)

- Toggle wishlist on product cards and detail page
- Wishlist page (new route `/wishlist`)

### 5. Checkout & Orders

- Address selection/creation
- Order creation: move cart items → order items, clear cart
- Order confirmation page
- Order history page (`/account/orders`)
- Order detail page

### 6. User Account

- Profile page (`/account`) — edit name, phone, avatar
- Addresses page (`/account/addresses`) — CRUD
- Orders page (`/account/orders`) — list + detail

### 7. Reviews

- Submit review (rating + comment) on product detail page
- Display reviews with user name, date, rating
- Update product `ratings_avg` / `ratings_count` via trigger or app logic

### 8. Admin Dashboard (Real Data)

- **Products CRUD** — list, create, edit, delete products (with image upload to Supabase Storage)
- **Orders management** — view all orders, update status (pending → confirmed → shipped → delivered)
- **Categories CRUD**
- **Users list** — view customers
- **Dashboard stats** — total orders, revenue, products count, users count (real queries)
- **Charts** — revenue over time, order status breakdown (recharts, already installed)

---

## Implementation Approach

### Phase 1: Foundation

1. Set up Supabase client helpers (`lib/supabase/client.ts`, `lib/supabase/server.ts`)
2. Create all tables + RLS policies in Supabase (SQL migration or dashboard)
3. Seed products + categories from current mock data
4. Auth setup — signup/login pages, middleware for protected routes

### Phase 2: Storefront

5. Refactor product listing to fetch from Supabase
6. Product detail page → real data
7. Search with full-text search
8. Category filtering

### Phase 3: Cart & Wishlist

9. Cart CRUD with Supabase (with localStorage fallback for guests)
10. Wishlist feature
11. Wire CartDrawer and CartPage to real data

### Phase 4: Checkout & Orders

12. Address management
13. Checkout flow (cart → order)
14. Order history + detail pages

### Phase 5: Admin

15. Admin auth guard (role check)
16. Admin products CRUD with image upload
17. Admin orders management
18. Real dashboard stats + charts

### Phase 6: Polish

19. Reviews system
20. Loading states, error handling, optimistic UI
21. SEO (metadata per page)

---

## Key Decisions

| Decision | Recommendation |
|---|---|
| **ORM?** | No ORM — use Supabase JS client directly. Simple, typed, no extra dependency |
| **Image storage** | Supabase Storage buckets for product images |
| **Guest cart** | localStorage, merge into DB on login |
| **Payments** | Not in scope yet — "Proceed to Checkout" creates order directly |
| **Admin auth** | `role` column in `users` table, check in middleware |
