import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SectionConfig } from './site-settings-provider';

export default function AutomatedLivingSection({ config }: { config?: SectionConfig }) {
  const features = [
    "wireless connectivity",
    "Automatic pairing",
    "Autoplay/pause",
    "Noise cancellation",
    "Transparency Mode"
  ];

  const bgColor = config?.bgColor || "";
  const textColor = config?.textColor || "text-gray-900";

  return (
    <section className={`w-full max-w-7xl mx-auto px-6 py-24 ${bgColor}`}>
      <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-16 text-center max-w-3xl mx-auto leading-tight`}>
        {config?.title || "Effortless journey from to fully automated smart living"}
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:h-[450px]">
        {/* Left Large Image */}
        <div className="w-full lg:w-1/3 relative h-[400px] lg:h-full rounded-3xl overflow-hidden bg-[#e6ebf5]">
          <Image
            src="https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=800&q=80"
            alt="Man wearing headphones"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        
        {/* Right Content Area */}
        <div className="w-full lg:w-2/3 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Features List */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-400 w-6">
                      0{index + 1}.
                    </span>
                    <span className="text-base font-semibold text-gray-900">
                      {feature}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${index === 3 ? 'bg-brand-accent' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
                    <ArrowUpRight className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Small Image */}
            <div className="w-full md:w-1/2 relative h-48 md:h-auto rounded-3xl overflow-hidden bg-gray-100">
               <Image
                src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80"
                alt="Hands with earbuds"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 max-w-sm mb-6 sm:mb-0">
              {config?.subtitle || "Discover the perfect balance of deep bass, clear minds and crisp"}
            </p>
            <button className="flex items-center space-x-3 text-sm font-semibold text-gray-900 group">
              <span className="bg-white px-6 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm border border-gray-100">{config?.buttonText || "See More"}</span>
              <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center group-hover:bg-brand-accent-hover transition-colors shadow-sm">
                <ArrowUpRight className="w-5 h-5 text-brand-dark" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
