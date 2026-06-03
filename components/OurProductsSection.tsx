import React from 'react';
import ProductCard from './ProductCard';
import { ArrowUpRight } from 'lucide-react';
import { SectionConfig } from './site-settings-provider';

export default function OurProductsSection({ config }: { config?: SectionConfig }) {
  const products = [
    {
      id: 1,
      imageSrc: "https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=500&q=80",
      title: "Light Gorsun Headphones",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-gray-100",
      badges: ["Today's Deal", "10% off"]
    },
    {
      id: 2,
      imageSrc: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
      title: "Blue version airpods",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-blue-50",
      badges: ["Best Seller"]
    },
    {
      id: 3,
      imageSrc: "https://images.unsplash.com/photo-1603898037225-9ba6900f0ce1?w=500&q=80",
      title: "iphone 15 pro Max",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-pink-50"
    },
    {
      id: 4,
      imageSrc: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
      title: "Electronics Sound Speakers",
      reviews: 2836,
      originalPrice: 248.00,
      price: 188.00,
      bgColor: "bg-stone-100",
      badges: ["New Arrival"]
    },
    // Second Row
    {
      id: 5,
      imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      title: "Snopex Studio Pro",
      reviews: 1420,
      originalPrice: 299.00,
      price: 249.00,
      bgColor: "bg-amber-50",
      badges: ["Best Seller", "15% off"]
    },
    {
      id: 6,
      imageSrc: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80",
      title: "Wireless Smart Budz",
      reviews: 954,
      originalPrice: 199.00,
      price: 129.00,
      bgColor: "bg-teal-50"
    },
    {
      id: 7,
      imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      title: "Minimalist Smart Watch",
      reviews: 2310,
      originalPrice: 350.00,
      price: 299.00,
      bgColor: "bg-zinc-100"
    },
    {
      id: 8,
      imageSrc: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
      title: "Premium Soundbar Solo",
      reviews: 840,
      originalPrice: 180.00,
      price: 140.00,
      bgColor: "bg-slate-100"
    },
    // Third Row
    {
      id: 9,
      imageSrc: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80",
      title: "Snopex Smart Hub",
      reviews: 1888,
      originalPrice: 220.00,
      price: 169.00,
      bgColor: "bg-emerald-50"
    },
    {
      id: 10,
      imageSrc: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&q=80",
      title: "Deep Bass Earbuds",
      reviews: 1105,
      originalPrice: 120.00,
      price: 89.00,
      bgColor: "bg-cyan-50"
    },
    {
      id: 11,
      imageSrc: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
      title: "Stereo Bass Box",
      reviews: 620,
      originalPrice: 260.00,
      price: 199.00,
      bgColor: "bg-purple-50"
    },
    {
      id: 12,
      imageSrc: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
      title: "Studio Classic Headset",
      reviews: 3102,
      originalPrice: 320.00,
      price: 279.00,
      bgColor: "bg-neutral-100"
    }
  ];

  const bgColor = config?.bgColor || "";
  const textColor = config?.textColor || "text-gray-900";

  return (
    <section className={`w-full max-w-7xl mx-auto px-6 pt-4 pb-16 flex flex-col items-center border-t border-gray-100 ${bgColor}`}>
      <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-16 text-center max-w-md leading-tight`}>
        {config?.title || "Our Product"}
      </h2>
      
      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12 snap-x sm:snap-none hide-scrollbar">
        {products.map(product => (
          <div key={product.id} className="min-w-[280px] sm:min-w-0 snap-start">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      <button className="bg-white rounded-full pl-6 pr-2 py-2 flex items-center shadow-xl border border-gray-100 hover:scale-105 transition-transform group">
        <span className="font-semibold text-sm mr-4 text-brand-dark">View More</span>
        <div className="w-10 h-10 rounded-full bg-[#d9f95f] flex items-center justify-center group-hover:bg-[#c4e44e] transition-colors">
          <ArrowUpRight className="w-5 h-5 text-brand-dark" />
        </div>
      </button>
    </section>
  );
}
