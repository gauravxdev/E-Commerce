import React from 'react';
import Image from 'next/image';
import { Plus, Gift } from 'lucide-react';

export default function ProductComboSection({ product }: { product: any }) {
  // Mock free items
  const freeItems = [
    {
      id: 101,
      title: "Premium Protective Case",
      price: 29.99,
      imageSrc: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=500&q=80",
      bgColor: "bg-gray-100"
    },
    {
      id: 102,
      title: "Fast Charging Cable",
      price: 19.99,
      imageSrc: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <div className="w-full mb-24">
      <div className="flex items-center gap-3 mb-8">
        <Gift className="w-8 h-8 text-brand-accent" />
        <h2 className="text-3xl font-bold text-gray-900">Free Combo Offer</h2>
      </div>
      
      <div className="bg-gray-50 rounded-[3rem] p-8 lg:p-12 border border-gray-100 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Main Product Thumbnail */}
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl ${product.bgColor || 'bg-gray-200'} p-4 flex items-center justify-center relative shadow-sm`}>
              <Image src={product.imageSrc} alt={product.title} fill sizes="160px" className="object-contain p-4" />
            </div>
            <span className="mt-4 font-semibold text-gray-900 text-center text-sm">{product.title}</span>
          </div>

          <Plus className="w-8 h-8 text-gray-400 flex-shrink-0 hidden lg:block" />
          <div className="lg:hidden w-full h-px bg-gray-200 my-4 relative flex items-center justify-center">
            <div className="bg-gray-50 px-4 absolute"><Plus className="w-5 h-5 text-gray-400" /></div>
          </div>

          {/* Free Items List */}
          <div className="flex flex-1 flex-col sm:flex-row gap-6 w-full">
            {freeItems.map((item) => (
              <div key={item.id} className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-shadow">
                <div className={`w-20 h-20 rounded-2xl ${item.bgColor} p-2 relative flex-shrink-0`}>
                  <Image src={item.imageSrc} alt={item.title} fill sizes="80px" className="object-cover rounded-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="px-2 py-1 bg-brand-accent/20 text-brand-dark text-[10px] font-bold uppercase tracking-wider rounded-md w-fit mb-2">Free Gift</span>
                  <span className="font-semibold text-gray-900 leading-tight mb-1">{item.title}</span>
                  <span className="text-sm text-gray-400 line-through">${item.price}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
