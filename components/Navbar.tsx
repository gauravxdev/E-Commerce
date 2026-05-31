"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, ShoppingBag, Heart } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push('/search');
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-40 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-semibold text-gray-900 tracking-tight hover:text-brand-accent-hover transition-colors">Home</Link>
        <Link href="/features" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-semibold text-gray-900 tracking-tight hover:text-brand-accent-hover transition-colors">Features</Link>
        <Link href="/solutions" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-semibold text-gray-900 tracking-tight hover:text-brand-accent-hover transition-colors">Solutions</Link>
        <Link href="/brands" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-semibold text-gray-900 tracking-tight hover:text-brand-accent-hover transition-colors">Brands</Link>
        <Link href="/store" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-semibold text-gray-900 tracking-tight hover:text-brand-accent-hover transition-colors">Stores</Link>
        
        <div className="flex items-center space-x-8 pt-8">
          <button className="text-gray-900 hover:text-brand-accent-hover transition-colors"><Search className="w-7 h-7" /></button>
          <button className="text-gray-900 hover:text-brand-accent-hover transition-colors"><User className="w-7 h-7" /></button>
          <button className="text-gray-900 hover:text-brand-accent-hover transition-colors"><ShoppingBag className="w-7 h-7" /></button>
          <button className="text-gray-900 hover:text-brand-accent-hover transition-colors"><Heart className="w-7 h-7" /></button>
        </div>
      </div>

      <nav className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] left-1/2 -translate-x-1/2 ${
        isScrolled 
          ? "top-6 w-[95%] md:w-[85%] rounded-full bg-white/70 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-saturate-150 py-3 px-6 md:px-8" 
          : "top-0 w-full bg-transparent py-4 px-6 md:px-12"
      }`}>
        <div className="flex items-center justify-between w-full h-full relative z-10">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-brand-dark">
              Snopex
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/features" className="hover:text-black transition-colors">Features</Link>
            <Link href="/solutions" className="hover:text-black transition-colors">Solutions</Link>
            <Link href="/brands" className="hover:text-black transition-colors">Brands</Link>
            <Link href="/store" className="hover:text-black transition-colors">Stores</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Desktop Actions */}
            <div className="relative hidden lg:flex items-center justify-end h-10 w-56">
              <div 
                className={`absolute right-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full h-10 ${
                  isSearchOpen 
                    ? 'w-56 border border-gray-300 bg-white/50 backdrop-blur-sm' 
                    : 'w-10 border border-transparent bg-transparent'
                }`}
              >
                <input
                  type="text"
                  placeholder="Searching..."
                  onKeyDown={handleSearch}
                  className={`absolute left-0 top-0 h-full bg-transparent text-sm focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isSearchOpen ? 'w-[calc(100%-40px)] pl-4 opacity-100' : 'w-0 opacity-0 pl-0'
                  }`}
                />
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`absolute right-0 top-0 w-10 h-10 flex items-center justify-center transition-colors ${
                    isSearchOpen ? 'text-gray-500 hover:text-black' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-black transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="text-gray-700 hover:text-black transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button className="text-gray-700 hover:text-black transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Actions (Search + ShoppingBag) */}
            <div className="flex lg:hidden items-center space-x-2 sm:space-x-3">
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  isMobileSearchOpen ? 'bg-gray-100 text-black' : 'text-gray-700 hover:text-black'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              <button onClick={() => setIsCartOpen(true)} className="text-gray-700 hover:text-black transition-colors relative w-8 h-8 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Toggle (Animated Hamburger) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-6 h-6 focus:outline-none z-50 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4">
                <span className={`absolute left-0 block h-0.5 w-full bg-brand-dark transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 block h-0.5 w-full bg-brand-dark transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 block h-0.5 w-full bg-brand-dark transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </div>
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Search Dropdown (Slides down from genuinely behind the navbar) */}
      <div className={`lg:hidden fixed z-40 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-[40px] shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-gray-100 rounded-b-3xl p-4 pt-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isMobileSearchOpen 
          ? (isScrolled ? 'top-6 translate-y-[52px] opacity-100 visible' : 'top-0 translate-y-[64px] opacity-100 visible') 
          : (isScrolled ? 'top-6 translate-y-0 opacity-0 invisible pointer-events-none' : 'top-0 translate-y-0 opacity-0 invisible pointer-events-none')
      }`}>
        <div className="relative flex items-center w-full">
          <input
            type="text"
            placeholder="Search products..."
            onKeyDown={handleSearch}
            className="w-full bg-gray-50 border border-gray-200/60 rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
            autoFocus={isMobileSearchOpen}
          />
          <Search className="absolute right-3.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
