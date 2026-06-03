"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-white relative flex flex-col">
      <Navbar />

      {/* Page Header spacing for Navbar */}
      <div className="pt-6 md:pt-8 pb-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Contact Us</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Main Content layout */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Get in touch with us</h2>
              <p className="text-gray-600 leading-relaxed">
                Have questions about a product, order status, or need custom assistance? Send us a message, and our dedicated support team will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {/* Card 1: Phone */}
              <div className="flex items-start p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="p-3 bg-brand-dark/5 text-brand-dark rounded-xl mr-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us Directly</h3>
                  <p className="text-sm text-gray-600 mb-1">Mon-Fri from 9am to 6pm.</p>
                  <a href="tel:+1555000000" className="text-sm font-semibold text-brand-dark hover:underline">+1 (555) 000-0000</a>
                </div>
              </div>

              {/* Card 2: Email */}
              <div className="flex items-start p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="p-3 bg-brand-dark/5 text-brand-dark rounded-xl mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-1">We respond within 24 hours.</p>
                  <a href="mailto:support@snopex.com" className="text-sm font-semibold text-brand-dark hover:underline">support@snopex.com</a>
                </div>
              </div>

              {/* Card 3: Address */}
              <div className="flex items-start p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="p-3 bg-brand-dark/5 text-brand-dark rounded-xl mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Headquarters</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    100 Innovation Way, Suite 400<br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>

              {/* Card 4: Hours */}
              <div className="flex items-start p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="p-3 bg-brand-dark/5 text-brand-dark rounded-xl mr-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-sm text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM (EST)<br />
                    Saturday: 10:00 AM - 4:00 PM (EST)<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7 bg-white border border-gray-100 shadow-xl shadow-gray-100/50 rounded-3xl p-6 sm:p-10">
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Thank you for writing!</h2>
                <p className="text-gray-600 max-w-md">
                  Your message has been successfully received. A member of our support team will reach out to you shortly.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors px-6 py-2.5 rounded-full text-sm font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Send a Message</h2>
                  <p className="text-sm text-gray-500">Feel free to drop us a line below.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-gray-50 border border-gray-200 focus:border-brand-dark focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com" 
                      className="w-full bg-gray-50 border border-gray-200 focus:border-brand-dark focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="How can we help you?" 
                    className="w-full bg-gray-50 border border-gray-200 focus:border-brand-dark focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Write your message here..."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-brand-dark focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-brand-dark hover:bg-black text-white py-3.5 px-6 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
