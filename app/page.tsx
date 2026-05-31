import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PopularProductsSection from '@/components/PopularProductsSection';
import OurProductsSection from '@/components/OurProductsSection';
import ApexOpticalSection from '@/components/ApexOpticalSection';
import FeaturesGridSection from '@/components/FeaturesGridSection';
import AutomatedLivingSection from '@/components/AutomatedLivingSection';
import SmartBluetoothSection from '@/components/SmartBluetoothSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      <HeroSection />
      <PopularProductsSection />
      <OurProductsSection />
      <ApexOpticalSection />
      <FeaturesGridSection />
      <AutomatedLivingSection />
      <SmartBluetoothSection />
      <Footer />
    </main>
  );
}
