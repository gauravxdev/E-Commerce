import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star } from "lucide-react"

import { reviewsData } from "@/app/admin/ecommerce-data"

export default function ReviewsPage() {
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
              
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reviews</h1>
                  <p className="text-muted-foreground mt-1">Moderate customer reviews and feedback.</p>
                </div>
              </div>

              <div className="rounded-md border bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-gray-50/50 dark:bg-zinc-900/50">
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="w-1/3">Comment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviewsData.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.customer}</TableCell>
                        <TableCell className="text-muted-foreground">{review.product}</TableCell>
                        <TableCell>
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="truncate max-w-[200px]" title={review.comment}>
                          {review.comment}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={review.status === "Approved" ? "default" : "secondary"}
                          >
                            {review.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
