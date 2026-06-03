"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"

import { ordersData, type Order } from "@/app/admin/ecommerce-data"
import { OrderDrawer } from "./order-drawer"

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setDrawerOpen(true)
  }

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
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Orders</h1>
                  <p className="text-muted-foreground mt-1">Review and manage recent customer orders.</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" /> Export CSV
                </Button>
              </div>

              <div className="rounded-md border bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-gray-50/50 dark:bg-zinc-900/50">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ordersData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-brand-dark">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="text-muted-foreground">{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              order.status === "Delivered" ? "default" :
                              order.status === "Shipped" ? "secondary" : 
                              order.status === "Processing" ? "outline" : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-brand-dark"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
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

      <OrderDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        order={selectedOrder}
      />
    </SidebarProvider>
  )
}
