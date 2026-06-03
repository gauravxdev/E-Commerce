import React from 'react';
import ProductCard from './ProductCard';
import { SectionConfig } from './site-settings-provider';

export default function PopularProductsSection({ config }: { config?: SectionConfig }) {
  const products = [
    {
      id: 1,
      imageSrc: "https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=500&q=80",
      title: "Light Gorsun Headphones",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-gray-100",
      badges: ["Today's Deal"]
    },
    {
      id: 2,
      imageSrc: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
      title: "Blue version airpods",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-blue-50",
      badges: ["Best Seller", "15% off"]
    },
    {
      id: 3,
      imageSrc: "https://images.unsplash.com/photo-1603898037225-9ba6900f0ce1?w=500&q=80", // using an iphone image
      title: "iphone 15 pro Max",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-pink-50"
    },
    {
      id: 4,
      imageSrc: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", // using speaker image
      title: "Electronics Sound Speakers",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-stone-100",
      badges: ["New"]
    }
  ];

  const bgColor = config?.bgColor || "";
  const textColor = config?.textColor || "text-gray-900";

  return (
    <section className={`w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center ${bgColor}`}>
      <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-16 text-center max-w-md leading-tight`}>
        {config?.title || "Our Best Popular Product"}
      </h2>
      
      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12 snap-x sm:snap-none hide-scrollbar">
        {products.map(product => (
          <div key={product.id} className="min-w-[280px] sm:min-w-0 snap-start">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      
      {/* Pagination / Dots (Placeholder) */}
      <div className="flex items-center space-x-4">
        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-900"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
