import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id?: number;
  imageSrc: string;
  title: string;
  reviews: number;
  originalPrice: number;
  price: number;
  bgColor?: string;
  badges?: string[];
}

export default function ProductCard({
  id = 1,
  imageSrc,
  title,
  reviews,
  originalPrice,
  price,
  bgColor = "bg-gray-50",
  badges = []
}: ProductCardProps) {
  return (
    <Link href={`/store/${id}`} className="flex flex-col group cursor-pointer">
      {/* Image Container */}
      <div className={`relative w-full aspect-square rounded-3xl ${bgColor} mb-6 overflow-hidden flex items-center justify-center p-8 transition-transform group-hover:scale-[1.02]`}>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm z-10 hover:scale-110 transition-transform">
          <Heart className="w-5 h-5 text-gray-400" />
        </button>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 items-start">
            {badges.map((badge, idx) => {
              let bgClass = "bg-gray-900 text-white"; // Default
              const lowerBadge = badge.toLowerCase();
              if (lowerBadge.includes("deal")) bgClass = "bg-brand-accent text-brand-dark";
              else if (lowerBadge.includes("best")) bgClass = "bg-blue-500 text-white";
              else if (lowerBadge.includes("off")) bgClass = "bg-red-500 text-white";
              else if (lowerBadge.includes("new")) bgClass = "bg-purple-500 text-white";

              return (
                <span key={idx} className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${bgClass}`}>
                  {badge}
                </span>
              );
            })}
          </div>
        )}

        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Product Details */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      
      <div className="flex items-center space-x-2 mb-6">
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <span className="text-xs text-gray-400 font-medium">({reviews} total review)</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <button className="flex items-center space-x-3 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
          <span>Buy now</span>
          <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center group-hover:bg-brand-accent-hover transition-colors">
            <ArrowRight className="w-4 h-4 text-brand-dark" />
          </div>
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
