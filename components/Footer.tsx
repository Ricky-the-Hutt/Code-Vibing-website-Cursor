import React from 'react';
import SocialMediaLinks from './SocialMediaLinks';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-sm text-gray-600 text-center">
          <p>&copy; {new Date().getFullYear()} Ricardo Lopes</p>
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}
