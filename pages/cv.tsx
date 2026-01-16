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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-primary-black">
            {t.heading}
          </h1>

          <div className="bg-gray-50 p-8 rounded-lg border-2 border-primary-red">
            <p className="text-lg mb-6 text-gray-700">
              {t.note}
            </p>
            <a
              href="/cv.pdf"
              download
              className="inline-block bg-primary-red text-primary-white px-8 py-3 rounded hover:bg-red-700 transition-colors"
            >
              {t.download}
            </a>
          </div>

          {/* Placeholder for CV preview or embed */}
          <div className="mt-8">
            <iframe
              src="/cv.pdf"
              className="w-full h-screen border-2 border-gray-300 rounded"
              title="CV Preview"
            />
          </div>
        </div>
      </div>
    </>
  );
}
