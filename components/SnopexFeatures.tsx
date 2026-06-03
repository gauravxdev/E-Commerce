import { Truck, ShieldCheck, RefreshCcw, CreditCard, HeadphonesIcon } from 'lucide-react';

export default function SnopexFeatures() {
  return (
    <div className="max-w-7xl mx-auto px-8 pb-24">
      <div className="bg-[#f8fafd] rounded-2xl p-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Truck className="w-7 h-7 text-slate-600" strokeWidth={1.5} />
          <div>
            <p className="text-[13px] font-bold text-slate-900">Free Delivery</p>
            <p className="text-[11px] text-slate-500 mt-0.5">On all orders</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-slate-600" strokeWidth={1.5} />
          <div>
            <p className="text-[13px] font-bold text-slate-900">Official Warranty</p>
            <p className="text-[11px] text-slate-500 mt-0.5">100% Genuine Products</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RefreshCcw className="w-7 h-7 text-slate-600" strokeWidth={1.5} />
          <div>
            <p className="text-[13px] font-bold text-slate-900">Easy Returns</p>
            <p className="text-[11px] text-slate-500 mt-0.5">7-day return policy</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CreditCard className="w-7 h-7 text-slate-600" strokeWidth={1.5} />
          <div>
            <p className="text-[13px] font-bold text-slate-900">Secure Payments</p>
            <p className="text-[11px] text-slate-500 mt-0.5">100% Protected</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HeadphonesIcon className="w-7 h-7 text-slate-600" strokeWidth={1.5} />
          <div>
            <p className="text-[13px] font-bold text-slate-900">24/7 Support</p>
            <p className="text-[11px] text-slate-500 mt-0.5">We're here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
