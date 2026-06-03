import React from 'react';
import { SectionConfig } from './site-settings-provider';
import { Ticket } from 'lucide-react';

export default function DiscountBannerSection({ config }: { config?: SectionConfig }) {
  const title = config?.title || "Super discount for your first purchase";
  const subtitle = config?.subtitle || "Use discount code in checkout page.";
  const coupon = config?.buttonText || "SHOPLIVE50";

  return (
    <div className="w-[95%] mx-auto py-8">
      <div 
        className="w-full bg-[#0a192f] rounded-lg overflow-hidden flex flex-col sm:flex-row items-center justify-between p-6 md:p-8 relative"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex flex-col mb-4 sm:mb-0 z-10">
          <h3 className="text-white font-bold text-lg md:text-xl tracking-tight mb-1">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 z-10">
          <Ticket className="w-6 h-6 text-white/80" />
          <span className="text-white font-black tracking-wider text-xl">
            {coupon}
          </span>
        </div>
      </div>
    </div>
  );
}
