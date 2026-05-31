import React from 'react';
import RectangleProductCard from './RectangleProductCard';

export default function SearchProductList() {
  const products = [
    {
      id: 1,
      imageSrc: "https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=500&q=80",
      title: "Light Gorsun Headphones",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100",
      badges: ["Today's Deal", "10% off"]
    },
    {
      id: 2,
      imageSrc: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
      title: "Blue version airpods",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
      badges: ["Best Seller"]
    },
    {
      id: 3,
      imageSrc: "https://images.unsplash.com/photo-1603898037225-9ba6900f0ce1?w=500&q=80",
      title: "iphone 15 pro Max",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100"
    },
    {
      id: 4,
      imageSrc: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
      title: "Electronics Sound Speakers",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-gradient-to-br from-yellow-100 to-amber-100",
      badges: ["New Arrival"]
    },
    {
      id: 5,
      imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      title: "Snopex Studio Pro",
      reviews: 1420,
      originalPrice: 299.00,
      price: 249.00,
      bgColor: "bg-gradient-to-br from-red-100 to-orange-100",
      badges: ["Best Seller", "15% off"]
    },
    {
      id: 6,
      imageSrc: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80",
      title: "Wireless Smart Budz",
      reviews: 954,
      originalPrice: 199.00,
      price: 129.00,
      bgColor: "bg-gradient-to-br from-teal-100 to-cyan-100"
    }
  ];

  return (
    <div className="flex-1 w-full flex flex-col">
      {/* Grid Header / Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <p className="text-gray-600 font-medium">Showing 1-6 of 36 results for <span className="font-bold text-gray-900">"audio"</span></p>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500 font-medium">Sort by:</span>
          <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-full focus:ring-brand-accent focus:border-brand-accent block w-full py-2 px-4 cursor-pointer outline-none shadow-sm">
            <option>Customer Reviews</option>
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Product List: Stacked Rectangular Cards */}
      <div className="flex flex-col gap-6 w-full mb-12">
        {products.map(product => (
          <RectangleProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center w-full mt-8">
        <div className="flex items-center space-x-2">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            1
          </button>
          <button className="w-10 h-10 rounded-full border border-brand-accent bg-brand-accent flex items-center justify-center text-brand-dark font-bold shadow-sm">
            2
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            3
          </button>
          <span className="text-gray-400 mx-2">...</span>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            {/* Arrow icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
