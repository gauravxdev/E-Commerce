import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { cartItems } from '@/lib/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-l-3xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 group">
              {/* Image */}
              <div className={`relative w-24 h-24 rounded-2xl flex-shrink-0 ${item.bgColor} p-2 overflow-hidden`}>
                <Image 
                  src={item.imageSrc} 
                  alt={item.title}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1 justify-between py-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight pr-4">{item.title}</h3>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-black text-gray-900">${item.price.toFixed(2)}</span>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
                    <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                    <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50/50 rounded-bl-3xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-xl font-black text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Taxes and shipping calculated at checkout.</p>
          
          <Link href="/cart" onClick={onClose} className="block text-center text-sm font-semibold text-brand-dark hover:text-brand-accent-hover mb-4 underline-offset-4 hover:underline transition-all">
            View full cart
          </Link>
          
          <button className="w-full flex items-center justify-between bg-brand-accent hover:bg-brand-accent-hover text-brand-dark px-6 py-4 rounded-full font-bold transition-colors group shadow-sm">
            <span>Proceed to Checkout</span>
            <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
