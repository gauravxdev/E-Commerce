"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
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

export interface CategoryContextValue {
  categories: Category[];
  refresh: () => void;
  add: (
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => Category;
  update: (
    id: string,
    updates: Partial<Omit<Category, "id" | "createdAt">>
  ) => Category | null;
  remove: (id: string) => boolean;
  removeMultiple: (ids: string[]) => number;
  duplicate: (id: string) => Category | null;
  reorder: (orderedIds: string[]) => void;
  reparent: (
    categoryId: string,
    newParentId: string | null
  ) => Category | null;
  toggleActive: (ids: string[], isActive: boolean) => number;
  getChildren: (parentId: string) => Category[];
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(getCategories);

  const refresh = useCallback(() => {
    setCategories(getCategories());
  }, []);

  const add = useCallback(
    (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
      const result = addCategory(category);
      refresh();
      return result;
    },
    [refresh]
  );

  const update = useCallback(
    (
      id: string,
      updates: Partial<Omit<Category, "id" | "createdAt">>
    ) => {
      const result = updateCategory(id, updates);
      refresh();
      return result;
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      const result = deleteCategory(id);
      refresh();
      return result;
    },
    [refresh]
  );

  const removeMultiple = useCallback(
    (ids: string[]) => {
      const result = deleteCategories(ids);
      refresh();
      return result;
    },
    [refresh]
  );

  const duplicate = useCallback(
    (id: string) => {
      const result = duplicateCategory(id);
      refresh();
      return result;
    },
    [refresh]
  );

  const reorder = useCallback(
    (orderedIds: string[]) => {
      reorderCategories(orderedIds);
      refresh();
    },
    [refresh]
  );

  const reparent = useCallback(
    (categoryId: string, newParentId: string | null) => {
      const result = reparentCategory(categoryId, newParentId);
      refresh();
      return result;
    },
    [refresh]
  );

  const toggleActive = useCallback(
    (ids: string[], isActive: boolean) => {
      const result = toggleCategoriesActive(ids, isActive);
      refresh();
      return result;
    },
    [refresh]
  );

  const getChildren = useCallback((parentId: string) => {
    return getChildCategories(parentId);
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        refresh,
        add,
        update,
        remove,
        removeMultiple,
        duplicate,
        reorder,
        reparent,
        toggleActive,
        getChildren,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories(): CategoryContextValue {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
