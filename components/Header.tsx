import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/cv" className="hover:underline text-gray-900 dark:text-gray-100">
              CV
            </Link>
            <Link href="/blog" className="hover:underline text-gray-900 dark:text-gray-100">
              Blog
            </Link>
            <Link href="/" className="hover:underline text-gray-900 dark:text-gray-100">
              About
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
