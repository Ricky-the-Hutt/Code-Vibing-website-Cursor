import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const translations = {
  en: {
    title: '404 - Page Not Found',
    heading: '404',
    message: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    backHome: 'Back to Home',
  },
  pt: {
    title: '404 - Página Não Encontrada',
    heading: '404',
    message: 'Página Não Encontrada',
    description: 'A página que procura não existe.',
    backHome: 'Voltar ao Início',
  },
};

export default function Custom404() {
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4 text-primary-red">{t.heading}</h1>
          <h2 className="text-3xl font-bold mb-4 text-primary-black">{t.message}</h2>
          <p className="text-lg text-gray-700 mb-8">{t.description}</p>
          <Link
            href="/"
            className="inline-block bg-primary-red text-primary-white px-8 py-3 rounded hover:bg-red-700 transition-colors"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </>
  );
}
