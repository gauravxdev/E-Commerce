import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Quote, Globe } from 'lucide-react';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function HeroSection() {
  return (
    <section className="relative w-full pt-24 md:pt-40 pb-8 md:pb-16 px-6 overflow-hidden flex flex-col items-center bg-gradient-to-b from-[#a2d2ff] via-[#bde0fe] to-white">
      {/* Large Typography Background */}
      <div className="absolute top-24 left-0 w-full overflow-hidden z-10 select-none pointer-events-none">
        <div className="animate-marquee">
          <h1 className="text-[28vw] md:text-[12vw] font-black text-[#0b1b3d] leading-none tracking-tighter whitespace-nowrap pr-8">
            AESTHETIC UNBOUND N
          </h1>
          <h1 className="text-[28vw] md:text-[12vw] font-black text-[#0b1b3d] leading-none tracking-tighter whitespace-nowrap pr-8">
            AESTHETIC UNBOUND N
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center mt-4 md:mt-12 z-20">
        {/* Main Headphones Image */}
        <div className="relative w-full max-w-3xl md:max-w-4xl h-[750px] md:h-[680px] -mt-36 md:-mt-24">
          <Image
            src="/home.png"
            alt="Premium Headphones"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
          
          {/* Shop Now Button (Floating Center) */}
          <div className="absolute top-[45%] md:top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <button className="bg-white rounded-full pl-6 pr-2 py-2 flex items-center shadow-xl hover:scale-105 transition-transform group">
              <span className="font-semibold text-sm mr-4">Shop Now</span>
              <div className="w-10 h-10 rounded-full bg-[#d9f95f] flex items-center justify-center group-hover:bg-[#c4e44e] transition-colors">
                <ArrowUpRight className="w-5 h-5 text-brand-dark" />
              </div>
            </button>
          </div>
        </div>

        {/* Floating Elements / Mobile Stacking */}
        <div className="w-full flex flex-col items-center -mt-40 lg:mt-0 space-y-1 lg:space-y-0 pb-12 lg:pb-0 z-20">
          
          {/* Left Card */}
          <div className="lg:absolute lg:left-0 lg:top-1/3 flex flex-col items-center">
            <div className="w-36 h-36 rounded-3xl overflow-hidden relative shadow-xl mb-4 bg-white/20 p-2">
              <div className="w-full h-full relative rounded-2xl overflow-hidden">
                 <Image
                  src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80"
                  alt="Hands holding product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5 text-brand-dark" />
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons (Floating Right on Desktop, Hidden on Mobile) */}
          <div className="absolute right-0 top-1/4 space-x-3 hidden lg:flex">
            {[<Globe key="gl" className="w-4 h-4" />, <FacebookIcon key="fb" />, <TwitterIcon key="tw" />, <InstagramIcon key="ig" />].map((icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-black hover:scale-110 transition-all shadow-md">
                {icon}
              </a>
            ))}
          </div>

          {/* Quote */}
          <div className="lg:absolute lg:right-0 lg:top-1/2 lg:mt-12 max-w-xs flex flex-col items-center lg:items-start text-center lg:text-left px-6 lg:px-0">
            <div className="text-gray-400 mb-2">
              <Quote className="w-8 h-8 lg:opacity-50" fill="currentColor" />
            </div>
            <p className="text-gray-800 font-medium text-lg leading-snug">
              Perfect blend of cutting-edge technology and craftsmanship.
            </p>
          </div>
          
        </div>

      </div>
    </section>
  );
}
