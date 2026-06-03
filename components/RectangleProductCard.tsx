import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ArrowRight } from 'lucide-react';

interface RectangleProductCardProps {
  id?: number;
  imageSrc: string;
  title: string;
  reviews: number;
  originalPrice: number;
  price: number;
  bgColor?: string;
  badges?: string[];
}

export default function RectangleProductCard({
  id = 1,
  imageSrc,
  title,
  reviews,
  originalPrice,
  price,
  bgColor = "bg-gray-50",
  badges = []
}: RectangleProductCardProps) {
  return (
    <Link href={`/store/${id}`} className="flex flex-col sm:flex-row group cursor-pointer bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className={`relative w-full sm:w-64 h-64 sm:h-auto flex-shrink-0 ${bgColor} flex items-center justify-center p-6 transition-transform group-hover:bg-opacity-80`}>
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

        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="200px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Product Details Container */}
      <div className="flex flex-col flex-grow p-6 sm:p-8 justify-center">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-dark transition-colors">{title}</h3>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">({reviews} total reviews)</span>
            </div>
            
            <p className="text-gray-600 mb-6 line-clamp-2 max-w-lg text-sm sm:text-base">
              Experience unparalleled sound quality and comfort with the new {title}. Features advanced noise cancellation, long-lasting battery life, and ergonomic design perfect for everyday use or intense workout sessions.
            </p>
          </div>
          
          <div className="hidden sm:flex flex-col items-end text-right ml-4">
            <span className="text-sm text-gray-400 line-through mb-1">${originalPrice.toFixed(2)}</span>
            <span className="text-2xl font-black text-gray-900">${price.toFixed(2)}</span>
          </div>
        </div>

        {/* Mobile Price */}
        <div className="flex sm:hidden items-center space-x-3 mb-6">
          <span className="text-2xl font-black text-gray-900">${price.toFixed(2)}</span>
          <span className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> In Stock</span>
            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Fast Delivery</span>
          </div>
          
          <button className="flex items-center space-x-3 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
            <span>View details</span>
            <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center group-hover:bg-brand-accent-hover transition-colors shadow-sm">
              <ArrowRight className="w-4 h-4 text-brand-dark" />
            </div>
          </button>
        </div>
      </div>
    </Link>
  );
}
