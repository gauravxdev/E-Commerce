import React from 'react';
import { Star, CheckCircle2, List, FileText, MessageSquare } from 'lucide-react';

export default function ProductBentoDetails({ product }: { product: any }) {
  const ratings = product.ratings || { average: 5, fiveStar: 80, fourStar: 15, threeStar: 5, twoStar: 0, oneStar: 0 };
  const totalRatings = ratings.fiveStar + ratings.fourStar + ratings.threeStar + ratings.twoStar + ratings.oneStar;

  return (
    <div className="w-full mt-24 mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">Product Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        
        {/* Bento Box 1: Description (Spans 2 columns on lg) */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:col-span-2 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 text-brand-dark">
            <FileText className="w-6 h-6" />
            <h3 className="text-xl font-bold">Detailed Description</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Engineered with the finest materials and cutting-edge technology, this product is built to last and perform. Whether you're at home or on the go, it seamlessly integrates into your lifestyle.
          </p>
        </div>

        {/* Bento Box 2: Key Features */}
        <div className="bg-brand-accent/20 rounded-3xl p-8 shadow-sm border border-brand-accent/30 flex flex-col">
          <div className="flex items-center gap-3 mb-6 text-brand-dark">
            <CheckCircle2 className="w-6 h-6" />
            <h3 className="text-xl font-bold">Key Features</h3>
          </div>
          <ul className="space-y-4 flex-1">
            {product.features?.map((feature: any, idx: number) => (
              <li key={idx} className="flex flex-col">
                <span className="font-semibold text-gray-900">{feature.title}</span>
                <span className="text-sm text-gray-600">{feature.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bento Box 3: Reviews summary (Left side, lg:col-span-1) */}
        <div className="bg-gray-900 rounded-3xl p-8 lg:col-span-1 shadow-sm text-white flex flex-col gap-6 overflow-hidden relative justify-center">
          {/* Background decoration */}
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-brand-accent/20 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col items-center justify-center min-w-[150px] z-10">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-brand-accent" />
              <h3 className="text-lg font-bold">Reviews</h3>
            </div>
            <span className="text-5xl font-black text-brand-accent">{ratings.average.toFixed(1)}</span>
            <div className="flex items-center text-brand-accent mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-4 h-4 ${star <= Math.round(ratings.average) ? 'fill-current' : 'text-gray-700'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-400 mt-1">{product.reviews} total ratings</span>
          </div>

          <div className="w-full flex flex-col gap-2 z-10">
            {[
              { label: '5 star', count: ratings.fiveStar },
              { label: '4 star', count: ratings.fourStar },
              { label: '3 star', count: ratings.threeStar },
              { label: '2 star', count: ratings.twoStar },
              { label: '1 star', count: ratings.oneStar },
            ].map((rating, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <span className="w-10 text-gray-400">{rating.label}</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-accent rounded-full"
                    style={{ width: `${(rating.count / totalRatings) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-400">{Math.round((rating.count / totalRatings) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Box 4: Specifications (Right side, lg:col-span-2 with larger space) */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 flex flex-col lg:col-span-2 justify-center">
          <div className="flex items-center gap-3 mb-6 text-brand-dark">
            <List className="w-6 h-6" />
            <h3 className="text-xl font-bold">Specifications</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 divide-y sm:divide-y-0 divide-gray-100">
            {product.specs && Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="py-2 sm:py-3 flex justify-between border-b border-gray-100 last:border-b-0">
                <span className="text-gray-500 font-medium text-sm">{key}</span>
                <span className="text-gray-900 font-semibold text-sm text-right">{value as string}</span>
              </div>
            ))}
            {!product.specs && (
              <>
                 <div className="py-3 flex justify-between border-b border-gray-100"><span className="text-gray-500 font-medium text-sm">Material</span><span className="text-gray-900 font-semibold text-sm">Premium</span></div>
                 <div className="py-3 flex justify-between border-b border-gray-100"><span className="text-gray-500 font-medium text-sm">Warranty</span><span className="text-gray-900 font-semibold text-sm">1 Year</span></div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
