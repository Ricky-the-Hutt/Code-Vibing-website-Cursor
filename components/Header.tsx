import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav role="navigation">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-light no-underline text-gray-900 dark:text-gray-300 text-center sm:text-left leading-tight text-balance"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Looking after goodness and truth
            </Link>
            <div className="flex items-center">
              <ul className="flex list-none m-0 p-0 gap-4 sm:gap-6">
                <li>
                  <Link href="/blog" className="text-lg sm:text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/cv" className="text-lg sm:text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    CV
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-lg sm:text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    About
                  </Link>
                </li>
              </ul>
              <div className="ml-4 sm:ml-6">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
