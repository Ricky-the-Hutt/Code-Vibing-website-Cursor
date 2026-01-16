import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const translations = {
  en: {
    title: 'Ricardo Lopes',
    tagline: 'Ricardo knows how to Vibe Code',
    welcome: 'Welcome',
    description: 'Showcasing my work, background, and CV to demonstrate my Vibe Coding skills.',
    viewCV: 'View CV',
    viewBlog: 'View Blog',
    about: 'About',
    aboutText: 'This website showcases my ability to use Code Vibing to create websites and applications. Built with Next.js, TypeScript, and Tailwind CSS.',
  },
  pt: {
    title: 'Ricardo Lopes',
    tagline: 'Ricardo sabe como fazer Code Vibe',
    welcome: 'Bem-vindo',
    description: 'A mostrar o meu trabalho, experiência e CV para demonstrar as minhas competências em Code Vibing.',
    viewCV: 'Ver CV',
    viewBlog: 'Ver Blog',
    about: 'Sobre',
    aboutText: 'Este website demonstra a minha capacidade de usar Code Vibing para criar websites e aplicações. Construído com Next.js, TypeScript e Tailwind CSS.',
  },
};

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <>
      <Head>
        <title>{t.title} - {t.tagline}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary-black">
              {t.welcome}
            </h1>
            <p className="text-2xl md:text-3xl mb-6 text-primary-red">
              {t.tagline}
            </p>
            <p className="text-lg text-gray-700 mb-8">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cv"
                className="bg-primary-red text-primary-white px-8 py-3 rounded hover:bg-red-700 transition-colors"
              >
                {t.viewCV}
              </Link>
              <Link
                href="/blog"
                className="bg-primary-black text-primary-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                {t.viewBlog}
              </Link>
            </div>
          </section>

          {/* About Section */}
          <section className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-bold mb-6 text-primary-black">
              {t.about}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.aboutText}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
