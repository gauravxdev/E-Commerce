import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { cartItems } from '@/lib/mockData';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function CartPage() {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08; // 8% mock tax
  const shipping = subtotal > 0 ? 15.00 : 0; // $15 flat rate
  const total = subtotal + taxes + shipping;

  return (
    <main className="min-h-screen bg-gray-50/50 relative">
      <Navbar />
      
      {/* Page Header spacing for Navbar */}
      <div className="pt-6 md:pt-8 pb-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Cart</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our store to find your next favorite gadget.</p>
              <Link href="/store" className="bg-brand-dark hover:bg-black text-white px-8 py-3 rounded-full font-bold transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-gray-50/50 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="flex flex-col divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:grid sm:grid-cols-12 gap-6 items-center group">
                    
                    {/* Product Image & Info */}
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex-shrink-0 ${item.bgColor} p-3 overflow-hidden`}>
                        <Image 
                          src={item.imageSrc} 
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Link href={`/store/${item.id}`} className="font-bold text-gray-900 text-lg hover:text-brand-accent-hover transition-colors line-clamp-2">
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Color: Default</p>
                        <button className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center mt-3 w-max">
                          <Trash2 className="w-4 h-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price (Mobile & Desktop) */}
                    <div className="col-span-2 text-center w-full sm:w-auto flex justify-between sm:block">
                      <span className="sm:hidden text-gray-500 font-medium">Price</span>
                      <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center w-full sm:w-auto">
                      <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-right w-full sm:w-auto flex justify-between sm:block border-t border-gray-100 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                      <span className="sm:hidden text-gray-500 font-medium">Total</span>
                      <span className="font-black text-gray-900 text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="flex flex-col space-y-4 mb-6 text-sm">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Estimated Taxes</span>
                <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-3xl font-black text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-between bg-brand-accent hover:bg-brand-accent-hover text-brand-dark px-6 py-4 rounded-full font-bold transition-colors group shadow-sm mb-4">
              <span>Proceed to Checkout</span>
              <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Encrypted Checkout</span>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
