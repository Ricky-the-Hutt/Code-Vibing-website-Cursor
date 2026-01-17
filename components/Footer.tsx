import React from 'react';
import SocialMediaLinks from './SocialMediaLinks';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Ricardo Lopes</p>
          <p>Made with Cursor and Antigravity</p>
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}
