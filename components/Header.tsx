import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-black">
      <div className="pb-3 dark:pb-3">
        <nav className="pt-5 py-4 px-7 container-fluid" role="navigation">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
              Looking after goodness and truth
            </Link>
            <div className="flex items-center">
              <ul className="pl-0 mr-3 flex list-none m-0">
                <li className="pr-3">
                  <Link href="/blog" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li className="pr-3">
                  <Link href="/cv" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
                    CV
                  </Link>
                </li>
                <li className="pr-3">
                  <Link href="/about" className="text-2xl font-light no-underline text-gray-900 dark:text-gray-300">
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
