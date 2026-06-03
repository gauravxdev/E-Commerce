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

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategories(): Category[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCategories(categories: Category[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export function addCategory(
  category: Omit<Category, "id" | "createdAt" | "updatedAt">
): Category {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
}

export function updateCategory(
  id: string,
  updates: Partial<Omit<Category, "id" | "createdAt">>
): Category | null {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = {
    ...categories[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveCategories(categories);
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return false;
  saveCategories(filtered);
  return true;
}

export function deleteCategories(ids: string[]): number {
  const categories = getCategories();
  const filtered = categories.filter((c) => !ids.includes(c.id));
  const deletedCount = categories.length - filtered.length;
  saveCategories(filtered);
  return deletedCount;
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  categories.push(duplicate);
  saveCategories(categories);
  return duplicate;
}

export function reorderCategories(orderedIds: string[]): void {
  const categories = getCategories();
  const reordered: Category[] = [];
  orderedIds.forEach((id, index) => {
    const cat = categories.find((c) => c.id === id);
    if (cat) {
      reordered.push({ ...cat, sortOrder: index });
    }
  });
  saveCategories(reordered);
}

export function reparentCategory(
  categoryId: string,
  newParentId: string | null
): Category | null {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === categoryId);
  if (index === -1) return null;
  categories[index] = {
    ...categories[index],
    parentId: newParentId,
    updatedAt: new Date().toISOString(),
  };
  saveCategories(categories);
  return categories[index];
}

export function toggleCategoriesActive(
  ids: string[],
  isActive: boolean
): number {
  const categories = getCategories();
  let updatedCount = 0;
  categories.forEach((cat) => {
    if (ids.includes(cat.id) && cat.isActive !== isActive) {
      cat.isActive = isActive;
      cat.updatedAt = new Date().toISOString();
      updatedCount++;
    }
  });
  saveCategories(categories);
  return updatedCount;
}

export function getParentCategories(): Category[] {
  return getCategories().filter((c) => c.parentId === null);
}

export function getChildCategories(parentId: string): Category[] {
  return getCategories().filter((c) => c.parentId === parentId);
}

export function getCategoryTree(): Category[] {
  const categories = getCategories();
  const childMap = new Map<string | null, Category[]>();

  categories.forEach((cat) => {
    const parentId = cat.parentId;
    if (!childMap.has(parentId)) {
      childMap.set(parentId, []);
    }
    childMap.get(parentId)!.push(cat);
  });

  function buildTree(parentId: string | null): Category[] {
    const children = childMap.get(parentId) || [];
    children.sort((a, b) => a.sortOrder - b.sortOrder);
    const result: Category[] = [];
    for (const child of children) {
      result.push(child);
      const subChildren = buildTree(child.id);
      result.push(...subChildren);
    }
    return result;
  }

  return buildTree(null);
}

export function isDescendant(
  categoryId: string,
  potentialAncestorId: string
): boolean {
  const categories = getCategories();
  let currentId: string | null = categoryId;
  while (currentId) {
    const cat = categories.find((c) => c.id === currentId);
    if (!cat) break;
    if (cat.parentId === potentialAncestorId) return true;
    currentId = cat.parentId;
  }
  return false;
}

export const defaultCategories: Category[] = [
  {
    id: "cat-audio",
    name: "Audio",
    slug: "audio",
    description: "Headphones, speakers, and audio accessories",
    parentId: null,
    sortOrder: 0,
    icon: "headphones",
    image: "/images/categories/audio.png",
    seoTitle: "Audio Products",
    seoDescription: "Shop our range of audio products",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-headphones",
    name: "Headphones",
    slug: "headphones",
    description: "Over-ear, on-ear, and in-ear headphones",
    parentId: "cat-audio",
    sortOrder: 0,
    icon: "headphones",
    image: "/images/categories/headphones.png",
    seoTitle: "Headphones",
    seoDescription: "Browse our collection of headphones",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-speakers",
    name: "Speakers",
    slug: "speakers",
    description: "Portable and home speakers",
    parentId: "cat-audio",
    sortOrder: 1,
    icon: "speaker",
    image: "/images/categories/speakers.png",
    seoTitle: "Speakers",
    seoDescription: "Discover our speaker range",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-wearables",
    name: "Wearables",
    slug: "wearables",
    description: "Smartwatches and fitness trackers",
    parentId: null,
    sortOrder: 1,
    icon: "watch",
    image: "/images/categories/wearables.png",
    seoTitle: "Wearable Devices",
    seoDescription: "Explore our wearable technology",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-smartphones",
    name: "Smartphones",
    slug: "smartphones",
    description: "Mobile phones and accessories",
    parentId: null,
    sortOrder: 2,
    icon: "smartphone",
    image: "/images/categories/smartphones.png",
    seoTitle: "Smartphones",
    seoDescription: "Find the perfect smartphone",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-tablets",
    name: "Tablets",
    slug: "tablets",
    description: "Tablets and e-readers",
    parentId: null,
    sortOrder: 3,
    icon: "tablet",
    image: "/images/categories/tablets.png",
    seoTitle: "Tablets",
    seoDescription: "Browse our tablet collection",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Cases, chargers, and other accessories",
    parentId: null,
    sortOrder: 4,
    icon: "puzzle",
    image: "/images/categories/accessories.png",
    seoTitle: "Accessories",
    seoDescription: "Complete your setup with accessories",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

export function initializeCategoriesIfEmpty(): void {
  if (typeof window === "undefined") return;
  const existing = getCategories();
  if (existing.length === 0) {
    saveCategories(defaultCategories);
  }
}