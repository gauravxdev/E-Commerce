# Category Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a category management section to the admin dashboard with hierarchy, drag-and-drop reordering, and bulk actions using localStorage persistence.

**Architecture:** New `/admin/categories` page following existing admin patterns. Tree table with expandable rows for hierarchy, `@dnd-kit` for drag-and-drop, slide-over drawer for add/edit forms. All state in localStorage via a custom hook.

**Tech Stack:** Next.js 16, React 19, TypeScript, shadcn/ui, @dnd-kit, react-hook-form, zod, sonner, lucide-react

---

## File Structure

| File | Responsibility |
|------|---------------|
| `app/admin/categories/page.tsx` | Main page component, layout wrapper |
| `app/admin/categories/category-data.ts` | Mock data, localStorage CRUD utilities, types |
| `app/admin/categories/category-table.tsx` | Tree table with expand/drag |
| `app/admin/categories/category-columns.tsx` | TanStack table column definitions |
| `app/admin/categories/category-drawer.tsx` | Add/edit slide-over drawer |
| `app/admin/categories/category-form.tsx` | Form schema (zod) and form component |
| `app/admin/categories/category-provider.tsx` | React context for category state |
| `components/app-sidebar.tsx` | Add Categories nav item (modify) |

---

### Task 1: Types and Data Layer

**Files:**
- Create: `app/admin/categories/category-data.ts`

- [ ] **Step 1: Create types and localStorage utilities**

```typescript
// app/admin/categories/category-data.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  icon: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "snopex-categories";

const defaultCategories: Category[] = [
  {
    id: "cat-1",
    name: "Audio",
    slug: "audio",
    description: "Headphones, earbuds, and speakers",
    parentId: null,
    sortOrder: 0,
    icon: "Headphones",
    image: "",
    seoTitle: "Audio Products",
    seoDescription: "Browse our collection of audio products",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-2",
    name: "Headphones",
    slug: "headphones",
    description: "Over-ear and on-ear headphones",
    parentId: "cat-1",
    sortOrder: 0,
    icon: "Headphones",
    image: "",
    seoTitle: "Headphones",
    seoDescription: "Browse our headphone collection",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-3",
    name: "Earbuds",
    slug: "earbuds",
    description: "Wireless and wired earbuds",
    parentId: "cat-1",
    sortOrder: 1,
    icon: "Ear",
    image: "",
    seoTitle: "Earbuds",
    seoDescription: "Browse our earbuds collection",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-4",
    name: "Wearables",
    slug: "wearables",
    description: "Smartwatches and fitness bands",
    parentId: null,
    sortOrder: 1,
    icon: "Watch",
    image: "",
    seoTitle: "Wearable Devices",
    seoDescription: "Browse our wearable devices",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-5",
    name: "Smartphones",
    slug: "smartphones",
    description: "Latest smartphones",
    parentId: null,
    sortOrder: 2,
    icon: "Smartphone",
    image: "",
    seoTitle: "Smartphones",
    seoDescription: "Browse our smartphone collection",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-6",
    name: "Tablets",
    slug: "tablets",
    description: "Tablets and e-readers",
    parentId: null,
    sortOrder: 3,
    icon: "Tablet",
    image: "",
    seoTitle: "Tablets",
    seoDescription: "Browse our tablet collection",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "cat-7",
    name: "Accessories",
    slug: "accessories",
    description: "Cases, chargers, and more",
    parentId: null,
    sortOrder: 4,
    icon: "Package",
    image: "",
    seoTitle: "Accessories",
    seoDescription: "Browse our accessories collection",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

export function generateId(): string {
  return `cat-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategories(): Category[] {
  if (typeof window === "undefined") return defaultCategories;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }
  return JSON.parse(stored);
}

