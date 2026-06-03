"use client"

import { useMemo } from "react"
import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { useCategories } from "./category-provider"
import { CategoryForm, type CategoryFormData } from "./category-form"
import type { Category } from "./category-data"

interface CategoryDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
}

export function CategoryDrawer({
  open,
  onOpenChange,
  category,
}: CategoryDrawerProps) {
  const { categories, add, update } = useCategories()

  const parentCategories = useMemo(
    () => categories.filter((c) => c.parentId === null),
    [categories]
  )

  function handleSubmit(data: CategoryFormData) {
    const payload = {
      name: data.name,
      slug: data.slug,
      description: data.description ?? "",
      parentId: data.parentId ?? null,
      sortOrder: category ? category.sortOrder : categories.length,
      icon: data.icon ?? "",
      image: data.image ?? "",
      seoTitle: data.seoTitle ?? "",
      seoDescription: data.seoDescription ?? "",
      isActive: data.isActive,
    }

    if (category) {
      update(category.id, payload)
      toast.success("Category updated")
    } else {
      add(payload)
      toast.success("Category created")
    }
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{category ? "Edit Category" : "Add Category"}</SheetTitle>
          <SheetDescription className="sr-only">
            {category ? "Make changes to your category here." : "Add a new category here."}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4 pb-4">
          <CategoryForm
            category={category ?? undefined}
            parentCategories={parentCategories}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
