import React from 'react';

export default function SocialMediaLinks() {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com', // Update with actual URL
      label: 'X',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ricky_the_hutt/',
      label: 'Instagram',
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
          aria-label={social.name}
        >
          {social.label}
        </a>
      ))}
    </div>
  );
}
