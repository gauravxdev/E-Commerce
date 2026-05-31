import React from 'react';
import ProductCard from './ProductCard';

interface ProductRelatedSectionProps {
  title: string;
  products: any[];
}

export default function ProductRelatedSection({ title, products }: ProductRelatedSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full mb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        <button className="text-brand-dark font-semibold hover:text-brand-accent-hover transition-colors text-sm">
          View All
        </button>
      </div>
      
      {/* We use a horizontal scroll on mobile, and a grid on larger screens */}
      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 snap-x sm:snap-none hide-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] sm:min-w-0 snap-start">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
