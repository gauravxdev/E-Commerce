import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductHero from '@/components/ProductHero';
import ProductBentoDetails from '@/components/ProductBentoDetails';
import ProductComboSection from '@/components/ProductComboSection';
import ProductRelatedSection from '@/components/ProductRelatedSection';
import ProductFAQs from '@/components/ProductFAQs';
import ProductAdBanner from '@/components/ProductAdBanner';
import { getProductById, products } from '@/lib/mockData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Mock fetch product
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  const product = getProductById(isNaN(productId) ? 1 : productId);

  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      
      {/* Page Header spacing for Navbar */}
      <div className="pt-24 md:pt-32 pb-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <Link href="/store" className="inline-flex items-center text-sm text-brand-dark hover:text-brand-accent-hover font-semibold transition-colors mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Link>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/store">Store</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12">
        <ProductHero product={product} />
        <ProductBentoDetails product={product} />
        
        <ProductComboSection product={product} />
        
        <ProductRelatedSection title="Similar Products" products={products.slice(1, 5)} />
        <ProductRelatedSection title={`More from ${product.title.split(' ')[0] || 'Brand'}`} products={products.slice(0, 4)} />
        <ProductRelatedSection title="In Same Price Range" products={products.slice(2, 6)} />
        
        <ProductFAQs />
        
        <ProductAdBanner />
      </section>

      <Footer />
    </main>
  );
}
