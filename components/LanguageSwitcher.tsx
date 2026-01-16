import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, locales, pathname, asPath } = router;

  return (
    <div className="flex items-center space-x-2">
      {locales?.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          as={asPath}
          locale={loc}
          className={`px-2 py-1 text-sm border border-primary-white hover:bg-primary-red hover:border-primary-red transition-colors ${
            locale === loc ? 'bg-primary-red border-primary-red' : ''
          }`}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
