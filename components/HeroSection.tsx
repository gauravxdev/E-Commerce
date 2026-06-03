"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SectionConfig } from './site-settings-provider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({ config }: { config?: SectionConfig }) {
  const images = ['/images/1.webp', '/images/2.webp'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden bg-slate-900">
      {/* Invisible placeholder to perfectly scale the container height based on image aspect ratio */}
      <Image
        src={images[0]}
        alt="Placeholder"
        width={1920}
        height={600}
        className="w-full h-auto invisible"
        priority
      />

      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={src}
            alt={`Hero Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/80 rounded-full p-2 text-slate-900 transition-all shadow-md backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/80 rounded-full p-2 text-slate-900 transition-all shadow-md backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors shadow-sm ${
              index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
