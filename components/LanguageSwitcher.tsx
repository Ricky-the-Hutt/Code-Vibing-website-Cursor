import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, locales, pathname, asPath } = router;

  return (
    <div className="flex items-center space-x-2 text-sm">
      {locales?.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          as={asPath}
          locale={loc}
          className={`hover:underline ${
            locale === loc ? 'font-semibold' : 'text-gray-600'
          }`}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
