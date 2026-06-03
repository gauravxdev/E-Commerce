import { ArrowRight, Truck, ShieldCheck, RefreshCcw, CreditCard, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export default function SnopexHero() {
  return (
    <div className="relative bg-[#f5f8ff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col items-start gap-6">
          <span className="bg-[#e4ecff] text-[#4f70e8] text-xs font-semibold px-4 py-1.5 rounded-full">
            New Arrival
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            The iPhone <br />
            Experience. <span className="text-[#5974ff]">Redefined.</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-md leading-relaxed">
            Discover the latest iPhone models with cutting-edge technology, stunning design, and unmatched performance.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-medium flex items-center gap-2 transition-colors">
              Shop iPhone 15 <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 px-6 py-3.5 rounded-xl font-medium transition-colors">
              Explore All Models
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-slate-600" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold text-slate-900">Free Delivery</p>
                <p className="text-xs text-slate-500 mt-0.5">On all orders</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-slate-600" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold text-slate-900">Official Warranty</p>
                <p className="text-xs text-slate-500 mt-0.5">100% Genuine</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCcw className="w-6 h-6 text-slate-600" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold text-slate-900">Easy Returns</p>
                <p className="text-xs text-slate-500 mt-0.5">7-day return</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-slate-600" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold text-slate-900">No Cost EMI</p>
                <p className="text-xs text-slate-500 mt-0.5">Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content / Image */}
        <div className="relative h-full flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#dfe8ff] rounded-full z-0"></div>
          <div className="relative z-10 w-full h-[550px]">
            <Image 
              src="/images/hero_iphone.png" 
              alt="iPhone 15" 
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          
          {/* Floating Card */}
          <div className="absolute right-0 top-1/2 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl z-20 max-w-[200px]">
            <RefreshCw className="w-6 h-6 text-slate-700 mb-3" />
            <p className="text-sm font-bold text-slate-900 mb-1 leading-tight">Upgrade <br/> Made Easy</p>
            <p className="text-[11px] text-slate-500 leading-tight mb-4">Exchange your old phone and get the best value.</p>
            <a href="#" className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
              Learn More <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
