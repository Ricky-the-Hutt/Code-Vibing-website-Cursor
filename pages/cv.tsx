import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const translations = {
  en: {
    title: 'CV Download - Ricardo Lopes',
    heading: 'Curriculum Vitae',
    download: 'Download CV',
    note: 'Note: Please upload your CV PDF file to the public folder as "cv.pdf"',
  },
  pt: {
    title: 'Descarregar CV - Ricardo Lopes',
    heading: 'Curriculum Vitae',
    download: 'Descarregar CV',
    note: 'Nota: Por favor, carregue o seu ficheiro PDF do CV para a pasta public como "cv.pdf"',
  },
};

export default function CV() {
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content="Download Ricardo Lopes CV" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t.heading}</h1>

        <div className="mb-8">
          <a
            href="/cv.pdf"
            download
            className="inline-block text-gray-900 border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition-colors"
          >
            {t.download}
          </a>
        </div>
      </div>
    </>
  );
}
