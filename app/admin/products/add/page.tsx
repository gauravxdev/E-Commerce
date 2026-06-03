import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ImagePlus, Plus, Save, Trash2 } from "lucide-react"

export default function AddProductPage() {
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
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Add New Product</h1>
                  <p className="text-muted-foreground mt-1">Create a new gadget for your e-commerce platform.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="gap-2">
                    <Save className="w-4 h-4" /> Save Product
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                {/* Main Content Column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Product title, description, and pricing.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="title">Product Title</Label>
                        <Input id="title" placeholder="e.g. Quantum Noise-Cancelling Headphones" className="text-lg" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Detailed Description</Label>
                        <textarea 
                          id="description" 
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                          placeholder="Engineered with the finest materials..."
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="price">Selling Price ($)</Label>
                          <Input id="price" type="number" placeholder="199.99" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="original-price">Original Price ($)</Label>
                          <Input id="original-price" type="number" placeholder="249.99" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Features</CardTitle>
                      <CardDescription>Highlight the best parts of this gadget.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      {/* Example Feature Row */}
                      <div className="flex gap-4 items-start">
                        <div className="grid gap-3 flex-1">
                          <Label>Feature Title</Label>
                          <Input placeholder="e.g. Active Noise Cancellation" />
                        </div>
                        <div className="grid gap-3 flex-[2]">
                          <Label>Description</Label>
                          <Input placeholder="Blocks out 99% of background noise." />
                        </div>
                        <Button variant="ghost" size="icon" className="mt-7 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button variant="outline" className="w-fit gap-2 mt-2">
                        <Plus className="w-4 h-4" /> Add Feature
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Column */}
                <div className="flex flex-col gap-6">
                  {/* Media */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Media</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                          <ImagePlus className="w-6 h-6" />
                        </div>
                        <p className="font-semibold text-sm">Click to upload image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                      </div>
                      <div className="grid gap-3 mt-4">
                        <Label htmlFor="bg-color">Hero Background Color (CSS Class)</Label>
                        <Input id="bg-color" placeholder="e.g. bg-gray-50" defaultValue="bg-gray-50" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Organization */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Organization</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue="audio">
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="wearables">Wearables</SelectItem>
                            <SelectItem value="tablets">Tablets</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="badges">Badges (comma separated)</Label>
                        <Input id="badges" placeholder="e.g. Best Deal, New" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="stock">Inventory Stock</Label>
                        <Input id="stock" type="number" placeholder="100" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
