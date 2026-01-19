import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

const translations = {
  en: {
    title: 'CV Download - Ricardo Lopes',
    heading: 'Curriculum Vitae',
    download: 'Download CV',
    unavailable: 'CV Coming Soon',
  },
  pt: {
    title: 'Descarregar CV - Ricardo Lopes',
    heading: 'Curriculum Vitae',
    download: 'Descarregar CV',
    unavailable: 'CV Disponível em breve',
  },
};

interface CVProps {
  hasCV: boolean;
}

export default function CV({ hasCV }: CVProps) {
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
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-300">{t.heading}</h1>

        <div className="mb-8">
          {hasCV ? (
            <a
              href="/cv.pdf"
              download
              className="inline-block text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-700 px-6 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              {t.download}
            </a>
          ) : (
            <button
              disabled
              className="inline-block text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-800 px-6 py-2 rounded cursor-not-allowed"
            >
              {t.unavailable}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cvPath = path.join(process.cwd(), 'public', 'cv.pdf');
  const hasCV = fs.existsSync(cvPath);

  return {
    props: {
      hasCV,
    },
    // Revalidate every 5 minutes to detect new uploads without full rebuild
    revalidate: 300,
  };
};
