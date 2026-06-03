# Category Management - Admin Page Design

## Overview

Add a category management section to the admin dashboard at `/admin/categories`. Provides full CRUD with hierarchy support, drag-and-drop reordering, and bulk actions. Uses localStorage for persistence, matching the existing admin pattern.

## Data Model

```ts
interface Category {
  id: string;              // uuid
  name: string;            // "Headphones"
  slug: string;            // "headphones" (auto-generated from name)
  description: string;     // short description
  parentId: string | null; // null = top-level, id = nested under parent
  sortOrder: number;       // drag-and-drop ordering
  icon: string;            // lucide icon name (e.g. "Headphones")
  image: string;           // image URL or placeholder
  seoTitle: string;        // SEO meta title
  seoDescription: string;  // SEO meta description
  isActive: boolean;       // show/hide toggle
  createdAt: string;       // ISO date
  updatedAt: string;       // ISO date
}
```

- Stored in `localStorage` under key `snopex-categories`
- Seed data initializes with existing categories (Audio, Wearables, Smartphones, Speakers, Accessories)
- Maximum hierarchy depth: 2 levels (parent → child only)

## Route & Navigation

- **Route:** `/admin/categories`
- **Sidebar:** New "Categories" nav item between "Products" and "Users" with `FolderTree` icon
- **Breadcrumb:** Admin > Categories

## Page Layout

Follows existing admin pattern:

```
SidebarInset
  SiteHeader (title: "Categories", breadcrumb: Admin > Categories)
  Content area:
    Toolbar row:
      - Search input (filter by name)
      - Filter dropdown (Active / All)
      - Bulk actions dropdown (appears when rows checked)
      - "Add Category" button (opens drawer)
    Category table (tree structure)
    Empty state if no categories
```

## Category Table

### Columns

| Column | Description |
|--------|-------------|
| Checkbox | Row selection for bulk actions |
| Drag handle | `GripVertical` icon for drag-and-drop reorder |
| Name | Category name with icon, indented by hierarchy level. Expand arrow if has children |
| Slug | Monospace text |
| Products | Count placeholder ("—") |
| Status | Badge: Active (green) / Inactive (gray) |
| Sort | Numeric sortOrder value |
| Actions | Dropdown: Edit, Duplicate, Delete |

### Hierarchy Display

- Top-level categories as rows
- Expand arrow on rows with children
- Children indented +50px per level
- Max 2 levels deep (parent → child)
- Collapsed/expanded state in component state

### Row Interactions

- Click row → expand/collapse children
- Click edit → open drawer pre-filled
- Checkbox for bulk selection

## Drag-and-Drop

Uses `@dnd-kit` (already installed):

- Drag handle on each row
- Visual feedback: semi-transparent row, highlighted drop zone
- Reorder within same level (updates `sortOrder`)
- Reparent by dragging onto another category (updates `parentId`)
- Cannot drag a parent into its own child (cycle prevention)
- Toast notification on successful move

## Bulk Actions

When rows are checked, toolbar shows dropdown with:

- Activate (set isActive = true)
- Deactivate (set isActive = false)
- Delete (with confirmation dialog)
- Select-all checkbox in table header

## Add/Edit Drawer

Slide-over drawer from right (matches existing detail drawer pattern).

### Form Sections

**Basic Information:**
- Name (required, text input)
- Slug (auto-generated from name, editable override)
- Description (textarea)

**Hierarchy:**
- Parent (select dropdown of top-level categories, or "None" for top-level)

**Appearance:**
- Icon (grid picker of common lucide icons)
- Image (upload placeholder with preview)

**SEO:**
- SEO Title (text input with character count)
- SEO Description (textarea with character count)

**Settings:**
- Active toggle (isActive)

### Validation

- `react-hook-form` + `zod` (both installed)
- Name: required, min 2 chars
- Slug: required, unique, slug format
- SEO Title: max 60 chars
- SEO Description: max 160 chars

### Save Behavior

1. Validate form
2. Update localStorage
3. Show success toast
4. Close drawer
5. Refresh table

## Files to Create/Modify

### New Files
- `app/admin/categories/page.tsx` — main page component
- `app/admin/categories/category-table.tsx` — tree table component
- `app/admin/categories/category-drawer.tsx` — add/edit drawer
- `app/admin/categories/category-form.tsx` — form schema and validation
- `app/admin/categories/category-data.ts` — mock data and localStorage utils
- `app/admin/categories/columns.tsx` — table column definitions

### Modified Files
- `components/app-sidebar.tsx` — add Categories nav item

## Seed Data

Initial categories (matching existing hardcoded values):

```ts
[
  { name: "Audio", slug: "audio", icon: "Headphones", children: [
    { name: "Headphones", slug: "headphones", icon: "Headphones" },
    { name: "Earbuds", slug: "earbuds", icon: "Ear" },
    { name: "Speakers", slug: "speakers", icon: "Speaker" },
  ]},
  { name: "Wearables", slug: "wearables", icon: "Watch", children: [
    { name: "Smartwatches", slug: "smartwatches", icon: "Watch" },
    { name: "Fitness Bands", slug: "fitness-bands", icon: "Activity" },
  ]},
  { name: "Smartphones", slug: "smartphones", icon: "Smartphone" },
  { name: "Tablets", slug: "tablets", icon: "Tablet" },
  { name: "Accessories", slug: "accessories", icon: "Package" },
]
```

## Dependencies (Already Installed)

- `@dnd-kit` — drag-and-drop
- `react-hook-form` — form management
- `zod` — validation
- `sonner` — toast notifications
- `lucide-react` — icons
- shadcn/ui components: table, button, input, select, badge, dropdown-menu, drawer, checkbox, label, separator, skeleton

## Non-Goals

- No Supabase/database integration (localStorage only)
- No product-category linking (standalone categories)
- No image upload backend (placeholder only)
- No category translation/i18n
- No deep nesting beyond 2 levels
