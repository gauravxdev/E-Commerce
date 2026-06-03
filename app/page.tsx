"use client";

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DiscountBannerSection from '@/components/DiscountBannerSection';
import PopularProductsSection from '@/components/PopularProductsSection';
import OurProductsSection from '@/components/OurProductsSection';
import FeaturesGridSection from '@/components/FeaturesGridSection';
import AutomatedLivingSection from '@/components/AutomatedLivingSection';
import SmartBluetoothSection from '@/components/SmartBluetoothSection';
import Footer from '@/components/Footer';
import { useSiteSettings } from '@/components/site-settings-provider';

const sectionComponents: Record<string, any> = {
  HeroSection,
  DiscountBannerSection,
  PopularProductsSection,
  OurProductsSection,
  FeaturesGridSection,
  AutomatedLivingSection,
  SmartBluetoothSection,
};

export default function Home() {
  const { sections } = useSiteSettings();
  
  const activeSections = [...sections]
    .filter(sec => sec.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      {activeSections.map(sec => {
        const Component = sectionComponents[sec.id];
        if (!Component) return null;
        return <Component key={sec.id} config={sec} />;
      })}
      <Footer />
    </main>
  );
}
