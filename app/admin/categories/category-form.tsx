"use client"

import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Headphones,
  Speaker,
  Watch,
  Smartphone,
  Tablet,
  Puzzle,
  Monitor,
  Camera,
  Gamepad2,
  Keyboard,
  Mouse,
  Printer,
  Wifi,
  Battery,
  Cable,
  HardDrive,
  Cpu,
  MemoryStick,
  ScanLine,
  Volume2,
  Music,
  Mic,
  Image,
  Shirt,
  Footprints,
  Home,
  Laptop,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { generateSlug, type Category } from "./category-data"

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens"
    ),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  seoTitle: z.string().max(60, "SEO title must be 60 characters or less").optional(),
  seoDescription: z
    .string()
    .max(160, "SEO description must be 160 characters or less")
    .optional(),
  isActive: z.boolean(),
})

export type CategoryFormData = z.infer<typeof categoryFormSchema>

export interface CategoryFormProps {
  category?: Category
  parentCategories: Category[]
  onSubmit: (data: CategoryFormData) => void
  onCancel: () => void
}

const ICON_OPTIONS: { name: string; icon: LucideIcon }[] = [
  { name: "headphones", icon: Headphones },
  { name: "speaker", icon: Speaker },
  { name: "watch", icon: Watch },
  { name: "smartphone", icon: Smartphone },
  { name: "tablet", icon: Tablet },
  { name: "puzzle", icon: Puzzle },
  { name: "monitor", icon: Monitor },
  { name: "camera", icon: Camera },
  { name: "gamepad-2", icon: Gamepad2 },
  { name: "keyboard", icon: Keyboard },
  { name: "mouse", icon: Mouse },
  { name: "printer", icon: Printer },
  { name: "wifi", icon: Wifi },
  { name: "battery", icon: Battery },
  { name: "cable", icon: Cable },
  { name: "hard-drive", icon: HardDrive },
  { name: "cpu", icon: Cpu },
  { name: "memory-stick", icon: MemoryStick },
  { name: "scan-line", icon: ScanLine },
  { name: "volume-2", icon: Volume2 },
  { name: "music", icon: Music },
  { name: "mic", icon: Mic },
  { name: "image", icon: Image },
  { name: "shirt", icon: Shirt },
  { name: "footprints", icon: Footprints },
  { name: "home", icon: Home },
  { name: "laptop", icon: Laptop },
]

export function CategoryForm({
  category,
  parentCategories,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const isEditing = !!category

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
      icon: category?.icon ?? "",
      image: category?.image ?? "",
      seoTitle: category?.seoTitle ?? "",
      seoDescription: category?.seoDescription ?? "",
      isActive: category?.isActive ?? true,
    },
  })

  const watchName = watch("name")
  const watchIcon = watch("icon")
  const watchSeoTitle = watch("seoTitle") ?? ""
  const watchSeoDescription = watch("seoDescription") ?? ""
  const watchIsActive = watch("isActive")

  useEffect(() => {
    if (!isEditing && watchName) {
      setValue("slug", generateSlug(watchName), { shouldValidate: true })
    }
  }, [watchName, isEditing, setValue])

  const filteredParentCategories = useMemo(() => {
    if (!category) return parentCategories;
    return parentCategories.filter(
      (c) => c.id !== category.id && c.parentId !== category.id
    );
  }, [category, parentCategories])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">
          Basic Information
        </h3>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Category name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="category-slug"
            {...register("slug")}
          />
          {errors.slug && (
            <p className="text-xs text-destructive">{errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Optional description"
            className="min-h-20"
            {...register("description")}
          />
        </div>
      </div>

      <Separator />

      {/* Hierarchy */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Hierarchy</h3>

        <div className="space-y-2">
          <Label>Parent Category</Label>
          <Select
            value={watch("parentId") ?? ""}
            onValueChange={(value) =>
              setValue("parentId", value === "" ? null : value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="None (top-level)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None (top-level)</SelectItem>
              {filteredParentCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Appearance */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Appearance</h3>

        <div className="space-y-2">
          <Label>Icon</Label>
          <div className="grid grid-cols-7 gap-2">
            {ICON_OPTIONS.map((opt) => {
              const Icon = opt.icon
              const isSelected = watchIcon === opt.name
              return (
                <button
                  key={opt.name}
                  type="button"
                  title={opt.name}
                  className={`flex size-9 items-center justify-center rounded-md border transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-transparent text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() =>
                    setValue("icon", isSelected ? "" : opt.name, {
                      shouldValidate: true,
                    })
                  }
                >
                  <Icon className="size-4" />
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            placeholder="https://example.com/image.png"
            {...register("image")}
          />
        </div>
      </div>

      <Separator />

      {/* SEO */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">SEO</h3>

        <div className="space-y-2">
          <Label htmlFor="seoTitle">SEO Title</Label>
          <Input
            id="seoTitle"
            placeholder="Page title for search engines"
            {...register("seoTitle")}
          />
          <p className="text-xs text-muted-foreground">
            {watchSeoTitle.length}/60 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seoDescription">SEO Description</Label>
          <Textarea
            id="seoDescription"
            placeholder="Meta description for search engines"
            className="min-h-20"
            {...register("seoDescription")}
          />
          <p className="text-xs text-muted-foreground">
            {watchSeoDescription.length}/160 characters
          </p>
        </div>
      </div>

      <Separator />

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Settings</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="isActive">Active</Label>
            <p className="text-xs text-muted-foreground">
              Inactive categories are hidden from the storefront
            </p>
          </div>
          <Switch
            id="isActive"
            checked={watchIsActive}
            onCheckedChange={(checked) =>
              setValue("isActive", checked, { shouldValidate: true })
            }
          />
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </div>
    </form>
  )
}
