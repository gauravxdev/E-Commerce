import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturesGridSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature 01 (Full width on top) */}
        <div className="md:col-span-2 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#e0f7fa] relative flex flex-col md:flex-row items-center p-8 md:p-12 h-auto md:h-[400px]">
          <div className="md:w-1/2 z-10">
            <span className="text-gray-500 font-medium mb-4 block">// 01</span>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Simplicity of<br/>transforming
            </h3>
            <p className="text-gray-600 mb-8 max-w-sm">
              Discover the perfect balance of deep bass, clear minds and crisp highs
            </p>
            <button className="flex items-center space-x-3 text-sm font-semibold text-gray-900 group">
              <span className="bg-white px-6 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm">Read More</span>
              <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center group-hover:bg-brand-accent-hover transition-colors shadow-sm">
                <ArrowUpRight className="w-5 h-5 text-brand-dark" />
              </div>
            </button>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-full mt-8 md:mt-0">
             <Image
              src="https://images.unsplash.com/photo-1516280440502-a2fe6b92a2a4?w=800&q=80"
              alt="Girl wearing headphones"
              fill
              className="object-cover object-center rounded-2xl md:rounded-none md:absolute md:right-0 md:top-0"
            />
          </div>
        </div>

        {/* Feature 02 */}
        <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#eff6ff] relative p-8 md:p-12 h-[400px] flex flex-col">
          <span className="text-gray-500 font-medium mb-4 block">// 02</span>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight z-10">
            Sound<br/>perfection
          </h3>
          <div className="mt-auto z-10">
            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm group">
              <ArrowUpRight className="w-5 h-5 text-brand-dark group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <div className="absolute right-0 bottom-0 w-3/4 h-3/4">
            <Image
              src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80"
              alt="Airpods"
              fill
              className="object-contain object-bottom right-0"
            />
          </div>
        </div>

        {/* Feature 03 */}
        <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#ffe685] via-[#fef08a] to-[#fecdd3] relative p-8 md:p-12 h-[400px] flex flex-col">
          <span className="text-gray-500 font-medium mb-4 block">// 03</span>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight z-10">
            New Series<br/>iphone 14 Pro
          </h3>
          <div className="mt-auto z-10">
            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm group">
              <ArrowUpRight className="w-5 h-5 text-brand-dark group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] w-3/4 h-3/4">
            <Image
              src="https://images.unsplash.com/photo-1603898037225-9ba6900f0ce1?w=600&q=80"
              alt="iPhone 14 Pro"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
