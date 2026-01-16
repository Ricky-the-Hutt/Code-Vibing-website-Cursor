import React from 'react';
import { format } from 'date-fns';
import SocialMediaLinks from './SocialMediaLinks';

export default function Footer() {
  const version = process.env.NEXT_PUBLIC_VERSION || '1.0.0';
  // Use a consistent date format to avoid hydration errors
  const deployDate = process.env.NEXT_PUBLIC_DEPLOY_DATE || format(new Date(), 'MMM dd, yyyy');

  return (
    <footer className="bg-primary-black text-primary-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            <p>Version: {version}</p>
            <p>Deployed: {deployDate}</p>
          </div>
          <SocialMediaLinks />
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Ricardo Lopes</p>
            <p className="text-primary-red">Ricardo knows how to Code Vibe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
