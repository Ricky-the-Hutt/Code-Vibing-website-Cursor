import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav role="navigation">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300" style={{ fontFamily: 'Georgia, serif' }}>
              Looking after goodness and truth
            </Link>
            <div className="flex items-center">
              <ul className="flex list-none m-0 p-0 gap-6">
                <li>
                  <Link href="/blog" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/cv" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    CV
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    About
                  </Link>
                </li>
              </ul>
              <div className="ml-6">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
