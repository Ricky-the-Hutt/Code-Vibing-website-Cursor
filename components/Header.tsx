import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSwitcher from './LanguageSwitcher';

const translations = {
  en: {
    about: 'About',
    blog: 'Blog',
    cv: 'CV',
  },
  pt: {
    about: 'Sobre',
    blog: 'Blog',
    cv: 'CV',
  },
};

export default function Header() {
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/cv" className="hover:underline">
              {t.cv}
            </Link>
            <Link href="/blog" className="hover:underline">
              {t.blog}
            </Link>
            <Link href="/" className="hover:underline">
              {t.about}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
