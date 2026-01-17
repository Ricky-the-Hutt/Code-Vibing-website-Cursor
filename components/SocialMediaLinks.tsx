import React from 'react';

export default function SocialMediaLinks() {
  return (
    <div className="flex items-center">
      <a
        href="https://www.linkedin.com/in/ricardogalopes/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
      <a
        href="https://github.com/Ricky-the-Hutt"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors ml-4"
        aria-label="GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C3.68.65 2.5 1 2.5 1a5.07 5.07 0 0 0-.09 3.77A5.44 5.44 0 0 0 2.43 9.68 5.44 5.44 0 0 0 2.43 9.68c0 5.38 3.2 6.54 6.34 6.91a2.02 2.02 0 0 0 .54 1.34V20" />
        </svg>
      </a>
    </div>
  );
}