export function saveCategories(categories: Category[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export function addCategory(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Category {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveCategories([...categories, newCategory]);
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  const updated: Category = {
    ...categories[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  categories[index] = updated;
  saveCategories(categories);
  return updated;
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id && c.parentId !== id);
  if (filtered.length === categories.length) return false;
  saveCategories(filtered);
  return true;
}

export function deleteCategories(ids: string[]): number {
  const categories = getCategories();
  const filtered = categories.filter((c) => !ids.includes(c.id) && !ids.includes(c.parentId ?? ""));
  const deleted = categories.length - filtered.length;
  saveCategories(filtered);
  return deleted;
}

export function toggleCategoryActive(id: string, isActive: boolean): Category | null {
  return updateCategory(id, { isActive });
}

export function toggleCategoriesActive(ids: string[], isActive: boolean): number {
  const categories = getCategories();
  let count = 0;
  const updated = categories.map((c) => {
    if (ids.includes(c.id)) {
      count++;
      return { ...c, isActive, updatedAt: new Date().toISOString() };
    }
    return c;
  });
  saveCategories(updated);
  return count;
}

export function duplicateCategory(id: string): Category | null {
  const categories = getCategories();
  const original = categories.find((c) => c.id === id);
  if (!original) return null;
  const duplicate: Category = {
    ...original,
    id: generateId(),
    name: `${original.name} (Copy)`,
    slug: `${original.slug}-copy`,
    sortOrder: categories.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveCategories([...categories, duplicate]);
  return duplicate;
}

export function reorderCategories(orderedIds: string[]): void {
  const categories = getCategories();
  const updated = categories.map((c) => {
    const newIndex = orderedIds.indexOf(c.id);
    return newIndex !== -1 ? { ...c, sortOrder: newIndex, updatedAt: new Date().toISOString() } : c;
  });
  saveCategories(updated);
}

export function reparentCategory(id: string, newParentId: string | null): Category | null {
  return updateCategory(id, { parentId: newParentId });
}

export function getParentCategories(): Category[] {
  return getCategories().filter((c) => c.parentId === null);
}

export function getChildCategories(parentId: string): Category[] {
  return getCategories()
    .filter((c) => c.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategoryTree(): Category[] {
  const categories = getCategories();
  const parents = categories
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return parents;
}

export function isDescendant(categoryId: string, potentialAncestorId: string): boolean {
  const categories = getCategories();
  let current = categories.find((c) => c.id === categoryId);
  while (current?.parentId) {
    if (current.parentId === potentialAncestorId) return true;
    current = categories.find((c) => c.id === current!.parentId);
  }
  return false;
}
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit app/admin/categories/category-data.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/categories/category-data.ts
git commit -m "feat(admin): add category data layer with localStorage CRUD"
```

---

### Task 2: Form Schema and Validation

**Files:**
- Create: `app/admin/categories/category-form.tsx`

- [ ] **Step 1: Create zod schema and form component**

```tsx
// app/admin/categories/category-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { Category } from "./category-data";
import { generateSlug } from "./category-data";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  seoTitle: z.string().max(60, "SEO title must be 60 characters or less").optional(),
  seoDescription: z.string().max(160, "SEO description must be 160 characters or less").optional(),
  isActive: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  category?: Category;
  parentCategories: Category[];
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
}

const iconOptions = [
  "Headphones", "Ear", "Speaker", "Watch", "Activity",
  "Smartphone", "Tablet", "Package", "Laptop", "Monitor",
  "Camera", "Gamepad2", "Music", "Tv", "Printer",
];

export function CategoryForm({ category, parentCategories, onSubmit, onCancel }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      parentId: category?.parentId ?? null,
      icon: category?.icon ?? "Package",
      image: category?.image ?? "",
      seoTitle: category?.seoTitle ?? "",
      seoDescription: category?.seoDescription ?? "",
      isActive: category?.isActive ?? true,
    },
  });

  const nameValue = watch("name");
  const slugValue = watch("slug");
  const iconValue = watch("icon");
  const isActiveValue = watch("isActive");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue("name", name);
    if (!category) {
      setValue("slug", generateSlug(name));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Basic Information</h4>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} onChange={handleNameChange} placeholder="Category name" />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" {...register("slug")} placeholder="category-slug" />
          {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} placeholder="Short description" rows={3} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Hierarchy</h4>
        <div className="space-y-2">
          <Label>Parent Category</Label>
          <Select
            value={watch("parentId") ?? "none"}
            onValueChange={(v) => setValue("parentId", v === "none" ? null : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="None (top-level)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (top-level)</SelectItem>
              {parentCategories
                .filter((c) => c.id !== category?.id)
                .map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Appearance</h4>
        <div className="space-y-2">
          <Label>Icon</Label>
          <div className="grid grid-cols-5 gap-2">
            {iconOptions.map((icon) => (
              <Button
                key={icon}
                type="button"
                variant={iconValue === icon ? "default" : "outline"}
                size="sm"
                onClick={() => setValue("icon", icon)}
                className="h-10"
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" {...register("image")} placeholder="https://..." />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">SEO</h4>
        <div className="space-y-2">
          <Label htmlFor="seoTitle">SEO Title</Label>
          <Input id="seoTitle" {...register("seoTitle")} placeholder="Page title" />
          {errors.seoTitle && <p className="text-sm text-destructive">{errors.seoTitle.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="seoDescription">SEO Description</Label>
          <Textarea id="seoDescription" {...register("seoDescription")} placeholder="Meta description" rows={2} />
          {errors.seoDescription && <p className="text-sm text-destructive">{errors.seoDescription.message}</p>}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Settings</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="isActive">Active</Label>
          <Switch id="isActive" checked={isActiveValue} onCheckedChange={(v) => setValue("isActive", v)} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{category ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit app/admin/categories/category-form.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/categories/category-form.tsx
git commit -m "feat(admin): add category form with zod validation"
```

---

### Task 3: Category Context Provider

**Files:**
- Create: `app/admin/categories/category-provider.tsx`

- [ ] **Step 1: Create context provider**

```tsx
// app/admin/categories/category-provider.tsx
"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type Category,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
  duplicateCategory,
  reorderCategories,
  reparentCategory,
  toggleCategoriesActive,
  getChildCategories,
} from "./category-data";

interface CategoryContextValue {
  categories: Category[];
  refresh: () => void;
  add: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) => Category;
  update: (id: string, data: Partial<Category>) => Category | null;
  remove: (id: string) => boolean;
  removeMultiple: (ids: string[]) => number;
  duplicate: (id: string) => Category | null;
  reorder: (orderedIds: string[]) => void;
  reparent: (id: string, newParentId: string | null) => Category | null;
  toggleActive: (ids: string[], isActive: boolean) => number;
  getChildren: (parentId: string) => Category[];
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => getCategories());

  const refresh = useCallback(() => {
    setCategories(getCategories());
  }, []);

  const add = useCallback((data: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
    const newCat = addCategory(data);
    refresh();
    return newCat;
  }, [refresh]);

  const update = useCallback((id: string, data: Partial<Category>) => {
    const updated = updateCategory(id, data);
    refresh();
    return updated;
  }, [refresh]);

  const remove = useCallback((id: string) => {
    const result = deleteCategory(id);
    refresh();
    return result;
  }, [refresh]);

  const removeMultiple = useCallback((ids: string[]) => {
    const count = deleteCategories(ids);
    refresh();
    return count;
  }, [refresh]);

  const duplicate = useCallback((id: string) => {
    const dup = duplicateCategory(id);
    refresh();
    return dup;
  }, [refresh]);

  const reorder = useCallback((orderedIds: string[]) => {
    reorderCategories(orderedIds);
    refresh();
  }, [refresh]);

  const reparent = useCallback((id: string, newParentId: string | null) => {
    const updated = reparentCategory(id, newParentId);
    refresh();
    return updated;
  }, [refresh]);

  const toggleActive = useCallback((ids: string[], isActive: boolean) => {
    const count = toggleCategoriesActive(ids, isActive);
    refresh();
    return count;
  }, [refresh]);

  const getChildren = useCallback((parentId: string) => {
    return getChildCategories(parentId);
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, refresh, add, update, remove, removeMultiple, duplicate, reorder, reparent, toggleActive, getChildren }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit app/admin/categories/category-provider.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/categories/category-provider.tsx
git commit -m "feat(admin): add category context provider"
```

---

### Task 4: Table Columns Definition

**Files:**
- Create: `app/admin/categories/category-columns.tsx`

- [ ] **Step 1: Create column definitions**

```tsx
// app/admin/categories/category-columns.tsx
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Copy, Trash2, GripVertical } from "lucide-react";
import type { Category } from "./category-data";

interface CategoryColumnsProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onDuplicate: (category: Category) => void;
}

export function getCategoryColumns({ onEdit, onDelete, onDuplicate }: CategoryColumnsProps): ColumnDef<Category>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-primary"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-primary"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "drag",
      header: () => null,
      cell: () => (
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const category = row.original;
        const indent = category.parentId ? "pl-8" : "";
        return (
          <div className={`flex items-center gap-2 ${indent}`}>
            <span className="font-medium">{category.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{row.getValue("slug")}</code>
      ),
    },
    {
      id: "products",
      header: "Products",
      cell: () => <span className="text-muted-foreground">—</span>,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "sortOrder",
      header: "Sort",
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(category)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(category)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(category)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit app/admin/categories/category-columns.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/categories/category-columns.tsx
git commit -m "feat(admin): add category table column definitions"
```

---

### Task 5: Category Drawer (Add/Edit)

**Files:**
- Create: `app/admin/categories/category-drawer.tsx`

- [ ] **Step 1: Create drawer component**

```tsx
// app/admin/categories/category-drawer.tsx
"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm, type CategoryFormData } from "./category-form";
import { useCategories } from "./category-provider";
import type { Category } from "./category-data";
import { toast } from "sonner";

interface CategoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
}

export function CategoryDrawer({ open, onOpenChange, category }: CategoryDrawerProps) {
  const { add, update, categories } = useCategories();
  const parentCategories = categories.filter((c) => c.parentId === null);

  const handleSubmit = (data: CategoryFormData) => {
    if (category) {
      update(category.id, data);
      toast.success("Category updated");
    } else {
      add({
        ...data,
        parentId: data.parentId ?? null,
        sortOrder: categories.length,
        icon: data.icon ?? "Package",
        image: data.image ?? "",
        seoTitle: data.seoTitle ?? "",
        seoDescription: data.seoDescription ?? "",
      });
      toast.success("Category created");
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{category ? "Edit Category" : "Add Category"}</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <CategoryForm
            category={category ?? undefined}
            parentCategories={parentCategories}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit app/admin/categories/category-drawer.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/categories/category-drawer.tsx
git commit -m "feat(admin): add category add/edit drawer"
```

---

### Task 6: Category Table Component

**Files:**
- Create: `app/admin/categories/category-table.tsx`

- [ ] **Step 1: Create tree table component**

```tsx
// app/admin/categories/category-table.tsx
"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCategoryColumns } from "./category-columns";
import { useCategories } from "./category-provider";
import type { Category } from "./category-data";

interface SortableRowProps {
  category: Category;
  children: React.ReactNode;
}

function SortableRow({ category, children }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
    data: { type: "category", category },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      {children}
    </TableRow>
  );
}

interface CategoryTableProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onDuplicate: (category: Category) => void;
  onBulkAction: (action: string, ids: string[]) => void;
}

export function CategoryTable({ onEdit, onDelete, onDuplicate, onBulkAction }: CategoryTableProps) {
  const { categories, reorder } = useCategories();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const columns = useMemo(
    () => getCategoryColumns({ onEdit, onDelete, onDuplicate }),
    [onEdit, onDelete, onDuplicate]
  );

  const tableData = useMemo(() => {
    const parents = categories
      .filter((c) => c.parentId === null)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const result: Category[] = [];
    for (const parent of parents) {
      result.push(parent);
      if (expandedIds.has(parent.id)) {
        const children = categories
          .filter((c) => c.parentId === parent.id)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        result.push(...children);
      }
    }
    return result;
  }, [categories, expandedIds]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeRow = table.getRow(String(active.id));
    const overRow = table.getRow(String(over.id));
    if (!activeRow || !overRow) return;

    const activeCategory = activeRow.original;
    const overCategory = overRow.original;

    if (activeCategory.parentId !== overCategory.parentId) return;

    const oldIndex = tableData.findIndex((c) => c.id === active.id);
    const newIndex = tableData.findIndex((c) => c.id === over.id);

    const newData = arrayMove(tableData, oldIndex, newIndex);
    const orderedIds = newData.map((c) => c.id);
    reorder(orderedIds);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedRowIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);

  return (
    <div>
      {selectedRowIds.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{selectedRowIds.length} selected</span>
          <button
            onClick={() => onBulkAction("activate", selectedRowIds)}
            className="text-sm underline"
          >
            Activate
          </button>
          <button
            onClick={() => onBulkAction("deactivate", selectedRowIds)}
            className="text-sm underline"
          >
            Deactivate
          </button>
          <button
            onClick={() => onBulkAction("delete", selectedRowIds)}
            className="text-sm text-destructive underline"
          >
            Delete
          </button>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext items={tableData.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={row.original.parentId ? "bg-muted/50" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.column.id === "name" ? (
                          <div className="flex items-center gap-2">
                            {tableData.some((c) => c.parentId === row.original.id) && (
                              <button
                                onClick={() => toggleExpand(row.original.id)}
                                className="text-xs"
                              >
                                {expandedIds.has(row.original.id) ? "▼" : "▶"}
                              </button>
                            )}
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        ) : cell.column.id === "drag" ? (
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </SortableContext>
              {table.getRowModel().rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DndContext>
    </div>
  );
}

function GripVertical(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="5" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="15" cy="19" r="1" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit app/admin/categories/category-table.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/categories/category-table.tsx
git commit -m "feat(admin): add category tree table with drag-and-drop"
```

---

### Task 7: Main Categories Page

**Files:**
- Create: `app/admin/categories/page.tsx`

- [ ] **Step 1: Create main page**

```tsx
// app/admin/categories/page.tsx
"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search } from "lucide-react";
import { CategoryProvider, useCategories } from "./category-provider";
import { CategoryTable } from "./category-table";
import { CategoryDrawer } from "./category-drawer";
import type { Category } from "./category-data";
import { toast } from "sonner";

function CategoriesContent() {
  const { categories, remove, removeMultiple, duplicate, toggleActive } = useCategories();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredCategories = categories.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "active" && c.isActive) || (filter === "inactive" && !c.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDrawerOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleDuplicate = (category: Category) => {
    duplicate(category.id);
    toast.success("Category duplicated");
  };

  const handleBulkAction = (action: string, ids: string[]) => {
    if (action === "activate") {
      toggleActive(ids, true);
      toast.success(`${ids.length} categories activated`);
    } else if (action === "deactivate") {
      toggleActive(ids, false);
      toast.success(`${ids.length} categories deactivated`);
    } else if (action === "delete") {
      removeMultiple(ids);
      toast.success(`${ids.length} categories deleted`);
    }
  };

  const confirmDelete = () => {
    if (deletingCategory) {
      remove(deletingCategory.id);
      toast.success("Category deleted");
      setDeleteDialogOpen(false);
      setDeletingCategory(null);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader title="Categories" breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Categories" }]} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => { setEditingCategory(null); setDrawerOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>

          <CategoryTable
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onBulkAction={handleBulkAction}
          />
        </div>
      </SidebarInset>

      <CategoryDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        category={editingCategory}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingCategory?.name}&quot;? This will also delete all subcategories.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}

export default function CategoriesPage() {
  return (
    <CategoryProvider>
      <CategoriesContent />
    </CategoryProvider>
  );
}
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit app/admin/categories/page.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/categories/page.tsx
git commit -m "feat(admin): add categories page with search and filter"
```

---

### Task 8: Add Sidebar Navigation

**Files:**
- Modify: `components/app-sidebar.tsx`

- [ ] **Step 1: Add Categories nav item**

Find the `navMain` array and add the Categories item after the "Add Product" item:

```typescript
{
  title: "Categories",
  url: "/admin/categories",
  icon: FolderTree,
},
```

Also add the `FolderTree` import from `lucide-react`.

- [ ] **Step 2: Verify sidebar renders**

Run: `npm run dev` and navigate to `/admin`
Expected: "Categories" appears in sidebar between Products and Users

- [ ] **Step 3: Commit**

```bash
git add components/app-sidebar.tsx
git commit -m "feat(admin): add Categories nav item to sidebar"
```

---

### Task 9: Verify Full Flow

- [ ] **Step 1: Start dev server and test**

Run: `npm run dev`
Navigate to: `http://localhost:3000/admin/categories`

Test checklist:
- [ ] Page loads with seed categories
- [ ] Expand/collapse parent categories
- [ ] Search filters by name
- [ ] Filter dropdown works (All/Active/Inactive)
- [ ] Add category opens drawer
- [ ] Form validates (name required, slug format)
- [ ] Create category saves to localStorage
- [ ] Edit category pre-fills form
- [ ] Delete category shows confirmation
- [ ] Duplicate category works
- [ ] Bulk select activates/deletes
- [ ] Sidebar navigation works

- [ ] **Step 2: Run linting**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 3: Run type checking**

Run: `npm run typecheck` (or `npx tsc --noEmit`)
Expected: No errors

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(admin): complete category management section"
```
