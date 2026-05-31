import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-24 pb-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-16">
        
        {/* Contact Info */}
        <div className="md:w-1/2">
          <p className="text-gray-500 mb-4 max-w-sm">
            Have questions or feedback?<br/>
            reach out to our support tem at:
          </p>
          <a href="mailto:helloSnopex@gmail.com" className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 hover:text-gray-600 transition-colors">
            helloSnopex@gmail.com
          </a>
        </div>

        {/* Links Columns */}
        <div className="md:w-1/2 flex flex-wrap gap-12 lg:justify-end">
          <div className="flex flex-col space-y-4">
            <h4 className="font-semibold text-gray-900 mb-2">Company</h4>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Help Center</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Address store</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Privacy policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Receivers & Amplifiers</a>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h4 className="font-semibold text-gray-900 mb-2">Support/24hr</h4>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Help Center</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Address store</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Privacy policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Receivers & Amplifiers</a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm font-semibold text-gray-900 mb-4 md:mb-0">
          Snopex
        </p>
        <p className="text-xs text-gray-400 max-w-sm text-right">
          Founded in 2014 our optical lab comprises experienced professional from leading multinational corporations
        </p>
      </div>
    </footer>
  );
}
