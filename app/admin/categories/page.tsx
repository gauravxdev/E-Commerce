"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { Plus, Search } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { CategoryProvider, useCategories } from "./category-provider"
import { CategoryTable } from "./category-table"
import { CategoryDrawer } from "./category-drawer"
import type { Category } from "./category-data"

function CategoriesContent() {
  const {
    categories,
    remove,
    removeMultiple,
    duplicate,
    toggleActive,
  } = useCategories()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
  const [bulkDeleteIds, setBulkDeleteIds] = useState<string[]>([])

  const handleEdit = useCallback((category: Category) => {
    setEditingCategory(category)
    setDrawerOpen(true)
  }, [])

  const handleDelete = useCallback((category: Category) => {
    setDeleteTarget(category)
    setDeleteAlertOpen(true)
  }, [])

  const handleDuplicate = useCallback(
    (category: Category) => {
      const result = duplicate(category.id)
      if (result) {
        toast.success(`Duplicated "${category.name}"`)
      }
    },
    [duplicate]
  )

  const handleConfirmDelete = useCallback(() => {
    if (deleteTarget) {
      remove(deleteTarget.id)
      toast.success(`Deleted "${deleteTarget.name}"`)
      setDeleteTarget(null)
    }
    if (bulkDeleteIds.length > 0) {
      const count = removeMultiple(bulkDeleteIds)
      toast.success(`Deleted ${count} categories`)
      setBulkDeleteIds([])
    }
    setDeleteAlertOpen(false)
  }, [deleteTarget, bulkDeleteIds, remove, removeMultiple])

  const handleBulkAction = useCallback(
    (action: string, ids: string[]) => {
      if (action === "activate") {
        const count = toggleActive(ids, true)
        toast.success(`Activated ${count} categories`)
      } else if (action === "deactivate") {
        const count = toggleActive(ids, false)
        toast.success(`Deactivated ${count} categories`)
      } else if (action === "delete") {
        setBulkDeleteIds(ids)
        setDeleteAlertOpen(true)
      }
    },
    [toggleActive]
  )

  const handleAddCategory = useCallback(() => {
    setEditingCategory(null)
    setDrawerOpen(true)
  }, [])

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize your products into categories and subcategories.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as "all" | "active" | "inactive")}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button className="gap-2" onClick={handleAddCategory}>
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      <CategoryTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onBulkAction={handleBulkAction}
      />

      <CategoryDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        category={editingCategory}
      />

      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {bulkDeleteIds.length > 0
                ? `This will permanently delete ${bulkDeleteIds.length} selected categories and all their subcategories.`
                : `This will permanently delete "${deleteTarget?.name}" and all its subcategories.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default function CategoriesPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <CategoryProvider>
                <CategoriesContent />
              </CategoryProvider>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
