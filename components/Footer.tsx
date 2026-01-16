import React from 'react';
import SocialMediaLinks from './SocialMediaLinks';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-600">
          <div>
            <p>&copy; {new Date().getFullYear()} Ricardo Lopes</p>
          </div>
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}
