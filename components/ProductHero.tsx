import React from 'react';
import Image from 'next/image';
import { Star, Truck, ShieldCheck, Heart } from 'lucide-react';

export default function ProductHero({ product }: { product: any }) {
  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
      {/* Left: Image Gallery */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="relative">
          <div className={`relative w-full aspect-square rounded-[3rem] ${product.bgColor || 'bg-gray-100'} p-8 flex items-center justify-center overflow-hidden shadow-sm`}>
            <Image
              src={product.imageSrc}
              alt={product.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Badges overlay */}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 items-start pointer-events-none">
              {product.badges.map((badge: string, idx: number) => {
                let bgClass = "bg-gray-900 text-white";
                const lowerBadge = badge.toLowerCase();
                if (lowerBadge.includes("deal")) bgClass = "bg-brand-accent text-brand-dark";
                else if (lowerBadge.includes("best")) bgClass = "bg-blue-500 text-white";
                else if (lowerBadge.includes("off")) bgClass = "bg-red-500 text-white";
                else if (lowerBadge.includes("new")) bgClass = "bg-purple-500 text-white";

                return (
                  <span key={idx} className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm ${bgClass}`}>
                    {badge}
                  </span>
                );
              })}
            </div>
          )}
          <button className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm z-10 hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Thumbnails (Mocked using same image) */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${product.bgColor || 'bg-gray-100'} flex-shrink-0 cursor-pointer border-2 ${i === 1 ? 'border-brand-dark' : 'border-transparent hover:border-gray-300'}`}>
               <Image src={product.imageSrc} alt={`${product.title} view ${i}`} fill className="object-contain p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">{product.title}</h1>
        
        {/* Ratings */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-5 h-5 ${star <= Math.round(product.ratings?.average || 5) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-900">{product.ratings?.average || 5.0} Rating</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500 underline cursor-pointer">{product.reviews} Reviews</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-3 mb-8">
          <span className="text-4xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice?.toFixed(2)}</span>
          )}
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">
          {product.description || "Experience top-tier quality and design. This product has been crafted to meet your daily needs with precision and style."}
        </p>

        {/* Colors / Variants */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
          <div className="flex gap-3">
            {['bg-gray-900', 'bg-gray-200', 'bg-blue-200', 'bg-red-200'].map((color, idx) => (
              <button key={idx} className={`w-10 h-10 rounded-full ${color} border-2 ${idx === 0 ? 'border-brand-dark ring-2 ring-gray-300 ring-offset-2' : 'border-transparent'} shadow-sm`} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-bold text-lg py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm">
            Buy Now
          </button>
          <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold text-lg py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm">
            Add to Cart
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">Free Delivery</span>
              <span className="text-xs text-gray-500">Orders over $50</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">1 Year Warranty</span>
              <span className="text-xs text-gray-500">Secure checkout</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
