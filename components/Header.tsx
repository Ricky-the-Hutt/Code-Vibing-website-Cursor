import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-black">
      <div className="pb-3 dark:pb-3">
        <nav className="pt-5 pv3 ph2 max-w-7xl mx-auto" role="navigation">
          <div className="flex justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300 max-w-lg block leading-tight">
              Looking after goodness and truth
            </Link>
            <div className="flex items-center">
              <ul className="pl-0 mr-3 flex">
                <li className="list f5 f4-ns fw4 pr-3">
                  <Link href="/blog" className="no-underline text-gray-900 dark:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li className="list f5 f4-ns fw4 pr-3">
                  <Link href="/cv" className="no-underline text-gray-900 dark:text-gray-300">
                    CV
                  </Link>
                </li>
                <li className="list f5 f4-ns fw4 pr-3">
                  <Link href="/" className="no-underline text-gray-900 dark:text-gray-300">
                    About
                  </Link>
                </li>
              </ul>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
