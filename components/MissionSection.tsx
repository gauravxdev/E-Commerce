import React from 'react';
import Image from 'next/image';
import { RefreshCw, Bluetooth } from 'lucide-react';

export default function MissionSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
        {/* Left Side: Title & Content */}
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-16 leading-tight">
            We believe in transforming ideas into digital experiences
          </h2>
          
          <div className="mb-10">
            <div className="flex items-center text-sm font-semibold text-gray-800 tracking-wide uppercase mb-2">
              Our mission
            </div>
            <div className="h-px bg-gray-300 w-full mb-8"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center mb-6">
                <RefreshCw className="w-5 h-5 text-brand-dark" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Transforming Of Digital Product
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                we aim to enable businesses to thrive online by delivering tailored web development that lead to measurable results
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center mb-6">
                <Bluetooth className="w-5 h-5 text-brand-dark" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Empowering digital growth
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                we aim to enable businesses to thrive online by delivering tailored web development that lead to measurable results
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80"
            alt="Person experiencing VR"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
