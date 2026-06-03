"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, CreditCard, Phone, Package } from "lucide-react"
import type { Order } from "@/app/admin/ecommerce-data"

interface OrderDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function OrderDrawer({ open, onOpenChange, order }: OrderDrawerProps) {
  if (!order) return null

  const subtotal = order.itemsList.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 9.99
  const tax = subtotal * 0.08

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between pr-8">
            <span>Order Details</span>
            <Badge
              variant={
                order.status === "Delivered" ? "default" :
                order.status === "Shipped" ? "secondary" :
                order.status === "Processing" ? "outline" : "destructive"
              }
            >
              {order.status}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 px-4 pb-4 space-y-6">
          {/* Order Info */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Order Information</h4>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-medium">Order ID:</span> {order.id}</p>
              <p className="text-sm"><span className="font-medium">Date:</span> {order.date}</p>
              <p className="text-sm"><span className="font-medium">Customer:</span> {order.customer}</p>
              <p className="text-sm"><span className="font-medium">Email:</span> {order.email}</p>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Items ({order.items})</h4>
            <div className="space-y-3">
              {order.itemsList.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Pricing</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h4>
            <p className="text-sm">{order.shippingAddress}</p>
          </div>

          <Separator />

          {/* Payment */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h4>
            <p className="text-sm">{order.paymentMethod}</p>
          </div>

          <Separator />

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </h4>
            <p className="text-sm">{order.phone}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
