"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ArrowUpRight } from 'lucide-react';
import { SectionConfig } from './site-settings-provider';

export default function SmartBluetoothSection({ config }: { config?: SectionConfig }) {
  const images = [
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80", // Main Speaker
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&q=80", // Thumbnail 1
    "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=200&q=80", // Thumbnail 2
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80", // Thumbnail 3
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  const bgColor = config?.bgColor || "";
  const textColor = config?.textColor || "text-gray-900";

  return (
    <section className={`w-full max-w-7xl mx-auto px-6 py-16 ${bgColor}`}>
      <h2 className={`text-4xl md:text-5xl font-semibold ${textColor} tracking-tight mb-12`}>
        {config?.title || "Smart Bluetooth"}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Product Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-4 justify-between sm:justify-start">
            {images.slice(1).map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden relative border-2 transition-all ${
                  activeImage === img ? 'border-brand-dark scale-95' : 'border-transparent hover:scale-95'
                }`}
              >
                <Image src={img} alt={`Speaker angle ${i + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image View */}
          <div className="flex-1 bg-[#f8fafc] border border-gray-100 rounded-3xl p-8 flex items-center justify-center min-h-[350px] relative overflow-hidden">
            <div className="relative w-full h-80">
              <Image
                src={activeImage}
                alt="Smart Speaker Main View"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain mix-blend-multiply drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col space-y-6 lg:pl-6">
          <div>
            <h3 className={`text-3xl font-bold ${textColor} mb-3`}>
              {config?.subtitle || "Effortless Best Sound"}
            </h3>
            
            {/* Reviews */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span>(2836 total reviews)</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Founded in 2014 our optical lab comprises experienced professional from leading multinational corporations
            </p>
          </div>

          <div className="h-px bg-gray-200 w-full mb-4"></div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-wide uppercase text-gray-400">Price</span>
            <span className={`text-3xl font-black ${textColor}`}>$189.00</span>
          </div>

          <button className="self-start bg-white rounded-full pl-6 pr-2 py-2 flex items-center shadow-xl border border-gray-100 hover:scale-105 transition-transform group mt-6">
            <span className="font-semibold text-sm mr-4 text-brand-dark">{config?.buttonText || "Buy Now"}</span>
            <div className="w-10 h-10 rounded-full bg-[#d9f95f] flex items-center justify-center group-hover:bg-[#c4e44e] transition-colors">
              <ArrowUpRight className="w-5 h-5 text-brand-dark" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
