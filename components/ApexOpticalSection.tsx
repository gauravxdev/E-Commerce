import React from 'react';
import { Compass, ArrowUpRight } from 'lucide-react';

export default function ApexOpticalSection() {
  const cards = [
    { id: 1, title: "Leading Optical Laboratory", description: "delivering tailored web development that lead to measurable results" },
    { id: 2, title: "Leading Optical Laboratory", description: "delivering tailored web development that lead to measurable results" },
    { id: 3, title: "Leading Optical Laboratory", description: "delivering tailored web development that lead to measurable results" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight max-w-md leading-tight">
          Apex Optical Technology
        </h2>
        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
          Founded in 2014 our optical lab comprises experienced professional from leading multinational corporations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-[#f8fafc] border border-gray-100 rounded-3xl p-8 flex flex-col justify-between h-64 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 bg-white">
                <Compass className="w-5 h-5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-[#d9f95f] flex items-center justify-center text-brand-dark cursor-pointer hover:scale-105 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
