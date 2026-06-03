import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react';

export default function SnopexNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-black tracking-tight text-slate-900">
          Snopex
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
        <Link href="/" className="hover:text-black">Home</Link>
        <div className="flex items-center gap-1 cursor-pointer hover:text-black">
          iPhone <ChevronDown className="w-4 h-4" />
        </div>
        <Link href="/" className="hover:text-black">Accessories</Link>
        <Link href="/" className="hover:text-black">Offers</Link>
        <Link href="/" className="hover:text-black">Why Snopex</Link>
        <Link href="/" className="hover:text-black">Support</Link>
      </div>
      <div className="flex items-center gap-5 text-slate-700">
        <Search className="w-5 h-5 cursor-pointer hover:text-black" />
        <User className="w-5 h-5 cursor-pointer hover:text-black" />
        <Heart className="w-5 h-5 cursor-pointer hover:text-black" />
        <div className="relative cursor-pointer hover:text-black">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-2 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </div>
      </div>
    </nav>
  );
}
