import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function ProductAdBanner() {
  return (
    <div className="w-full mb-12 relative overflow-hidden rounded-[3rem] group cursor-pointer shadow-lg">
      <div className="relative w-full h-[300px] md:h-[400px]">
        {/* Ad Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&q=80"
          alt="Advertisement Banner"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 w-full md:w-2/3 lg:w-1/2 text-white">
          <span className="px-3 py-1 bg-brand-accent text-brand-dark text-xs font-bold uppercase tracking-wider rounded-md w-fit mb-4">Limited Time Offer</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Upgrade Your Setup Today</h2>
          <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
            Discover our new collection of premium accessories designed to elevate your workspace and maximize your productivity.
          </p>
          
          <button className="flex items-center space-x-3 text-sm font-semibold hover:text-brand-accent transition-colors w-fit group/btn">
            <span>Shop the Collection</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-brand-accent transition-colors backdrop-blur-sm">
              <ArrowRight className="w-4 h-4 text-white group-hover/btn:text-brand-dark" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
