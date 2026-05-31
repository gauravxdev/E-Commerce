import React from 'react';

export default function StoreFilterSidebar() {
  return (
    <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-32 h-auto lg:h-[calc(100vh-8rem)] overflow-y-auto pr-6 hidden md:block hide-scrollbar">
      <div className="flex flex-col space-y-8">
        
        {/* Categories */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Category</h3>
          <ul className="space-y-3">
            {['All Products', 'Headphones', 'Earbuds', 'Smartphones', 'Speakers', 'Accessories'].map((category, idx) => (
              <li key={idx}>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-dark rounded border-gray-300 focus:ring-brand-accent transition-colors cursor-pointer" defaultChecked={idx === 0} />
                  <span className="text-gray-600 group-hover:text-brand-dark transition-colors text-sm font-medium">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Price Range</h3>
          <ul className="space-y-3">
            {['All Prices', 'Under $50', '$50 to $100', '$100 to $200', 'Over $200'].map((price, idx) => (
              <li key={idx}>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="radio" name="price" className="form-radio h-4 w-4 text-brand-dark border-gray-300 focus:ring-brand-accent transition-colors cursor-pointer" defaultChecked={idx === 0} />
                  <span className="text-gray-600 group-hover:text-brand-dark transition-colors text-sm font-medium">{price}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Brands</h3>
          <ul className="space-y-3">
            {['Apple', 'Sony', 'Bose', 'Snopex', 'JBL'].map((brand, idx) => (
              <li key={idx}>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-dark rounded border-gray-300 focus:ring-brand-accent transition-colors cursor-pointer" />
                  <span className="text-gray-600 group-hover:text-brand-dark transition-colors text-sm font-medium">{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
