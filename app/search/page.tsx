import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreFilterSidebar from '@/components/StoreFilterSidebar';
import SearchProductList from '@/components/SearchProductList';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      
      {/* Page Header spacing for Navbar */}
      <div className="pt-6 md:pt-8 pb-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Search Results</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Search</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Mobile Filter Button */}
          <button className="mt-4 sm:mt-0 md:hidden border border-gray-200 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 bg-white">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-start">
        <StoreFilterSidebar />
        <SearchProductList />
      </section>

      <Footer />
    </main>
  );
}
