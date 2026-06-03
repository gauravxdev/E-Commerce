import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const phones = [
  {
    name: "iPhone 15",
    display: "6.1-inch Display",
    chip: "A16 Bionic chip",
    price: "₹69,900",
    image: "/images/iphone_black.png",
  },
  {
    name: "iPhone 15 Plus",
    display: "6.7-inch Display",
    chip: "A16 Bionic chip",
    price: "₹79,900",
    image: "/images/iphone_white.png",
  },
  {
    name: "iPhone 15 Pro",
    display: "6.1-inch Display",
    chip: "A17 Pro chip",
    price: "₹1,34,900",
    image: "/images/iphone_black.png", // Using black as placeholder
  },
  {
    name: "iPhone 15 Pro Max",
    display: "6.7-inch Display",
    chip: "A17 Pro chip",
    price: "₹1,59,900",
    image: "/images/iphone_pro.png",
  },
];

export default function SnopexCollection() {
  return (
    <div className="py-24 bg-white max-w-7xl mx-auto px-8">
      <div className="text-center mb-12">
        <p className="text-blue-600 font-bold text-xs tracking-wide mb-2 uppercase">Explore</p>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Our iPhone Collection</h2>
        <p className="text-slate-500 text-sm">Find the perfect iPhone that fits your style and needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phones.map((phone, idx) => (
          <div key={idx} className="border border-slate-100 shadow-sm rounded-[2rem] p-5 flex gap-4 hover:shadow-md transition-shadow bg-white items-center">
            <div className="w-24 h-40 relative shrink-0">
              <Image 
                src={phone.image} 
                alt={phone.name} 
                fill 
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-slate-900 mb-1">{phone.name}</h3>
              <p className="text-[11px] text-slate-500 mb-0.5">{phone.display}</p>
              <p className="text-[11px] text-slate-500 mb-4">{phone.chip}</p>
              
              <p className="text-[11px] text-slate-500 mb-0.5">From</p>
              <p className="text-base font-bold text-slate-900 mb-3">{phone.price}</p>
              
              <button className="py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 hover:bg-slate-50 flex items-center justify-between w-fit gap-2 transition-colors">
                Shop Now <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
