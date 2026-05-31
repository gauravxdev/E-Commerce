"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProductFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you are not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund. The item must be in its original condition and packaging."
    },
    {
      question: "How long does shipping usually take?",
      answer: "Standard shipping takes 3-5 business days within the contiguous United States. Expedited shipping options (1-2 days) are available at checkout. International shipping typically takes 7-14 business days depending on the destination."
    },
    {
      question: "Does this product come with a warranty?",
      answer: "Yes, all our products come with a standard 1-year manufacturer warranty covering any defects in materials or workmanship under normal use."
    },
    {
      question: "Is this product compatible with my device?",
      answer: "Our products are designed with universal compatibility in mind, supporting iOS, Android, Windows, and macOS devices via standard Bluetooth or USB connections."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mb-24 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-500">Find answers to common questions about our products and services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === index ? 'border-brand-accent/50 bg-brand-accent/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <button
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className={`font-semibold text-lg ${openIndex === index ? 'text-brand-dark' : 'text-gray-900'}`}>
                {faq.question}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-brand-accent' : 'bg-gray-100'}`}>
                <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-brand-dark' : 'text-gray-500'}`} />
              </div>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
